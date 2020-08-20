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
  SingleDayDuration,
  MultipleDayPartialOption,
  SingleDayLeaveRequest,
  MultipleDayLeaveRequest,
  WorkShift,
} from 'store/leave/common-screens/types';

export interface ApplyLeaveState {
  fromDate?: string;
  toDate?: string;
  comment?: string;
  duration: SingleDayDuration;
  partialOption: MultipleDayPartialOption;
  workShift: WorkShift;
  workShiftFetched: boolean;
  errorMessage?: string;
}

export const PICK_APPLY_LEAVE_FROM_DATE = 'APPLY_LEAVE_PICK_FROM_DATE';
export const PICK_APPLY_LEAVE_TO_DATE = 'APPLY_LEAVE_PICK_TO_DATE';
export const APPLY_SINGLE_DAY_LEAVE_REQUEST =
  'APPLY_LEAVE_SAVE_SINGLE_DAY_LEAVE_REQUEST';
export const APPLY_MULTIPLE_DAY_LEAVE_REQUEST =
  'APPLY_LEAVE_SAVE_MULTIPLE_DAY_LEAVE_REQUEST';
export const PICK_SINGLE_DAY_DURATION = 'APPLY_LEAVE_PICK_SINGLE_DAY_DURATION';
export const PICK_MULTIPLE_DAY_PARTIAL_OPTION =
  'APPLY_LEAVE_PICK_MULTIPLE_DAY_PARTIAL_OPTION';
export const PICK_LEAVE_COMMENT = 'APPLY_LEAVE_PICK_LEAVE_COMMENT';
export const RESET_APPLY_LEAVE = 'APPLY_LEAVE_RESET_APPLY_LEAVE';
export const FETCH_WORK_SHIFT = 'APPLY_LEAVE_FETCH_WORK_SHIFT';
export const FETCH_WORK_SHIFT_FINISHED =
  'APPLY_LEAVE_FETCH_WORK_SHIFT_FINISHED';
export const SET_ERROR_MESSAGE = 'APPLY_LEAVE_SET_ERROR_MESSAGE';

export interface PickFromDateAction {
  type: typeof PICK_APPLY_LEAVE_FROM_DATE;
  date?: string;
}

export interface PickToDateAction {
  type: typeof PICK_APPLY_LEAVE_TO_DATE;
  date?: string;
}

export interface ApplySingleDayLeaveRequestAction {
  type: typeof APPLY_SINGLE_DAY_LEAVE_REQUEST;
  payload: SingleDayLeaveRequest;
}

export interface ApplyMultipleDayLeaveRequestAction {
  type: typeof APPLY_MULTIPLE_DAY_LEAVE_REQUEST;
  payload: MultipleDayLeaveRequest;
}

export interface PickSingleDayDurationAction {
  type: typeof PICK_SINGLE_DAY_DURATION;
  duration: SingleDayDuration;
}

export interface PickMultipleDayPartialOptionAction {
  type: typeof PICK_MULTIPLE_DAY_PARTIAL_OPTION;
  partialOption: MultipleDayPartialOption;
}

export interface PickLeaveCommentAction {
  type: typeof PICK_LEAVE_COMMENT;
  comment?: string;
}

export interface ResetApplyLeaveAction {
  type: typeof RESET_APPLY_LEAVE;
}

export interface FetchWorkShiftAction {
  type: typeof FETCH_WORK_SHIFT;
}

export interface FetchWorkShiftFinishedAction {
  type: typeof FETCH_WORK_SHIFT_FINISHED;
  workShift: WorkShift;
}

export interface SetErrorMessageAction {
  type: typeof SET_ERROR_MESSAGE;
  message?: string;
}

export type ApplyLeaveActionTypes =
  | PickFromDateAction
  | PickToDateAction
  | ApplySingleDayLeaveRequestAction
  | ApplyMultipleDayLeaveRequestAction
  | PickSingleDayDurationAction
  | PickMultipleDayPartialOptionAction
  | PickLeaveCommentAction
  | ResetApplyLeaveAction
  | FetchWorkShiftAction
  | FetchWorkShiftFinishedAction
  | SetErrorMessageAction;
