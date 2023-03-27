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

import {gte} from 'semver';
import {InstanceCheckError} from 'services/errors/instance-check';
import {
  API_ENDPOINT_MY_INFO,
  API_ENDPOINT_LEAVE_MY_LEAVE_ENTITLEMENT,
  API_ENDPOINT_LEAVE_MY_LEAVE_REQUEST,
  API_ENDPOINT_LEAVE_LIST,
  API_ENDPOINT_LEAVE_REQUEST,
  API_ENDPOINT_SUBORDINATE_LEAVE_ENTITLEMENT,
  API_ENDPOINT_SUBORDINATE_LEAVE_REQUEST,
  API_ENDPOINT_EMPLOYEES,
  API_ENDPOINT_API_VERSION,
  API_ENDPOINT_LEAVE_HOLIDAYS,
  API_ENDPOINT_LEAVE_WORK_SHIFT,
  API_ENDPOINT_LEAVE_WORK_WEEK,
  API_ENDPOINT_LEAVE_TYPES,
} from 'services/endpoints';

export const HTTP_METHOD_GET = 'get';
export const HTTP_METHOD_POST = 'post';

export const REQUIRED_ENDPOINTS = {
  [API_ENDPOINT_MY_INFO]: [HTTP_METHOD_GET],
  [API_ENDPOINT_LEAVE_MY_LEAVE_ENTITLEMENT]: [HTTP_METHOD_GET],
  [API_ENDPOINT_LEAVE_MY_LEAVE_REQUEST]: [HTTP_METHOD_GET, HTTP_METHOD_POST],
  [API_ENDPOINT_LEAVE_LIST]: [HTTP_METHOD_GET],
  [API_ENDPOINT_LEAVE_REQUEST]: [HTTP_METHOD_GET, HTTP_METHOD_POST],
  [API_ENDPOINT_SUBORDINATE_LEAVE_ENTITLEMENT]: [HTTP_METHOD_GET],
  [API_ENDPOINT_SUBORDINATE_LEAVE_REQUEST]: [HTTP_METHOD_POST],
  [API_ENDPOINT_EMPLOYEES]: [HTTP_METHOD_GET],
  [API_ENDPOINT_LEAVE_HOLIDAYS]: [HTTP_METHOD_GET],
  [API_ENDPOINT_LEAVE_WORK_SHIFT]: [HTTP_METHOD_GET],
  [API_ENDPOINT_LEAVE_WORK_WEEK]: [HTTP_METHOD_GET],
  [API_ENDPOINT_LEAVE_TYPES]: [HTTP_METHOD_GET],
};

export const ORANGEHRM_API_2$2$0 = '2.2.0';

export const REQUIRED_MINIMUM_ORANGEHRM_API_VER = ORANGEHRM_API_2$2$0;

export interface RestApiVersion {
  version: string;
}

export const checkInstance = (instanceUrl: string) => {
  return getOpenApiDefinition(instanceUrl);
};

export const getOpenApiDefinition = (instanceUrl: string) => {
  const restApiVersionEndpoint = instanceUrl + API_ENDPOINT_API_VERSION;

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  const requestOptions = {
    method: 'GET',
    headers: headers,
  };
  return fetch(restApiVersionEndpoint, requestOptions);
};

/**
 * @param versionData
 * @returns {boolean}
 */
export const checkInstanceCompatibility = (
  versionData: RestApiVersion,
): boolean => {
  if (gte(versionData?.version, REQUIRED_MINIMUM_ORANGEHRM_API_VER)) {
    return true;
  }
  throw new InstanceCheckError('Incompatible OrangeHRM API version.');
};

/**
 * @param currentVersion Connected OrangeHRM instance API version
 * @param requiredMinimumVersion Required minimum OrangeHRM API version to function a feature
 */
export const isApiCompatible = (
  currentVersion: string,
  requiredMinimumVersion: string,
): boolean => {
  return gte(currentVersion, requiredMinimumVersion);
};
