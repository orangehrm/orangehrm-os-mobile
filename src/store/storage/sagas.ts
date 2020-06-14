/**
 * OrangeHRM is a comprehensive Human Resource Management (HRM) System that captures
 * all the essential functionalities required for any enterprise.
 * Copyright (C) 2006 OrangeHRM Inc., http://www.orangehrm.com
 *
 * OrangeHRM is free software; you can redistribute it and/or modify it under the terms of
 * the GNU General Public License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * OrangeHRM is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this program;
 * if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor,
 * Boston, MA  02110-1301, USA
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
