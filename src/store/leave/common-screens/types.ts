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

import {LeaveType} from 'store/leave/leave-list/types';

export interface CommonLeaveState {
  fromDate?: string;
  toDate?: string;
  pickedLeaveDates: boolean;
  duration: SingleDayDuration;
  pickedDuration: boolean;
  partialOption: MultipleDayPartialOption;
  pickedPartialOption: boolean;
  forceUpdateSlider: number;
  holidays?: Holiday[];
  workWeek?: WorkWeek;
  workShift: WorkShift;
}

export const PICK_FROM_DATE = 'LEAVE_COMMON_PICK_FROM_DATE';
export const PICK_TO_DATE = 'LEAVE_COMMON_PICK_TO_DATE';
export const PICK_SINGLE_DAY_DURATION = 'LEAVE_COMMON_PICK_SINGLE_DAY_DURATION';
export const PICK_MULTIPLE_DAY_PARTIAL_OPTION =
  'LEAVE_COMMON_PICK_MULTIPLE_DAY_PARTIAL_OPTION';
export const RESET_COMMON_LEAVE_SCREENS = 'LEAVE_COMMON_RESET_LEAVE_COMMON';
export const SET_COMMON_LEAVE_SCREENS_STATE =
  'LEAVE_COMMON_SET_COMMON_LEAVE_SCREENS_STATE';
export const SET_PICKED_STATE = 'LEAVE_COMMON_SET_PICKED_STATE';
export const FETCH_HOLIDAYS = 'LEAVE_COMMON_FETCH_HOLIDAYS';
export const FETCH_HOLIDAYS_FINISHED = 'LEAVE_COMMON_FETCH_HOLIDAYS_FINISHED';
export const FETCH_WORK_WEEK = 'LEAVE_COMMON_WORK_WEEK';
export const FETCH_WORK_WEEK_FINISHED = 'LEAVE_COMMON_WORK_WEEK_FINISHED';

export interface PickFromDateAction {
  type: typeof PICK_FROM_DATE;
  date?: string;
}

export interface PickToDateAction {
  type: typeof PICK_TO_DATE;
  date?: string;
}

export interface PickSingleDayDurationAction {
  type: typeof PICK_SINGLE_DAY_DURATION;
  duration: SingleDayDuration;
}

export interface PickMultipleDayPartialOptionAction {
  type: typeof PICK_MULTIPLE_DAY_PARTIAL_OPTION;
  partialOption: MultipleDayPartialOption;
}

export interface ResetCommonLeaveScreensAction {
  type: typeof RESET_COMMON_LEAVE_SCREENS;
}

export interface SetCommonLeaveScreensStateAction {
  type: typeof SET_COMMON_LEAVE_SCREENS_STATE;
  state: Partial<CommonLeaveState>;
}

export interface SetPickedStateAction {
  type: typeof SET_PICKED_STATE;
  key?: keyof Partial<
    Pick<
      CommonLeaveState,
      'pickedLeaveDates' | 'pickedDuration' | 'pickedPartialOption'
    >
  >;
  state: boolean;
}

export interface FetchHolidaysAction {
  type: typeof FETCH_HOLIDAYS;
  fromDate: string;
  toDate: string;
}

export interface FetchHolidaysFinishedAction
  extends Pick<CommonLeaveState, 'holidays'> {
  type: typeof FETCH_HOLIDAYS_FINISHED;
}

export interface FetchWorkWeekAction {
  type: typeof FETCH_WORK_WEEK;
}

export interface FetchWorkWeekFinishedAction
  extends Pick<CommonLeaveState, 'workWeek'> {
  type: typeof FETCH_WORK_WEEK_FINISHED;
}

export type ApplyLeaveActionTypes =
  | PickFromDateAction
  | PickToDateAction
  | PickSingleDayDurationAction
  | PickMultipleDayPartialOptionAction
  | ResetCommonLeaveScreensAction
  | SetCommonLeaveScreensStateAction
  | SetPickedStateAction
  | FetchHolidaysAction
  | FetchHolidaysFinishedAction
  | FetchWorkWeekAction
  | FetchWorkWeekFinishedAction;

export interface LeaveRequest {
  leaveTypeId: number;
  fromDate: string;
  toDate: string;
  comment?: string;
}

export type SingleDayDuration =
  | SingleDayLeaveRequestHalfDayMorning
  | SingleDayLeaveRequestHalfDayAfterNoon
  | SingleDayLeaveRequestFullDay
  | SingleDayLeaveRequestSpecifyTime;

export type SingleDayLeaveRequest = SingleDayDuration & LeaveRequest;

