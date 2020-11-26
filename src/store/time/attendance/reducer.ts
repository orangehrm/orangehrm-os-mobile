import {
  FETCH_PUNCH_STATUS_FINISHED,
  CHANGE_PUNCH_CURRENT_DATE_TIME,
  PICK_PUNCH_NOTE,
  PunchStatusState,
  PunchStatusActionTypes,
  RESET_PUNCH_STATE,
} from './types';
import {getDateObjectFromSaveFormat} from '../../../lib/helpers/attendance';

const initialState: PunchStatusState = {};

const attendanceReducer = (
  state = initialState,
  action: PunchStatusActionTypes,
): PunchStatusState => {
  switch (action.type) {
    case FETCH_PUNCH_STATUS_FINISHED:
      if (action.error) {
        return state;
      }
      if (action.payload?.currentUTCDateTime) {
        let date = getDateObjectFromSaveFormat(
          action.payload.currentUTCDateTime,
        );
        return {
          ...state,
          punchStatus: action.payload,
          punchCurrentDateTime: date,
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
    case PICK_PUNCH_NOTE:
      return {
        ...state,
        punchNoteSaved: action.noteSaved,
      };
    case RESET_PUNCH_STATE:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default attendanceReducer;
