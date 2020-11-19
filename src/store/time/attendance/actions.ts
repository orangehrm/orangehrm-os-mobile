import {
  FETCH_PUNCH_STATUS,
  FETCH_PUNCH_STATUS_FINISHED,
  CHANGE_PUNCH_CURRENT_DATE_TIME,
  PICK_PUNCH_NOTE,
  FetchPunchStatusAction,
  FetchPunchStatusFinishedAction,
  changePunchCurrentDateTimeAction,
  setPunchNoteAction,
  PunchStatus,
} from './types';

export const setPunchNote = (note: string): setPunchNoteAction => ({
  type: PICK_PUNCH_NOTE,
  noteSaved: note,
});

export const fetchPunchStatus = (): FetchPunchStatusAction => ({
  type: FETCH_PUNCH_STATUS,
});

export const fetchPunchStatusFinished = (
  payload?: PunchStatus,
  error: boolean = false,
): FetchPunchStatusFinishedAction => ({
  type: FETCH_PUNCH_STATUS_FINISHED,
  payload,
  error,
});

export const changePunchCurrentDateTime = (
  datetime?: Date,
): changePunchCurrentDateTimeAction => ({
  type: CHANGE_PUNCH_CURRENT_DATE_TIME,
  punchCurrentDateTime: datetime,
});
