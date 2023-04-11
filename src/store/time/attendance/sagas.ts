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

import {takeEvery, put, select} from 'redux-saga/effects';
import {apiCall, apiGetCall, ApiResponse} from 'store/saga-effects/api';
import {
  openLoader,
  closeLoader,
  showSnackMessage,
} from 'store/saga-effects/globals';
import {
  FetchAttendanceRecordsAction,
  FetchLeaveRecordsAction,
  FetchAttendanceGraphRecordsAction,
  FetchHolidaysAction,
  FetchEmployeeAttendanceListAction,
  FETCH_ATTENDANCE_GRAPH_RECORDS,
  FETCH_LEAVE_RECORDS,
  FETCH_ATTENDANCE_RECORDS,
  FETCH_HOLIDAYS,
  FETCH_WORK_WEEK,
  FETCH_EMPLOYEE_ATTENDANCE_LIST,
  FETCH_SUBORDINATES,
  FETCH_ATTENDANCE_CONFIGURATION,
  AttendanceConfiguration,
  LeaveObject,
  GraphRecordsObject,
  SingleEmployeeAttendance,
  WorkSummaryObject,
  EmployeeObject,
} from './types';
import {
  fetchAttendanceRecordsFinished,
  fetchLeaveRecordsFinished,
  fetchAttendanceGraphRecordsFinished,
  fetchHolidaysFinished,
  fetchWorkWeekFinished,
  fetchEmployeeAttendanceListFinished,
  fetchSubordinatesFinished,
  fetchAttendanceConfigurationFinished,
} from './actions';
import {
  API_ENDPOINT_LEAVE,
  API_ENDPOINT_ATTENDANCE_GRAPH,
  API_ENDPOINT_LEAVE_HOLIDAYS,
  API_ENDPOINT_LEAVE_WORK_WEEK,
  API_ENDPOINT_ATTENDANCE_LIST,
  API_ENDPOINT_EMPLOYEES,
  API_ENDPOINT_ATTENDANCE_CONFIGURATION,
  prepare,
  API_ENDPOINT_PUNCH_IN_OUT_REQUEST,
  API_ENDPOINT_ATTENDANCE_WORK_SUMMARY,
} from 'services/endpoints';
import {
  getMessageAlongWithGenericErrors,
  getMessageAlongWithResponseErrors,
  HTTP_NOT_FOUND,
} from 'services/api';
import {TYPE_ERROR} from 'store/globals/types';
import {
  selectAttendanceConfiguration,
  selectAttendanceConfigurationFetched,
} from 'store/time/attendance/selectors';
import {AttendanceObject} from './types';
import {Holiday, WorkWeek} from 'store/leave/common-screens/types';
import {getCurrentTimeZoneOffset, getGraphObject} from 'lib/helpers/attendance';

function* fetchAttendanceRecords(action: FetchAttendanceRecordsAction) {
  try {
    yield openLoader();
    const response: ApiResponse<AttendanceObject[]> = yield apiCall(
      apiGetCall,
      prepare(
        API_ENDPOINT_PUNCH_IN_OUT_REQUEST,
        {},
        {
          date: action.payload.fromDate,
          ...(action.payload.empNumber && {
            empNumber: action.payload.empNumber,
          }),
        },
      ),
    );

    if (response.data) {
      yield put(fetchAttendanceRecordsFinished(response.data));
    } else {
      if (response.getResponse().status === HTTP_NOT_FOUND) {
        yield put(fetchAttendanceRecordsFinished([]));
      } else {
        yield put(fetchAttendanceRecordsFinished(undefined, true));
        yield showSnackMessage(
          getMessageAlongWithResponseErrors(
            response,
            'Failed to Fetch Attendance Details',
          ),
          TYPE_ERROR,
        );
      }
    }
  } catch (error) {
    yield showSnackMessage(
      getMessageAlongWithGenericErrors(error, 'Failed to Fetch  Record'),
      TYPE_ERROR,
    );
    yield put(fetchAttendanceRecordsFinished(undefined, true));
  } finally {
    yield closeLoader();
  }
}

