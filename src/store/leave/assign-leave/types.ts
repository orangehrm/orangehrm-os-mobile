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

import {
  SingleDayDuration,
  MultipleDayPartialOption,
  SingleDayLeaveRequest,
  MultipleDayLeaveRequest,
  WorkShift,
} from 'store/leave/common-screens/types';
import {
  EntitlementSummaryModel,
  LeaveType,
} from 'store/leave/leave-usage/types';

export interface AssignLeaveState {
  fromDate?: string;
  toDate?: string;
  comment?: string;
  duration: SingleDayDuration;
  partialOption: MultipleDayPartialOption;
  entitlement?: SubordinateEntitlement[];
  selectedLeaveTypeId?: string;
  selectedSubordinate?: Subordinate;
  subordinates?: Subordinate[];
  workShift: WorkShift;
  workShiftFetched: boolean;
  leaveTypes?: LeaveType[];
  errorMessage?: string;
}

export const PICK_ASSIGN_LEAVE_FROM_DATE = 'ASSIGN_LEAVE_PICK_FROM_DATE';
export const PICK_ASSIGN_LEAVE_TO_DATE = 'ASSIGN_LEAVE_PICK_TO_DATE';
export const ASSIGN_SINGLE_DAY_LEAVE_REQUEST =
  'ASSIGN_LEAVE_SAVE_SINGLE_DAY_LEAVE_REQUEST';
export const ASSIGN_MULTIPLE_DAY_LEAVE_REQUEST =
  'ASSIGN_LEAVE_SAVE_MULTIPLE_DAY_LEAVE_REQUEST';
export const PICK_SINGLE_DAY_DURATION = 'ASSIGN_LEAVE_PICK_SINGLE_DAY_DURATION';
export const PICK_MULTIPLE_DAY_PARTIAL_OPTION =
  'ASSIGN_LEAVE_PICK_MULTIPLE_DAY_PARTIAL_OPTION';
export const PICK_LEAVE_COMMENT = 'ASSIGN_LEAVE_PICK_LEAVE_COMMENT';
export const RESET_ASSIGN_LEAVE = 'ASSIGN_LEAVE_RESET_ASSIGN_LEAVE';
export const RESET_ASSIGN_LEAVE_WITHOUT_SUBORDINATE =
  'ASSIGN_LEAVE_RESET_ASSIGN_LEAVE_WITHOUT_SUBORDINATE';
export const FETCH_SUBORDINATE_LEAVE_ENTITLEMENT =
  'ASSIGN_LEAVE_FETCH_SUBORDINATE_LEAVE_ENTITLEMENT';
export const FETCH_SUBORDINATE_LEAVE_ENTITLEMENT_FINISHED =
  'ASSIGN_LEAVE_FETCH_SUBORDINATE_LEAVE_ENTITLEMENT_FINISHED';
export const SELECT_SUBORDINATE_LEAVE_TYPE =
  'ASSIGN_LEAVE_SELECT_SUBORDINATE_LEAVE_TYPE';
export const FETCH_SUBORDINATES = 'ASSIGN_LEAVE_FETCH_SUBORDINATES';
export const FETCH_SUBORDINATES_FINISHED =
  'ASSIGN_LEAVE_FETCH_SUBORDINATES_FINISHED';
export const PICK_SUBORDINATE = 'ASSIGN_LEAVE_PICK_SUBORDINATE';
export const FETCH_WORK_SHIFT = 'ASSIGN_LEAVE_FETCH_WORK_SHIFT';
export const FETCH_WORK_SHIFT_FINISHED =
  'ASSIGN_LEAVE_FETCH_WORK_SHIFT_FINISHED';
export const FETCH_LEAVE_TYPES = 'ASSIGN_LEAVE_FETCH_LEAVE_TYPES';
export const FETCH_LEAVE_TYPES_FINISHED =
  'ASSIGN_LEAVE_FETCH_LEAVE_TYPES_FINISHED';
export const SET_ERROR_MESSAGE = 'ASSIGN_LEAVE_SET_ERROR_MESSAGE';

export interface PickFromDateAction {
  type: typeof PICK_ASSIGN_LEAVE_FROM_DATE;
  date?: string;
}

export interface PickToDateAction {
  type: typeof PICK_ASSIGN_LEAVE_TO_DATE;
  date?: string;
}

