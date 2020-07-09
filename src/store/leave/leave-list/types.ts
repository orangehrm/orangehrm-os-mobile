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

import {LeaveRequest, LeaveType} from 'store/leave/leave-usage/types';

export interface LeaveListState {
  leaveList?: EmployeeLeaveRequest[];
}

export const FETCH_LEAVE_LIST = 'LEAVE_LIST_FETCH_LEAVE_LIST';
export const FETCH_LEAVE_LIST_FINISHED = 'LEAVE_LIST_FETCH_LEAVE_LIST_FINISHED';
export const RESET_LEAVE_LIST = 'LEAVE_LIST_RESET_LEAVE_LIST';

export interface FetchLeaveListAction {
  type: typeof FETCH_LEAVE_LIST;
}

export interface FetchLeaveListFinishedAction {
  type: typeof FETCH_LEAVE_LIST_FINISHED;
  payload?: EmployeeLeaveRequest[];
  error: boolean;
}

export interface ResetLeaveListAction {
  type: typeof RESET_LEAVE_LIST;
}

export type LeaveUsageActionTypes =
  | FetchLeaveListAction
  | FetchLeaveListFinishedAction
  | ResetLeaveListAction;

export interface EmployeeLeaveRequest
  extends Omit<LeaveRequest, 'id' | 'leaveType'> {
  employeeId: string;
  employeeName: string;
  leaveRequestId: string;
  leaveType: LeaveType;
}
