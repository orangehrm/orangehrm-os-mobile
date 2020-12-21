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

import {LeaveStatus} from 'store/leave/leave-usage/types';

export interface DaySelectorSingleDay {
  date: moment.Moment;
  duration: string;
}

export interface GraphDataPoint {
  x: string;
  y: number;
}
export interface GraphData {
  day: string;
  typeId: string;
  data: GraphDataPoint[];
}

export interface GraphLeaveType {
  typeId: string;
  type: string;
  duration: string;
  colour: string;
}

export const MY_ATTENDANCE = 'myAttendance';
export const EMPLOYEE_ATTENDANCE = 'employeeAttendance';

export type mode = typeof MY_ATTENDANCE | typeof EMPLOYEE_ATTENDANCE;

export interface Holiday {
  id: string;
  recurring: typeof RECURRING_TRUE | typeof RECURRING_FALSE;
  description: string;
  date: string;
  length: typeof WORK_WEEK_FULL | typeof WORK_WEEK_HALF;
}
export interface WorkWeekObject {
  id: string;
  operational_country_id: null;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
  sun: string;
}

export interface LeaveTypeGraphData {
  id: string;
  colour: string;
  data: GraphDataPoint[];
}

export interface EmployeeObject {
  empNumber: string;
  lastName: string;
  firstName: string;
  employeeId: string;
}
export interface LeaveType {
  id: number;
  type: string;
}

export interface AttendanceRequest {
  fromDate: string;
  toDate: string;
  empNumber?: number;
}

export interface LeaveObject {
  id: string;
  date: string;
  lengthHours: string;
  lengthDays: string;
  leaveType: LeaveType;
  startTime: string;
  endTime: string;
  status: LeaveStatus;
}

export interface AttendanceObject {
  id: string;
  punchInUtcTime: string;
  punchInNote: string;
  punchInUserTime: string;
  punchInTimeOffset: string;
  punchOutUtcTime: string;
  punchOutNote: string;
  punchOutTimeOffset: string;
  punchOutUserTime: string;
  state: string;
}

export interface MyAttendanceState {
  attendanceObjects?: AttendanceObject[];
  leaveObjects?: LeaveObject[];
  graphObject?: GraphRecordsObject;
  holidayObject?: Holiday;
  workWeekObject?: WorkWeekObject;
  employeeObject?: EmployeeObject;
  holidays?: Holiday[];
  workWeek?: WorkWeek;
  employeeList?: SingleEmployeeAttendance[];
}

export interface SingleLeave {
  typeId: string;
  type: string;
  hours: string;
}

export interface WorkSummarySingleDay {
  workHours: string;
  leave: SingleLeave[];
}

export interface WorkSummaryObject {
  sunday: WorkSummarySingleDay;
  monday: WorkSummarySingleDay;
  tuesday: WorkSummarySingleDay;
  wednesday: WorkSummarySingleDay;
  thursday: WorkSummarySingleDay;
  friday: WorkSummarySingleDay;
  saturday: WorkSummarySingleDay;
}

export interface GraphRecordsObject {
  totalWorkHours: number;
  totalLeaveHours: number;
  totalLeaveTypeHours: SingleLeave[];
  workSummary: WorkSummaryObject;
}

export const RECURRING_TRUE = '1';
export const RECURRING_FALSE = '0';
export const WORK_WEEK_FULL = '0';
export const WORK_WEEK_HALF = '4';
export const WORK_WEEK_NON = '8';

export const FETCH_ATTENDANCE_RECORDS =
  'ATTENDANCE_RECORDS_FETCH_ATTENDANCE_RECORDS';
export const FETCH_LEAVE_RECORDS = 'LEAVE_RECORDS_FETCH_LEAVE_RECORDS';
export const FETCH_ATTENDANCE_GRAPH_RECORDS =
  'ATTENDANCE_GRAPH_FETCH_ATTENDANCE_GRAPH';

export const FETCH_ATTENDANCE_RECORDS_FINISHED =
  'ATTENDANCE_RECORDS_FETCH_ATTENDANCE_RECORDS_FINISHED';
export const FETCH_LEAVE_RECORDS_FINISHED =
  'LEAVE_RECORDS_FETCH_LEAVE_RECORDS_FINISHED';
export const FETCH_ATTENDANCE_GRAPH_RECORDS_FINISHED =
  'ATTENDANCE_GRAPH_FETCH_ATTENDANCE_GRAPH_FINISHED';

