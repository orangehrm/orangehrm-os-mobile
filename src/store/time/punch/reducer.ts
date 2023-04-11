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
  FETCH_PUNCH_STATUS_FINISHED,
  CHANGE_PUNCH_CURRENT_DATE_TIME,
  PICK_PUNCH_NOTE,
  PunchStatusState,
  PunchStatusActionTypes,
  RESET_PUNCH_STATE,
  PUNCHED_IN,
  PUNCHED_OUT,
  FETCH_ATTENDANCE_CONFIG_FINISHED,
  FETCH_UTC_DATE_TIME_FINISHED,
} from './types';
import {LOGOUT, WithLogoutAction} from 'store/auth/types';
import {getUTCDateObjectFromSaveFormat} from 'lib/helpers/attendance';

const initialState: PunchStatusState = {};

const attendanceReducer = (
  state = initialState,
  action: WithLogoutAction<PunchStatusActionTypes>,
): PunchStatusState => {
  switch (action.type) {
    case FETCH_PUNCH_STATUS_FINISHED:
      if (action.error) {
        return state;
      }
      if (action.payload?.state.name === PUNCHED_IN) {
        return {
          ...state,
          punchStatus: action.payload,
        };
      } else if (action.payload?.state.name === PUNCHED_OUT) {
        return {
          ...state,
          punchStatus: action.payload,
        };
      }
      return {
        ...state,
        punchStatus: action.payload,
      };
    case CHANGE_PUNCH_CURRENT_DATE_TIME:
      return {
        ...state,
        punchCurrentDateTime: action.punchCurrentDateTime,
      };
    case FETCH_UTC_DATE_TIME_FINISHED:
      return {
        ...state,
        punchCurrentDateTime: getUTCDateObjectFromSaveFormat(
          action.payload?.utcDate,
          action.payload?.utcTime,
        ),
      };
    case PICK_PUNCH_NOTE:
      return {
        ...state,
        punchNoteSaved: action.noteSaved,
      };
    case RESET_PUNCH_STATE:
      return {
        ...initialState,
      };
    case FETCH_ATTENDANCE_CONFIG_FINISHED:
      return {
        ...state,
        punchAttendanceConfig: action.payload,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default attendanceReducer;
