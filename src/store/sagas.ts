import {all, call} from 'redux-saga/effects';
import {loadAsyncStorage, watchSetStorageItem} from 'store/storage/sagas';
import {watchFetchAuthToken} from 'store/auth/sagas';

export default function* rootSaga() {
  yield all([
    call(loadAsyncStorage),
    call(watchSetStorageItem),
    call(watchFetchAuthToken),
  ]);
}
