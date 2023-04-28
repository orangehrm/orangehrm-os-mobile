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
  API_ENDPOINT_API_VERSION,
  API_ENDPOINT_EMPLOYEES,
  V1_OAUTH_ENDPOINT_ISSUE_TOKEN,
} from 'services/endpoints';
import {
  authRequest,
  GRANT_TYPE_PASSWORD,
  PUBLIC_MOBILE_CLIENT_ID,
} from './authentication';

export const ORANGEHRM_API_2$4$0 = '2.4.0';

export const REQUIRED_MINIMUM_ORANGEHRM_API_VER = ORANGEHRM_API_2$4$0;

export interface RestApiVersion {
  version: string;
}

export const checkInstance = (instanceUrl: string) => {
  return getRestApiVersion(instanceUrl);
};

/**
 * Fetch request to check whether the given instance is an OrangeHRM 5.x instance,
 * But it's early 5.4 version
 */
export const checkNotSupported5xInstance = (instanceUrl: string) => {
  const employeesEndpoint = instanceUrl + API_ENDPOINT_EMPLOYEES;

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  const requestOptions = {
    method: 'GET',
    headers: headers,
  };
  return fetch(employeesEndpoint, requestOptions);
};

/**
 * Fetch request to check whether the given instance is an OrangeHRM instance,
 * But it's early 4.5 version
 */
export const checkLegacyInstance = (instanceUrl: string) => {
  return authRequest(instanceUrl + V1_OAUTH_ENDPOINT_ISSUE_TOKEN, {
    grant_type: GRANT_TYPE_PASSWORD,
    client_id: PUBLIC_MOBILE_CLIENT_ID,
    client_secret: '',
  });
};

export const getRestApiVersion = (instanceUrl: string) => {
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
