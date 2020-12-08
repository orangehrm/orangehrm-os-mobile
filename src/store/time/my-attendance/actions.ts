import {
  FETCH_ATTENDANCE_RECORDS,
  FETCH_LEAVE_RECORDS,
  FETCH_ATTENDANCE_GRAPH_RECORDS,
  FETCH_ATTENDANCE_RECORDS_FINISHED,
  FETCH_LEAVE_RECORDS_FINISHED,
  FETCH_ATTENDANCE_GRAPH_RECORDS_FINISHED,
  FetchAttendanceRecordsAction,
  FetchAttendanceRecordsFinishedAction,
  FetchLeaveRecordsAction,
  FetchLeaveRecordsFinishedAction,
  FetchAttendanceGraphRecordsAction,
  FetchAttendanceGraphRecordsFinishedAction,
  LeaveObject,
  AttendanceRequest,
  GraphRecordsObject,
} from './types';
import {$PropertyType} from 'utility-types';

export const fetchAttendanceRecords = (
  payload: AttendanceRequest,
): FetchAttendanceRecordsAction => ({
  type: FETCH_ATTENDANCE_RECORDS,
  payload,
});

export const fetchAttendanceRecordsFinished = (
  payload?: $PropertyType<FetchAttendanceRecordsFinishedAction, 'payload'>,
  error: boolean = false,
): FetchAttendanceRecordsFinishedAction => ({
  type: FETCH_ATTENDANCE_RECORDS_FINISHED,
  payload,
  error,
});

export const fetchLeaveRecords = (
  payload: $PropertyType<FetchLeaveRecordsAction, 'payload'>,
): FetchLeaveRecordsAction => ({
  type: FETCH_LEAVE_RECORDS,
  payload,
});

export const fetchLeaveRecordsFinished = (
  payload?: LeaveObject[],
  error: boolean = false,
): FetchLeaveRecordsFinishedAction => ({
  type: FETCH_LEAVE_RECORDS_FINISHED,
  payload,
  error,
});

export const fetchAttendanceGraphRecords = (
  payload: $PropertyType<FetchAttendanceGraphRecordsAction, 'payload'>,
): FetchAttendanceGraphRecordsAction => ({
  type: FETCH_ATTENDANCE_GRAPH_RECORDS,
  payload,
});

export const fetchAttendanceGraphRecordsFinished = (
  payload?: GraphRecordsObject,
  error: boolean = false,
): FetchAttendanceGraphRecordsFinishedAction => ({
  type: FETCH_ATTENDANCE_GRAPH_RECORDS_FINISHED,
  payload,
  error,
});
