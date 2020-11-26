import {takeEvery, put} from 'redux-saga/effects';
import {apiCall, apiGetCall, apiPostCall} from 'store/saga-effects/api';
import {
  openLoader,
  closeLoader,
  showSnackMessage,
} from 'store/saga-effects/globals';
import {
  FETCH_PUNCH_STATUS,
  PUNCH_IN_REQUEST,
  PUNCH_OUT_REQUEST,
  PunchInRequestAction,
  PunchOutRequestAction,
} from './types';
import {fetchPunchStatusFinished, resetPunchState} from './actions';
import {
  API_ENDPOINT_PUNCH_STATUS,
  API_ENDPOINT_PUNCH_IN_REQUEST,
  API_ENDPOINT_PUNCH_OUT_REQUEST,
} from 'services/endpoints';
import {PunchRequestSuccessParam} from 'screens/time/navigators';
import {navigate} from 'lib/helpers/navigation';
import {PUNCH_REQUEST_SUCCESS} from 'screens';
import {
  getMessageAlongWithGenericErrors,
  getMessageAlongWithResponseErrors,
  HTTP_SUCCESS,
} from 'services/api';
import {TYPE_ERROR} from 'store/globals/types';

function* savePunchInRequest(action: PunchInRequestAction) {
  try {
    yield openLoader();
    const response = yield apiCall(
      apiPostCall,
      API_ENDPOINT_PUNCH_IN_REQUEST,
      action.payload,
    );

    if (response.getResponse().status === HTTP_SUCCESS) {
      yield put(resetPunchState());
      navigate<PunchRequestSuccessParam>(PUNCH_REQUEST_SUCCESS, response);
    } else {
      yield showSnackMessage(
        getMessageAlongWithResponseErrors(
          response,
          'Failed to Save Punch Record',
        ),
        TYPE_ERROR,
      );
    }
  } catch (error) {
    yield showSnackMessage(
      getMessageAlongWithGenericErrors(error, 'Failed to Save Punch Record'),
      TYPE_ERROR,
    );
  } finally {
    yield closeLoader();
  }
}

function* savePunchOutRequest(action: PunchOutRequestAction) {
  try {
    yield openLoader();
    const response = yield apiCall(
      apiPostCall,
      API_ENDPOINT_PUNCH_OUT_REQUEST,
      action.payload,
    );
    if (response.getResponse().status === HTTP_SUCCESS) {
      yield put(resetPunchState());
      navigate<PunchRequestSuccessParam>(PUNCH_REQUEST_SUCCESS, response);
    } else {
      yield showSnackMessage(
        getMessageAlongWithResponseErrors(
          response,
          'Failed to Save Punch Record',
        ),
        TYPE_ERROR,
      );
    }
  } catch (error) {
    yield showSnackMessage(
      getMessageAlongWithGenericErrors(error, 'Failed to Save Punch Record'),
      TYPE_ERROR,
    );
  } finally {
    yield closeLoader();
  }
}
function* fetchPunchStatus() {
  try {
    yield openLoader();
    const response = yield apiCall(apiGetCall, API_ENDPOINT_PUNCH_STATUS);
    yield put(fetchPunchStatusFinished(response.data));
  } catch (error) {
    yield put(fetchPunchStatusFinished(undefined, true));
  } finally {
    yield closeLoader();
  }
}

export function* watchPunchStatusActions() {
  yield takeEvery(FETCH_PUNCH_STATUS, fetchPunchStatus);
  yield takeEvery(PUNCH_IN_REQUEST, savePunchInRequest);
  yield takeEvery(PUNCH_OUT_REQUEST, savePunchOutRequest);
}
