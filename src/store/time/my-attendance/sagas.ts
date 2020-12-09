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
  FETCH_ATTENDANCE_GRAPH_RECORDS,
  FETCH_LEAVE_RECORDS,
  FETCH_ATTENDANCE_RECORDS,
} from './types';
import {
  fetchAttendanceRecordsFinished,
  fetchLeaveRecordsFinished,
  fetchAttendanceGraphRecordsFinished,
} from './actions';
import {
  API_ENDPOINT_ATTENDANCE,
  API_ENDPOINT_LEAVE,
  API_ENDPOINT_ATTENDANCE_GRAPH,
  prepare,
} from 'services/endpoints';
import {
  getMessageAlongWithGenericErrors,
  getMessageAlongWithResponseErrors,
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
        {fromDate: action.payload.fromDate, toDate: action.payload.toDate},
      ),
    );

    if (response.data) {
      yield put(fetchAttendanceRecordsFinished(response.data));
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
          pendingApproval: 'true',
          scheduled: 'true',
          taken: 'true',
        },
      ),
    );
    if (response.data) {
      yield put(fetchLeaveRecordsFinished(response.data));
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
          fromDate: action.payload.fromDate,
          toDate: action.payload.toDate,
          pendingApproval: 'true',
          scheduled: 'true',
          taken: 'true',
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

export function* watchMyAttendanceActions() {
  yield takeEvery(FETCH_LEAVE_RECORDS, fetchLeaveRecords);
  yield takeEvery(FETCH_ATTENDANCE_RECORDS, fetchAttendanceRecords);
  yield takeEvery(FETCH_ATTENDANCE_GRAPH_RECORDS, fetchAttendanceGraphRecords);
}
