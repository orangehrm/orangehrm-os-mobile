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
