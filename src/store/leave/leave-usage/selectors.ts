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
import {LeaveUsageState, Entitlement} from 'store/leave/leave-usage/types';
import {
  LeaveRequestDetailedModel,
  LeaveRequestCommentModel,
} from 'store/leave/leave-list/types';

export const selectLeaveUsage = (state: RootState) => state.leaveUsage;

export const selectEntitlement = createSelector<
  RootState,
  LeaveUsageState,
  Entitlement[] | undefined
>([selectLeaveUsage], (leaveUsage) => leaveUsage.entitlement);

export const selectSelectedLeaveTypeId = createSelector<
  RootState,
  LeaveUsageState,
  string | undefined
>([selectLeaveUsage], (leaveUsage) => leaveUsage.selectedLeaveTypeId);

export const selectLeaveRequests = createSelector<
  RootState,
  LeaveUsageState,
  LeaveRequestDetailedModel[] | undefined
>([selectLeaveUsage], (leaveUsage) => leaveUsage.leaveRequests);

export const selectLeaveRequestDetail = createSelector<
  RootState,
  LeaveUsageState,
  LeaveRequestDetailedModel | undefined
>([selectLeaveUsage], (leaveUsage) => leaveUsage.leaveRequestDetail);

export const selectErrorMessage = createSelector<
  RootState,
  LeaveUsageState,
  string | undefined
>([selectLeaveUsage], (leaveUsage) => leaveUsage.errorMessage);

export const selectLeaveComments = createSelector<
  RootState,
  LeaveUsageState,
  LeaveRequestCommentModel[] | undefined
>([selectLeaveUsage], (leaveUsage) => leaveUsage.leaveComments);
