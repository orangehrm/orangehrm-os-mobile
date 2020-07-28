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

import {API_ENDPOINT_AUTH_ISSUE_TOKEN} from 'services/endpoints';

export const PUBLIC_MOBILE_CLIENT_ID = 'orangehrm_mobile_app';
export const PUBLIC_MOBILE_CLIENT_SECRET = '';
export const REQUIRED_SCOPE = 'user';
export const GRANT_TYPE_PASSWORD = 'password';
export const GRANT_TYPE_REFRESH_TOKEN = 'refresh_token';

export const authenticate = (
  instanceUrl: string,
  username: string,
  password: string,
) => {
  return authRequest(instanceUrl, {
    grant_type: GRANT_TYPE_PASSWORD,
    client_id: PUBLIC_MOBILE_CLIENT_ID,
    client_secret: PUBLIC_MOBILE_CLIENT_SECRET,
    scope: REQUIRED_SCOPE,
    username,
    password,
  });
};

export const getNewAccessToken = (
  instanceUrl: string,
  refreshToken: string,
) => {
  return authRequest(instanceUrl, {
    grant_type: GRANT_TYPE_REFRESH_TOKEN,
    client_id: PUBLIC_MOBILE_CLIENT_ID,
    client_secret: PUBLIC_MOBILE_CLIENT_SECRET,
    refresh_token: refreshToken,
  });
};

export const checkInstance = (instanceUrl: string) => {
  return authRequest(instanceUrl, {
    grant_type: GRANT_TYPE_PASSWORD,
    client_id: PUBLIC_MOBILE_CLIENT_ID,
    client_secret: PUBLIC_MOBILE_CLIENT_SECRET,
  });
};

export const authRequest = (instanceUrl: string, body: object) => {
  const authEndpoint = instanceUrl + API_ENDPOINT_AUTH_ISSUE_TOKEN;

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
  };
  return fetch(authEndpoint, requestOptions);
};
