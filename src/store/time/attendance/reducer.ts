import {
  DEFAULT_START_DAY,
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
  FETCH_ATTENDANCE_CONFIGURATION_FINISHED,
  FETCH_SUBORDINATES_FINISHED,
  PICK_SUBORDINATE,
  AttendanceState,
  AttendanceActionTypes,
} from './types';
import {LOGOUT, WithLogoutAction} from 'store/auth/types';

const initialState: AttendanceState = {
  attendanceConfiguration: {startDate: DEFAULT_START_DAY},
  attendanceConfigurationFetched: false,
};

const myAttendanceReducer = (
  state = initialState,
  action: WithLogoutAction<AttendanceActionTypes>,
): AttendanceState => {
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
    case FETCH_ATTENDANCE_CONFIGURATION_FINISHED:
      if (action.error) {
        return state;
      }
      return {
        ...state,
        attendanceConfiguration: action.payload,
        attendanceConfigurationFetched: true,
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
