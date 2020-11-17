import { FETCH_PUNCH_STATUS_FINISHED, PunchStatusState, PunchStatusActionTypes } from './types';

const initialState: PunchStatusState = {};

const punchStatusReducer = (
  state = initialState,
  action: PunchStatusActionTypes,
): PunchStatusState => {
  // console.log("s");
  switch (action.type) {
    case FETCH_PUNCH_STATUS_FINISHED:
      if (action.error) {
        return state;
      }
      return {
        ...state,
        punchStatus: action.payload
      };
    default:
      return state;
  }
};

export default punchStatusReducer;
