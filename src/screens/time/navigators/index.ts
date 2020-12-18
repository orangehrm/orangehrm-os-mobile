import {PUNCH_REQUEST_SUCCESS, ATTENDANCE_DETAILS} from 'screens';
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
}

export type AttendanceDetailsScreenParamList = {
  [ATTENDANCE_DETAILS]: AttendanceDetailsScreenParam;
};

export type AttendanceDetailsScreenRouteParams = RouteProp<
  AttendanceDetailsScreenParamList,
  typeof ATTENDANCE_DETAILS
>;
