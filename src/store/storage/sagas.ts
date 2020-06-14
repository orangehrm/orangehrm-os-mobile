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

import {call, put, takeEvery} from 'redux-saga/effects';
import storage, {
  INSTANCE_URL,
  USERNAME,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  EXPIRES_AT,
  SCOPE,
  TOKEN_TYPE,
} from 'services/storage';
import {setMulti, changeLoaded} from './actions';
import {SET_ITEM, SetItemAction} from './types';

export function* loadAsyncStorage() {
  try {
    const keys = [
      INSTANCE_URL,
      USERNAME,
      ACCESS_TOKEN,
      REFRESH_TOKEN,
      EXPIRES_AT,
      SCOPE,
      TOKEN_TYPE,
    ];
    const keyValuePairs = yield call(storage.multiGet, keys);
    // update redux store
    yield put(setMulti(keyValuePairs));
    yield put(changeLoaded(true));
  } catch (error) {
    yield put(changeLoaded(true, error));
  }
}

function* setItemAsyncStorage(action: SetItemAction) {
  try {
    yield storage.set(action.key, action.value);
  } catch (error) {}
}

export function* watchSetStorageItem() {
  yield takeEvery(SET_ITEM, setItemAsyncStorage);
}
