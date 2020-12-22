import {RootState} from 'store';
import {createSelector} from 'reselect';

import {
  AttendanceObject,
  LeaveObject,
  MyAttendanceState,
  GraphRecordsObject,
  SingleEmployeeAttendance,
  EmployeeObject,
} from './types';
import {WorkWeek, Holiday} from 'store/leave/common-screens/types';

export const selectAttendaceState = (state: RootState) => state.attendance;

export const selectAttendanceRecords = createSelector<
  RootState,
  MyAttendanceState,
  AttendanceObject[] | undefined
>([selectAttendaceState], (attendance) => attendance.attendanceObjects);

export const selectLeaveRecords = createSelector<
  RootState,
  MyAttendanceState,
  LeaveObject[] | undefined
>([selectAttendaceState], (attendance) => attendance.leaveObjects);

export const selectAttendanceGraphRecords = createSelector<
  RootState,
  MyAttendanceState,
  GraphRecordsObject | undefined
>([selectAttendaceState], (attendance) => attendance.graphObject);

export const selectHolidays = createSelector<
  RootState,
  MyAttendanceState,
  Holiday[] | undefined
>([selectAttendaceState], (attendance) => attendance.holidays);

export const selectWorkWeek = createSelector<
  RootState,
  MyAttendanceState,
  WorkWeek | undefined
>([selectAttendaceState], (attendance) => attendance.workWeek);

export const selectEmployeeAttendanceList = createSelector<
  RootState,
  MyAttendanceState,
  SingleEmployeeAttendance[] | undefined
>([selectAttendaceState], (attendance) => attendance.employeeList);

export const selectSubordinates = createSelector<
  RootState,
  MyAttendanceState,
  EmployeeObject[] | undefined
>([selectAttendaceState], (attendance) => attendance.subordinates);

export const selectPickedSubordinate = createSelector<
  RootState,
  MyAttendanceState,
  EmployeeObject | undefined
>([selectAttendaceState], (attendance) => attendance.selectedSubordinate);
