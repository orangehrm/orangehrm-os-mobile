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
  ApplyLeaveState,
  ApplyLeaveActionTypes,
  PICK_FROM_DATE,
  PICK_TO_DATE,
  PICK_LEAVE_DATES,
  FULL_DAY,
  PARTIAL_OPTION_NONE,
  PICK_SINGLE_DAY_DURATION,
  PICK_MULTIPLE_DAY_PARTIAL_OPTION,
  PICK_LEAVE_COMMENT,
  RESET_APPLY_LEAVE,
  RESET_SINGLE_DAY_DURATION,
  RESET_MULTIPLE_DAY_PARTIAL_OPTION,
} from 'store/leave/apply-leave/types';
import {LOGOUT, WithLogoutAction} from 'store/auth/types';

const initialState: ApplyLeaveState = {
  pickedLeaveDates: false,
  duration: {
    singleType: FULL_DAY,
  },
  partialOption: {
    partialOption: PARTIAL_OPTION_NONE,
  },
};

const applyLeaveReducer = (
  state = initialState,
  action: WithLogoutAction<ApplyLeaveActionTypes>,
): ApplyLeaveState => {
  switch (action.type) {
    case PICK_FROM_DATE:
      return {
        ...state,
        fromDate: action.date,
      };
    case PICK_TO_DATE:
      return {
        ...state,
        toDate: action.date,
      };
    case PICK_LEAVE_DATES:
      return {
        ...state,
        pickedLeaveDates: action.state,
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
    case RESET_SINGLE_DAY_DURATION:
      return {
        ...state,
        duration: initialState.duration,
      };
    case RESET_MULTIPLE_DAY_PARTIAL_OPTION:
      return {
        ...state,
        partialOption: initialState.partialOption,
      };
    case RESET_APPLY_LEAVE:
    case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default applyLeaveReducer;
