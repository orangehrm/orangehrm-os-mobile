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
  ACTION_TYPE_CHANGE_STATUS,
  CHANGE_EMPLOYEE_LEAVE_REQUEST_STATUS,
  FETCH_EMPLOYEE_LEAVES,
  FETCH_EMPLOYEE_LEAVE_REQUEST_DETAILS,
  FETCH_EMPLOYEE_LEAVE_REQUEST_DETAILS_FINISHED,
  FETCH_EMPLOYEE_LEAVES_FINISHED,
  FETCH_LEAVE_COMMENT,
  FETCH_LEAVE_COMMENT_FINISHED,
  FETCH_LEAVE_LIST_FINISHED,
  LeaveListState,
  LeaveUsageActionTypes,
  RESET_LEAVE_LIST,
} from 'store/leave/leave-list/types';
import {LOGOUT, WithLogoutAction} from 'store/auth/types';

const initialState: LeaveListState = {};

const leaveUsageReducer = (
  state = initialState,
  action: WithLogoutAction<LeaveUsageActionTypes>,
): LeaveListState => {
  switch (action.type) {
    case FETCH_LEAVE_LIST_FINISHED:
      if (action.error) {
        return state;
      }
      return {
        ...state,
        leaveList: action.payload?.slice(),
        employeeLeaveRequest: initialState.employeeLeaveRequest,
      };
    case FETCH_EMPLOYEE_LEAVES:
      //reset current value when new fetch triggers
      return {
        ...state,
        employeeLeaves: initialState.employeeLeaves,
      };
    case FETCH_EMPLOYEE_LEAVE_REQUEST_DETAILS:
      //reset current value when new fetch triggers
      return {
        ...state,
        employeeLeaveRequestDetails: initialState.employeeLeaveRequestDetails,
      };
    case FETCH_LEAVE_COMMENT:
      //reset current value when new fetch triggers
      return {
        ...state,
        employeeLeaveComment: initialState.employeeLeaveComment,
      };
    case FETCH_LEAVE_COMMENT_FINISHED:
      return {
        ...state,
        employeeLeaveComment: action.payload,
      };
    case FETCH_EMPLOYEE_LEAVES_FINISHED:
      return {
        ...state,
        employeeLeaves: action.payload,
      };
    case FETCH_EMPLOYEE_LEAVE_REQUEST_DETAILS_FINISHED:
      return {
        ...state,
        employeeLeaveRequestData: action.payload,
      };
    case CHANGE_EMPLOYEE_LEAVE_REQUEST_STATUS:
      //reset leave list for refresh the leave list only with state changes
      if (action.action.actionType === ACTION_TYPE_CHANGE_STATUS) {
        return {
          ...state,
          leaveList: initialState.leaveList,
        };
      } else {
        return state;
      }
    case RESET_LEAVE_LIST:
    case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default leaveUsageReducer;
