import {RootState} from 'store';
import {createSelector} from 'reselect';

import {PunchStatus, PunchStatusState} from './types';

export const selectPunchState = (state: RootState) => state.punch;

export const selectPunchStatus = createSelector<
  RootState,
  PunchStatusState,
  PunchStatus | undefined
>([selectPunchState], (attendance) => attendance.punchStatus);

export const selectPunchCurrentDateTime = createSelector<
  RootState,
  PunchStatusState,
  Date | undefined
>([selectPunchState], (attendance) => attendance.punchCurrentDateTime);

export const selectSavedPunchNote = createSelector<
  RootState,
  PunchStatusState,
  string | undefined
>([selectPunchState], (attendance) => attendance.punchNoteSaved);
