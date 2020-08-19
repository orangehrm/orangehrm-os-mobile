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

import {EndpointError} from 'services/errors/endpoints';

export const API_ENDPOINT_AUTH_ISSUE_TOKEN = '/oauth/issueToken';
export const API_ENDPOINT_MY_INFO = '/api/v1/myinfo';
export const API_ENDPOINT_LEAVE_MY_LEAVE_ENTITLEMENT =
  '/api/v1/leave/my-leave-entitlement';
export const API_ENDPOINT_LEAVE_MY_LEAVE_REQUEST =
  '/api/v1/leave/my-leave-request';
export const API_ENDPOINT_LEAVE_LIST = '/api/v1/leave/leave-list';
export const API_ENDPOINT_LEAVE_REQUEST = '/api/v1/leave/leave-request/{id}';
export const API_ENDPOINT_SUBORDINATE_LEAVE_ENTITLEMENT =
  '/api/v1/subordinate/{id}/leave-entitlement';
export const API_ENDPOINT_SUBORDINATE_LEAVE_REQUEST =
  '/api/v1/subordinate/{id}/leave-request';
export const API_ENDPOINT_EMPLOYEES = '/api/v1/employees';
export const API_ENDPOINT_API_DEFINITION = '/api/v1/api-definition';
export const API_ENDPOINT_LEAVE_HOLIDAYS = '/api/v1/leave/holidays';
export const API_ENDPOINT_LEAVE_PERIODS = '/api/v1/leave/leave-periods';
export const API_ENDPOINT_LEAVE_WORK_SHIFT = '/api/v1/leave/work-shift';
export const API_ENDPOINT_LEAVE_WORK_WEEK = '/api/v1/leave/work-week';
export const API_ENDPOINT_ENABLED_MODULES = '/api/v1/enabled-modules';

export const prepare = (
  endpoint: string,
  params: {[key: string]: string | number} = {},
  query: {[key: string]: string | number | boolean | string[]} = {},
) => {
  let preparedEndpoint = endpoint;
  Object.keys(params).forEach((param) => {
    const paramPlaceholder = `{${param}}`;
    if (preparedEndpoint.includes(paramPlaceholder)) {
      let paramValue = params[param];
      if (typeof paramValue === 'number') {
        paramValue = paramValue.toString();
      }
      preparedEndpoint = preparedEndpoint.replace(paramPlaceholder, paramValue);
    } else {
      throw new EndpointError('Invalid parameter.');
    }
  });
  let preparedQueryString = '?';
  const queryKeys = Object.keys(query);
  queryKeys.forEach((queryKey, index) => {
    if (index !== 0) {
      preparedQueryString += '&';
    }
    const queryValue = query[queryKey];
    if (Array.isArray(queryValue)) {
      queryValue.forEach((queryValueItem, itemIndex) => {
        if (itemIndex !== 0) {
          preparedQueryString += '&';
        }
        preparedQueryString += `${queryKey}[]=${queryValueItem}`;
      });
    } else {
      preparedQueryString += `${queryKey}=${queryValue}`;
    }
  });
  return encodeURI(
    preparedEndpoint + (queryKeys.length === 0 ? '' : preparedQueryString),
  );
};