export const FULL_DAY = 'full_day';
export const SPECIFY_TIME = 'specify_time';
export const PARTIAL_OPTION_ALL = 'all';
export const PARTIAL_OPTION_START = 'start';
export const PARTIAL_OPTION_END = 'end';
export const PARTIAL_OPTION_START_END = 'start_end';
export const PARTIAL_OPTION_NONE = 'none';
export const HALF_DAY_MORNING = 'half_day_morning';
export const HALF_DAY_AFTERNOON = 'half_day_afternoon';
export const DEFAULT_FROM_TIME = '09:00';
export const DEFAULT_TO_TIME = '17:00';
export const DEFAULT_WORK_SHIFT = {
  workShift: '8.00',
  startTime: DEFAULT_FROM_TIME,
  endTime: DEFAULT_TO_TIME,
};

type HalfDayMorningDuration = {type: typeof HALF_DAY_MORNING};
type HalfDayAfternoonDuration = {type: typeof HALF_DAY_AFTERNOON};
type SpecifyTimeDuration = {
  type: typeof SPECIFY_TIME;
  fromTime: string;
  toTime: string;
};

export interface SingleDayLeaveRequestHalfDayMorning {
  duration: HalfDayMorningDuration;
}

export interface SingleDayLeaveRequestHalfDayAfterNoon {
  duration: HalfDayAfternoonDuration;
}

export interface SingleDayLeaveRequestFullDay {
  duration: {type: typeof FULL_DAY};
}

export interface SingleDayLeaveRequestSpecifyTime {
  duration: SpecifyTimeDuration;
}

export type HalfDayType = typeof HALF_DAY_MORNING | typeof HALF_DAY_AFTERNOON;

export type PartialOptions =
  | typeof PARTIAL_OPTION_NONE
  | typeof PARTIAL_OPTION_ALL
  | typeof PARTIAL_OPTION_START
  | typeof PARTIAL_OPTION_END
  | typeof PARTIAL_OPTION_START_END;

export type MultipleDayLeaveRequest = MultipleDayPartialOption & LeaveRequest;

export type MultipleDayPartialOption =
  | PartialDayAll
  | PartialDayStart
  | PartialDayEnd
  | PartialDayStartEnd
  | PartialDayNone;

export type PartialDayAll = {
  partialOption: typeof PARTIAL_OPTION_ALL;
} & PartialOptionsStartDay;

export type PartialDayStart = {
  partialOption: typeof PARTIAL_OPTION_START;
} & PartialOptionsStartDay;

export type PartialDayEnd = {
  partialOption: typeof PARTIAL_OPTION_END;
} & PartialOptionsStartDay;

export type PartialDayStartEnd = {
  partialOption: typeof PARTIAL_OPTION_START_END;
} & PartialOptionsStartDay &
  PartialOptionsEndDay;

export type PartialDayNone = {
  partialOption: typeof PARTIAL_OPTION_NONE;
};

export type PartialOptionsStartDay =
  | PartialOptionsStartDayHalfDayMorning
  | PartialOptionsStartDayHalfDayAfternoon
  | PartialOptionsStartDaySpecifyTime;

export type PartialOptionsEndDay =
  | PartialOptionsEndDayHalfDayMorning
  | PartialOptionsEndDayHalfDayAfternoon
  | PartialOptionsEndDaySpecifyTime;

export interface PartialOptionsStartDayHalfDayMorning {
  duration: HalfDayMorningDuration;
}

export interface PartialOptionsStartDayHalfDayAfternoon {
  duration: HalfDayAfternoonDuration;
}

export interface PartialOptionsStartDaySpecifyTime {
  duration: SpecifyTimeDuration;
}

export interface PartialOptionsEndDayHalfDayMorning {
  endDuration: HalfDayMorningDuration;
}

export interface PartialOptionsEndDayHalfDayAfternoon {
  endDuration: HalfDayAfternoonDuration;
}

export interface PartialOptionsEndDaySpecifyTime {
  endDuration: SpecifyTimeDuration;
}

export const WORK_WEEK_FULL = 0;
export const WORK_WEEK_HALF = 4;
export const WORK_WEEK_NON = 8;

export interface Holiday {
  id: string;
  recurring: boolean;
  name: string;
  date: string;
  length: 0 | 4;
  lengthName: 'Full Day' | 'Half Day';
}

export interface WorkWeek {
  sunday: WorkWeekType;
  monday: WorkWeekType;
  tuesday: WorkWeekType;
  wednesday: WorkWeekType;
  thursday: WorkWeekType;
  friday: WorkWeekType;
  saturday: WorkWeekType;
}

export type WorkWeekType =
  | typeof WORK_WEEK_FULL
  | typeof WORK_WEEK_HALF
  | typeof WORK_WEEK_NON;

export interface WorkShift {
  startTime: string;
  endTime: string;
}

export interface LeaveRequestModel {
  id: number;
  leaveType: LeaveType;
  dateApplied: string;
}
