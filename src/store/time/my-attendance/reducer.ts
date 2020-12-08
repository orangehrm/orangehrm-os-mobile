import {
  FETCH_ATTENDANCE_RECORDS,
  FETCH_ATTENDANCE_RECORDS_FINISHED,
  FETCH_LEAVE_RECORDS,
  FETCH_LEAVE_RECORDS_FINISHED,
  FETCH_ATTENDANCE_GRAPH_RECORDS,
  FETCH_ATTENDANCE_GRAPH_RECORDS_FINISHED,
  // FETCH_EMPLOYEE_DETAILS_FINISHED,
  // FETCH_WORK_WEEK_FINISHED,
  // FETCH_HOLIDAY_FINISHED,
  MyAttendanceState,
  AttendanceActionTypes,
} from './types';

const initialState: MyAttendanceState = {};

const myAttendanceReducer = (
  state = initialState,
  action: AttendanceActionTypes,
): MyAttendanceState => {
  switch (action.type) {
    case FETCH_ATTENDANCE_RECORDS:
      return {
        ...state,
        attendanceObjects: initialState.attendanceObjects,
      };
    case FETCH_ATTENDANCE_RECORDS_FINISHED:
      if (action.error) {
        return state;
      }
      return {
        ...state,
        attendanceObjects: action.payload,
      };
    case FETCH_LEAVE_RECORDS:
      return {
        ...state,
        attendanceObjects: initialState.attendanceObjects,
      };
    case FETCH_LEAVE_RECORDS_FINISHED:
      if (action.error) {
        return state;
      }
      return {
        ...state,
        leaveObjects: action.payload,
      };
    case FETCH_ATTENDANCE_GRAPH_RECORDS:
      return {
        ...state,
        graphObject: initialState.graphObject,
      };
    case FETCH_ATTENDANCE_GRAPH_RECORDS_FINISHED:
      if (action.error) {
        return state;
      }
      return {
        ...state,
        graphObject: action.payload,
      };
    default:
      return state;
  }
};

export default myAttendanceReducer;
