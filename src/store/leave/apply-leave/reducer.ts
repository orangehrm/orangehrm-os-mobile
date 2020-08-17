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
  PICK_APPLY_LEAVE_FROM_DATE,
  PICK_APPLY_LEAVE_TO_DATE,
  PICK_SINGLE_DAY_DURATION,
  PICK_MULTIPLE_DAY_PARTIAL_OPTION,
  PICK_LEAVE_COMMENT,
  RESET_APPLY_LEAVE,
  FETCH_WORK_SHIFT,
  FETCH_WORK_SHIFT_FINISHED,
} from 'store/leave/apply-leave/types';
import {
  FULL_DAY,
  PARTIAL_OPTION_NONE,
  DEFAULT_WORK_SHIFT,
} from 'store/leave/common-screens/types';
import {LOGOUT, WithLogoutAction} from 'store/auth/types';

const initialState: ApplyLeaveState = {
  duration: {
    singleType: FULL_DAY,
  },
  partialOption: {
    partialOption: PARTIAL_OPTION_NONE,
  },
  workShift: DEFAULT_WORK_SHIFT,
  workShiftFetched: false,
};

const applyLeaveReducer = (
  state = initialState,
  action: WithLogoutAction<ApplyLeaveActionTypes>,
): ApplyLeaveState => {
  switch (action.type) {
    case PICK_APPLY_LEAVE_FROM_DATE:
      return {
        ...state,
        fromDate: action.date,
      };
    case PICK_APPLY_LEAVE_TO_DATE:
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
