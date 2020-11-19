import { FETCH_PUNCH_STATUS_FINISHED,CHANGE_PUNCH_CURRENT_DATE_TIME, PICK_PUNCH_NOTE, PunchStatusState, PunchStatusActionTypes } from './types';

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
      if(action.payload?.currentUtcDateTime){
        let datetime = action.payload.currentUtcDateTime.split(" ",2);
        let fullDate :string[] = datetime[0].split("-",3);
        let time :string[] = datetime[1].split(":",2);
        
        let year = parseInt(fullDate[0],10);
        let month = parseInt(fullDate[1],10);
        let date1 = parseInt(fullDate[2],10);
        let hour = parseInt(time[0],10);
        let minutes = parseInt(time[1],10);

        let date = new Date(Date.UTC(year, month-1, date1, hour, minutes, 0));
        // console.log("in reducer start-up");
        return {
          ...state,
          punchStatus: action.payload,
          punchCurrentDateTime: date
        };
      }
      return {
        ...state,
        punchStatus: action.payload,
      };
    case CHANGE_PUNCH_CURRENT_DATE_TIME :
      return{
        ...state,
        punchCurrentDateTime: action.punchCurrentDateTime
      }
    case PICK_PUNCH_NOTE :
      return {
        ...state,
        punchNoteSaved: action.noteSaved,
      }


    default:
      return state;
  }
};

export default attendanceReducer;
