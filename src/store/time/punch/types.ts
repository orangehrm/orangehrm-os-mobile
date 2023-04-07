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

export interface EmployeeObject {
  empNumber: number;
  lastName: string;
  firstName: string;
  employeeId: string;
}

export interface PunchInOutObject {
  note: string;
  offset: string;
  utcDate: string;
  utcTime: string;
  userTime: string;
  userDate: string;
}

export interface PunchInOutFinishObject {
  note: string;
  timezoneOffset: string;
  utcDate: string;
  utcTime: string;
  userTime: string;
  userDate: string;
}

export interface PunchStateObject {
  id: string;
  name: string;
}

export interface PunchStatus {
  employee: EmployeeObject;
  punchIn: PunchInOutObject;
  punchOut: PunchInOutObject;
  state: PunchStateObject;
}

export interface UTCDateTime {
  utcDate: string;
  utcTime: string;
}

export interface PunchStatusState {
  punchStatus?: PunchStatus;
  punchCurrentDate?: string;
  punchCurrentTime?: string;
  punchNoteSaved?: string;
  punchAttendanceConfig?: AttendanceConfigObject;
}
export interface AttendanceConfigObject {
  canSupervisorModifyAttendance: boolean;
  canUserChangeCurrentTime: boolean;
  canUserModifyAttendance: boolean;
}

export const PUNCHED_IN = 'Punched In';
export const PUNCHED_OUT = 'Punched Out';
export const INITIAL = 'INITIAL';

export const PUNCH_IN = 'PUNCH_IN';
export const PUNCH_OUT = 'PUNCH_OUT';
export type PunchAction = typeof PUNCH_IN | typeof PUNCH_OUT;

export const FETCH_PUNCH_STATUS = 'PUNCH_STATUS_FETCH_PUNCH_STATUS';
export const FETCH_UTC_DATE_TIME = 'PUNCH_STATUS_FETCH_UTC_DATE_TIME';
export const FETCH_ATTENDANCE_CONFIG = 'PUNCH_STATUS_FETCH_ATTENDANCE_CONFIG';
export const FETCH_ATTENDANCE_CONFIG_FINISHED =
  'PUNCH_STATUS_FETCH_ATTENDANCE_CONFIG_FINISHED';
export const FETCH_PUNCH_STATUS_FINISHED =
  'PUNCH_STATUS_FETCH_PUNCH_STATUS_FINISHED';
export const FETCH_UTC_DATE_TIME_FINISHED =
  'PUNCH_STATUS_FETCH_UTC_DATE_TIME_FINISHED';
export const CHANGE_PUNCH_CURRENT_DATE_TIME =
  'PUNCH_CURRENT_DATE_TIME_CHANGE_PUNCH_CURRENT_DATE_TIME';
export const PICK_PUNCH_NOTE = 'ATTENDANCE_PICK_PUNCH_NOTE';
export const PUNCH_IN_REQUEST = 'ATTENDANCE_SAVE_PUNCH_IN_REQUEST';
export const PUNCH_OUT_REQUEST = 'ATTENDANCE_SAVE_PUNCH_OUT_REQUEST';
export const RESET_PUNCH_STATE = 'PUNCH_STATE_RESET_PUNCH_STATE';

export interface FetchPunchStatusAction {
  type: typeof FETCH_PUNCH_STATUS;
  refresh?: boolean;
}

export interface FetchUTCDateTimeAction {
  type: typeof FETCH_UTC_DATE_TIME;
  refresh?: boolean;
}
export interface fetchAttendanceConfigsAction {
  type: typeof FETCH_ATTENDANCE_CONFIG;
  refresh?: boolean;
}

export interface FetchPunchStatusFinishedAction {
  type: typeof FETCH_PUNCH_STATUS_FINISHED;
  payload?: PunchStatus;
  error: boolean;
}

export interface FetchUTCDatetimeFinishedAction {
  type: typeof FETCH_UTC_DATE_TIME_FINISHED;
  payload?: UTCDateTime;
  error: boolean;
}

export interface FetchAttendanceConfigFinishedAction {
  type: typeof FETCH_ATTENDANCE_CONFIG_FINISHED;
  payload?: AttendanceConfigObject;
  error: boolean;
}

export interface ChangePunchCurrentDateTimeAction {
  type: typeof CHANGE_PUNCH_CURRENT_DATE_TIME;
  punchCurrentDate?: string;
  punchCurrentTime?: string;
}

export interface SetPunchNoteAction {
  type: typeof PICK_PUNCH_NOTE;
  noteSaved: string;
}

export interface PunchRequest {
  timezoneOffset: number;
  timezoneName: string;
  note: string | null;
  date: string | undefined;
  time: string | undefined;
}

export interface PunchInRequestAction {
  type: typeof PUNCH_IN_REQUEST;
  payload: PunchRequest;
}

export interface PunchOutRequestAction {
  type: typeof PUNCH_OUT_REQUEST;
  payload: PunchRequest;
}

export interface ResetPunchStateAction {
  type: typeof RESET_PUNCH_STATE;
}

export type PunchStatusActionTypes =
  | FetchPunchStatusAction
  | FetchPunchStatusFinishedAction
  | FetchUTCDateTimeAction
  | FetchUTCDatetimeFinishedAction
  | fetchAttendanceConfigsAction
  | FetchAttendanceConfigFinishedAction
  | ChangePunchCurrentDateTimeAction
  | SetPunchNoteAction
  | PunchInRequestAction
  | PunchOutRequestAction
  | ResetPunchStateAction;
