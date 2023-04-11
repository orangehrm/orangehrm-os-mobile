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
  FETCH_PUNCH_STATUS,
  FETCH_PUNCH_STATUS_FINISHED,
  CHANGE_PUNCH_CURRENT_DATE_TIME,
  PICK_PUNCH_NOTE,
  PUNCH_IN_REQUEST,
  PUNCH_OUT_REQUEST,
  FetchPunchStatusAction,
  FetchPunchStatusFinishedAction,
  ChangePunchCurrentDateTimeAction,
  SetPunchNoteAction,
  PunchInRequestAction,
  PunchOutRequestAction,
  ResetPunchStateAction,
  PunchStatus,
  RESET_PUNCH_STATE,
  FETCH_ATTENDANCE_CONFIG,
  fetchAttendanceConfigsAction,
  FETCH_ATTENDANCE_CONFIG_FINISHED,
  FetchAttendanceConfigFinishedAction,
  AttendanceConfigObject,
  FETCH_UTC_DATE_TIME_FINISHED,
  FetchUTCDatetimeFinishedAction,
  UTCDateTime,
  FetchUTCDateTimeAction,
  FETCH_UTC_DATE_TIME,
} from './types';
import {$PropertyType} from 'utility-types';

export const setPunchNote = (note: string): SetPunchNoteAction => ({
  type: PICK_PUNCH_NOTE,
  noteSaved: note,
});

export const fetchPunchStatus = (
  refresh?: boolean,
): FetchPunchStatusAction => ({
  type: FETCH_PUNCH_STATUS,
  refresh,
});

export const fetchUTCDateTime = (
  refresh?: boolean,
): FetchUTCDateTimeAction => ({
  type: FETCH_UTC_DATE_TIME,
  refresh,
});

export const fetchAttendanceConfigs = (
  refresh?: boolean,
): fetchAttendanceConfigsAction => ({
  type: FETCH_ATTENDANCE_CONFIG,
  refresh,
});

export const fetchPunchStatusFinished = (
  payload?: PunchStatus,
  error: boolean = false,
): FetchPunchStatusFinishedAction => ({
  type: FETCH_PUNCH_STATUS_FINISHED,
  payload,
  error,
});

export const fetchUTCDateTimeFinished = (
  payload?: UTCDateTime,
  error: boolean = false,
): FetchUTCDatetimeFinishedAction => ({
  type: FETCH_UTC_DATE_TIME_FINISHED,
  payload,
  error,
});

export const fetchAttendanceConfigFinished = (
  payload?: AttendanceConfigObject,
  error: boolean = false,
): FetchAttendanceConfigFinishedAction => ({
  type: FETCH_ATTENDANCE_CONFIG_FINISHED,
  payload,
  error,
});

export const changePunchCurrentDateTime = (
  datetime?: Date,
): ChangePunchCurrentDateTimeAction => ({
  type: CHANGE_PUNCH_CURRENT_DATE_TIME,
  punchCurrentDateTime: datetime,
});

export const savePunchInRequest = (
  payload: $PropertyType<PunchInRequestAction, 'payload'>,
): PunchInRequestAction => ({
  type: PUNCH_IN_REQUEST,
  payload,
});

export const savePunchOutRequest = (
  payload: $PropertyType<PunchOutRequestAction, 'payload'>,
): PunchOutRequestAction => ({
  type: PUNCH_OUT_REQUEST,
  payload,
});

export const resetPunchState = (): ResetPunchStateAction => ({
  type: RESET_PUNCH_STATE,
});
