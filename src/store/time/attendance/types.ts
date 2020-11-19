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

export interface PunchStatus {
  punchTime: string;
  punchNote: string;
  PunchTimeZoneOffset: string;
  dateTimeEditable: boolean;
  currentUtcDateTime: string;
  punchState: string;
}

export interface PunchStatusState {
  punchStatus?: PunchStatus;
  punchCurrentDateTime?: Date;
  punchNoteSaved?: string;
}

export const FETCH_PUNCH_STATUS = 'PUNCH_STATUS_FETCH_PUNCH_STATUS';
export const FETCH_PUNCH_STATUS_FINISHED =
  'PUNCH_STATUS_FETCH_PUNCH_STATUS_FINISHED';
export const CHANGE_PUNCH_CURRENT_DATE_TIME = 'PUNCH_CURRENT_DATE_TIME_CHANGE_PUNCH_CURRENT_DATE_TIME';

export const PICK_PUNCH_NOTE = 'ATTENDANCE_PICK_PUNCH_NOTE';

export interface FetchPunchStatusAction {
  type: typeof FETCH_PUNCH_STATUS;
}

export interface FetchPunchStatusFinishedAction {
  type: typeof FETCH_PUNCH_STATUS_FINISHED;
  payload?: PunchStatus;
  error: boolean;
}

export interface changePunchCurrentDateTimeAction {
    type: typeof CHANGE_PUNCH_CURRENT_DATE_TIME;
    punchCurrentDateTime?: Date;
}

export interface setPunchNoteAction {
  type: typeof PICK_PUNCH_NOTE;
  noteSaved: string;
}
export type PunchStatusActionTypes =
  | FetchPunchStatusAction
  | FetchPunchStatusFinishedAction
  | changePunchCurrentDateTimeAction
  | setPunchNoteAction;
