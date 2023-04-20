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

export interface LeaveListState {
  leaveList?: LeaveRequestDetailedModel[];
  employeeLeaveRequest?: LeaveRequestDetailedModel;
  employeeLeaves?: LeaveDetailedModel[];
  employeeLeaveComment?: LeaveRequestCommentModel[];
}

export const FETCH_LEAVE_LIST = 'LEAVE_LIST_FETCH_LEAVE_LIST';
export const FETCH_LEAVE_LIST_FINISHED = 'LEAVE_LIST_FETCH_LEAVE_LIST_FINISHED';
export const RESET_LEAVE_LIST = 'LEAVE_LIST_RESET_LEAVE_LIST';
export const FETCH_EMPLOYEE_LEAVES = 'LEAVE_LIST_FETCH_EMPLOYEE_LEAVES';
export const FETCH_EMPLOYEE_LEAVE_REQUEST_DETAILS =
  'LEAVE_LIST_FETCH_EMPLOYEE_LEAVE_REQUEST_DETAILS';
export const FETCH_LEAVE_COMMENT = 'LEAVE_LIST_FETCH_LEAVE_COMMENT';
export const FETCH_EMPLOYEE_LEAVES_FINISHED =
  'LEAVE_LIST_FETCH_EMPLOYEE_LEAVES_FINISHED';
export const FETCH_EMPLOYEE_LEAVE_REQUEST_DETAILS_FINISHED =
  'LEAVE_LIST_FETCH_EMPLOYEE_LEAVE_REQUEST_DETAILS_FINISHED';
export const FETCH_LEAVE_COMMENT_FINISHED =
  'LEAVE_LIST_FETCH_LEAVE_COMMENT_FINISHED';
export const CHANGE_EMPLOYEE_LEAVE_REQUEST_STATUS =
  'LEAVE_LIST_CHANGE_EMPLOYEE_LEAVE_REQUEST_STATUS';
export const ADD_EMPLOYEE_LEAVE_REQUEST_COMMENT =
  'LEAVE_LIST_ADD_EMPLOYEE_LEAVE_REQUEST_COMMENT';

export interface FetchLeaveListAction {
  type: typeof FETCH_LEAVE_LIST;
}

export interface FetchLeaveListFinishedAction {
  type: typeof FETCH_LEAVE_LIST_FINISHED;
  payload?: LeaveRequestDetailedModel[];
  error: boolean;
}

export interface ResetLeaveListAction {
  type: typeof RESET_LEAVE_LIST;
}

export interface FetchEmployeeLeavesAction {
  type: typeof FETCH_EMPLOYEE_LEAVES;
  leaveRequestId: number;
}

export interface FetchEmployeeLeaveRequestDetailsAction {
  type: typeof FETCH_EMPLOYEE_LEAVE_REQUEST_DETAILS;
  leaveRequestId: number;
}

export interface FetchLeaveCommentAction {
  type: typeof FETCH_LEAVE_COMMENT;
  leaveRequestId: number;
}

export interface FetchEmployeeLeavesFinishedAction {
  type: typeof FETCH_EMPLOYEE_LEAVES_FINISHED;
  payload?: LeaveDetailedModel[];
  error: boolean;
}

export interface FetchEmployeeLeaveRequestDetailsFinishedAction {
  type: typeof FETCH_EMPLOYEE_LEAVE_REQUEST_DETAILS_FINISHED;
  payload?: LeaveRequestDetailedModel;
  error: boolean;
}

export interface FetchLeaveCommentFinishedAction {
  type: typeof FETCH_LEAVE_COMMENT_FINISHED;
  payload?: LeaveRequestCommentModel[];
  error: boolean;
}

export interface ChangeEmployeeLeaveRequestStatusAction {
  type: typeof CHANGE_EMPLOYEE_LEAVE_REQUEST_STATUS;
  leaveRequestId: number;
  status: LeaveRequestAllowedActions;
}

export interface AddEmployeeLeaveRequestCommentAction {
  type: typeof ADD_EMPLOYEE_LEAVE_REQUEST_COMMENT;
  leaveRequestId: number;
  comment: string;
}

export type LeaveUsageActionTypes =
  | FetchLeaveListAction
  | FetchLeaveListFinishedAction
  | ResetLeaveListAction
  | FetchEmployeeLeavesAction
  | FetchEmployeeLeaveRequestDetailsAction
  | FetchEmployeeLeavesFinishedAction
  | FetchEmployeeLeaveRequestDetailsFinishedAction
  | FetchLeaveCommentAction
  | FetchLeaveCommentFinishedAction
  | AddEmployeeLeaveRequestCommentAction
  | ChangeEmployeeLeaveRequestStatusAction;

export const ACTION_CANCEL = 'CANCEL';
export const ACTION_REJECT = 'REJECT';
export const ACTION_APPROVE = 'APPROVE';

export interface Employee {
  empNumber: number;
  employeeId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  terminationId: null | number;
}

export type LeaveRequestAllowedActions =
  | typeof ACTION_CANCEL
  | typeof ACTION_REJECT
  | typeof ACTION_APPROVE;

export interface LeaveType {
  id: number;
  name: string;
  deleted: boolean;
}

export interface ColorAssignedLeaveType extends LeaveType {
  color: string;
}

interface LeaveStatus {
  id: number;
  name: string;
  lengthDays: number;
}

interface LeaveBalance {
  balance: {
    balance: number;
    entitled: number;
    pending: number;
    scheduled: number;
    taken: number;
    used: number;
    asAtDate: string;
    endDate: string;
  };
  period: {
    startDate: string;
    endDate: string;
  };
}

interface LeaveComment {
  id: number;
  comment: string;
  date: string;
  time: string;
}

interface AllowedAction {
  action: string;
  name: string;
}

interface LeaveDatesDetails {
  fromDate: string;
  toDate: null | string;
  durationType: {
    id: null | number;
    type: null | string;
  };
  startTime: null | string;
  endTime: null | string;
}

export interface LeaveDetailedModel {
  id: number;
  dates: LeaveDatesDetails;
  lengthHours: number;
  leaveBalance: LeaveBalance;
  leaveStatus: LeaveStatus;
  allowedActions: AllowedAction[];
  leaveType: LeaveType | ColorAssignedLeaveType;
  lastComment: null | LeaveComment;
}

export interface LeaveRequestCommentModel {
  id: number;
  leaveRequest: {
    id: number;
  };
  date: string;
  time: string;
  createdByEmployee: {
    empNumber: number;
    lastName: string;
    firstName: string;
    middleName: string;
    employeeId: string;
    terminationId: null | number;
  };
  comment: string;
}

interface LeaveBreakdown {
  id: number;
  lengthDays: number;
  name: string;
}

interface LeaveRequestComment {
  id: number;
  comment: string;
  date: string;
  time: string;
}

export interface LeaveRequestDetailedModel {
  id: number;
  dates: LeaveDatesDetails;
  noOfDays: number;
  leaveBalances: LeaveBalance[];
  multiPeriod: boolean;
  leaveBreakdown: LeaveBreakdown[];
  allowedActions: AllowedAction[];
  hasMultipleStatus: boolean;
  employee: Employee;
  leaveType: ColorAssignedLeaveType;
  lastComment: LeaveRequestComment;
}
