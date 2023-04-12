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

// attendance
export const API_ENDPOINT_PUNCH_STATUS = '/api/v2/attendance/records/latest';
export const API_ENDPOINT_FETCH_UTC_DATE_TIME =
  '/api/v2/attendance/current-datetime';
export const API_ENDPOINT_PUNCH_IN_OUT_REQUEST = '/api/v2/attendance/records';
export const API_ENDPOINT_ATTENDANCE_CONFIG = '/api/v2/attendance/configs';
export const API_ENDPOINT_ATTENDANCE = '/api/v1/attendance/records';
export const API_ENDPOINT_ATTENDANCE_GRAPH =
  '/api/v2/leave/employees/leave-requests';
export const API_ENDPOINT_ATTENDANCE_WORK_SUMMARY =
  '/api/v2/dashboard/employees/time-at-work';
export const API_ENDPOINT_ATTENDANCE_LIST =
  '/api/v2/attendance/employees/summary';
export const API_ENDPOINT_ATTENDANCE_CONFIGURATION =
  '/api/v2/time/time-sheet-period';

// public endpoints
export const API_ENDPOINT_API_DEFINITION = '/api/v1/api-definition';

/**
 * V2 endpoints
 */

export const OAUTH_ENDPOINT_AUTHORIZE = '/oauth2/authorize';
export const OAUTH_ENDPOINT_TOKEN = '/oauth2/token';
export const API_ENDPOINT_API_VERSION = '/api/v2/core/public/version';

export const API_ENDPOINT_MY_INFO = '/api/v2/pim/myself';
export const API_ENDPOINT_EMPLOYEES = '/api/v2/pim/employees';
export const API_ENDPOINT_ENABLED_MODULES = '/api/v2/admin/modules';

// leave
export const API_ENDPOINT_LEAVE_MY_LEAVE_ENTITLEMENT =
  '/api/v2/leave/leave-entitlements';
export const API_ENDPOINT_LEAVE_MY_LEAVE_REQUEST =
  '/api/v2/leave/leave-requests';
export const API_ENDPOINT_LEAVE_MY_LEAVE_REQUEST_DETAILS =
  '/api/v2/leave/leave-requests/{leaveRequestId}';
export const API_ENDPOINT_LEAVE_LIST = '/api/v2/leave/employees/leave-requests';
export const API_ENDPOINT_LEAVES =
  '/api/v2/leave/leave-requests/{leaveRequestId}/leaves';
export const API_ENDPOINT_LEAVE_REQUEST_DETAILS =
  '/api/v2/leave/employees/leave-requests/{leaveRequestId}';
export const API_ENDPOINT_LEAVE_COMMENT =
  '/api/v2/leave/leave-requests/{leaveRequestId}/leave-comments';
export const API_ENDPOINT_EMPLOYEE_LEAVE_BALANCE =
  '/api/v2/leave/employee/leave-balances'; // TODO::remove
export const API_ENDPOINT_SUBORDINATE_LEAVE_REQUEST =
  '/api/v2/leave/employees/leave-requests'; // TODO::remove
export const API_ENDPOINT_LEAVE_HOLIDAYS = '/api/v2/leave/holidays';
export const API_ENDPOINT_LEAVE_WORK_SHIFT =
  '/api/v2/pim/employees/{empNumber}/work-shift';
export const API_ENDPOINT_LEAVE_WORK_WEEK = '/api/v2/leave/workweek';
export const API_ENDPOINT_LEAVE_TYPES = '/api/v2/leave/leave-types';
export const API_ENDPOINT_LEAVE = '/api/v2/leave/leaves';

export const ENDPOINT_EMPLOYEE_PHOTO = '/pim/viewPhoto/empNumber/{empNumber}';

//help
export const HELP_REDIRECT_URL =
  'https://starterhelp.orangehrm.com/hc/en-us/categories/360002945899-Mobile-App';

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
