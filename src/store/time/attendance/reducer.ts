import {
  FETCH_ATTENDANCE_RECORDS,
  FETCH_ATTENDANCE_RECORDS_FINISHED,
  FETCH_LEAVE_RECORDS,
  FETCH_LEAVE_RECORDS_FINISHED,
  FETCH_ATTENDANCE_GRAPH_RECORDS,
  FETCH_ATTENDANCE_GRAPH_RECORDS_FINISHED,
  FETCH_HOLIDAYS_FINISHED,
  FETCH_WORK_WEEK_FINISHED,
  FETCH_EMPLOYEE_ATTENDANCE_LIST,
  FETCH_EMPLOYEE_ATTENDANCE_LIST_FINISHED,
  FETCH_SUBORDINATES_FINISHED,
  PICK_SUBORDINATE,
  MyAttendanceState,
  AttendanceActionTypes,
} from './types';
import {LOGOUT, WithLogoutAction} from 'store/auth/types';

const initialState: MyAttendanceState = {};

const myAttendanceReducer = (
  state = initialState,
  action: WithLogoutAction<AttendanceActionTypes>,
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
    case FETCH_HOLIDAYS_FINISHED:
      return {
        ...state,
        holidays: action.payload,
      };
    case FETCH_WORK_WEEK_FINISHED:
      return {
        ...state,
        workWeek: action.payload,
      };
    case FETCH_EMPLOYEE_ATTENDANCE_LIST:
      return {
        ...state,
        employeeList: initialState.employeeList,
      };
    case FETCH_EMPLOYEE_ATTENDANCE_LIST_FINISHED:
      if (action.error) {
        return state;
      }
      return {
        ...state,
        employeeList: action.payload,
      };
    case FETCH_SUBORDINATES_FINISHED:
      if (action.error) {
        return state;
      }
      return {
        ...state,
        subordinates: action.payload,
      };
    case PICK_SUBORDINATE:
      return {
        ...state,
        selectedSubordinate: action.subordinate,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default myAttendanceReducer;
