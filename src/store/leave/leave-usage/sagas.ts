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
import {apiCall, apiGetCall} from 'store/saga-effects/api';
import {
  openLoader,
  closeLoader,
  showSnackMessage,
} from 'store/saga-effects/globals';
import {FETCH_MY_LEAVE} from 'store/leave/leave-usage/types';
import {fetchMyLeaveFinished} from 'store/leave/leave-usage/actions';
import {assignColorsToLeaveTypes} from 'lib/helpers/leave';

function* fetchMyLeave() {
  try {
    yield openLoader();
    const response = yield apiCall(apiGetCall, '/api/v1/leave/my-leave');
    if (response.data) {
      yield put(fetchMyLeaveFinished(assignColorsToLeaveTypes(response.data)));
    } else {
      yield put(fetchMyLeaveFinished(undefined, true));
    }
  } catch (error) {
    yield showSnackMessage('Failed to Fetch Leave Details');
    yield put(fetchMyLeaveFinished(undefined, true));
  } finally {
    yield closeLoader();
  }
}

export function* watchLeaveUsageActions() {
  yield takeEvery(FETCH_MY_LEAVE, fetchMyLeave);
}
