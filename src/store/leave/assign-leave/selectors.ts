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
import {AssignLeaveState, Subordinate} from 'store/leave/assign-leave/types';
import {
  SingleDayDuration,
  MultipleDayPartialOption,
  WorkShift,
} from 'store/leave/common-screens/types';
import {Entitlement, LeaveType} from 'store/leave/leave-usage/types';

export const selectAssignLeave = (state: RootState) => state.assignLeave;

export const selectSubordinateFromDate = createSelector<
  RootState,
  AssignLeaveState,
  string | undefined
>([selectAssignLeave], (assignLeave) => assignLeave.fromDate);

export const selectSubordinateToDate = createSelector<
  RootState,
  AssignLeaveState,
  string | undefined
>([selectAssignLeave], (assignLeave) => assignLeave.toDate);

export const selectSubordinateDuration = createSelector<
  RootState,
  AssignLeaveState,
  SingleDayDuration
>([selectAssignLeave], (assignLeave) => assignLeave.duration);

export const selectSubordinatePartialOption = createSelector<
  RootState,
  AssignLeaveState,
  MultipleDayPartialOption
>([selectAssignLeave], (assignLeave) => assignLeave.partialOption);

export const selectSubordinateLeaveComment = createSelector<
  RootState,
  AssignLeaveState,
  string | undefined
>([selectAssignLeave], (assignLeave) => assignLeave.comment);

export const selectSubordinateEntitlement = createSelector<
  RootState,
  AssignLeaveState,
  Entitlement[] | undefined
>([selectAssignLeave], (assignLeave) => assignLeave.entitlement);

export const selectSubordinateSelectedLeaveTypeId = createSelector<
  RootState,
  AssignLeaveState,
  string | undefined
>([selectAssignLeave], (assignLeave) => assignLeave.selectedLeaveTypeId);

export const selectSubordinates = createSelector<
  RootState,
  AssignLeaveState,
  Subordinate[] | undefined
>([selectAssignLeave], (assignLeave) => assignLeave.subordinates);

export const selectSelectedSubordinate = createSelector<
  RootState,
  AssignLeaveState,
  Subordinate | undefined
>([selectAssignLeave], (assignLeave) => assignLeave.selectedSubordinate);

export const selectWorkShift = createSelector<
  RootState,
  AssignLeaveState,
  WorkShift
>([selectAssignLeave], (assignLeave) => assignLeave.workShift);

export const selectWorkShiftFetched = createSelector<
  RootState,
  AssignLeaveState,
  boolean
>([selectAssignLeave], (assignLeave) => assignLeave.workShiftFetched);

export const selectLeaveTypes = createSelector<
  RootState,
  AssignLeaveState,
  LeaveType[] | undefined
>([selectAssignLeave], (assignLeave) => assignLeave.leaveTypes);
