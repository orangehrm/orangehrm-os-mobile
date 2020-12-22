import {
  PUNCH_REQUEST_SUCCESS,
  ATTENDANCE_DETAILS,
  ATTENDANCE_SUMMARY,
  EMPLOYEE_ATTENDANCE_SUMMARY,
} from 'screens';
import {SingleEmployeeAttendance} from 'store/time/attendance/types';
import {RouteProp} from '@react-navigation/native';

export interface PunchRequestSuccessParam {
  success: string;
  id: number;
  punchInDateTime: string;
  punchInTimeZoneOffset: string;
  punchInNote: string;
  punchOutDateTime: string;
  punchOutTimeZoneOffset: string;
  punchOutNote: string;
  datetime: string;
  note: string;
  timezoneOffset: string;
}

export type PunchRequestSuccessParamList = {
  [PUNCH_REQUEST_SUCCESS]: PunchRequestSuccessParam;
};

export type PunchRequestSuccessRouteParams = RouteProp<
  PunchRequestSuccessParamList,
  typeof PUNCH_REQUEST_SUCCESS
>;

export interface AttendanceDetailsScreenParam {
  startDayIndex: number;
  employeeAttendance?: SingleEmployeeAttendance;
  employeeName?: string;
  selectedDate?: moment.Moment;
}

export type AttendanceDetailsScreenParamList = {
  [ATTENDANCE_DETAILS]: AttendanceDetailsScreenParam;
};

export type AttendanceDetailsScreenRouteParams = RouteProp<
  AttendanceDetailsScreenParamList,
  typeof ATTENDANCE_DETAILS
>;

export interface AttendanceSummaryScreenParams {
  employeeAttendance?: SingleEmployeeAttendance;
  startDayIndex: number;
  endDayIndex: number;
}

export type AttendanceSummaryScreenParamList = {
  [ATTENDANCE_SUMMARY]: AttendanceSummaryScreenParams;
};

export type AttendanceSummaryScreenRouteParams = RouteProp<
  AttendanceSummaryScreenParamList,
  typeof ATTENDANCE_SUMMARY
>;

export type EmployeeAttendanceSummaryScreenParamList = {
  [EMPLOYEE_ATTENDANCE_SUMMARY]: AttendanceSummaryScreenParams;
};

export type EmployeeAttendanceSummaryScreenRouteParams = RouteProp<
  EmployeeAttendanceSummaryScreenParamList,
  typeof EMPLOYEE_ATTENDANCE_SUMMARY
>;
