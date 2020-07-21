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

import {call} from 'redux-saga/effects';
import {isAccessTokenExpired} from 'services/api';
import {getNewAccessToken} from 'services/authentication';
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  SCOPE,
  TOKEN_TYPE,
  EXPIRES_AT,
} from 'services/storage';
import {storageSetMulti, selectAuthParams} from 'store/saga-effects/storage';
import {getExpiredAt} from 'store/auth/helper';
import {AuthParams} from 'store/storage/types';

export const HTTP_NOT_FOUND = '404';

export function* apiCall<Fn extends (...args: any[]) => any>(
  fn: Fn,
  ...args: Parameters<Fn>
) {
  const authParams: AuthParams = yield selectAuthParams();

  if (isAccessTokenExpired(authParams.expiresAt)) {
    if (authParams.refreshToken !== null && authParams.instanceUrl !== null) {
      const response = yield call(
        getNewAccessToken,
        authParams.instanceUrl,
        authParams.refreshToken,
      );
      const data = yield call([response, response.json]);

      yield storageSetMulti({
        [ACCESS_TOKEN]: data.access_token,
        // TODO: Not recieving from issue token endpoint
        // [REFRESH_TOKEN]: data.refresh_token,
        [TOKEN_TYPE]: data.token_type,
        [SCOPE]: data.scope,
        [EXPIRES_AT]: getExpiredAt(data.expires_in),
      });
    } else {
      throw new Error("Couldn't call with empty instanceUrl or refreshToken.");
    }
  }

  const result = yield call(fn, ...args);
  return result;
}

export function* apiGetCall(endpoint: string) {
  const authParams: AuthParams = yield selectAuthParams();

  if (authParams.accessToken !== null && authParams.instanceUrl !== null) {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${authParams.accessToken}`);
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    const requestOptions = {
      method: 'GET',
      headers: headers,
    };
    const url = authParams.instanceUrl + endpoint;

    const response = yield call(fetch, url, requestOptions);
    const data = yield call([response, response.json]);
    return data;
  }
  throw new Error("Couldn't call with empty instanceUrl or accessToken.");
}

export function* apiPostCall(endpoint: string, body: object) {
  const authParams: AuthParams = yield selectAuthParams();

  if (authParams.accessToken !== null && authParams.instanceUrl !== null) {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${authParams.accessToken}`);
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    const bodyKeys = Object.keys(body);

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: bodyKeys.length === 0 ? undefined : JSON.stringify(body),
    };
    const url = authParams.instanceUrl + endpoint;

    const response = yield call(fetch, url, requestOptions);
    const data = yield call([response, response.json]);
    return data;
  }
  throw new Error("Couldn't call with empty instanceUrl or accessToken.");
}
