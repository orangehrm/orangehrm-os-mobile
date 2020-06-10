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
