/*
 * This file is part of OrangeHRM
 *
 * Copyright (C) 2020 onwards OrangeHRM (https://www.orangehrm.com/)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

import {NullableString} from 'store/storage/types';
import {AuthenticationError} from 'services/errors/authentication';
import {InstanceCheckError} from 'services/errors/instance-check';

export const HTTP_NOT_FOUND = 404;

/**
 * Compare given ISO date with now.
 * @param expiredAtISO ISO date. e.g. 2020-07-28T07:01:21.152Z
 */
export const isAccessTokenExpired = (expiredAtISO: NullableString) => {
  if (typeof expiredAtISO === 'string') {
    const now = new Date();
    const expired = new Date(expiredAtISO);
    return now.getTime() >= expired.getTime();
  }
  return true;
};

/**
 * Return not localized string for given error object
 * @param error
 * @param defaultMessage
 */
export const getMessageAlongWithGenericErrors = (
  error: any,
  defaultMessage: string = 'Unexpected Error Occurred.',
) => {
  if (error instanceof Object && !Array.isArray(error)) {
    if (error.message === 'Network request failed') {
      return 'Connection Error! Operation Couldn’t Be Completed.';
    } else if (
      typeof error.message === 'string' &&
      error.message.startsWith('JSON Parse error:')
    ) {
      return 'Route Not Found. Please Contact Your System Administrator.';
    } else if (
      error instanceof AuthenticationError ||
      error instanceof InstanceCheckError
    ) {
      return error.message;
    }
  }
  return defaultMessage;
};

/**
 * Return not localized string for given API response object which contain error
 * @param response
 * @param defaultMessage
 */
export const getMessageAlongWithResponseErrors = (
  response: any,
  defaultMessage: string = 'Operation Couldn’t Be Completed.',
) => {
  if (response instanceof Object && !Array.isArray(response)) {
    if (parseInt(response.error?.status, 10) === HTTP_NOT_FOUND) {
      return 'No Records Found.';
    } else if (Array.isArray(response.error)) {
      if (
        [
          'Employee not assigned',
          'Employee is terminated',
          'Account disabled',
        ].includes(response.error[0])
      ) {
        throw new AuthenticationError(response.error[0]);
      } else {
        return response.error[0];
      }
    }
  }
  return defaultMessage;
};
