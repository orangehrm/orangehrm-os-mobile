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
import {API_ENDPOINT_API_VERSION} from 'services/endpoints';

export const ORANGEHRM_API_2$2$0 = '2.2.0'; // TODO

export const REQUIRED_MINIMUM_ORANGEHRM_API_VER = ORANGEHRM_API_2$2$0;

export interface RestApiVersion {
  version: string;
}

export const checkInstance = (instanceUrl: string) => {
  return getRestApiVersion(instanceUrl);
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
