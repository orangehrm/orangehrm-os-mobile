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

import {takeEvery, put} from 'redux-saga/effects';
import {
  apiCall,
  apiGetCall,
  apiPostCall,
  apiPutCall,
  ApiResponse,
} from 'store/saga-effects/api';
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
  FetchPunchStatusAction,
  fetchAttendanceConfigsAction,
  FETCH_ATTENDANCE_CONFIG,
  AttendanceConfigObject,
} from './types';
import {
  fetchAttendanceConfigFinished,
  fetchPunchStatusFinished,
  resetPunchState,
} from './actions';
import {
  API_ENDPOINT_PUNCH_STATUS,
  API_ENDPOINT_PUNCH_IN_OUT_REQUEST,
  API_ENDPOINT_ATTENDANCE_CONFIG,
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
import {PunchStatus} from 'store/time/punch/types';

function* fetchAttendanceConfigs(action: fetchAttendanceConfigsAction) {
  try {
    if (!action.refresh) {
      yield openLoader();
    }

    const response: ApiResponse<AttendanceConfigObject, {}> = yield apiCall(
      apiGetCall,
      API_ENDPOINT_ATTENDANCE_CONFIG,
    );

    yield put(fetchAttendanceConfigFinished(response.data));
  } catch (error) {
    yield put(fetchAttendanceConfigFinished(undefined, true));
  } finally {
    if (!action.refresh) {
      yield closeLoader();
    }
  }
}
function* savePunchInRequest(action: PunchInRequestAction) {
  try {
    yield openLoader();
    const response: ApiResponse<PunchRequestSuccessParam, {}> = yield apiCall(
      apiPostCall,
      API_ENDPOINT_PUNCH_IN_OUT_REQUEST,
      action.payload,
    );

    if (response.getResponse().status === HTTP_SUCCESS) {
      yield put(resetPunchState());
      navigate<PunchRequestSuccessParam>(PUNCH_REQUEST_SUCCESS, response.data);
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
    const response: ApiResponse<PunchRequestSuccessParam, {}> = yield apiCall(
      apiPutCall,
      API_ENDPOINT_PUNCH_IN_OUT_REQUEST,
      action.payload,
    );

    if (response.getResponse().status === HTTP_SUCCESS) {
      yield put(resetPunchState());
      navigate<PunchRequestSuccessParam>(PUNCH_REQUEST_SUCCESS, response.data);
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
function* fetchPunchStatus(action: FetchPunchStatusAction) {
  try {
    if (!action.refresh) {
      yield openLoader();
    }

    const response: ApiResponse<PunchStatus, {}> = yield apiCall(
      apiGetCall,
      API_ENDPOINT_PUNCH_STATUS,
    );
    yield put(fetchPunchStatusFinished(response.data));
  } catch (error) {
    yield put(fetchPunchStatusFinished(undefined, true));
  } finally {
    if (!action.refresh) {
      yield closeLoader();
    }
  }
}

export function* watchPunchStatusActions() {
  yield takeEvery(FETCH_PUNCH_STATUS, fetchPunchStatus);
  yield takeEvery(FETCH_ATTENDANCE_CONFIG, fetchAttendanceConfigs);
  yield takeEvery(PUNCH_IN_REQUEST, savePunchInRequest);
  yield takeEvery(PUNCH_OUT_REQUEST, savePunchOutRequest);
}