export interface AssignSingleDayLeaveRequestAction {
  type: typeof ASSIGN_SINGLE_DAY_LEAVE_REQUEST;
  payload: SingleDayLeaveRequest;
  empNumber: string;
}

export interface AssignMultipleDayLeaveRequestAction {
  type: typeof ASSIGN_MULTIPLE_DAY_LEAVE_REQUEST;
  payload: MultipleDayLeaveRequest;
  empNumber: string;
}

export interface PickSingleDayDurationAction {
  type: typeof PICK_SINGLE_DAY_DURATION;
  duration: SingleDayDuration;
}

export interface PickMultipleDayPartialOptionAction {
  type: typeof PICK_MULTIPLE_DAY_PARTIAL_OPTION;
  partialOption: MultipleDayPartialOption;
}

export interface PickLeaveCommentAction {
  type: typeof PICK_LEAVE_COMMENT;
  comment?: string;
}

export interface ResetAssignLeaveAction {
  type: typeof RESET_ASSIGN_LEAVE;
}

export interface ResetAssignLeaveWithoutSubordinateAction {
  type: typeof RESET_ASSIGN_LEAVE_WITHOUT_SUBORDINATE;
}

export interface FetchSubordinateLeaveEntitlementAction {
  type: typeof FETCH_SUBORDINATE_LEAVE_ENTITLEMENT;
  empNumber: string;
}

export interface FetchSubordinateLeaveEntitlementFinishedAction {
  type: typeof FETCH_SUBORDINATE_LEAVE_ENTITLEMENT_FINISHED;
  payload?: SubordinateEntitlement[];
  error: boolean;
}

export interface SelectSubordinateLeaveTypeAction {
  type: typeof SELECT_SUBORDINATE_LEAVE_TYPE;
  id: string;
}

export interface FetchSubordinatesAction {
  type: typeof FETCH_SUBORDINATES;
}

export interface FetchSubordinatesFinishedAction {
  type: typeof FETCH_SUBORDINATES_FINISHED;
  payload?: Subordinate[];
  error: boolean;
}

export interface PickSubordinateAction {
  type: typeof PICK_SUBORDINATE;
  subordinate?: Subordinate;
}

export interface FetchWorkShiftAction {
  type: typeof FETCH_WORK_SHIFT;
  empNumber: string;
}

export interface FetchWorkShiftFinishedAction {
  type: typeof FETCH_WORK_SHIFT_FINISHED;
  workShift: WorkShift;
}

export interface FetchLeaveTypesAction {
  type: typeof FETCH_LEAVE_TYPES;
}

export interface FetchLeaveTypesFinishedAction {
  type: typeof FETCH_LEAVE_TYPES_FINISHED;
  leaveTypes: LeaveType[];
}

export interface SetErrorMessageAction {
  type: typeof SET_ERROR_MESSAGE;
  message?: string;
}

export type ApplyLeaveActionTypes =
  | PickFromDateAction
  | PickToDateAction
  | AssignSingleDayLeaveRequestAction
  | AssignMultipleDayLeaveRequestAction
  | PickSingleDayDurationAction
  | PickMultipleDayPartialOptionAction
  | PickLeaveCommentAction
  | ResetAssignLeaveAction
  | ResetAssignLeaveWithoutSubordinateAction
  | FetchSubordinateLeaveEntitlementAction
  | FetchSubordinateLeaveEntitlementFinishedAction
  | SelectSubordinateLeaveTypeAction
  | FetchSubordinatesAction
  | FetchSubordinatesFinishedAction
  | PickSubordinateAction
  | FetchWorkShiftAction
  | FetchWorkShiftFinishedAction
  | FetchLeaveTypesAction
  | FetchLeaveTypesFinishedAction
  | SetErrorMessageAction;

export interface Subordinate {
  empNumber: string;
  firstName: string;
  lastName: string;
  employeeId: string;
}

export type SubordinateEntitlement =
  | EntitlementSummaryModel
  | SubordinateLeaveBalanceLeaveType;

export interface SubordinateLeaveBalanceLeaveType
  extends Omit<
    EntitlementSummaryModel,
    'id' | 'validFrom' | 'validTo' | 'creditedDate'
  > {
  id?: string;
}
