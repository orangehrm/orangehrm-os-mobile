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

import {
  PUNCH_REQUEST_SUCCESS,
  ATTENDANCE_DETAILS,
  ATTENDANCE_SUMMARY,
  EMPLOYEE_ATTENDANCE_SUMMARY,
} from 'screens';
import {SingleEmployeeAttendance} from 'store/time/attendance/types';
import {RouteProp} from '@react-navigation/native';
import {Moment} from 'moment';

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
  selectedDate?: Moment;
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