function* fetchLeaveRecords(action: FetchLeaveRecordsAction) {
  try {
    yield openLoader();
    const response: ApiResponse<LeaveObject[]> = yield apiCall(
      apiGetCall,
      prepare(
        API_ENDPOINT_LEAVE,
        {},
        {
          fromDate: action.payload.fromDate,
          toDate: action.payload.toDate,
          pendingApproval: true,
          scheduled: true,
          taken: true,
          ...(action.payload.empNumber && {
            empNumber: action.payload.empNumber,
          }),
        },
      ),
    );
    if (response.data) {
      yield put(fetchLeaveRecordsFinished(response.data));
    } else {
      if (response.getResponse().status === HTTP_NOT_FOUND) {
        yield put(fetchLeaveRecordsFinished([]));
      } else {
        yield put(fetchLeaveRecordsFinished(undefined, true));
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
      getMessageAlongWithGenericErrors(error, 'Failed to Fetch Record'),
      TYPE_ERROR,
    );
    yield put(fetchLeaveRecordsFinished(undefined, true));
  } finally {
    yield closeLoader();
  }
}

function* fetchAttendanceGraphRecords(
  action: FetchAttendanceGraphRecordsAction,
) {
  try {
    yield openLoader();

    const graphResponse: ApiResponse<GraphRecordsObject> = yield apiCall(
      apiGetCall,
      prepare(
        API_ENDPOINT_ATTENDANCE_GRAPH,
        {},
        {
          fromDate: action.payload.fromDate,
          toDate: action.payload.toDate,
          includeEmployees: 'onlyCurrent',
          statuses: ['1', '2', '3'],
          ...(action.payload.empNumber && {
            empNumber: action.payload.empNumber,
          }),
        },
      ),
    );

    const workWeekResponse: ApiResponse<WorkSummaryObject> = yield apiCall(
      apiGetCall,
      prepare(
        API_ENDPOINT_ATTENDANCE_WORK_SUMMARY,
        {},
        {
          timezoneOffset: getCurrentTimeZoneOffset(),
          currentDate: action.payload.fromDate,
          currentTime: '00:00',
          ...(action.payload.empNumber && {
            empNumber: action.payload.empNumber,
          }),
        },
      ),
    );

    const result = getGraphObject(graphResponse.data, workWeekResponse.data);

    if (result) {
      yield put(fetchAttendanceGraphRecordsFinished(result));
    } else {
      yield put(fetchAttendanceGraphRecordsFinished(undefined, true));
      yield showSnackMessage(
        getMessageAlongWithResponseErrors(
          result,
          'Failed to Fetch Leave Details',
        ),
        TYPE_ERROR,
      );
    }
  } catch (error) {
    yield showSnackMessage(
      getMessageAlongWithGenericErrors(error, 'Failed to Fetch Record'),
      TYPE_ERROR,
    );
    yield put(fetchAttendanceGraphRecordsFinished(undefined, true));
  } finally {
    yield closeLoader();
  }
}

function* fetchHolidays(action: FetchHolidaysAction) {
  try {
    yield openLoader();
    const response: ApiResponse<Holiday[]> = yield apiCall(
      apiGetCall,
      prepare(
        API_ENDPOINT_LEAVE_HOLIDAYS,
        {},
        {
          fromDate: action.payload.fromDate,
          toDate: action.payload.toDate,
        },
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

function* fetchEmployeeAttendanceList(
  action: FetchEmployeeAttendanceListAction,
) {
  try {
    yield openLoader();
    const response: ApiResponse<SingleEmployeeAttendance[]> = yield apiCall(
      apiGetCall,
      prepare(
        API_ENDPOINT_ATTENDANCE_LIST,
        {},
        {
          fromDate: action.payload.fromDate,
          toDate: action.payload.toDate,
        },
      ),
    );

    if (response.data) {
      yield put(fetchEmployeeAttendanceListFinished(response.data));
    } else {
      yield showSnackMessage(
        getMessageAlongWithResponseErrors(
          response,
          'Failed to Fetch Attendance List.',
        ),
        TYPE_ERROR,
      );
    }
  } catch (error) {
    yield showSnackMessage(
      getMessageAlongWithGenericErrors(
        error,
        'Failed to Fetch Attendance List.',
      ),
      TYPE_ERROR,
    );
  } finally {
    yield closeLoader();
  }
}

function* fetchAccessibleEmployees() {
  try {
    yield openLoader();
    const queryParams = {
      actionName: 'attendance_records',
      properties: ['firstName', 'lastName', 'employeeId'],
    };
    const response: ApiResponse<EmployeeObject[]> = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_EMPLOYEES, {}, queryParams),
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

function* fetchAttendanceConfiguration() {
  let attendanceConfigFetched: boolean = false;
  try {
    attendanceConfigFetched = yield select(
      selectAttendanceConfigurationFetched,
    );
    // To avoid unnecessary API fetches to get api configurations
    // Since the configurations does not change frequently
    if (attendanceConfigFetched) {
      const attendanceConfig: AttendanceConfiguration = yield select(
        selectAttendanceConfiguration,
      );
      yield put(fetchAttendanceConfigurationFinished({...attendanceConfig}));
      return;
    }

    yield openLoader();
    const response: ApiResponse<AttendanceConfiguration> = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_ATTENDANCE_CONFIGURATION),
    );

    if (response.data) {
      yield put(fetchAttendanceConfigurationFinished({startDate: 2}));
    } else {
      yield showSnackMessage(
        getMessageAlongWithResponseErrors(
          response,
          'Failed to Fetch Attendance Configuration.',
        ),
        TYPE_ERROR,
      );
    }
  } catch (error) {
    yield showSnackMessage(
      getMessageAlongWithGenericErrors(
        error,
        'Failed to Fetch Attendance Configuration.',
      ),
      TYPE_ERROR,
    );
  } finally {
    if (!attendanceConfigFetched) {
      yield closeLoader();
    }
  }
}

export function* watchAttendanceActions() {
  yield takeEvery(FETCH_LEAVE_RECORDS, fetchLeaveRecords);
  yield takeEvery(FETCH_ATTENDANCE_RECORDS, fetchAttendanceRecords);
  yield takeEvery(FETCH_ATTENDANCE_GRAPH_RECORDS, fetchAttendanceGraphRecords);
  yield takeEvery(FETCH_HOLIDAYS, fetchHolidays);
  yield takeEvery(FETCH_WORK_WEEK, fetchWorkWeek);
  yield takeEvery(FETCH_EMPLOYEE_ATTENDANCE_LIST, fetchEmployeeAttendanceList);
  yield takeEvery(FETCH_ATTENDANCE_CONFIGURATION, fetchAttendanceConfiguration);
  yield takeEvery(FETCH_SUBORDINATES, fetchAccessibleEmployees);
}
