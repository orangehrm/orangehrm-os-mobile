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
  PICK_SINGLE_DAY_DURATION,
  PICK_MULTIPLE_DAY_PARTIAL_OPTION,
  RESET_COMMON_LEAVE_SCREENS,
  SET_COMMON_LEAVE_SCREENS_STATE,
  SET_PICKED_STATE,
  FETCH_HOLIDAYS,
  FETCH_HOLIDAYS_FINISHED,
  FETCH_WORK_WEEK,
  FETCH_WORK_WEEK_FINISHED,
  PickFromDateAction,
  PickToDateAction,
  PickSingleDayDurationAction,
  PickMultipleDayPartialOptionAction,
  ResetCommonLeaveScreensAction,
  SetCommonLeaveScreensStateAction,
  SetPickedStateAction,
  FetchHolidaysAction,
  FetchHolidaysFinishedAction,
  FetchWorkWeekAction,
  FetchWorkWeekFinishedAction,
} from 'store/leave/common-screens/types';
import {$PropertyType} from 'utility-types';

export const pickLeaveFromDate = (date?: string): PickFromDateAction => ({
  type: PICK_FROM_DATE,
  date,
});

export const pickLeaveToDate = (date?: string): PickToDateAction => ({
  type: PICK_TO_DATE,
  date,
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

/**
 * Reset redux store common leave data
 */
export const resetCommonLeave = (): ResetCommonLeaveScreensAction => ({
  type: RESET_COMMON_LEAVE_SCREENS,
});

export const setCommonLeaveScreensState = (
  state: $PropertyType<SetCommonLeaveScreensStateAction, 'state'>,
): SetCommonLeaveScreensStateAction => ({
  type: SET_COMMON_LEAVE_SCREENS_STATE,
  state,
});

export const setPickedState = (
  key: Exclude<$PropertyType<SetPickedStateAction, 'key'>, undefined>,
  state: boolean = false,
): SetPickedStateAction => ({
  type: SET_PICKED_STATE,
  key,
  state,
});

/**
 * Reset all picked states
 */
export const resetPickedState = (): SetPickedStateAction => ({
  type: SET_PICKED_STATE,
  key: undefined,
  state: false,
});

export const fetchHolidays = (
  fromDate: string,
  toDate: string,
): FetchHolidaysAction => ({
  type: FETCH_HOLIDAYS,
  fromDate,
  toDate,
});

export const fetchHolidaysFinished = (
  holidays: $PropertyType<FetchHolidaysFinishedAction, 'holidays'>,
): FetchHolidaysFinishedAction => ({
  type: FETCH_HOLIDAYS_FINISHED,
  holidays,
});

export const fetchWorkWeek = (): FetchWorkWeekAction => ({
  type: FETCH_WORK_WEEK,
});

export const fetchWorkWeekFinished = (
  workWeek: $PropertyType<FetchWorkWeekFinishedAction, 'workWeek'>,
): FetchWorkWeekFinishedAction => ({
  type: FETCH_WORK_WEEK_FINISHED,
  workWeek,
});