export const FETCH_HOLIDAYS = 'LEAVE_ATTENDANCE_FETCH_HOLIDAYS';
export const FETCH_HOLIDAYS_FINISHED =
  'LEAVE_ATTENDANCE_FETCH_HOLIDAYS_FINISHED';
export const FETCH_WORK_WEEK = 'LEAVE_ATTENDANCE_WORK_WEEK';
export const FETCH_WORK_WEEK_FINISHED = 'LEAVE_ATTENDANCE_WORK_WEEK_FINISHED';

export const FETCH_EMPLOYEE_ATTENDANCE_LIST =
  'ATTENDANCE_EMPLOYEE_ATTENDANCE_LIST';
export const FETCH_EMPLOYEE_ATTENDANCE_LIST_FINISHED =
  'ATTENDANCE_EMPLOYEE_ATTENDANCE_LIST_FINISHED';

export interface FetchAttendanceRecordsAction {
  type: typeof FETCH_ATTENDANCE_RECORDS;
  payload: AttendanceRequest;
}

export interface FetchAttendanceRecordsFinishedAction {
  type: typeof FETCH_ATTENDANCE_RECORDS_FINISHED;
  payload?: AttendanceObject[];
  error: boolean;
}

export interface FetchLeaveRecordsAction {
  type: typeof FETCH_LEAVE_RECORDS;
  payload: AttendanceRequest;
}

export interface FetchLeaveRecordsFinishedAction {
  type: typeof FETCH_LEAVE_RECORDS_FINISHED;
  payload?: LeaveObject[];
  error: boolean;
}

export interface FetchAttendanceGraphRecordsAction {
  type: typeof FETCH_ATTENDANCE_GRAPH_RECORDS;
  payload: AttendanceRequest;
}

export interface FetchAttendanceGraphRecordsFinishedAction {
  type: typeof FETCH_ATTENDANCE_GRAPH_RECORDS_FINISHED;
  payload?: GraphRecordsObject;
  error: boolean;
}

export interface WorkWeek {
  mon: WorkWeekType;
  tue: WorkWeekType;
  wed: WorkWeekType;
  thu: WorkWeekType;
  fri: WorkWeekType;
  sat: WorkWeekType;
  sun: WorkWeekType;
}

export type WorkWeekType =
  | typeof WORK_WEEK_FULL
  | typeof WORK_WEEK_HALF
  | typeof WORK_WEEK_NON;

export interface WorkShift {
  workShift: string;
  startTime: string;
  endTime: string;
}

export interface FetchHolidaysAction {
  type: typeof FETCH_HOLIDAYS;
  payload: AttendanceRequest;
}

export interface FetchHolidaysFinishedAction {
  type: typeof FETCH_HOLIDAYS_FINISHED;
  payload?: Holiday[];
  error: boolean;
}

export interface FetchWorkWeekAction {
  type: typeof FETCH_WORK_WEEK;
}

export interface FetchWorkWeekFinishedAction {
  type: typeof FETCH_WORK_WEEK_FINISHED;
  payload?: WorkWeek;
  error: boolean;
}

export interface SingleEmployeeAttendance {
  employeeId: string;
  employeeName: string;
  duration: string;
}

export interface EmployeeAttendanceListRequest {
  fromDate: string;
  toDate: string;
  empNumber?: string;
  pastEmployee?: boolean;
}

export interface FetchEmployeeAttendanceListAction {
  type: typeof FETCH_EMPLOYEE_ATTENDANCE_LIST;
  payload: EmployeeAttendanceListRequest;
}

export interface FetchEmployeeAttendanceListFinishedAction {
  type: typeof FETCH_EMPLOYEE_ATTENDANCE_LIST_FINISHED;
  payload?: SingleEmployeeAttendance[];
  error: boolean;
}

export type AttendanceActionTypes =
  | FetchAttendanceRecordsAction
  | FetchAttendanceRecordsFinishedAction
  | FetchLeaveRecordsAction
  | FetchLeaveRecordsFinishedAction
  | FetchAttendanceGraphRecordsAction
  | FetchAttendanceGraphRecordsFinishedAction
  | FetchWorkWeekAction
  | FetchWorkWeekFinishedAction
  | FetchHolidaysAction
  | FetchHolidaysFinishedAction
  | FetchEmployeeAttendanceListAction
  | FetchEmployeeAttendanceListFinishedAction;
