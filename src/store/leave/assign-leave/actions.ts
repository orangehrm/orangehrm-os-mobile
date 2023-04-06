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
  FETCH_WORK_SHIFT,
  FETCH_WORK_SHIFT_FINISHED,
  FETCH_LEAVE_TYPES,
  FETCH_LEAVE_TYPES_FINISHED,
  SET_ERROR_MESSAGE,
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
  FetchWorkShiftAction,
  FetchWorkShiftFinishedAction,
  FetchLeaveTypesAction,
  FetchLeaveTypesFinishedAction,
  SetErrorMessageAction,
} from 'store/leave/assign-leave/types';
import {$PropertyType} from 'utility-types';

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
  empNumber: number,
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
  empNumber: number,
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

export const resetAssignLeaveWithoutSubordinates =
  (): ResetAssignLeaveWithoutSubordinateAction => ({
    type: RESET_ASSIGN_LEAVE_WITHOUT_SUBORDINATE,
  });

export const fetchSubordinateLeaveEntitlements = (
  empNumber: number,
): FetchSubordinateLeaveEntitlementAction => ({
  type: FETCH_SUBORDINATE_LEAVE_ENTITLEMENT,
  empNumber,
});

export const fetchSubordinateLeaveEntitlementsFinished = (
  payload?: $PropertyType<
    FetchSubordinateLeaveEntitlementFinishedAction,
    'payload'
  >,
  error: boolean = false,
): FetchSubordinateLeaveEntitlementFinishedAction => ({
  type: FETCH_SUBORDINATE_LEAVE_ENTITLEMENT_FINISHED,
  payload,
  error,
});

export const selectSubordinateLeaveType = (
  id: number,
): SelectSubordinateLeaveTypeAction => ({
  type: SELECT_SUBORDINATE_LEAVE_TYPE,
  id,
});

export const fetchSubordinates = (
  nameOrId: string,
): FetchSubordinatesAction => ({
  type: FETCH_SUBORDINATES,
  nameOrId,
});

export const fetchSubordinatesFinished = (
  sourceAction: FetchSubordinatesAction,
  payload?: $PropertyType<FetchSubordinatesFinishedAction, 'payload'>,
  error: boolean = false,
): FetchSubordinatesFinishedAction => ({
  type: FETCH_SUBORDINATES_FINISHED,
  sourceAction,
  payload,
  error,
});

export const pickSubordinate = (
  subordinate?: $PropertyType<PickSubordinateAction, 'subordinate'>,
): PickSubordinateAction => ({
  type: PICK_SUBORDINATE,
  subordinate,
});

export const fetchWorkShift = (empNumber: number): FetchWorkShiftAction => ({
  type: FETCH_WORK_SHIFT,
  empNumber,
});

export const fetchWorkShiftFinished = (
  workShift: $PropertyType<FetchWorkShiftFinishedAction, 'workShift'>,
): FetchWorkShiftFinishedAction => ({
  type: FETCH_WORK_SHIFT_FINISHED,
  workShift,
});

export const fetchLeaveTypes = (): FetchLeaveTypesAction => ({
  type: FETCH_LEAVE_TYPES,
});

export const fetchLeaveTypesFinished = (
  leaveTypes: $PropertyType<FetchLeaveTypesFinishedAction, 'leaveTypes'>,
): FetchLeaveTypesFinishedAction => ({
  type: FETCH_LEAVE_TYPES_FINISHED,
  leaveTypes,
});

export const setErrorMessage = (message?: string): SetErrorMessageAction => ({
  type: SET_ERROR_MESSAGE,
  message,
});
