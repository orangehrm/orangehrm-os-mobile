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
import {
  FETCH_TOKEN,
  LOGOUT,
  FETCH_MY_INFO,
  CHECK_INSTANCE,
  FetchTokenAction,
  CheckInstanceAction,
} from './types';
import {
  authenticate,
  checkInstance as checkInstanceRequest,
} from 'services/authentication';
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
import {
  storageSetMulti,
  selectAuthParams,
  selectInstanceUrl,
} from 'store/saga-effects/storage';
import {fetchMyInfoFinished, checkInstanceFinished} from 'store/auth/actions';
import {getExpiredAt} from 'store/auth/helper';
import {AuthParams} from 'store/storage/types';
import {TYPE_ERROR, TYPE_WARN} from 'store/globals/types';

function* checkInstance(_action: CheckInstanceAction) {
  try {
    yield openLoader();
    const instanceUrl: string = yield selectInstanceUrl();
    const response = yield call(checkInstanceRequest, instanceUrl);
    const data = yield call([response, response.json]);

    // TODO: Replace check success response from new endpoint instead error result from `issueToken`
    if (data.error === 'invalid_request') {
      yield put(checkInstanceFinished());
    } else {
      yield put(checkInstanceFinished(true));
    }
  } catch (error) {
    yield put(checkInstanceFinished(true));
    if (error.message === 'Network request failed') {
      yield showSnackMessage(
        'Connection Error! Operation Couldn’t Be Completed.',
        TYPE_ERROR,
      );
    } else {
      yield showSnackMessage('Could Not Be Reached.', TYPE_ERROR);
    }
  } finally {
    yield closeLoader();
  }
}

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
              TYPE_WARN,
            );
            break;
          default:
            yield showSnackMessage('Invalid Credentials.', TYPE_ERROR);
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
      yield showSnackMessage('Instance URL is empty', TYPE_ERROR);
    }
  } catch (error) {
    yield showSnackMessage(
      'Connection Error! Operation Couldn’t Be Completed.',
      TYPE_ERROR,
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
    yield showSnackMessage('Failed to Perform Action.', TYPE_ERROR);
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
  yield takeEvery(CHECK_INSTANCE, checkInstance);
}
