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

import {WorkWeek, Holiday} from 'store/leave/common-screens/types';
import {Moment} from 'moment';

export const DEFAULT_START_DAY = 1;

export interface DaySelectorSingleDay {
  date: Moment;
  duration: string;
}

export interface GraphDataPoint {
  x: string;
  y: number;
}

export interface GraphLeaveType {
  typeId: number;
  type: string;
  duration: string;
  colour: string;
}

export const MY_ATTENDANCE = 'myAttendance';
export const EMPLOYEE_ATTENDANCE = 'employeeAttendance';

export type Mode = typeof MY_ATTENDANCE | typeof EMPLOYEE_ATTENDANCE;

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
  id: number;
  colour: string;
  data: GraphDataPoint[];
}

export interface EmployeeObject {
  empNumber: number;
  lastName: string;
  firstName: string;
  employeeId: string;
  terminationId: number;
}
export interface LeaveType {
  id: number;
  name: string;
  deleted: boolean;
}

export interface AttendanceRequest {
  fromDate: string;
  toDate: string;
  empNumber?: number;
}

export interface EmployeeJobDetails {
  empNumber: number;
  jobTitle: {
    id: number;
    isDeleted: boolean;
    title: string;
  };
}

export interface LeaveObject {
  id: string;
  date: string;
  lengthHours: string;
  lengthDays: string;
  leaveType: LeaveType;
  startTime: string;
  endTime: string;
  status: LeaveStatusObject;
}

export interface LeaveStatusObject {
  id: number;
  name: string;
}

export interface AttendanceObject {
  id: number;
  punchIn: PunchInOutObject;
  punchOut: PunchInOutObject;
  duration: string;
}

export interface PunchInOutObject {
  note: string;
  offset: string;
  userTime: string;
  userDate: string;
}

export interface AttendanceState {
  attendanceObjects?: AttendanceObject[];
  leaveObjects?: LeaveObject[];
  graphObject?: GraphRecordsObject;
  holidayObject?: Holiday;
  workWeekObject?: WorkWeekObject;
  employeeObject?: EmployeeObject;
  holidays?: Holiday[];
  workWeek?: WorkWeek;
  employeeList?: SingleEmployeeAttendance[];
  subordinates: Map<string, EmployeeObject[]>;
  selectedSubordinate?: EmployeeObject;
  attendanceConfiguration: AttendanceConfiguration;
  attendanceConfigurationFetched: boolean;
  employeeJobDetails?: EmployeeJobDetails;
  employeeJobDetailsCache: Map<number, EmployeeJobDetails>;
}

