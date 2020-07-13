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

function* fetchLeaveList() {
  try {
    yield openLoader();
    const response = yield apiCall(
      apiGetCall,
      '/api/v1/leave/leave-list?pendingApproval=true',
    );
    if (response.data) {
      yield put(
        fetchLeaveListFinished(assignColorsToLeaveTypes(response.data)),
      );
    } else {
      yield put(fetchLeaveListFinished(undefined, true));
    }
  } catch (error) {
    yield showSnackMessage('Failed to Fetch Leave Details');
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
      `/api/v1/leave/leave-request/${action.leaveRequestId}`,
    );
    if (response.data) {
      yield put(
        fetchEmployeeLeaveRequestFinished(
          assignColorToLeaveType(response.data),
        ),
      );
    } else {
      yield put(fetchEmployeeLeaveRequestFinished(undefined, true));
    }
  } catch (error) {
    yield showSnackMessage('Failed to Fetch Leave Details');
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
      `/api/v1/leave/leave-request/${action.leaveRequestId}`,
      action.action,
    );

    if (response.success) {
      //re-fetch with updated leave request data
      yield put(fetchEmployeeLeaveRequestAction(action.leaveRequestId));
      yield showSnackMessage('Successfully Submited');
    } else {
      yield showSnackMessage('Failed to Update Leave Request');
    }
  } catch (error) {
    yield showSnackMessage('Failed to Update Leave Request');
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
