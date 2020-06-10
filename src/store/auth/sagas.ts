import {call, takeEvery} from 'redux-saga/effects';
import {FETCH_TOKEN, FetchTokenAction} from './types';
import {authenticate} from 'services/authentication';

function* fetchAuthToken(action: FetchTokenAction) {
  try {
    const response = yield call(
      authenticate,
      action.instanceUrl,
      action.username,
      action.password,
    );
    const data = yield call([response, response.json]);
    // TODO: store access_token
  } catch (error) {}
}

export function* watchFetchAuthToken() {
  yield takeEvery(FETCH_TOKEN, fetchAuthToken);
}
