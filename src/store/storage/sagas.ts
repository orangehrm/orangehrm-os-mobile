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

import {call, all, takeEvery, select} from 'redux-saga/effects';
import storage, {
  INSTANCE_URL,
  USERNAME,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  EXPIRES_AT,
  SCOPE,
  TOKEN_TYPE,
  INSTANCE_API_VERSION,
  DATE_FORMAT,
  StringMap,
} from 'services/storage';
import {storageSetMulti, storageChangeLoaded} from 'store/saga-effects/storage';
import {
  SET_ITEM,
  SET_MULTI,
  SetItemAction,
  SetMultiAction,
  StorageState,
} from './types';
import {selectStorageLoaded} from 'store/storage/selectors';

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
      INSTANCE_API_VERSION,
      DATE_FORMAT,
    ];
    const keyValuePairs: StringMap = yield call(storage.multiGet, keys);
    // update redux store
    yield storageSetMulti(keyValuePairs);
    yield storageChangeLoaded(true);
  } catch (error) {
    yield storageChangeLoaded(true, error);
  }
}

function* setItemAsyncStorage(action: SetItemAction) {
  try {
    yield storage.set(action.key, action.value);
    // eslint-disable-next-line no-empty
  } catch (error) {}
}

function* setMultiAsyncStorage(action: SetMultiAction) {
  try {
    const initialStorageLoaded: {loaded?: boolean; error: any} = yield select(
      selectStorageLoaded,
    );
    // Avoid update async storage when executing `loadAsyncStorage` when application starts
    if (initialStorageLoaded.loaded) {
      const keys = Object.keys(action.keyValuePairs);
      yield all(
        keys.map((keyName) => {
          const key = <keyof Partial<StorageState>>keyName;
          storage.set(key, action.keyValuePairs[key]);
        }),
      );
    }
    // eslint-disable-next-line no-empty
  } catch (error) {}
}

export function* watchSetStorageItem() {
  yield takeEvery(SET_ITEM, setItemAsyncStorage);
  yield takeEvery(SET_MULTI, setMultiAsyncStorage);
}
