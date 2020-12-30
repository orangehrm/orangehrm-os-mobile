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
  DEFAULT_START_DAY,
  FETCH_ATTENDANCE_RECORDS,
  FETCH_ATTENDANCE_RECORDS_FINISHED,
  FETCH_LEAVE_RECORDS,
  FETCH_LEAVE_RECORDS_FINISHED,
  FETCH_ATTENDANCE_GRAPH_RECORDS,
  FETCH_ATTENDANCE_GRAPH_RECORDS_FINISHED,
  FETCH_HOLIDAYS_FINISHED,
  FETCH_WORK_WEEK_FINISHED,
  FETCH_EMPLOYEE_ATTENDANCE_LIST,
  FETCH_EMPLOYEE_ATTENDANCE_LIST_FINISHED,
  FETCH_ATTENDANCE_CONFIGURATION_FINISHED,
  FETCH_SUBORDINATES_FINISHED,
  PICK_SUBORDINATE,
  AttendanceState,
  AttendanceActionTypes,
} from './types';
import {LOGOUT, WithLogoutAction} from 'store/auth/types';

const initialState: AttendanceState = {
  attendanceConfiguration: {startDate: DEFAULT_START_DAY},
  attendanceConfigurationFetched: false,
};

const myAttendanceReducer = (
  state = initialState,
  action: WithLogoutAction<AttendanceActionTypes>,
): AttendanceState => {
  switch (action.type) {
    case FETCH_ATTENDANCE_RECORDS:
      return {
        ...state,
        attendanceObjects: initialState.attendanceObjects,
      };
    case FETCH_ATTENDANCE_RECORDS_FINISHED:
      if (action.error) {
        return state;
      }
      return {
        ...state,
        attendanceObjects: action.payload,
      };
    case FETCH_LEAVE_RECORDS:
      return {
        ...state,
        attendanceObjects: initialState.attendanceObjects,
      };
    case FETCH_LEAVE_RECORDS_FINISHED:
      if (action.error) {
        return state;
      }
      return {
        ...state,
        leaveObjects: action.payload,
      };
    case FETCH_ATTENDANCE_GRAPH_RECORDS:
      return {
        ...state,
        graphObject: initialState.graphObject,
      };
    case FETCH_ATTENDANCE_GRAPH_RECORDS_FINISHED:
      if (action.error) {
        return state;
      }
      return {
        ...state,
        graphObject: action.payload,
      };
    case FETCH_HOLIDAYS_FINISHED:
      return {
        ...state,
        holidays: action.payload,
      };
    case FETCH_WORK_WEEK_FINISHED:
      return {
        ...state,
        workWeek: action.payload,
      };
    case FETCH_EMPLOYEE_ATTENDANCE_LIST:
      return {
        ...state,
        employeeList: initialState.employeeList,
      };
    case FETCH_EMPLOYEE_ATTENDANCE_LIST_FINISHED:
      if (action.error) {
        return state;
      }
      return {
        ...state,
        employeeList: action.payload,
      };
    case FETCH_SUBORDINATES_FINISHED:
      if (action.error) {
        return state;
      }
      return {
        ...state,
        subordinates: action.payload,
      };
    case FETCH_ATTENDANCE_CONFIGURATION_FINISHED:
      if (action.error) {
        return state;
      }
      return {
        ...state,
        attendanceConfiguration: action.payload,
        attendanceConfigurationFetched: true,
      };
    case PICK_SUBORDINATE:
      return {
        ...state,
        selectedSubordinate: action.subordinate,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default myAttendanceReducer;
