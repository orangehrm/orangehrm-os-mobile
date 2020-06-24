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

export interface LeaveUsageState {
  entitlement?: Entitlement[];
  selectedLeaveTypeId?: string;
}

export type NullableString = string | null;

export const FETCH_MY_LEAVE = 'LEAVE_USAGE_FETCH_MY_LEAVE';
export const FETCH_MY_LEAVE_FINISHED = 'LEAVE_USAGE_FETCH_MY_LEAVE_FINISHED';
export const SELECT_LEAVE_TYPE = 'LEAVE_USAGE_SELECT_LEAVE_TYPE';

export interface FetchMyLeaveAction {
  type: typeof FETCH_MY_LEAVE;
}

export interface FetchMyLeaveFinishedAction {
  type: typeof FETCH_MY_LEAVE_FINISHED;
  payload?: MyLeave;
  error: boolean;
}

export interface SelectLeaveTypeAction {
  type: typeof SELECT_LEAVE_TYPE;
  id: string;
}

export type LeaveUsageActionTypes =
  | FetchMyLeaveAction
  | FetchMyLeaveFinishedAction
  | SelectLeaveTypeAction;

export interface Entitlement {
  id: string;
  type: string;
  validFrom: string;
  validTo: string;
  days: number;
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

export interface MyLeave {
  entitlement: Entitlement[];
}
