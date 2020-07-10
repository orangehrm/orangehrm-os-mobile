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
  LeaveListState,
  LeaveUsageActionTypes,
  FETCH_LEAVE_LIST_FINISHED,
  RESET_LEAVE_LIST,
  FETCH_EMPLOYEE_LEAVE_REQUEST,
  FETCH_EMPLOYEE_LEAVE_REQUEST_FINISHED,
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
    case FETCH_EMPLOYEE_LEAVE_REQUEST:
      //reset current value when new fetch triggers
      return {
        ...state,
        employeeLeaveRequest: initialState.employeeLeaveRequest,
      };
    case FETCH_EMPLOYEE_LEAVE_REQUEST_FINISHED:
      return {
        ...state,
        employeeLeaveRequest: action.payload,
      };
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
