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
  CommonLeaveState,
  ApplyLeaveActionTypes,
  PICK_FROM_DATE,
  PICK_TO_DATE,
  FULL_DAY,
  PARTIAL_OPTION_NONE,
  PICK_SINGLE_DAY_DURATION,
  PICK_MULTIPLE_DAY_PARTIAL_OPTION,
  RESET_COMMON_LEAVE_SCREENS,
  SET_COMMON_LEAVE_SCREENS_STATE,
  SET_PICKED_STATE,
  FETCH_HOLIDAYS_FINISHED,
  FETCH_WORK_WEEK_FINISHED,
  DEFAULT_WORK_SHIFT,
} from 'store/leave/common-screens/types';
import {LOGOUT, WithLogoutAction} from 'store/auth/types';

const initialState: CommonLeaveState = {
  pickedLeaveDates: false,
  pickedDuration: false,
  pickedPartialOption: false,
  duration: {
    duration: {
      type: FULL_DAY,
    },
  },
  partialOption: {
    partialOption: PARTIAL_OPTION_NONE,
  },
  workShift: DEFAULT_WORK_SHIFT,
  forceUpdateSlider: 0,
};

const leaveCommonReducer = (
  state = initialState,
  action: WithLogoutAction<ApplyLeaveActionTypes>,
): CommonLeaveState => {
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
    case SET_COMMON_LEAVE_SCREENS_STATE:
      return {
        ...state,
        ...action.state,
        forceUpdateSlider: state.forceUpdateSlider + 1,
      };
    case SET_PICKED_STATE:
      if (action.key === undefined) {
        return {
          ...state,
          pickedLeaveDates: initialState.pickedLeaveDates,
          pickedDuration: initialState.pickedDuration,
          pickedPartialOption: initialState.pickedPartialOption,
        };
      }
      return {
        ...state,
        [action.key]: action.state,
      };
    case FETCH_HOLIDAYS_FINISHED:
      return {
        ...state,
        holidays: action.holidays,
      };
    case FETCH_WORK_WEEK_FINISHED:
      return {
        ...state,
        workWeek: action.workWeek,
      };
    case RESET_COMMON_LEAVE_SCREENS:
    case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default leaveCommonReducer;
