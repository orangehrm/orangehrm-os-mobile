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
  PICK_APPLY_LEAVE_FROM_DATE,
  PICK_APPLY_LEAVE_TO_DATE,
  APPLY_SINGLE_DAY_LEAVE_REQUEST,
  APPLY_MULTIPLE_DAY_LEAVE_REQUEST,
  PICK_SINGLE_DAY_DURATION,
  PICK_MULTIPLE_DAY_PARTIAL_OPTION,
  PICK_LEAVE_COMMENT,
  RESET_APPLY_LEAVE,
  FETCH_WORK_SHIFT,
  FETCH_WORK_SHIFT_FINISHED,
  SET_ERROR_MESSAGE,
  PickFromDateAction,
  PickToDateAction,
  ApplySingleDayLeaveRequestAction,
  ApplyMultipleDayLeaveRequestAction,
  PickSingleDayDurationAction,
  PickMultipleDayPartialOptionAction,
  PickLeaveCommentAction,
  ResetApplyLeaveAction,
  FetchWorkShiftAction,
  FetchWorkShiftFinishedAction,
  SetErrorMessageAction,
} from 'store/leave/apply-leave/types';
import {$PropertyType} from 'utility-types';

export const pickApplyLeaveFromDate = (date?: string): PickFromDateAction => ({
  type: PICK_APPLY_LEAVE_FROM_DATE,
  date,
});

export const pickApplyLeaveToDate = (date?: string): PickToDateAction => ({
  type: PICK_APPLY_LEAVE_TO_DATE,
  date,
});

/**
 * API call with single day leave request action for saga
 * @param payload
 */
export const saveSingleDayLeaveRequest = (
  payload: $PropertyType<ApplySingleDayLeaveRequestAction, 'payload'>,
): ApplySingleDayLeaveRequestAction => ({
  type: APPLY_SINGLE_DAY_LEAVE_REQUEST,
  payload,
});

/**
 * API call with multiple day leave request action for saga
 * @param payload
 */
export const saveMultipleDayLeaveRequest = (
  payload: $PropertyType<ApplyMultipleDayLeaveRequestAction, 'payload'>,
): ApplyMultipleDayLeaveRequestAction => ({
  type: APPLY_MULTIPLE_DAY_LEAVE_REQUEST,
  payload,
});

export const pickApplyLeaveSingleDayDuration = (
  duration: $PropertyType<PickSingleDayDurationAction, 'duration'>,
): PickSingleDayDurationAction => ({
  type: PICK_SINGLE_DAY_DURATION,
  duration,
});

export const pickApplyLeaveMultipleDayPartialOption = (
  partialOption: $PropertyType<
    PickMultipleDayPartialOptionAction,
    'partialOption'
  >,
): PickMultipleDayPartialOptionAction => ({
  type: PICK_MULTIPLE_DAY_PARTIAL_OPTION,
  partialOption,
});

export const pickApplyLeaveComment = (
  comment?: string,
): PickLeaveCommentAction => ({
  type: PICK_LEAVE_COMMENT,
  comment,
});

/**
 * Reset redux store apply leave data
 */
export const resetApplyLeave = (): ResetApplyLeaveAction => ({
  type: RESET_APPLY_LEAVE,
});

export const fetchWorkShift = (empNumber: string): FetchWorkShiftAction => ({
  type: FETCH_WORK_SHIFT,
  empNumber,
});

export const fetchWorkShiftFinished = (
  workShift: $PropertyType<FetchWorkShiftFinishedAction, 'workShift'>,
): FetchWorkShiftFinishedAction => ({
  type: FETCH_WORK_SHIFT_FINISHED,
  workShift,
});

export const setErrorMessage = (message?: string): SetErrorMessageAction => ({
  type: SET_ERROR_MESSAGE,
  message,
});
