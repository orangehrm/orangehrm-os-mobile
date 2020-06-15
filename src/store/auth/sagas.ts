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

import {call, takeEvery} from 'redux-saga/effects';
import {FETCH_TOKEN, LOGOUT, FetchTokenAction} from './types';
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
import {storageSetMulti} from 'store/saga-effects/storage';

function* fetchAuthToken(action: FetchTokenAction) {
  try {
    yield openLoader();
    const response = yield call(
      authenticate,
      action.instanceUrl,
      action.username,
      action.password,
    );

    const data = yield call([response, response.json]);
    if (data.error) {
      yield showSnackMessage('Invalid Credentials');
    } else {
      var expiredAt = new Date();
      expiredAt.setSeconds(expiredAt.getSeconds() + data.expires_in);
      yield storageSetMulti({
        [USERNAME]: action.username,
        [ACCESS_TOKEN]: data.access_token,
        [REFRESH_TOKEN]: data.refresh_token,
        [TOKEN_TYPE]: data.token_type,
        [SCOPE]: data.scope,
        [EXPIRES_AT]: expiredAt.toISOString(),
      });
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

export function* watchAuth() {
  yield takeEvery(FETCH_TOKEN, fetchAuthToken);
  yield takeEvery(LOGOUT, logout);
}
