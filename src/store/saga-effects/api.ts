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

import {call, put, take} from 'redux-saga/effects';
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
import {setFetchingAccessTokenLock} from 'store/storage/actions';
import {
  SET_FETCHING_ACCESS_TOKEN_LOCK,
  SetFetchingAccessTokenLockAction,
} from 'store/storage/types';
import {getExpiredAt} from 'store/auth/helper';
import {AuthParams} from 'store/storage/types';
import {logout, fetchNewAuthTokenFinished} from 'store/auth/actions';
import {AuthenticationError} from 'services/errors/authentication';

export function* apiCall<Fn extends (...args: any[]) => any>(
  fn: Fn,
  ...args: Parameters<Fn>
) {
  let authParams: AuthParams = yield selectAuthParams();

  if (authParams.fetchingAccessTokenLock) {
    let action: SetFetchingAccessTokenLockAction;
    // `task` effect is blocking
    while ((action = yield take(SET_FETCHING_ACCESS_TOKEN_LOCK))) {
      if (action.state === false) {
        // Aquired lock
        yield put(setFetchingAccessTokenLock(true));
        break;
      }
    }
    // Update auth params to continue after waiting
    authParams = yield selectAuthParams();
  } else {
    // Aquired lock
    yield put(setFetchingAccessTokenLock(true));
  }

  if (isAccessTokenExpired(authParams.expiresAt)) {
    if (authParams.refreshToken !== null && authParams.instanceUrl !== null) {
      // eslint-disable-next-line no-undef
      const response: Response = yield call(
        getNewAccessToken,
        authParams.instanceUrl,
        authParams.refreshToken,
      );
      const data = yield call([response, response.json]);

      if (data.access_token) {
        yield storageSetMulti({
          [ACCESS_TOKEN]: data.access_token,
          ...(data.refresh_token !== undefined &&
            data.refresh_token !== null && {
              [REFRESH_TOKEN]: data.refresh_token,
            }),
          [TOKEN_TYPE]: data.token_type,
          [SCOPE]: data.scope,
          [EXPIRES_AT]: getExpiredAt(data.expires_in),
        });
        yield put(fetchNewAuthTokenFinished());
      } else {
        if (data.error === 'authentication_failed') {
          // employee not assigned, terminated, disabled
          yield put(logout());
          throw new AuthenticationError(data.error_description);
        } else if (
          data.error === 'invalid_grant' &&
          data.error_description === 'Refresh token has expired'
        ) {
          // expire refresh token time
          yield put(logout());
          throw new AuthenticationError('Authentication Expired');
        } else {
          throw new AuthenticationError('Authentication Failed');
        }
      }
    } else {
      throw new Error("Couldn't call with empty instanceUrl or refreshToken.");
    }
  }
  // Release lock
  yield put(setFetchingAccessTokenLock(false));

  const result = yield call(fn, ...args);
  return result;
}

export function* apiGetCall(endpoint: string, requiredRawResponse?: boolean) {
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

    // eslint-disable-next-line no-undef
    const response: Response = yield call(fetch, url, requestOptions);

    if (requiredRawResponse === true) {
      return response;
    }
    const data = yield call([response, response.json]);
    data.getResponse = () => {
      return response;
    };
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

    // eslint-disable-next-line no-undef
    const response: Response = yield call(fetch, url, requestOptions);
    const data = yield call([response, response.json]);
    data.getResponse = () => {
      return response;
    };
    return data;
  }
  throw new Error("Couldn't call with empty instanceUrl or accessToken.");
}
