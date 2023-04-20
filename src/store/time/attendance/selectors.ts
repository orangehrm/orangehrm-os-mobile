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

import {RootState} from 'store';
import {createSelector} from 'reselect';

import {
  AttendanceObject,
  LeaveObject,
  AttendanceState,
  GraphRecordsObject,
  SingleEmployeeAttendance,
  EmployeeObject,
  AttendanceConfiguration,
  JobRole,
} from './types';
import {WorkWeek, Holiday} from 'store/leave/common-screens/types';
import moment from 'moment';

export const selectAttendaceState = (state: RootState) => state.attendance;

export const selectAttendanceRecords = createSelector<
  RootState,
  AttendanceState,
  AttendanceObject[] | undefined
>([selectAttendaceState], (attendance) => attendance.attendanceObjects);

export const selectLeaveRecords = createSelector<
  RootState,
  AttendanceState,
  LeaveObject[] | undefined
>([selectAttendaceState], (attendance) => attendance.leaveObjects);

export const selectAttendanceGraphRecords = createSelector<
  RootState,
  AttendanceState,
  GraphRecordsObject | undefined
>([selectAttendaceState], (attendance) => attendance.graphObject);

export const selectJobRole = createSelector<
  RootState,
  AttendanceState,
  JobRole | undefined
>([selectAttendaceState], (attendance) => attendance.jobRole);

export const selectHolidays = createSelector<
  RootState,
  AttendanceState,
  Holiday[] | undefined
>([selectAttendaceState], (attendance) => attendance.holidays);

export const selectWorkWeek = createSelector<
  RootState,
  AttendanceState,
  WorkWeek | undefined
>([selectAttendaceState], (attendance) => attendance.workWeek);

export const selectEmployeeAttendanceList = createSelector<
  RootState,
  AttendanceState,
  SingleEmployeeAttendance[] | undefined
>([selectAttendaceState], (attendance) => attendance.employeeList);

export const selectSubordinates = createSelector<
  RootState,
  AttendanceState,
  EmployeeObject[] | undefined
>([selectAttendaceState], (attendance) => attendance.subordinates);

export const selectPickedSubordinate = createSelector<
  RootState,
  AttendanceState,
  EmployeeObject | undefined
>([selectAttendaceState], (attendance) => attendance.selectedSubordinate);

export const selectAttendanceConfiguration = createSelector<
  RootState,
  AttendanceState,
  AttendanceConfiguration
>([selectAttendaceState], (attendance) => attendance.attendanceConfiguration);

export const selectStartDay = createSelector<
  RootState,
  AttendanceConfiguration,
  number
>([selectAttendanceConfiguration], (attendanceConfiguration) =>
  attendanceConfiguration.startDate > moment().isoWeekday()
    ? attendanceConfiguration.startDate - 7
    : attendanceConfiguration.startDate,
);

export const selectEndDay = createSelector<RootState, number, number>(
  [selectStartDay],
  (startDay) => startDay + 6,
);

export const selectAttendanceConfigurationFetched = createSelector<
  RootState,
  AttendanceState,
  boolean
>(
  [selectAttendaceState],
  (attendance) => attendance.attendanceConfigurationFetched,
);
