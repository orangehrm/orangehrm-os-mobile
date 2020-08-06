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

import {gte, major} from 'semver';
import {MutableKeys} from 'utility-types';
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
  API_ENDPOINT_API_DEFINITION,
  prepare,
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
};

export const REQUIRED_MINIMUM_ORANGEHRM_API_VER = '1.1.0';

export const checkInstance = (instanceUrl: string) => {
  return getOpenApiDefinition(instanceUrl);
};

export const getOpenApiDefinition = (instanceUrl: string) => {
  const restApiMetaEndpoint =
    instanceUrl + prepare(API_ENDPOINT_API_DEFINITION, {}, {tags: ['User']});

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  const requestOptions = {
    method: 'GET',
    headers: headers,
  };
  return fetch(restApiMetaEndpoint, requestOptions);
};

/**
 *
 * @param openApiDefinition OpenAPI 3.0.x https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md
 * @returns {boolean}
 */
export const checkInstanceCompatibility = (openApiDefinition: any): boolean => {
  if (major(openApiDefinition.openapi) === 3) {
    if (
      gte(openApiDefinition?.info?.version, REQUIRED_MINIMUM_ORANGEHRM_API_VER)
    ) {
      return true;
    }
    throw new InstanceCheckError('Incompatible OrangeHRM API version.');
  }
  throw new InstanceCheckError('Incompatible OpenAPI version.');
};

/**
 * Called followed `checkInstanceCompatibility`
 * @param openApiDefinition
 */
export const checkRemovedEndpoints = (openApiDefinition: any): void => {
  const paths = getOpenApiDefinitionPaths(openApiDefinition);
  Object.keys(REQUIRED_ENDPOINTS).forEach((key) => {
    const path = <MutableKeys<typeof REQUIRED_ENDPOINTS>>key;
    REQUIRED_ENDPOINTS[path].forEach((operation) => {
      const exist = paths[path]?.hasOwnProperty(operation);

      if (!exist) {
        throw new InstanceCheckError('Please Update the Application.');
      }
    });
  });
};

/**
 * Called followed `checkRemovedEndpoints`
 * @param openApiDefinition
 * @returns {boolean}
 */
export const checkDeprecatedEndpoints = (openApiDefinition: any): boolean => {
  if (openApiDefinition.paths && openApiDefinition.info['x-base-path']) {
    const paths = getOpenApiDefinitionPaths(openApiDefinition);
    for (const key of Object.keys(REQUIRED_ENDPOINTS)) {
      const path = <MutableKeys<typeof REQUIRED_ENDPOINTS>>key;
      for (const operation of REQUIRED_ENDPOINTS[path]) {
        const deprecated = paths[path]?.[operation]?.deprecated;

        if (deprecated === true) {
          return true;
        }
      }
    }
    return false;
  }
  throw new InstanceCheckError('Incompatible OpenAPI version.');
};

/**
 * Prepend base path to definition paths
 * @param openApiDefinition
 */
export const getOpenApiDefinitionPaths = (openApiDefinition: any) => {
  if (openApiDefinition.paths && openApiDefinition.info['x-base-path']) {
    const basePath = openApiDefinition.info['x-base-path'];
    const paths: {[key: string]: any} = {};
    Object.keys(openApiDefinition.paths).forEach((path) => {
      paths[`${basePath}${path}`] = openApiDefinition.paths[path];
    });
    return paths;
  }
  throw new InstanceCheckError('Incompatible OpenAPI Definition.');
};
