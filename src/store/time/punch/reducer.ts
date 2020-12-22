import {
  FETCH_PUNCH_STATUS_FINISHED,
  CHANGE_PUNCH_CURRENT_DATE_TIME,
  PICK_PUNCH_NOTE,
  PunchStatusState,
  PunchStatusActionTypes,
  RESET_PUNCH_STATE,
} from './types';
import {getDateObjectFromSaveFormat} from 'lib/helpers/attendance';
import {LOGOUT, WithLogoutAction} from 'store/auth/types';

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
      if (action.payload?.currentUTCDateTime) {
        return {
          ...state,
          punchStatus: action.payload,
          punchCurrentDateTime: getDateObjectFromSaveFormat(
            action.payload.currentUTCDateTime,
          ),
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
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default attendanceReducer;
