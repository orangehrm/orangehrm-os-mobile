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
  ApiResponse,
} from 'store/saga-effects/api';
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
  FETCH_WORK_SHIFT,
  FETCH_LEAVE_TYPES,
  AssignSingleDayLeaveRequestAction,
  AssignMultipleDayLeaveRequestAction,
  FetchSubordinateLeaveEntitlementAction,
  FetchWorkShiftAction,
  FetchLeaveTypesAction,
  FetchSubordinatesAction,
  Subordinate,
} from 'store/leave/assign-leave/types';
import {
  resetAssignLeaveWithoutSubordinates,
  fetchSubordinateLeaveEntitlementsFinished,
  fetchSubordinatesFinished,
  fetchWorkShiftFinished,
  fetchLeaveTypesFinished,
  setErrorMessage,
} from 'store/leave/assign-leave/actions';
import {resetLeaveList} from 'store/leave/leave-list/actions';
import {
  assignColorsToLeaveTypes,
  assignColorsToLeaveTypeArray,
} from 'lib/helpers/leave';
import {TYPE_ERROR, TYPE_WARN} from 'store/globals/types';
import {
  API_ENDPOINT_SUBORDINATE_LEAVE_REQUEST,
  API_ENDPOINT_SUBORDINATE_LEAVE_ENTITLEMENT,
  API_ENDPOINT_EMPLOYEES,
  API_ENDPOINT_LEAVE_WORK_SHIFT,
  API_ENDPOINT_LEAVE_TYPES,
  prepare,
} from 'services/endpoints';
import {
  getMessageAlongWithGenericErrors,
  getMessageAlongWithResponseErrors,
} from 'services/api';
import {navigate} from 'lib/helpers/navigation';
import {LEAVE_REQUEST_SUCCESS} from 'screens';
import {LeaveRequestSuccessParam} from 'screens/leave/navigators';
import {LeaveRequestModel, WorkShift} from 'store/leave/common-screens/types';
import {LeaveType} from 'store/leave/leave-list/types';
import {EntitlementSummaryModel} from '../leave-usage/types';

function* saveLeaveRequest(
  action:
    | AssignSingleDayLeaveRequestAction
    | AssignMultipleDayLeaveRequestAction,
) {
  try {
    yield openLoader();
    const response: ApiResponse<LeaveRequestModel> = yield apiCall(
      apiPostCall,
      API_ENDPOINT_SUBORDINATE_LEAVE_REQUEST,
      {
        ...action.payload,
        empNumber: action.empNumber,
      },
    );

    if (response.data) {
      yield put(resetAssignLeaveWithoutSubordinates());
      yield put(resetLeaveList());
      navigate<LeaveRequestSuccessParam>(LEAVE_REQUEST_SUCCESS);
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
    const response: ApiResponse<EntitlementSummaryModel[]> = yield apiCall(
      apiGetCall,
      prepare(
        API_ENDPOINT_SUBORDINATE_LEAVE_ENTITLEMENT,
        {},
        {model: 'summary', empNumber: action.empNumber},
      ),
    );

    // clear error messages
    yield put(setErrorMessage());
    if (response.data) {
      yield put(
        fetchSubordinateLeaveEntitlementsFinished(
          assignColorsToLeaveTypes(response.data),
        ),
      );
    }
    // TODO::  handle errors
    // else if (response.error[0] === 'No Leave Types Defined.') {
    //   yield put(
    //     setErrorMessage(
    //       'There Are No Leave Types Defined, Please Contact Your System Administrator.',
    //     ),
    //   );
    // }
    else {
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

function* fetchAccessibleEmployees(action: FetchSubordinatesAction) {
  try {
    yield openLoader();
    if (action.nameOrId === '') {
      yield put(fetchSubordinatesFinished([]));
      return;
    }
    const response: ApiResponse<Subordinate[]> = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_EMPLOYEES, {}, {nameOrId: action.nameOrId}),
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

function* fetchWorkShift(action: FetchWorkShiftAction) {
  try {
    yield openLoader();
    const response: ApiResponse<WorkShift, {empNumber: number}> = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_LEAVE_WORK_SHIFT, {empNumber: action.empNumber}),
    );

    if (response.data) {
      yield put(fetchWorkShiftFinished(response.data));
    } else {
      yield showSnackMessage('Failed to Load Work Shift.', TYPE_WARN);
    }
  } catch (error) {
    yield showSnackMessage('Failed to Load Work Shift.', TYPE_WARN);
  } finally {
    yield closeLoader();
  }
}

function* fetchLeaveTypes(_action: FetchLeaveTypesAction) {
  try {
    yield openLoader();
    const response: ApiResponse<LeaveType[]> = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_LEAVE_TYPES),
    );

    if (response.data) {
      yield put(
        fetchLeaveTypesFinished(assignColorsToLeaveTypeArray(response.data)),
      );
    } else {
      yield showSnackMessage('Failed to Load Leave Types.', TYPE_WARN);
    }
  } catch (error) {
    yield showSnackMessage('Failed to Load Leave Types.', TYPE_WARN);
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
  yield takeEvery(FETCH_WORK_SHIFT, fetchWorkShift);
  yield takeEvery(FETCH_LEAVE_TYPES, fetchLeaveTypes);
}
