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
  PICK_ASSIGN_LEAVE_FROM_DATE,
  PICK_ASSIGN_LEAVE_TO_DATE,
  ASSIGN_SINGLE_DAY_LEAVE_REQUEST,
  ASSIGN_MULTIPLE_DAY_LEAVE_REQUEST,
  PICK_SINGLE_DAY_DURATION,
  PICK_MULTIPLE_DAY_PARTIAL_OPTION,
  PICK_LEAVE_COMMENT,
  RESET_ASSIGN_LEAVE,
  RESET_ASSIGN_LEAVE_WITHOUT_SUBORDINATE,
  FETCH_SUBORDINATE_LEAVE_ENTITLEMENT,
  FETCH_SUBORDINATE_LEAVE_ENTITLEMENT_FINISHED,
  SELECT_SUBORDINATE_LEAVE_TYPE,
  FETCH_SUBORDINATES,
  FETCH_SUBORDINATES_FINISHED,
  PICK_SUBORDINATE,
  PickFromDateAction,
  PickToDateAction,
  AssignSingleDayLeaveRequestAction,
  AssignMultipleDayLeaveRequestAction,
  PickSingleDayDurationAction,
  PickMultipleDayPartialOptionAction,
  PickLeaveCommentAction,
  ResetAssignLeaveAction,
  ResetAssignLeaveWithoutSubordinateAction,
  FetchSubordinateLeaveEntitlementAction,
  FetchSubordinateLeaveEntitlementFinishedAction,
  SelectSubordinateLeaveTypeAction,
  FetchSubordinatesAction,
  FetchSubordinatesFinishedAction,
  PickSubordinateAction,
} from 'store/leave/assign-leave/types';
import {$PropertyType} from 'utility-types';
import {Entitlement} from 'store/leave/leave-usage/types';

export const pickAssignLeaveFromDate = (date?: string): PickFromDateAction => ({
  type: PICK_ASSIGN_LEAVE_FROM_DATE,
  date,
});

export const pickAssignLeaveToDate = (date?: string): PickToDateAction => ({
  type: PICK_ASSIGN_LEAVE_TO_DATE,
  date,
});

/**
 * API call with single day leave request action for saga
 * @param payload
 */
export const saveSingleDayLeaveRequest = (
  empNumber: string,
  payload: $PropertyType<AssignSingleDayLeaveRequestAction, 'payload'>,
): AssignSingleDayLeaveRequestAction => ({
  type: ASSIGN_SINGLE_DAY_LEAVE_REQUEST,
  payload,
  empNumber,
});

/**
 * API call with multiple day leave request action for saga
 * @param payload
 */
export const saveMultipleDayLeaveRequest = (
  empNumber: string,
  payload: $PropertyType<AssignMultipleDayLeaveRequestAction, 'payload'>,
): AssignMultipleDayLeaveRequestAction => ({
  type: ASSIGN_MULTIPLE_DAY_LEAVE_REQUEST,
  payload,
  empNumber,
});

export const pickAssignLeaveSingleDayDuration = (
  duration: $PropertyType<PickSingleDayDurationAction, 'duration'>,
): PickSingleDayDurationAction => ({
  type: PICK_SINGLE_DAY_DURATION,
  duration,
});

export const pickAssignLeaveMultipleDayPartialOption = (
  partialOption: $PropertyType<
    PickMultipleDayPartialOptionAction,
    'partialOption'
  >,
): PickMultipleDayPartialOptionAction => ({
  type: PICK_MULTIPLE_DAY_PARTIAL_OPTION,
  partialOption,
});

export const pickAssignLeaveComment = (
  comment?: string,
): PickLeaveCommentAction => ({
  type: PICK_LEAVE_COMMENT,
  comment,
});

/**
 * Reset redux store assign leave data
 */
export const resetAssignLeave = (): ResetAssignLeaveAction => ({
  type: RESET_ASSIGN_LEAVE,
});

export const resetAssignLeaveWithoutSubordinates = (): ResetAssignLeaveWithoutSubordinateAction => ({
  type: RESET_ASSIGN_LEAVE_WITHOUT_SUBORDINATE,
});

export const fetchSubordinateLeaveEntitlements = (
  empNumber: string,
): FetchSubordinateLeaveEntitlementAction => ({
  type: FETCH_SUBORDINATE_LEAVE_ENTITLEMENT,
  empNumber,
});

export const fetchSubordinateLeaveEntitlementsFinished = (
  payload?: Entitlement[],
  error: boolean = false,
): FetchSubordinateLeaveEntitlementFinishedAction => ({
  type: FETCH_SUBORDINATE_LEAVE_ENTITLEMENT_FINISHED,
  payload,
  error,
});

export const selectSubordinateLeaveType = (
  id: string,
): SelectSubordinateLeaveTypeAction => ({
  type: SELECT_SUBORDINATE_LEAVE_TYPE,
  id,
});

export const fetchSubordinates = (): FetchSubordinatesAction => ({
  type: FETCH_SUBORDINATES,
});

export const fetchSubordinatesFinished = (
  payload?: $PropertyType<FetchSubordinatesFinishedAction, 'payload'>,
  error: boolean = false,
): FetchSubordinatesFinishedAction => ({
  type: FETCH_SUBORDINATES_FINISHED,
  payload,
  error,
});

export const pickSubordinate = (
  subordinate?: $PropertyType<PickSubordinateAction, 'subordinate'>,
): PickSubordinateAction => ({
  type: PICK_SUBORDINATE,
  subordinate,
});
