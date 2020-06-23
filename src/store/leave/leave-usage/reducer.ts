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
  LeaveUsageState,
  LeaveUsageActionTypes,
  FETCH_MY_LEAVE_FINISHED,
  SELECT_LEAVE_TYPE,
} from 'store/leave/leave-usage/types';
import {LOGOUT, WithLogoutAction} from 'store/auth/types';

const initialState: LeaveUsageState = {};

const leaveUsageReducer = (
  state = initialState,
  action: WithLogoutAction<LeaveUsageActionTypes>,
): LeaveUsageState => {
  switch (action.type) {
    case FETCH_MY_LEAVE_FINISHED:
      return {
        ...state,
        entitlement: action.payload?.entitlement,
      };
    case SELECT_LEAVE_TYPE:
      return {
        ...state,
        selectedLeaveTypeId: action.id,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default leaveUsageReducer;
