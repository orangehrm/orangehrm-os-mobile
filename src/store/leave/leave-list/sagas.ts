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
  FETCH_LEAVE_LIST,
  FETCH_EMPLOYEE_LEAVES,
  FETCH_LEAVE_COMMENT,
  CHANGE_EMPLOYEE_LEAVE_REQUEST_STATUS,
  FetchEmployeeLeavesAction,
  ChangeEmployeeLeaveRequestStatusAction,
  FetchLeaveCommentAction,
  FetchEmployeeLeaveRequestDetailsAction,
  FETCH_EMPLOYEE_LEAVE_REQUEST_DETAILS,
  CHANGE_EMPLOYEE_LEAVE_REQUEST_COMMENT,
  ChangeEmployeeLeaveRequestCommentAction,
  LeaveDetailedModel,
  LeaveRequestCommentModel,
  LeaveRequestDetailedModel,
} from 'store/leave/leave-list/types';
import {
  fetchLeaveListFinished,
  fetchEmployeeLeaveRequestFinished,
  fetchEmployeeLeaveRequestDetailsFinished,
  fetchLeaveComments as fetchLeaveCommentAction,
  fetchEmployeeLeaveCommentFinished,
} from 'store/leave/leave-list/actions';
import {
  assignColorsToLeaveTypes,
  assignColorToLeaveType,
} from 'lib/helpers/leave';
import {TYPE_ERROR} from 'store/globals/types';
import {
  API_ENDPOINT_LEAVE_COMMENT,
  API_ENDPOINT_LEAVE_LIST,
  API_ENDPOINT_LEAVES,
  API_ENDPOINT_LEAVE_REQUEST_DETAILS,
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
    const response: ApiResponse<LeaveRequestDetailedModel[]> = yield apiCall(
      apiGetCall,
      API_ENDPOINT_LEAVE_LIST,
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

function* fetchEmployeeLeaveRequestDetails(
  action: FetchEmployeeLeaveRequestDetailsAction,
) {
  try {
    yield openLoader();
    const response: ApiResponse<LeaveRequestDetailedModel> = yield apiCall(
      apiGetCall,
      prepare(
        API_ENDPOINT_LEAVE_REQUEST_DETAILS,
        {leaveRequestId: action.leaveRequestId},
        {model: 'detailed'},
      ),
    );

    if (response.data) {
      yield put(
        fetchEmployeeLeaveRequestDetailsFinished(
          assignColorToLeaveType(response.data),
        ),
      );
    } else {
      yield put(fetchEmployeeLeaveRequestDetailsFinished(undefined, true));
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

function* fetchEmployeeLeaves(action: FetchEmployeeLeavesAction) {
  try {
    yield openLoader();
    const response: ApiResponse<LeaveDetailedModel[]> = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_LEAVES, {leaveRequestId: action.leaveRequestId}),
    );

    if (response.data) {
      yield put(fetchEmployeeLeaveRequestFinished(response.data));
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

function* fetchLeaveComment(action: FetchLeaveCommentAction) {
  try {
    yield openLoader();
    const response: ApiResponse<LeaveRequestCommentModel[]> = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_LEAVE_COMMENT, {
        leaveRequestId: action.leaveRequestId,
      }),
    );

    if (response.data) {
      yield put(fetchEmployeeLeaveCommentFinished(response.data));
    } else {
      yield put(fetchEmployeeLeaveCommentFinished(undefined, true));
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
    yield put(fetchEmployeeLeaveCommentFinished(undefined, true));
  } finally {
    yield closeLoader();
  }
}

function* changeEmployeeLeaveRequestStatus(
  action: ChangeEmployeeLeaveRequestStatusAction,
) {
  try {
    yield openLoader();

    const response: ApiResponse<LeaveRequestDetailedModel> = yield apiCall(
      apiPutCall,
      prepare(
        API_ENDPOINT_LEAVE_REQUEST_DETAILS,
        {leaveRequestId: action.leaveRequestId},
        {model: 'detailed'},
      ),
      {action: action.status},
    );

    if (response.data) {
      yield put(
        fetchEmployeeLeaveRequestDetailsFinished(
          assignColorToLeaveType(response.data),
        ),
      );
      yield showSnackMessage('Successfully Updated');
    } else {
      yield put(fetchEmployeeLeaveRequestDetailsFinished(undefined, true));
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

function* changeEmployeeLeaveRequestComment(
  action: ChangeEmployeeLeaveRequestCommentAction,
) {
  try {
    yield openLoader();
    const response: ApiResponse<LeaveRequestCommentModel> = yield apiCall(
      apiPostCall,
      prepare(API_ENDPOINT_LEAVE_COMMENT, {
        leaveRequestId: action.leaveRequestId,
      }),
      {comment: action.comment},
    );

    if (response.data) {
      //re-fetch with added leave comments
      yield put(fetchLeaveCommentAction(action.leaveRequestId));
      yield showSnackMessage('Successfully Saved');
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
  yield takeEvery(FETCH_EMPLOYEE_LEAVES, fetchEmployeeLeaves);
  yield takeEvery(
    FETCH_EMPLOYEE_LEAVE_REQUEST_DETAILS,
    fetchEmployeeLeaveRequestDetails,
  );
  yield takeEvery(FETCH_LEAVE_COMMENT, fetchLeaveComment);
  yield takeEvery(
    CHANGE_EMPLOYEE_LEAVE_REQUEST_STATUS,
    changeEmployeeLeaveRequestStatus,
  );
  yield takeEvery(
    CHANGE_EMPLOYEE_LEAVE_REQUEST_COMMENT,
    changeEmployeeLeaveRequestComment,
  );
}
