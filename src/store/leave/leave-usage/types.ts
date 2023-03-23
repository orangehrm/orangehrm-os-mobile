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

import {MutableKeys} from 'utility-types';
import {LEAVE_STATUS_MAP} from 'lib/helpers/leave';
import {
  EmployeeLeaveRequest,
  EmployeeLeaveRequestActions,
} from 'store/leave/leave-list/types';

export interface LeaveUsageState {
  entitlement?: Entitlement[];
  leaveRequest?: LeaveRequest[];
  selectedLeaveTypeId?: string;
  leaveRequestDetail?: EmployeeLeaveRequest;
  errorMessage?: string;
}

export type NullableString = string | null;

export const FETCH_MY_LEAVE_ENTITLEMENT =
  'LEAVE_USAGE_FETCH_MY_LEAVE_ENTITLEMENT';
export const FETCH_MY_LEAVE_ENTITLEMENT_FINISHED =
  'LEAVE_USAGE_FETCH_MY_LEAVE_ENTITLEMENT_FINISHED';
export const SELECT_LEAVE_TYPE = 'LEAVE_USAGE_SELECT_LEAVE_TYPE';
export const FETCH_MY_LEAVE_REQUEST = 'LEAVE_USAGE_FETCH_MY_LEAVE_REQUEST';
export const FETCH_MY_LEAVE_REQUEST_FINISHED =
  'LEAVE_USAGE_FETCH_MY_LEAVE_REQUEST_FINISHED';
export const RESET_MY_LEAVE_REQUEST = 'LEAVE_USAGE_RESET_MY_LEAVE_REQUEST';
export const FETCH_MY_LEAVE_DETAILS_FINISHED =
  'LEAVE_USAGE_FETCH_MY_LEAVE_DETAILS_FINISHED';
export const FETCH_MY_LEAVE_DETAILS = 'LEAVE_USAGE_FETCH_MY_LEAVE_DETAILS';
export const CHANGE_MY_LEAVE_REQUEST_STATUS =
  'LEAVE_USAGE_CHANGE_MY_LEAVE_REQUEST_STATUS';
export const SET_ERROR_MESSAGE = 'LEAVE_USAGE_SET_ERROR_MESSAGE';

export interface FetchMyLeaveEntitlementAction {
  type: typeof FETCH_MY_LEAVE_ENTITLEMENT;
}

export interface FetchMyLeaveEntitlementFinishedAction {
  type: typeof FETCH_MY_LEAVE_ENTITLEMENT_FINISHED;
  payload?: Entitlement[];
  error: boolean;
}

export interface FetchMyLeaveRequestAction {
  type: typeof FETCH_MY_LEAVE_REQUEST;
}

export interface FetchMyLeaveRequestFinishedAction {
  type: typeof FETCH_MY_LEAVE_REQUEST_FINISHED;
  payload?: LeaveRequest[];
  error: boolean;
}

export interface SelectLeaveTypeAction {
  type: typeof SELECT_LEAVE_TYPE;
  id: string;
}

export interface ResetMyLeaveRequestAction {
  type: typeof RESET_MY_LEAVE_REQUEST;
}

export interface FetchMyLeaveRequestDetailsAction {
  type: typeof FETCH_MY_LEAVE_DETAILS;
  leaveRequestId: string;
}

export interface FetchMyLeaveRequestDetailsFinishedAction {
  type: typeof FETCH_MY_LEAVE_DETAILS_FINISHED;
  payload?: EmployeeLeaveRequest;
  error: boolean;
}

export interface ChangeMyLeaveRequestStatusAction {
  type: typeof CHANGE_MY_LEAVE_REQUEST_STATUS;
  leaveRequestId: string;
  action: EmployeeLeaveRequestActions;
}

export interface SetErrorMessageAction {
  type: typeof SET_ERROR_MESSAGE;
  message?: string;
}

export type LeaveUsageActionTypes =
  | FetchMyLeaveEntitlementAction
  | FetchMyLeaveEntitlementFinishedAction
  | SelectLeaveTypeAction
  | FetchMyLeaveRequestAction
  | FetchMyLeaveRequestFinishedAction
  | ResetMyLeaveRequestAction
  | FetchMyLeaveRequestDetailsAction
  | FetchMyLeaveRequestDetailsFinishedAction
  | ChangeMyLeaveRequestStatusAction
  | SetErrorMessageAction;

export interface Entitlement {
  id: string;
  validFrom: string;
  validTo: string;
  creditedDate: string;
  leaveBalance: LeaveBalance;
  leaveType: LeaveType;
}

export const LEAVE_TYPE_DELETED_YES = '1';
export const LEAVE_TYPE_DELETED_NO = '0';

export interface LeaveType {
  id: number;
  name: string;
  color: string;
  deleted: boolean;
}

export interface LeaveBalance {
  entitled: number;
  used: number;
  scheduled: number;
  pending: number;
  notLinked: number;
  taken: number;
  adjustment: number;
  balance: number;
}

export interface LeaveRequest {
  id: number;
  leaveType: LeaveType;
  leaveBalance: [];
  numberOfDays: number;
  comments: LeaveComment[];
  days: Leave[];
  leaveBreakdown: [];
}

export interface Leave {
  date: string;
  status: LeaveStatus;
  duration: string;
  durationString: string;
  comments: LeaveComment[];
}

export interface LeaveComment {
  user: string;
  date: string;
  time: string;
  comment: string;
}

export type LeaveStatus = MutableKeys<typeof LEAVE_STATUS_MAP>;
