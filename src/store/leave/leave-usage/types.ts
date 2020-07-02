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

export interface LeaveUsageState {
  entitlement?: Entitlement[];
  leaveRequest?: LeaveRequest[];
  selectedLeaveTypeId?: string;
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

export type LeaveUsageActionTypes =
  | FetchMyLeaveEntitlementAction
  | FetchMyLeaveEntitlementFinishedAction
  | SelectLeaveTypeAction
  | FetchMyLeaveRequestAction
  | FetchMyLeaveRequestFinishedAction;

export interface Entitlement {
  id: string;
  validFrom: string;
  validTo: string;
  creditedDate: string;
  leaveBalance: LeaveBalance;
  leaveType: LeaveType;
}

export interface LeaveType {
  id: string;
  type: string;
  color: string;
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
  id: string;
  fromDate: string;
  toDate: string;
  appliedDate: string;
  leaveType: string;
  numberOfDays: string;
  comments: LeaveComment[];
  days: Leave[];
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
