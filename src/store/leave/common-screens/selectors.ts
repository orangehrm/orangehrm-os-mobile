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

import {RootState} from 'store';
import {createSelector} from 'reselect';
import {
  CommonLeaveState,
  SingleDayDuration,
  MultipleDayPartialOption,
} from 'store/leave/common-screens/types';

export const selectLeaveCommon = (state: RootState) => state.leaveCommon;

export const selectFromDate = createSelector<
  RootState,
  CommonLeaveState,
  string | undefined
>([selectLeaveCommon], (leaveCommon) => leaveCommon.fromDate);

export const selectToDate = createSelector<
  RootState,
  CommonLeaveState,
  string | undefined
>([selectLeaveCommon], (leaveCommon) => leaveCommon.toDate);

export const selectPickedLeaveDates = createSelector<
  RootState,
  CommonLeaveState,
  boolean
>([selectLeaveCommon], (leaveCommon) => leaveCommon.pickedLeaveDates);

export const selectPickedLeaveDuration = createSelector<
  RootState,
  CommonLeaveState,
  boolean
>([selectLeaveCommon], (leaveCommon) => leaveCommon.pickedDuration);

export const selectPickedLeavePartialOption = createSelector<
  RootState,
  CommonLeaveState,
  boolean
>([selectLeaveCommon], (leaveCommon) => leaveCommon.pickedPartialOption);

export const selectDuration = createSelector<
  RootState,
  CommonLeaveState,
  SingleDayDuration
>([selectLeaveCommon], (leaveCommon) => leaveCommon.duration);

export const selectPartialOption = createSelector<
  RootState,
  CommonLeaveState,
  MultipleDayPartialOption
>([selectLeaveCommon], (leaveCommon) => leaveCommon.partialOption);

export const selectForceUpdateSlider = createSelector<
  RootState,
  CommonLeaveState,
  number
>([selectLeaveCommon], (leaveCommon) => leaveCommon.forceUpdateSlider);
