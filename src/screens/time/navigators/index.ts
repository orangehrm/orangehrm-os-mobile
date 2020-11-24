import {
    PUNCH_IN_REQUEST_SUCCESS,
    PUNCH_OUT_REQUEST_SUCCESS,
  } from 'screens';
import {NavigationProp, RouteProp} from '@react-navigation/native';

export interface PunchInRequestSuccessParam {
    success: string;
    id: number;
    datetime: string;
    note: string;
    timezone: string;
}

export interface PunchOutRequestSuccessParam {
    success: string;
    id: number;
    punchInDateTime: string;
    punchInTimeZone: number;
    punchInNote: string;
    punchOutDateTime: string;
    punchOutTimeZone: number;
    punchOutNote: string;
}

export type PunchInRequestSuccessParamList = {
    [PUNCH_IN_REQUEST_SUCCESS]: PunchInRequestSuccessParam;
};

export type PunchInRequestSuccessRouteParams = RouteProp<
PunchInRequestSuccessParamList,
    typeof PUNCH_IN_REQUEST_SUCCESS
>;

export type PunchOutRequestSuccessParamList = {
    [PUNCH_OUT_REQUEST_SUCCESS]: PunchOutRequestSuccessParam;
};

export type PunchOutRequestSuccessRouteParams = RouteProp<
PunchOutRequestSuccessParamList,
    typeof PUNCH_OUT_REQUEST_SUCCESS
>;