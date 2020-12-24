import {takeEvery, put} from 'redux-saga/effects';
import {apiCall, apiGetCall} from 'store/saga-effects/api';
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
  FetchAttendanceConfigurationAction,
  FETCH_ATTENDANCE_GRAPH_RECORDS,
  FETCH_LEAVE_RECORDS,
  FETCH_ATTENDANCE_RECORDS,
  FETCH_HOLIDAYS,
  FETCH_WORK_WEEK,
  FETCH_EMPLOYEE_ATTENDANCE_LIST,
  FETCH_SUBORDINATES,
  FETCH_ATTENDANCE_CONFIGURATION,
  FETCH_ATTENDANCE_CONFIGURATION_FINISHED,
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
  API_ENDPOINT_ATTENDANCE,
  API_ENDPOINT_LEAVE,
  API_ENDPOINT_ATTENDANCE_GRAPH,
  API_ENDPOINT_LEAVE_HOLIDAYS,
  API_ENDPOINT_LEAVE_WORK_WEEK,
  API_ENDPOINT_ATTENDANCE_LIST,
  API_ENDPOINT_EMPLOYEES,
  API_ENDPOINT_ATTENDANCE_CONFIGURATION,
  prepare,
} from 'services/endpoints';
import {
  getMessageAlongWithGenericErrors,
  getMessageAlongWithResponseErrors,
  HTTP_NOT_FOUND,
} from 'services/api';
import {TYPE_ERROR} from 'store/globals/types';

function* fetchAttendanceRecords(action: FetchAttendanceRecordsAction) {
  try {
    yield openLoader();
    const response = yield apiCall(
      apiGetCall,
      prepare(
        API_ENDPOINT_ATTENDANCE,
        {},
        {
          fromDate: action.payload.fromDate,
          toDate: action.payload.toDate,
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
    const response = yield apiCall(
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

    const response = yield apiCall(
      apiGetCall,
      prepare(
        API_ENDPOINT_ATTENDANCE_GRAPH,
        {},
        {
          fromDate: action.payload.fromDate + ' 00:00:00',
          toDate: action.payload.toDate + ' 23:59:59',
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
      yield put(fetchAttendanceGraphRecordsFinished(response.data));
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
    const response = yield apiCall(
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
    const response = yield apiCall(apiGetCall, API_ENDPOINT_LEAVE_WORK_WEEK);
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
    const response = yield apiCall(
      apiGetCall,
      prepare(
        API_ENDPOINT_ATTENDANCE_LIST,
        {},
        {
          fromDate: action.payload.fromDate,
          toDate: action.payload.toDate,
          ...(action.payload.empNumber !== undefined && {
            empNumber: action.payload.empNumber,
          }),
          ...(action.payload.pastEmployee !== undefined && {
            empNumber: action.payload.pastEmployee,
          }),
          all: true,
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

function* fetchAttendanceConfiguration(
  action: FetchAttendanceConfigurationAction,
) {
  try {
    yield openLoader();
    const response = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_ATTENDANCE_CONFIGURATION),
    );
    if (response.data) {
      console.log(response.data.startDate);
      yield put(fetchAttendanceConfigurationFinished(response.data));
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
    yield closeLoader();
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
