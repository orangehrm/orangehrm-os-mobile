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
  PICK_FROM_DATE,
  PICK_TO_DATE,
  PICK_LEAVE_DATES,
  SAVE_SINGLE_DAY_LEAVE_REQUEST,
  SAVE_MULTIPLE_DAY_LEAVE_REQUEST,
  PICK_SINGLE_DAY_DURATION,
  PICK_MULTIPLE_DAY_PARTIAL_OPTION,
  PICK_LEAVE_COMMENT,
  RESET_APPLY_LEAVE,
  RESET_SINGLE_DAY_DURATION,
  RESET_MULTIPLE_DAY_PARTIAL_OPTION,
  PickFromDateAction,
  PickToDateAction,
  PickDatesAction,
  SaveSingleDayLeaveRequestAction,
  SaveMultipleDayLeaveRequestAction,
  PickSingleDayDurationAction,
  PickMultipleDayPartialOptionAction,
  PickLeaveCommentAction,
  ResetApplyLeaveAction,
  ResetSingleDayDurationAction,
  ResetMultipleDayPartialOptionAction,
} from 'store/leave/apply-leave/types';
import {$PropertyType} from 'utility-types';

export const pickLeaveFromDate = (date?: string): PickFromDateAction => ({
  type: PICK_FROM_DATE,
  date,
});

export const pickLeaveToDate = (date?: string): PickToDateAction => ({
  type: PICK_TO_DATE,
  date,
});

export const pickLeaveDates = (state: boolean = true): PickDatesAction => ({
  type: PICK_LEAVE_DATES,
  state,
});

/**
 * API call with single day leave request action for saga
 * @param payload
 */
export const saveSingleDayLeaveRequest = (
  payload: $PropertyType<SaveSingleDayLeaveRequestAction, 'payload'>,
): SaveSingleDayLeaveRequestAction => ({
  type: SAVE_SINGLE_DAY_LEAVE_REQUEST,
  payload,
});

/**
 * API call with multiple day leave request action for saga
 * @param payload
 */
export const saveMultipleDayLeaveRequest = (
  payload: $PropertyType<SaveMultipleDayLeaveRequestAction, 'payload'>,
): SaveMultipleDayLeaveRequestAction => ({
  type: SAVE_MULTIPLE_DAY_LEAVE_REQUEST,
  payload,
});

export const pickSingleDayDuration = (
  duration: $PropertyType<PickSingleDayDurationAction, 'duration'>,
): PickSingleDayDurationAction => ({
  type: PICK_SINGLE_DAY_DURATION,
  duration,
});

export const pickMultipleDayPartialOption = (
  partialOption: $PropertyType<
    PickMultipleDayPartialOptionAction,
    'partialOption'
  >,
): PickMultipleDayPartialOptionAction => ({
  type: PICK_MULTIPLE_DAY_PARTIAL_OPTION,
  partialOption,
});

export const pickLeaveComment = (comment?: string): PickLeaveCommentAction => ({
  type: PICK_LEAVE_COMMENT,
  comment,
});

/**
 * Reset redux store apply leave data
 */
export const resetApplyLeave = (): ResetApplyLeaveAction => ({
  type: RESET_APPLY_LEAVE,
});

export const resetSingleDayDuration = (): ResetSingleDayDurationAction => ({
  type: RESET_SINGLE_DAY_DURATION,
});

export const resetMultipleDayPartialOption = (): ResetMultipleDayPartialOptionAction => ({
  type: RESET_MULTIPLE_DAY_PARTIAL_OPTION,
});
