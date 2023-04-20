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
  FETCH_SUBORDINATES,
  FETCH_SUBORDINATES_FINISHED,
  FETCH_ATTENDANCE_CONFIGURATION,
  FETCH_ATTENDANCE_CONFIGURATION_FINISHED,
  PICK_SUBORDINATE,
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
  FetchSubordinatesAction,
  FetchSubordinatesFinishedAction,
  FetchAttendanceConfigurationAction,
  FetchAttendanceConfigurationFinishedAction,
  AttendanceConfiguration,
  PickSubordinateAction,
  LeaveObject,
  AttendanceRequest,
  GraphRecordsObject,
  SingleEmployeeAttendance,
  FetchEmployeeJobDetailsAction,
  FETCH_EMPLOYEE_JOB_DETAILS,
  EmployeeJobDetails,
  FetchEmployeeJobDetailsFinishedAction,
  FETCH_EMPLOYEE_JOB_DETAILS_FINISHED,
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

export const fetchEmployeeJobDetailsFinished = (
  payload?: EmployeeJobDetails,
  error: boolean = false,
): FetchEmployeeJobDetailsFinishedAction => ({
  type: FETCH_EMPLOYEE_JOB_DETAILS_FINISHED,
  payload,
  error,
});

export const fetchAttendanceGraphRecords = (
  payload: $PropertyType<FetchAttendanceGraphRecordsAction, 'payload'>,
): FetchAttendanceGraphRecordsAction => ({
  type: FETCH_ATTENDANCE_GRAPH_RECORDS,
  payload,
});

export const fetchEmployeeJobDetails = (
  empNumber: number,
): FetchEmployeeJobDetailsAction => ({
  type: FETCH_EMPLOYEE_JOB_DETAILS,
  empNumber,
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

export const fetchAttendanceConfiguration =
  (): FetchAttendanceConfigurationAction => ({
    type: FETCH_ATTENDANCE_CONFIGURATION,
  });

export const fetchAttendanceConfigurationFinished = (
  payload: AttendanceConfiguration,
  error: boolean = false,
): FetchAttendanceConfigurationFinishedAction => ({
  type: FETCH_ATTENDANCE_CONFIGURATION_FINISHED,
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

/**
 * Fetch subordinates for attendance list
 */
export const fetchSubordinates = (
  nameOrId: string,
): FetchSubordinatesAction => ({
  type: FETCH_SUBORDINATES,
  nameOrId,
});

export const fetchSubordinatesFinished = (
  sourceAction: FetchSubordinatesAction,
  payload?: $PropertyType<FetchSubordinatesFinishedAction, 'payload'>,
  error: boolean = false,
): FetchSubordinatesFinishedAction => ({
  type: FETCH_SUBORDINATES_FINISHED,
  sourceAction,
  payload,
  error,
});

/**
 * Pick subordinate or reset selected
 * @param subordinate
 */
export const pickSubordinate = (
  subordinate?: $PropertyType<PickSubordinateAction, 'subordinate'>,
): PickSubordinateAction => ({
  type: PICK_SUBORDINATE,
  subordinate,
});
