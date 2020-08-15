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
import {apiCall, apiGetCall, apiPostCall} from 'store/saga-effects/api';
import {
  openLoader,
  closeLoader,
  showSnackMessage,
} from 'store/saga-effects/globals';
import {
  FETCH_LEAVE_LIST,
  FETCH_EMPLOYEE_LEAVE_REQUEST,
  CHANGE_EMPLOYEE_LEAVE_REQUEST_STATUS,
  FetchEmployeeLeaveRequestAction,
  ChangeEmployeeLeaveRequestStatusAction,
} from 'store/leave/leave-list/types';
import {
  fetchLeaveListFinished,
  fetchEmployeeLeaveRequestFinished,
  fetchEmployeeLeaveRequest as fetchEmployeeLeaveRequestAction,
} from 'store/leave/leave-list/actions';
import {
  assignColorsToLeaveTypes,
  assignColorToLeaveType,
} from 'lib/helpers/leave';
import {TYPE_ERROR} from 'store/globals/types';
import {
  API_ENDPOINT_LEAVE_LIST,
  API_ENDPOINT_LEAVE_REQUEST,
  prepare,
} from 'services/endpoints';
import {
  getMessageAlongWithGenericErrors,
  getMessageAlongWithResponseErrors,
  HTTP_NOT_FOUND,
} from 'services/api';

function* fetchLeaveList() {
  try {
    yield openLoader();
    const response = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_LEAVE_LIST, {}, {pendingApproval: true}),
    );
    if (response.data) {
      yield put(
        fetchLeaveListFinished(assignColorsToLeaveTypes(response.data)),
      );
    } else {
      if (response.getResponse().status === HTTP_NOT_FOUND) {
        yield put(fetchLeaveListFinished([]));
      } else {
        yield put(fetchLeaveListFinished(undefined, true));
        yield showSnackMessage(
          getMessageAlongWithResponseErrors(
            response,
            'Failed to Fetch Leave Details',
          ),
          TYPE_ERROR,
        );
      }
    }
  } catch (error) {
    yield showSnackMessage(
      getMessageAlongWithGenericErrors(error, 'Failed to Fetch Leave Details'),
      TYPE_ERROR,
    );
    yield put(fetchLeaveListFinished(undefined, true));
  } finally {
    yield closeLoader();
  }
}

function* fetchEmployeeLeaveRequest(action: FetchEmployeeLeaveRequestAction) {
  try {
    yield openLoader();
    const response = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_LEAVE_REQUEST, {id: action.leaveRequestId}),
    );
    if (response.data) {
      yield put(
        fetchEmployeeLeaveRequestFinished(
          assignColorToLeaveType(response.data),
        ),
      );
    } else {
      yield put(fetchEmployeeLeaveRequestFinished(undefined, true));
      yield showSnackMessage(
        getMessageAlongWithResponseErrors(
          response,
          'Failed to Fetch Leave Details',
        ),
        TYPE_ERROR,
      );
    }
  } catch (error) {
    yield showSnackMessage(
      getMessageAlongWithGenericErrors(error, 'Failed to Fetch Leave Details'),
      TYPE_ERROR,
    );
    yield put(fetchEmployeeLeaveRequestFinished(undefined, true));
  } finally {
    yield closeLoader();
  }
}

function* changeEmployeeLeaveRequestStatus(
  action: ChangeEmployeeLeaveRequestStatusAction,
) {
  try {
    yield openLoader();
    const response = yield apiCall(
      apiPostCall,
      prepare(API_ENDPOINT_LEAVE_REQUEST, {id: action.leaveRequestId}),
      action.action,
    );

    if (response.success) {
      //re-fetch with updated leave request data
      yield put(fetchEmployeeLeaveRequestAction(action.leaveRequestId));
      yield showSnackMessage('Successfully Submited');
    } else {
      yield showSnackMessage(
        getMessageAlongWithResponseErrors(
          response,
          'Failed to Update Leave Request',
        ),
        TYPE_ERROR,
      );
    }
  } catch (error) {
    yield showSnackMessage(
      getMessageAlongWithGenericErrors(error, 'Failed to Update Leave Request'),
      TYPE_ERROR,
    );
  } finally {
    yield closeLoader();
  }
}

export function* watchLeaveListActions() {
  yield takeEvery(FETCH_LEAVE_LIST, fetchLeaveList);
  yield takeEvery(FETCH_EMPLOYEE_LEAVE_REQUEST, fetchEmployeeLeaveRequest);
  yield takeEvery(
    CHANGE_EMPLOYEE_LEAVE_REQUEST_STATUS,
    changeEmployeeLeaveRequestStatus,
  );
}
