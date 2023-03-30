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
  FETCH_MY_LEAVE_ENTITLEMENT,
  FETCH_MY_LEAVE_ENTITLEMENT_FINISHED,
  SELECT_LEAVE_TYPE,
  FETCH_MY_LEAVE_REQUEST,
  FETCH_MY_LEAVE_REQUEST_FINISHED,
  RESET_MY_LEAVE_REQUEST,
  FETCH_MY_LEAVE_DETAILS,
  FETCH_MY_LEAVE_DETAILS_FINISHED,
  FETCH_MY_LEAVE_COMMENTS,
  CHANGE_MY_LEAVE_REQUEST_STATUS,
  ADD_MY_LEAVE_REQUEST_COMMENT,
  SET_ERROR_MESSAGE,
  FetchMyLeaveEntitlementAction,
  FetchMyLeaveEntitlementFinishedAction,
  SelectLeaveTypeAction,
  FetchMyLeaveRequestAction,
  FetchMyLeaveRequestFinishedAction,
  ResetMyLeaveRequestAction,
  Entitlement,
  FetchMyLeaveRequestDetailsAction,
  FetchMyLeaveRequestDetailsFinishedAction,
  FetchMyLeaveCommentAction,
  ChangeMyLeaveRequestStatusAction,
  AddMyLeaveRequestCommentAction,
  SetErrorMessageAction,
} from 'store/leave/leave-usage/types';
import {LeaveRequestDetailedModel} from 'store/leave/leave-list/types';
import {$PropertyType} from 'utility-types';

export const fetchMyLeaveEntitlements = (): FetchMyLeaveEntitlementAction => ({
  type: FETCH_MY_LEAVE_ENTITLEMENT,
});

export const fetchMyLeaveEntitlementsFinished = (
  payload?: Entitlement[],
  error: boolean = false,
): FetchMyLeaveEntitlementFinishedAction => ({
  type: FETCH_MY_LEAVE_ENTITLEMENT_FINISHED,
  payload,
  error,
});

export const selectLeaveType = (id: string): SelectLeaveTypeAction => ({
  type: SELECT_LEAVE_TYPE,
  id,
});

export const fetchMyLeaveRequests = (): FetchMyLeaveRequestAction => ({
  type: FETCH_MY_LEAVE_REQUEST,
});

export const fetchMyLeaveRequestsFinished = (
  payload?: LeaveRequestDetailedModel[],
  error: boolean = false,
): FetchMyLeaveRequestFinishedAction => ({
  type: FETCH_MY_LEAVE_REQUEST_FINISHED,
  payload,
  error,
});

/**
 * Reset redux store my leave requests
 */
export const resethMyLeaveRequests = (): ResetMyLeaveRequestAction => ({
  type: RESET_MY_LEAVE_REQUEST,
});

/**
 * Change leave request status or add new comment
 * @param {object} action
 * @returns {object}
 */
export const changeMyLeaveRequestStatus = (
  leaveRequestId: number,
  status: $PropertyType<ChangeMyLeaveRequestStatusAction, 'status'>,
): ChangeMyLeaveRequestStatusAction => ({
  type: CHANGE_MY_LEAVE_REQUEST_STATUS,
  leaveRequestId,
  status,
});

export const fetchMyLeaveDetails = (
  leaveRequestId: number,
): FetchMyLeaveRequestDetailsAction => ({
  type: FETCH_MY_LEAVE_DETAILS,
  leaveRequestId,
});

export const fetchMyLeaveDetailsFinished = (
  payload?: $PropertyType<FetchMyLeaveRequestDetailsFinishedAction, 'payload'>,
  error: boolean = false,
): FetchMyLeaveRequestDetailsFinishedAction => ({
  type: FETCH_MY_LEAVE_DETAILS_FINISHED,
  payload,
  error,
});

export const fetchMyLeaveComments = (
  leaveRequestId: number,
): FetchMyLeaveCommentAction => ({
  type: FETCH_MY_LEAVE_COMMENTS,
  leaveRequestId,
});

export const addMyLeaveRequestComment = (
  leaveRequestId: number,
  comment: $PropertyType<AddMyLeaveRequestCommentAction, 'comment'>,
): AddMyLeaveRequestCommentAction => ({
  type: ADD_MY_LEAVE_REQUEST_COMMENT,
  leaveRequestId,
  comment,
});

export const setErrorMessage = (message?: string): SetErrorMessageAction => ({
  type: SET_ERROR_MESSAGE,
  message,
});
