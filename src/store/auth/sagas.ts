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

import {call, takeEvery, put} from 'redux-saga/effects';
import {FETCH_TOKEN, LOGOUT, FETCH_MY_INFO, FetchTokenAction} from './types';
import {authenticate} from 'services/authentication';
import {
  USERNAME,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  SCOPE,
  TOKEN_TYPE,
  EXPIRES_AT,
} from 'services/storage';
import {
  openLoader,
  closeLoader,
  showSnackMessage,
} from 'store/saga-effects/globals';
import {apiCall, apiGetCall} from 'store/saga-effects/api';
import {storageSetMulti, selectAuthParams} from 'store/saga-effects/storage';
import {fetchMyInfoFinished} from 'store/auth/actions';
import {getExpiredAt} from 'store/auth/helper';
import {AuthParams} from 'store/storage/types';

function* fetchAuthToken(action: FetchTokenAction) {
  try {
    yield openLoader();
    const authParams: AuthParams = yield selectAuthParams();

    if (authParams.instanceUrl !== null) {
      const response = yield call(
        authenticate,
        authParams.instanceUrl,
        action.username,
        action.password,
      );

      const data = yield call([response, response.json]);
      if (data.error) {
        switch (data.error) {
          case 'invalid_client':
            yield showSnackMessage(
              'Please add mobile client to your instance.',
            );
            break;
          default:
            yield showSnackMessage('Invalid Credentials.');
        }
      } else {
        yield storageSetMulti({
          [USERNAME]: action.username,
          [ACCESS_TOKEN]: data.access_token,
          [REFRESH_TOKEN]: data.refresh_token,
          [TOKEN_TYPE]: data.token_type,
          [SCOPE]: data.scope,
          [EXPIRES_AT]: getExpiredAt(data.expires_in),
        });
      }
    } else {
      yield showSnackMessage('Instance URL is empty');
    }
  } catch (error) {
    yield showSnackMessage(
      'Connection Error! Operation Couldn’t Be Completed.',
    );
  } finally {
    yield closeLoader();
  }
}

function* logout() {
  try {
    yield openLoader();
    yield storageSetMulti({
      [USERNAME]: null,
      [ACCESS_TOKEN]: null,
      [REFRESH_TOKEN]: null,
      [TOKEN_TYPE]: null,
      [SCOPE]: null,
      [EXPIRES_AT]: null,
    });
  } catch (error) {
    yield showSnackMessage('Failed to Perform Action.');
  } finally {
    yield closeLoader();
  }
}

function* fetchMyInfo() {
  try {
    const response = yield apiCall(apiGetCall, '/api/v1/myinfo');
    if (response.data) {
      yield put(fetchMyInfoFinished(response.data));
    } else {
      yield put(fetchMyInfoFinished(undefined, true));
    }
  } catch (error) {
    yield put(fetchMyInfoFinished(undefined, true));
  }
}

export function* watchAuthActions() {
  yield takeEvery(FETCH_TOKEN, fetchAuthToken);
  yield takeEvery(LOGOUT, logout);
  yield takeEvery(FETCH_MY_INFO, fetchMyInfo);
}
