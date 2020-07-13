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
  CHANGE_EMPLOYEE_LEAVE_REQUEST_STATUS,
  FetchLeaveListAction,
  FetchLeaveListFinishedAction,
  ResetLeaveListAction,
  FetchEmployeeLeaveRequestAction,
  FetchEmployeeLeaveRequestFinishedAction,
  ChangeEmployeeLeaveRequestStatusAction,
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
export const resethMyLeaveRequests = (): ResetLeaveListAction => ({
  type: RESET_LEAVE_LIST,
});

export const fetchEmployeeLeaveRequest = (
  leaveRequestId: string,
): FetchEmployeeLeaveRequestAction => ({
  type: FETCH_EMPLOYEE_LEAVE_REQUEST,
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

/**
 * Change employee leave request status or add new comment
 * @param {object} action
 * @returns {object}
 */
export const changeEmployeeLeaveRequestStatus = (
  leaveRequestId: string,
  action: $PropertyType<ChangeEmployeeLeaveRequestStatusAction, 'action'>,
): ChangeEmployeeLeaveRequestStatusAction => ({
  type: CHANGE_EMPLOYEE_LEAVE_REQUEST_STATUS,
  leaveRequestId,
  action,
});
