import {
  FETCH_ATTENDANCE_RECORDS,
  FETCH_LEAVE_RECORDS,
  FETCH_ATTENDANCE_GRAPH_RECORDS,
  FETCH_ATTENDANCE_RECORDS_FINISHED,
  FETCH_LEAVE_RECORDS_FINISHED,
  FETCH_ATTENDANCE_GRAPH_RECORDS_FINISHED,
  FETCH_HOLIDAYS,
  FETCH_HOLIDAYS_FINISHED,
  FETCH_WORK_WEEK,
  FETCH_WORK_WEEK_FINISHED,
  FETCH_EMPLOYEE_ATTENDANCE_LIST,
  FETCH_EMPLOYEE_ATTENDANCE_LIST_FINISHED,
  FetchAttendanceRecordsAction,
  FetchAttendanceRecordsFinishedAction,
  FetchLeaveRecordsAction,
  FetchLeaveRecordsFinishedAction,
  FetchAttendanceGraphRecordsAction,
  FetchAttendanceGraphRecordsFinishedAction,
  FetchHolidaysAction,
  FetchHolidaysFinishedAction,
  FetchWorkWeekAction,
  FetchWorkWeekFinishedAction,
  FetchEmployeeAttendanceListAction,
  FetchEmployeeAttendanceListFinishedAction,
  LeaveObject,
  AttendanceRequest,
  GraphRecordsObject,
  SingleEmployeeAttendance,
} from './types';
import {$PropertyType} from 'utility-types';
import {Holiday, WorkWeek} from 'store/leave/common-screens/types';

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

export const fetchHolidays = (
  payload: $PropertyType<FetchHolidaysAction, 'payload'>,
): FetchHolidaysAction => ({
  type: FETCH_HOLIDAYS,
  payload,
});

export const fetchHolidaysFinished = (
  payload?: Holiday[],
  error: boolean = false,
): FetchHolidaysFinishedAction => ({
  type: FETCH_HOLIDAYS_FINISHED,
  payload,
  error,
});

export const fetchWorkWeek = (): FetchWorkWeekAction => ({
  type: FETCH_WORK_WEEK,
});

export const fetchWorkWeekFinished = (
  payload?: WorkWeek,
  error: boolean = false,
): FetchWorkWeekFinishedAction => ({
  type: FETCH_WORK_WEEK_FINISHED,
  payload,
  error,
});

export const fetchEmployeeAttendanceList = (
  payload: $PropertyType<FetchEmployeeAttendanceListAction, 'payload'>,
): FetchEmployeeAttendanceListAction => ({
  type: FETCH_EMPLOYEE_ATTENDANCE_LIST,
  payload,
});

export const fetchEmployeeAttendanceListFinished = (
  payload?: SingleEmployeeAttendance[],
  error: boolean = false,
): FetchEmployeeAttendanceListFinishedAction => ({
  type: FETCH_EMPLOYEE_ATTENDANCE_LIST_FINISHED,
  payload,
  error,
});
