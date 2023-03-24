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
  FETCH_MY_LEAVE_ENTITLEMENT_FINISHED,
  FETCH_MY_LEAVE_REQUEST_FINISHED,
  SELECT_LEAVE_TYPE,
  RESET_MY_LEAVE_REQUEST,
  FETCH_MY_LEAVE_DETAILS,
  FETCH_MY_LEAVE_DETAILS_FINISHED,
  CHANGE_MY_LEAVE_REQUEST_STATUS,
  SET_ERROR_MESSAGE,
} from 'store/leave/leave-usage/types';
import {ACTION_TYPE_CHANGE_STATUS} from 'store/leave/leave-list/types';
import {LOGOUT, WithLogoutAction} from 'store/auth/types';

const initialState: LeaveUsageState = {};

const leaveUsageReducer = (
  state = initialState,
  action: WithLogoutAction<LeaveUsageActionTypes>,
): LeaveUsageState => {
  switch (action.type) {
    case FETCH_MY_LEAVE_ENTITLEMENT_FINISHED:
      if (action.error) {
        return state;
      }
      return {
        ...state,
        entitlement: action.payload?.slice(),
      };
    case FETCH_MY_LEAVE_REQUEST_FINISHED:
      if (action.error) {
        return state;
      }

      return {
        ...state,
        leaveRequest: action.payload?.slice(),
        leaveRequestDetail: initialState.leaveRequestDetail,
      };
    case SELECT_LEAVE_TYPE:
      return {
        ...state,
        selectedLeaveTypeId: action.id,
      };
    case FETCH_MY_LEAVE_DETAILS:
      //reset current value when new fetch triggers
      return {
        ...state,
        leaveRequestDetail: initialState.leaveRequestDetail,
      };
    case FETCH_MY_LEAVE_DETAILS_FINISHED:
      return {
        ...state,
        leaveRequestDetail: action.payload,
      };
    case CHANGE_MY_LEAVE_REQUEST_STATUS:
      //reset my leave list, entitlements for refresh the my leave list only with state changes
      if (action.action.actionType === ACTION_TYPE_CHANGE_STATUS) {
        return {
          ...state,
          leaveRequest: initialState.leaveRequest,
          entitlement: initialState.entitlement,
        };
      } else {
        return state;
      }
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.message,
      };
    case RESET_MY_LEAVE_REQUEST:
    case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default leaveUsageReducer;
