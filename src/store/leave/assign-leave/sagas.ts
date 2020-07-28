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
  ASSIGN_SINGLE_DAY_LEAVE_REQUEST,
  ASSIGN_MULTIPLE_DAY_LEAVE_REQUEST,
  FETCH_SUBORDINATE_LEAVE_ENTITLEMENT,
  FETCH_SUBORDINATES,
  AssignSingleDayLeaveRequestAction,
  AssignMultipleDayLeaveRequestAction,
  FetchSubordinateLeaveEntitlementAction,
} from 'store/leave/assign-leave/types';
import {
  resetAssignLeaveWithoutSubordinates,
  fetchSubordinateLeaveEntitlementsFinished,
  fetchSubordinatesFinished,
} from 'store/leave/assign-leave/actions';
import {resetLeaveList} from 'store/leave/leave-list/actions';
import {assignColorsToLeaveTypes} from 'lib/helpers/leave';
import {TYPE_ERROR} from 'store/globals/types';
import {
  getMessageAlongWithGenericErrors,
  getMessageAlongWithResponseErrors,
  HTTP_NOT_FOUND,
} from 'services/api';

function* saveLeaveRequest(
  action:
    | AssignSingleDayLeaveRequestAction
    | AssignMultipleDayLeaveRequestAction,
) {
  try {
    yield openLoader();
    const response = yield apiCall(
      apiPostCall,
      `/api/v1/subordinate/${action.empNumber}/leave-request`,
      action.payload,
    );

    if (response.success) {
      yield put(resetAssignLeaveWithoutSubordinates());
      yield put(resetLeaveList());
      yield showSnackMessage('Successfully Submited');
    } else {
      yield showSnackMessage(
        getMessageAlongWithResponseErrors(response, 'Failed to Save Leave'),
        TYPE_ERROR,
      );
    }
  } catch (error) {
    yield showSnackMessage(
      getMessageAlongWithGenericErrors(error, 'Failed to Save Leave'),
      TYPE_ERROR,
    );
  } finally {
    yield closeLoader();
  }
}

function* fetchSubordinateLeaveEntitlements(
  action: FetchSubordinateLeaveEntitlementAction,
) {
  try {
    yield openLoader();
    const response = yield apiCall(
      apiGetCall,
      `/api/v1/subordinate/${action.empNumber}/leave-entitlement`,
    );
    if (response.data) {
      yield put(
        fetchSubordinateLeaveEntitlementsFinished(
          assignColorsToLeaveTypes(response.data),
        ),
      );
    } else if (response.error.status === HTTP_NOT_FOUND) {
      yield put(fetchSubordinateLeaveEntitlementsFinished([]));
    } else {
      yield put(fetchSubordinateLeaveEntitlementsFinished(undefined, true));
      yield showSnackMessage(
        getMessageAlongWithResponseErrors(
          response,
          'Failed to Fetch Subordinate Leave Entitlements.',
        ),
        TYPE_ERROR,
      );
    }
  } catch (error) {
    yield showSnackMessage(
      getMessageAlongWithGenericErrors(
        error,
        'Failed to Fetch Subordinate Leave Entitlements',
      ),
      TYPE_ERROR,
    );
    yield put(fetchSubordinateLeaveEntitlementsFinished(undefined, true));
  } finally {
    yield closeLoader();
  }
}

function* fetchAccessibleEmployees() {
  try {
    yield openLoader();
    const queryParams =
      'actionName=assign_leave&properties[]=firstName&properties[]=lastName&properties[]=employeeId';
    const response = yield apiCall(
      apiGetCall,
      `/api/v1/employees?${queryParams}`,
    );
    if (response.data) {
      yield put(fetchSubordinatesFinished(response.data));
    } else {
      yield put(fetchSubordinatesFinished(undefined, true));
      yield showSnackMessage(
        getMessageAlongWithResponseErrors(
          response,
          'Failed to Fetch Subordinates',
        ),
        TYPE_ERROR,
      );
    }
  } catch (error) {
    yield showSnackMessage(
      getMessageAlongWithGenericErrors(error, 'Failed to Fetch Subordinates'),
      TYPE_ERROR,
    );
    yield put(fetchSubordinatesFinished(undefined, true));
  } finally {
    yield closeLoader();
  }
}

export function* watchAssignLeaveActions() {
  yield takeEvery(ASSIGN_SINGLE_DAY_LEAVE_REQUEST, saveLeaveRequest);
  yield takeEvery(ASSIGN_MULTIPLE_DAY_LEAVE_REQUEST, saveLeaveRequest);
  yield takeEvery(
    FETCH_SUBORDINATE_LEAVE_ENTITLEMENT,
    fetchSubordinateLeaveEntitlements,
  );
  yield takeEvery(FETCH_SUBORDINATES, fetchAccessibleEmployees);
}
