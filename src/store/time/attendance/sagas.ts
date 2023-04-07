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
import {selectMyInfo} from 'store/saga-effects/auth';
import {MyInfo, USER_ROLE_ADMIN} from 'store/auth/types';
import {
  selectAttendanceConfiguration,
  selectAttendanceConfigurationFetched,
} from 'store/time/attendance/selectors';
import {AttendanceObject} from './types';
import {Holiday, WorkWeek} from '../../leave/common-screens/types';
import {getDatesStringKey} from 'lib/helpers/attendance';

function* fetchAttendanceRecords(action: FetchAttendanceRecordsAction) {
  console.log('attendance records');
  try {
    yield openLoader();
    const response: ApiResponse<AttendanceObject, {}> = yield apiCall(
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

    console.log(response);

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
    console.log(error, '787878787878');
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
  console.log('leave Records');
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
  console.log('attendance graph');
  try {
    yield openLoader();

    const response: ApiResponse<GraphRecordsObject> = yield apiCall(
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

    const response1: ApiResponse<WorkSummaryObject> = yield apiCall(
      apiGetCall,
      prepare(
        API_ENDPOINT_ATTENDANCE_WORK_SUMMARY,
        {},
        {
          timezoneOffset: 5.5,
          currentDate: action.payload.fromDate,
          currentTime: '00:00',
          ...(action.payload.empNumber && {
            empNumber: action.payload.empNumber,
          }),
        },
      ),
    );

    const graphData: any = response.data;
    const workWeekData: any = response1.data;

    if (graphData) {
      const arr1: any = [];
      graphData?.map((item: any) => {
        const obj = {
          typeId: item.leaveType.id,
          type: item.leaveType.name,
          hours: item.noOfDays * 8,
        };
        arr1.push(obj);
      });

      console.log(response.data);
      console.log(response1.data);

      if (response1.data) {
        const object = {
          [getDatesStringKey(workWeekData[0].workDay.day)]: {
            workHours: workWeekData[0].totalTime.hours,
            leave: [],
          },
          [getDatesStringKey(workWeekData[1].workDay.day)]: {
            workHours: workWeekData[1].totalTime.hours,
            leave: [],
          },
          [getDatesStringKey(workWeekData[2].workDay.day)]: {
            workHours: workWeekData[2].totalTime.hours,
            leave: [],
          },
          [getDatesStringKey(workWeekData[3].workDay.day)]: {
            workHours: workWeekData[3].totalTime.hours,
            leave: [],
          },
          [getDatesStringKey(workWeekData[4].workDay.day)]: {
            workHours: workWeekData[4].totalTime.hours,
            leave: [],
          },
          [getDatesStringKey(workWeekData[5].workDay.day)]: {
            workHours: workWeekData[5].totalTime.hours,
            leave: [],
          },
          [getDatesStringKey(workWeekData[6].workDay.day)]: {
            workHours: workWeekData[6].totalTime.hours,
            leave: [],
          },
        };

        console.log(object, 'dfdfdfdffdf');
        const data = {
          totalWorkHours: '7.95',
          totalLeaveHours: '12.00',
          totalLeaveTypeHours: arr1,
          workSummary: object,
        };

        console.log(data, '999999');
        if (data) {
          yield put(fetchAttendanceGraphRecordsFinished(data));
        } else {
          yield put(fetchAttendanceGraphRecordsFinished(undefined, true));
          yield showSnackMessage(
            getMessageAlongWithResponseErrors(
              response,
              'Failed to Fetch Leave Details',
            ),
            TYPE_ERROR,
          );
        }
      }
    }

    // console.log(action.payload);
    console.log(response);

    console.log(response1);
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
  console.log('employeeAttendance');
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

    console.log(response);
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
    console.log(error);
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
    const response = yield apiCall(
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
  console.log('config');
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

    console.log('111');

    yield openLoader();
    const response: ApiResponse<AttendanceConfiguration> = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_ATTENDANCE_CONFIGURATION),
    );

    console.log(response, '222222222222222222222222222222222');
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
    console.log(error);
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
