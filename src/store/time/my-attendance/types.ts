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

export interface HolidayObject {
  id: string;
  recurring: string;
  description: string;
  date: string;
  length: string;
  operational_country_id: string;
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
  lengthHours: string;
  lengthDays: string;
  leaveType: LeaveType;
  startTime: string;
  endTime: string;
  status: string;
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
  holidayObject?: HolidayObject;
  workWeekObject?: WorkWeekObject;
  employeeObject?: EmployeeObject;
}

export interface SingleLeave {
  typeId: string;
  type: string;
  hours: number;
}

export interface WorkSummarySingleDay {
  workHours: number;
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

export type AttendanceActionTypes =
  | FetchAttendanceRecordsAction
  | FetchAttendanceRecordsFinishedAction
  | FetchLeaveRecordsAction
  | FetchLeaveRecordsFinishedAction
  | FetchAttendanceGraphRecordsAction
  | FetchAttendanceGraphRecordsFinishedAction;
