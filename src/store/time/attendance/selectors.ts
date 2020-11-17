import {RootState} from 'store';
import {createSelector} from 'reselect';

import { PunchStatus, PunchStatusState } from './types';


export const selectPunchStatusState = (state: RootState) => state.punchStatus;

export const selectPunchStatus = createSelector<
  RootState,
  PunchStatusState,
  PunchStatus | undefined
>([selectPunchStatusState], (punchStatus) => punchStatus.punchStatus);
