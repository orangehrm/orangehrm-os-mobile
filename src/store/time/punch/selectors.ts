import {RootState} from 'store';
import {createSelector} from 'reselect';

import {PunchStatus, PunchStatusState} from './types';

export const selectAttendaceState = (state: RootState) => state.attendance;

export const selectPunchStatus = createSelector<
  RootState,
  PunchStatusState,
  PunchStatus | undefined
>([selectAttendaceState], (attendance) => attendance.punchStatus);

export const selectPunchCurrentDateTime = createSelector<
  RootState,
  PunchStatusState,
  Date | undefined
>([selectAttendaceState], (attendance) => attendance.punchCurrentDateTime);

export const selectSavedPunchNote = createSelector<
  RootState,
  PunchStatusState,
  string | undefined
>([selectAttendaceState], (attendance) => attendance.punchNoteSaved);
