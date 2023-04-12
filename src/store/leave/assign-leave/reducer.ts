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
  AssignLeaveState,
  ApplyLeaveActionTypes,
  PICK_ASSIGN_LEAVE_FROM_DATE,
  PICK_ASSIGN_LEAVE_TO_DATE,
  PICK_SINGLE_DAY_DURATION,
  PICK_MULTIPLE_DAY_PARTIAL_OPTION,
  PICK_LEAVE_COMMENT,
  RESET_ASSIGN_LEAVE,
  RESET_ASSIGN_LEAVE_WITHOUT_SUBORDINATE,
  FETCH_SUBORDINATE_LEAVE_ENTITLEMENT_FINISHED,
  FETCH_SUBORDINATES_FINISHED,
  PICK_SUBORDINATE,
  SELECT_SUBORDINATE_LEAVE_TYPE,
  FETCH_WORK_SHIFT,
  FETCH_WORK_SHIFT_FINISHED,
  FETCH_LEAVE_TYPES_FINISHED,
  SET_ERROR_MESSAGE,
} from 'store/leave/assign-leave/types';
import {
  FULL_DAY,
  PARTIAL_OPTION_NONE,
  DEFAULT_WORK_SHIFT,
} from 'store/leave/common-screens/types';
import {LOGOUT, WithLogoutAction} from 'store/auth/types';

const initialState: AssignLeaveState = {
  duration: {
    duration: {type: FULL_DAY},
  },
  partialOption: {
    partialOption: PARTIAL_OPTION_NONE,
  },
  workShift: DEFAULT_WORK_SHIFT,
  workShiftFetched: false,
  subordinates: new Map([['', []]]),
};

const assignLeaveReducer = (
  state = initialState,
  action: WithLogoutAction<ApplyLeaveActionTypes>,
): AssignLeaveState => {
  switch (action.type) {
    case PICK_ASSIGN_LEAVE_FROM_DATE:
      return {
        ...state,
        fromDate: action.date,
      };
    case PICK_ASSIGN_LEAVE_TO_DATE:
      return {
        ...state,
        toDate: action.date,
      };
    case PICK_SINGLE_DAY_DURATION:
      return {
        ...state,
        duration: action.duration,
      };
    case PICK_MULTIPLE_DAY_PARTIAL_OPTION:
      return {
        ...state,
        partialOption: action.partialOption,
      };
    case PICK_LEAVE_COMMENT:
      return {
        ...state,
        comment: action.comment,
      };
    case RESET_ASSIGN_LEAVE_WITHOUT_SUBORDINATE:
      return {
        ...initialState,
        subordinates: state.subordinates,
        leaveTypes: state.leaveTypes,
      };
    case FETCH_SUBORDINATE_LEAVE_ENTITLEMENT_FINISHED:
      if (action.error) {
        return state;
      }
      return {
        ...state,
        entitlement: action.payload,
      };
    case FETCH_SUBORDINATES_FINISHED: {
      if (action.error) {
        return state;
      }

      const map = new Map(state.subordinates.entries());
      map.set(action.sourceAction.nameOrId, action.payload ?? []);
      return {
        ...state,
        subordinates: map,
      };
    }
    case PICK_SUBORDINATE: {
      const isSubordinateChanged =
        state.selectedSubordinate?.empNumber !== action.subordinate?.empNumber;

      if (isSubordinateChanged) {
        //reset entitlements, selected leave type, from to dates, comment of previously selected subordinate
        //only if selected subordinate changed
        return {
          ...initialState,
          subordinates: state.subordinates,
          selectedSubordinate: action.subordinate,
          leaveTypes: state.leaveTypes,
        };
      }
      return state;
    }
    case SELECT_SUBORDINATE_LEAVE_TYPE:
      return {
        ...state,
        selectedLeaveTypeId: action.id,
      };
    case FETCH_WORK_SHIFT:
      return {
        ...state,
        workShiftFetched: false,
      };
    case FETCH_WORK_SHIFT_FINISHED:
      return {
        ...state,
        workShift: action.workShift,
        workShiftFetched: true,
      };
    case FETCH_LEAVE_TYPES_FINISHED:
      return {
        ...state,
        leaveTypes: action.leaveTypes,
      };
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.message,
      };
    case RESET_ASSIGN_LEAVE:
    case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default assignLeaveReducer;
