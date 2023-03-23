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
  FETCH_LEAVE_LIST,
  FETCH_LEAVE_LIST_FINISHED,
  RESET_LEAVE_LIST,
  FETCH_EMPLOYEE_LEAVE_REQUEST,
  FETCH_EMPLOYEE_LEAVE_REQUEST_FINISHED,
  FETCH_EMPLOYEE_LEAVE_REQUEST_DETAILS_FINISHED,
  CHANGE_EMPLOYEE_LEAVE_REQUEST_STATUS,
  FETCH_LEAVE_COMMENT,
  FETCH_LEAVE_COMMENT_FINISHED,
  FetchLeaveListAction,
  FetchLeaveListFinishedAction,
  ResetLeaveListAction,
  FetchEmployeeLeaveRequestAction,
  FetchEmployeeLeaveRequestDetailsAction,
  FetchLeaveCommentAction,
  FetchEmployeeLeaveRequestFinishedAction,
  ChangeEmployeeLeaveRequestStatusAction,
  FetchLeaveCommentFinishedAction,
  FETCH_EMPLOYEE_LEAVE_REQUEST_DETAILS,
  FetchEmployeeLeaveRequestDetailsFinishedAction,
  CHANGE_EMPLOYEE_LEAVE_REQUEST_COMMENT,
  ChangeEmployeeLeaveRequestCommentAction,
} from 'store/leave/leave-list/types';
import {$PropertyType} from 'utility-types';

export const fetchLeaveList = (): FetchLeaveListAction => ({
  type: FETCH_LEAVE_LIST,
});

export const fetchLeaveListFinished = (
  payload?: $PropertyType<FetchLeaveListFinishedAction, 'payload'>,
  error: boolean = false,
): FetchLeaveListFinishedAction => ({
  type: FETCH_LEAVE_LIST_FINISHED,
  payload,
  error,
});

/**
 * Reset redux store leave list
 */
export const resetLeaveList = (): ResetLeaveListAction => ({
  type: RESET_LEAVE_LIST,
});

export const fetchEmployeeLeaveRequest = (
  leaveRequestId: number,
): FetchEmployeeLeaveRequestAction => ({
  type: FETCH_EMPLOYEE_LEAVE_REQUEST,
  leaveRequestId,
});
export const fetchEmployeeLeaveRequestDetails = (
  leaveRequestId: string,
): FetchEmployeeLeaveRequestDetailsAction => ({
  type: FETCH_EMPLOYEE_LEAVE_REQUEST_DETAILS,
  leaveRequestId,
});

export const fetchLeaveComment = (
  leaveRequestId: string,
): FetchLeaveCommentAction => ({
  type: FETCH_LEAVE_COMMENT,
  leaveRequestId,
});

export const fetchEmployeeLeaveRequestFinished = (
  payload?: $PropertyType<FetchEmployeeLeaveRequestFinishedAction, 'payload'>,
  error: boolean = false,
): FetchEmployeeLeaveRequestFinishedAction => ({
  type: FETCH_EMPLOYEE_LEAVE_REQUEST_FINISHED,
  payload,
  error,
});

export const fetchEmployeeLeaveRequestDetailsFinished = (
  payload?: $PropertyType<
    FetchEmployeeLeaveRequestDetailsFinishedAction,
    'payload'
  >,
  error: boolean = false,
): FetchEmployeeLeaveRequestDetailsFinishedAction => ({
  type: FETCH_EMPLOYEE_LEAVE_REQUEST_DETAILS_FINISHED,
  payload,
  error,
});

export const fetchEmployeeLeaveCommentFinished = (
  payload?: $PropertyType<FetchLeaveCommentFinishedAction, 'payload'>,
  error: boolean = false,
): FetchLeaveCommentFinishedAction => ({
  type: FETCH_LEAVE_COMMENT_FINISHED,
  payload,
  error,
});

/**
 * Change employee leave request status or add new comment
 * @param {object} action
 * @returns {object}
 */
export const changeEmployeeLeaveRequestStatus = (
  leaveRequestId: number,
  action: $PropertyType<ChangeEmployeeLeaveRequestStatusAction, 'action'>,
): ChangeEmployeeLeaveRequestStatusAction => ({
  type: CHANGE_EMPLOYEE_LEAVE_REQUEST_STATUS,
  leaveRequestId,
  action,
});
export const changeEmployeeLeaveRequestComment = (
  leaveRequestId: number,
  action: $PropertyType<ChangeEmployeeLeaveRequestCommentAction, 'action'>,
): ChangeEmployeeLeaveRequestCommentAction => ({
  type: CHANGE_EMPLOYEE_LEAVE_REQUEST_COMMENT,
  leaveRequestId,
  action,
});
