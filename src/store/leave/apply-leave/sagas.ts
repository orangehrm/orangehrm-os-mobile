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
import {apiCall, apiPostCall} from 'store/saga-effects/api';
import {
  openLoader,
  closeLoader,
  showSnackMessage,
} from 'store/saga-effects/globals';
import {
  APPLY_SINGLE_DAY_LEAVE_REQUEST,
  APPLY_MULTIPLE_DAY_LEAVE_REQUEST,
  ApplySingleDayLeaveRequestAction,
  ApplyMultipleDayLeaveRequestAction,
} from 'store/leave/apply-leave/types';
import {
  fetchMyLeaveEntitlements,
  resethMyLeaveRequests,
} from 'store/leave/leave-usage/actions';
import {resetApplyLeave} from 'store/leave/apply-leave/actions';
import {TYPE_ERROR} from 'store/globals/types';
import {API_ENDPOINT_LEAVE_MY_LEAVE_REQUEST} from 'services/endpoints';
import {
  getMessageAlongWithGenericErrors,
  getMessageAlongWithResponseErrors,
} from 'services/api';
import {navigate} from 'lib/helpers/navigation';
import {LEAVE_REQUEST_SUCCESS} from 'screens';
import {LeaveRequestSuccessParam} from 'screens/leave/navigators';

function* saveLeaveRequest(
  action: ApplySingleDayLeaveRequestAction | ApplyMultipleDayLeaveRequestAction,
) {
  try {
    yield openLoader();
    const response = yield apiCall(
      apiPostCall,
      API_ENDPOINT_LEAVE_MY_LEAVE_REQUEST,
      action.payload,
    );

    if (response.success) {
      yield put(fetchMyLeaveEntitlements());
      yield put(resethMyLeaveRequests());
      yield put(resetApplyLeave());
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

export function* watchApplyLeaveActions() {
  yield takeEvery(APPLY_SINGLE_DAY_LEAVE_REQUEST, saveLeaveRequest);
  yield takeEvery(APPLY_MULTIPLE_DAY_LEAVE_REQUEST, saveLeaveRequest);
}
