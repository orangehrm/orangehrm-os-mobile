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
import {apiCall, apiGetCall, apiPutCall} from 'store/saga-effects/api';
import {
  openLoader,
  closeLoader,
  showSnackMessage,
} from 'store/saga-effects/globals';
import {
  FETCH_MY_LEAVE_ENTITLEMENT,
  FETCH_MY_LEAVE_REQUEST,
  FETCH_MY_LEAVE_DETAILS,
  CHANGE_MY_LEAVE_REQUEST_STATUS,
  FetchMyLeaveRequestDetailsAction,
  ChangeMyLeaveRequestStatusAction,
} from 'store/leave/leave-usage/types';
import {
  fetchMyLeaveEntitlementsFinished,
  fetchMyLeaveRequestsFinished,
  fetchMyLeaveDetailsFinished,
  fetchMyLeaveDetails as fetchMyLeaveDetailsAction,
  setErrorMessage,
} from 'store/leave/leave-usage/actions';
import {setErrorMessage as setApplyLeaveErrorMessage} from 'store/leave/apply-leave/actions';
import {
  assignColorsToLeaveTypes,
  assignColorToLeaveType,
} from 'lib/helpers/leave';
import {TYPE_ERROR} from 'store/globals/types';
import {
  API_ENDPOINT_LEAVE_MY_LEAVE_ENTITLEMENT,
  API_ENDPOINT_LEAVE_MY_LEAVE_REQUEST,
  API_ENDPOINT_LEAVE_REQUEST_DETAILS,
  prepare,
} from 'services/endpoints';
import {
  getMessageAlongWithGenericErrors,
  getMessageAlongWithResponseErrors,
  HTTP_NOT_FOUND,
} from 'services/api';
import {ACTION_TYPE_CHANGE_STATUS} from 'store/leave/leave-list/types';

function* fetchMyLeaveEntitlements() {
  try {
    yield openLoader();
    const response = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_LEAVE_MY_LEAVE_ENTITLEMENT, {}, {model: 'summary'}),
    );
    // clear error messages
    yield put(setErrorMessage());
    yield put(setApplyLeaveErrorMessage());
    if (response.data) {
      yield put(
        fetchMyLeaveEntitlementsFinished(
          assignColorsToLeaveTypes(response.data),
        ),
      );
    } else {
      if (response.getResponse().status === HTTP_NOT_FOUND) {
        yield put(fetchMyLeaveEntitlementsFinished([]));
        const message =
          'There Are No Entitlement Added, Please Contact Your System Administrator.';
        yield put(setErrorMessage(message));
        yield put(setApplyLeaveErrorMessage(message));
      } else if (response.error[0] === 'No Leave Types Defined.') {
        const message =
          'There Are No Leave Types Defined, Please Contact Your System Administrator.';
        yield put(setErrorMessage(message));
        yield put(setApplyLeaveErrorMessage(message));
      } else if (
        response.error[0] !== 'Leave Period Start Date Is Not Defined.'
      ) {
        yield put(fetchMyLeaveEntitlementsFinished(undefined, true));
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
    yield put(fetchMyLeaveEntitlementsFinished(undefined, true));
  } finally {
    yield closeLoader();
  }
}

function* fetchMyLeaveRequests() {
  try {
    yield openLoader();
    const response = yield apiCall(
      apiGetCall,
      API_ENDPOINT_LEAVE_MY_LEAVE_REQUEST,
      false,
    );
    if (response.data) {
      yield put(
        fetchMyLeaveRequestsFinished(assignColorsToLeaveTypes(response.data)),
      );
    } else {
      if (response.getResponse().status === HTTP_NOT_FOUND) {
        yield put(fetchMyLeaveRequestsFinished([]));
      } else {
        yield put(fetchMyLeaveRequestsFinished(undefined, true));
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
    yield put(fetchMyLeaveRequestsFinished(undefined, true));
  } finally {
    yield closeLoader();
  }
}

function* fetchMyLeaveDetails(action: FetchMyLeaveRequestDetailsAction) {
  try {
    yield openLoader();
    const response = yield apiCall(
      apiGetCall,
      prepare(
        API_ENDPOINT_LEAVE_REQUEST_DETAILS,
        {id: action.leaveRequestId},
        {model: 'detailed'},
      ),
    );
    if (response.data) {
      yield put(
        fetchMyLeaveDetailsFinished(assignColorToLeaveType(response.data)),
      );
    } else {
      yield put(fetchMyLeaveDetailsFinished(undefined, true));
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
    yield put(fetchMyLeaveDetailsFinished(undefined, true));
  } finally {
    yield closeLoader();
  }
}

function* changeMyLeaveRequestStatus(action: ChangeMyLeaveRequestStatusAction) {
  try {
    yield openLoader();
    const response = yield apiCall(
      apiPutCall,
      prepare(API_ENDPOINT_LEAVE_REQUEST_DETAILS, {id: action.leaveRequestId}),
      {action: action.action.status},
    );

    if (response.data) {
      //re-fetch with updated leave request data
      yield put(fetchMyLeaveDetailsAction(action.leaveRequestId));
      yield showSnackMessage(
        action.action.actionType === ACTION_TYPE_CHANGE_STATUS
          ? 'Successfully Updated'
          : 'Successfully Saved',
      );
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

export function* watchLeaveUsageActions() {
  yield takeEvery(FETCH_MY_LEAVE_ENTITLEMENT, fetchMyLeaveEntitlements);
  yield takeEvery(FETCH_MY_LEAVE_REQUEST, fetchMyLeaveRequests);
  yield takeEvery(FETCH_MY_LEAVE_DETAILS, fetchMyLeaveDetails);
  yield takeEvery(CHANGE_MY_LEAVE_REQUEST_STATUS, changeMyLeaveRequestStatus);
}
