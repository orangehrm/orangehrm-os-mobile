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
import {apiCall, apiGetCall, ApiResponse} from 'store/saga-effects/api';
import {
  openLoader,
  closeLoader,
  showSnackMessage,
} from 'store/saga-effects/globals';
import {TYPE_ERROR} from 'store/globals/types';
import {
  API_ENDPOINT_LEAVE_HOLIDAYS,
  API_ENDPOINT_LEAVE_WORK_WEEK,
  prepare,
} from 'services/endpoints';
import {
  getMessageAlongWithGenericErrors,
  getMessageAlongWithResponseErrors,
} from 'services/api';
import {
  FetchHolidaysAction,
  FETCH_HOLIDAYS,
  FETCH_WORK_WEEK,
  Holiday,
  WorkWeek,
} from 'store/leave/common-screens/types';
import {
  fetchHolidaysFinished,
  fetchWorkWeekFinished,
} from 'store/leave/common-screens/actions';

function* fetchHolidays(action: FetchHolidaysAction) {
  try {
    yield openLoader();
    const response: ApiResponse<Holiday[]> = yield apiCall(
      apiGetCall,
      prepare(
        API_ENDPOINT_LEAVE_HOLIDAYS,
        {},
        {fromDate: action.fromDate, toDate: action.toDate},
      ),
    );

    if (response.data) {
      yield put(fetchHolidaysFinished(response.data));
    } else {
      yield showSnackMessage(
        getMessageAlongWithResponseErrors(
          response,
          'Failed to Fetch Holidays.',
        ),
        TYPE_ERROR,
      );
    }
  } catch (error) {
    yield showSnackMessage(
      getMessageAlongWithGenericErrors(error, 'Failed to Fetch Holidays.'),
      TYPE_ERROR,
    );
  } finally {
    yield closeLoader();
  }
}

function* fetchWorkWeek() {
  try {
    yield openLoader();
    const response: ApiResponse<WorkWeek> = yield apiCall(
      apiGetCall,
      API_ENDPOINT_LEAVE_WORK_WEEK,
    );
    if (response.data) {
      yield put(fetchWorkWeekFinished(response.data));
    } else {
      yield showSnackMessage(
        getMessageAlongWithResponseErrors(
          response,
          'Failed to Fetch WorkWeek.',
        ),
        TYPE_ERROR,
      );
    }
  } catch (error) {
    yield showSnackMessage(
      getMessageAlongWithGenericErrors(error, 'Failed to Fetch WorkWeek.'),
      TYPE_ERROR,
    );
  } finally {
    yield closeLoader();
  }
}

export function* watchCommonScreensActions() {
  yield takeEvery(FETCH_HOLIDAYS, fetchHolidays);
  yield takeEvery(FETCH_WORK_WEEK, fetchWorkWeek);
}