export interface SingleLeave {
  typeId: number;
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

export interface WorkSummaryGraphObject {
  workDay: WorkDayObject;
  totalTime: TotalTimeObject;
}

export interface WorkDayObject {
  date: string;
  day: string;
  id: string;
}

export interface TotalTimeObject {
  hours: number;
  minutes: number;
}

export interface GraphRecordsObject {
  totalWorkHours: number;
  totalLeaveHours: number;
  totalLeaveTypeHours: SingleLeave[];
  workSummary: WorkSummaryObject;
}

export interface GraphRecordsLeaveObject {
  leaveType: LeaveTypeGraph;
  lengthHours: number;
  date: string;
}

export interface TotalWorkDuration {
  currentWeek: currentWeeks;
}

export interface currentWeeks {
  totalTime: {
    hours: number;
    minutes: number;
  };
}

export interface GraphRecordsDetails {
  typeId: number;
  type: string;
  hours: number;
}

export interface LeaveTypeGraph {
  id: number;
  name: string;
  deleted: boolean;
}

export const SHORT_SUNDAY = 'Su';
export const SHORT_MONDAY = 'Mo';
export const SHORT_TUESDAY = 'Tu';
export const SHORT_WEDNESDAY = 'We';
export const SHORT_THURSDAY = 'Th';
export const SHORT_FRIDAY = 'Fr';
export const SHORT_SATURDAY = 'Sa';

export type ShortDay =
  | typeof SHORT_SUNDAY
  | typeof SHORT_MONDAY
  | typeof SHORT_TUESDAY
  | typeof SHORT_WEDNESDAY
  | typeof SHORT_THURSDAY
  | typeof SHORT_FRIDAY
  | typeof SHORT_SATURDAY;

export const FETCH_ATTENDANCE_RECORDS =
  'ATTENDANCE_RECORDS_FETCH_ATTENDANCE_RECORDS';
export const FETCH_LEAVE_RECORDS = 'LEAVE_RECORDS_FETCH_LEAVE_RECORDS';
export const FETCH_ATTENDANCE_GRAPH_RECORDS =
  'ATTENDANCE_GRAPH_FETCH_ATTENDANCE_GRAPH';
export const FETCH_EMPLOYEE_JOB_DETAILS =
  'ATTENDANCE_FETCH_EMPLOYEE_JOB_DETAILS';
export const FETCH_ATTENDANCE_RECORDS_FINISHED =
  'ATTENDANCE_RECORDS_FETCH_ATTENDANCE_RECORDS_FINISHED';
export const FETCH_LEAVE_RECORDS_FINISHED =
  'LEAVE_RECORDS_FETCH_LEAVE_RECORDS_FINISHED';
export const FETCH_EMPLOYEE_JOB_DETAILS_FINISHED =
  'LEAVE_FETCH_EMPLOYEE_JOB_DETAILS_FINISHED';
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
export const FETCH_SUBORDINATES = 'ATTENDANCE_FETCH_SUBORDINATES';
export const FETCH_SUBORDINATES_FINISHED =
  'ATTENDANCE_FETCH_SUBORDINATES_FINISHED';
export const PICK_SUBORDINATE = 'ATTENDANCE_PICK_SUBORDINATE';

export const FETCH_ATTENDANCE_CONFIGURATION =
  'ATTENDANCE_ATTENDANCE_CONFIGURATION';
export const FETCH_ATTENDANCE_CONFIGURATION_FINISHED =
  'ATTENDANCE_ATTENDANCE_CONFIGURATION_FINISHED';

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

export interface FetchEmployeeJobDetailsFinishedAction {
  type: typeof FETCH_EMPLOYEE_JOB_DETAILS_FINISHED;
  payload?: EmployeeJobDetails;
  error: boolean;
}

export interface FetchAttendanceGraphRecordsAction {
  type: typeof FETCH_ATTENDANCE_GRAPH_RECORDS;
  payload: AttendanceRequest;
}

export interface FetchEmployeeJobDetailsAction {
  type: typeof FETCH_EMPLOYEE_JOB_DETAILS;
  empNumber: number;
}

export interface FetchAttendanceGraphRecordsFinishedAction {
  type: typeof FETCH_ATTENDANCE_GRAPH_RECORDS_FINISHED;
  payload?: GraphRecordsObject;
  error: boolean;
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
  empNumber: number;
  firstName: string;
  lastName: string;
  terminationId: number;
  sum: {
    hours: number;
    label: string;
    minutes: number;
  };
}

export interface AttendanceConfiguration {
  startDate: number;
}

export interface AttendanceConfig {
  startDay: string;
}

export interface EmployeeAttendanceListRequest {
  fromDate: string;
  toDate: string;
  empNumber?: number;
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

export interface FetchSubordinatesAction {
  type: typeof FETCH_SUBORDINATES;
  nameOrId: string;
}

export interface FetchSubordinatesFinishedAction {
  type: typeof FETCH_SUBORDINATES_FINISHED;
  payload?: EmployeeObject[];
  sourceAction: FetchSubordinatesAction;
  error: boolean;
}

export interface PickSubordinateAction {
  type: typeof PICK_SUBORDINATE;
  subordinate?: EmployeeObject;
}

export interface FetchAttendanceConfigurationAction {
  type: typeof FETCH_ATTENDANCE_CONFIGURATION;
}

export interface FetchAttendanceConfigurationFinishedAction {
  type: typeof FETCH_ATTENDANCE_CONFIGURATION_FINISHED;
  payload: AttendanceConfiguration;
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
  | FetchEmployeeAttendanceListFinishedAction
  | FetchSubordinatesAction
  | FetchSubordinatesFinishedAction
  | PickSubordinateAction
  | FetchAttendanceConfigurationAction
  | FetchEmployeeJobDetailsAction
  | FetchEmployeeJobDetailsFinishedAction
  | FetchAttendanceConfigurationFinishedAction;
