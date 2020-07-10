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
  leaveList?: LeaveListLeaveRequest[];
  employeeLeaveRequest?: EmployeeLeaveRequest;
}

export const FETCH_LEAVE_LIST = 'LEAVE_LIST_FETCH_LEAVE_LIST';
export const FETCH_LEAVE_LIST_FINISHED = 'LEAVE_LIST_FETCH_LEAVE_LIST_FINISHED';
export const RESET_LEAVE_LIST = 'LEAVE_LIST_RESET_LEAVE_LIST';
export const FETCH_EMPLOYEE_LEAVE_REQUEST =
  'LEAVE_LIST_FETCH_EMPLOYEE_LEAVE_REQUEST';
export const FETCH_EMPLOYEE_LEAVE_REQUEST_FINISHED =
  'LEAVE_LIST_FETCH_EMPLOYEE_LEAVE_REQUEST_FINISHED';

export interface FetchLeaveListAction {
  type: typeof FETCH_LEAVE_LIST;
}

export interface FetchLeaveListFinishedAction {
  type: typeof FETCH_LEAVE_LIST_FINISHED;
  payload?: LeaveListLeaveRequest[];
  error: boolean;
}

export interface ResetLeaveListAction {
  type: typeof RESET_LEAVE_LIST;
}

export interface FetchEmployeeLeaveRequestAction {
  type: typeof FETCH_EMPLOYEE_LEAVE_REQUEST;
  leaveRequestId: string;
}

export interface FetchEmployeeLeaveRequestFinishedAction {
  type: typeof FETCH_EMPLOYEE_LEAVE_REQUEST_FINISHED;
  payload?: EmployeeLeaveRequest;
  error: boolean;
}

export type LeaveUsageActionTypes =
  | FetchLeaveListAction
  | FetchLeaveListFinishedAction
  | ResetLeaveListAction
  | FetchEmployeeLeaveRequestAction
  | FetchEmployeeLeaveRequestFinishedAction;

export interface LeaveListLeaveRequest
  extends Omit<LeaveRequest, 'id' | 'leaveType' | 'comments' | 'days'> {
  employeeId: string;
  employeeName: string;
  leaveRequestId: string;
  leaveType: LeaveType;
}

export interface EmployeeLeaveRequest
  extends Omit<LeaveRequest, 'id' | 'leaveType'> {
  employeeId: string;
  employeeName: string;
  leaveRequestId: string;
  leaveType: LeaveType;
}
