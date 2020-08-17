/*
 * This file is part of OrangeHRM
 *
 * Copyright (C) 2020 onwards OrangeHRM (https://www.orangehrm.com/)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

import {NavigationProp, RouteProp} from '@react-navigation/native';
import {
  PICK_EMPLOYEE,
  LEAVE_DAYS,
  LEAVE_COMMENTS,
  LEAVE_REQUEST_SUCCESS,
} from 'screens';
import {EmployeeLeaveRequest} from 'store/leave/leave-list/types';
import {selectEmployeeLeaveRequest} from 'store/leave/leave-list/selectors';
import {selectLeaveRequestDetail} from 'store/leave/leave-usage/selectors';
import {changeEmployeeLeaveRequestStatus} from 'store/leave/leave-list/actions';
import {changeMyLeaveRequestStatus} from 'store/leave/leave-usage/actions';

export interface Employee {
  empNumber: string;
  employeeId: string;
  firstName: string;
  lastName: string;
}

export type CommonNavigatorParamList = {
  [PICK_EMPLOYEE]: PickEmployeeParams;
};

export interface PickEmployeeParams {
  employees?: Employee[];
  textValue: string;
  setTextValue: (text: string) => void;
  pickEmployee: (employee: Employee) => void;
  onRefresh: () => void;
}

export type PickEmployeeRouteParams = RouteProp<
  CommonNavigatorParamList,
  typeof PICK_EMPLOYEE
>;

export type PickEmployeeNavigationProp = NavigationProp<
  CommonNavigatorParamList,
  typeof PICK_EMPLOYEE
>;

export interface LeaveDaysParam {
  employeeLeaveRequest: EmployeeLeaveRequest;
}

export type LeaveDaysParamList = {
  [LEAVE_DAYS]: LeaveDaysParam;
};

export type LeaveDaysRouteParams = RouteProp<
  LeaveDaysParamList,
  typeof LEAVE_DAYS
>;

export interface LeaveCommentsParam {
  employeeLeaveRequestSelector:
    | typeof selectEmployeeLeaveRequest
    | typeof selectLeaveRequestDetail;
  changeEmployeeLeaveRequestStatusAction:
    | typeof changeEmployeeLeaveRequestStatus
    | typeof changeMyLeaveRequestStatus;
}

export type LeaveCommentsParamList = {
  [LEAVE_COMMENTS]: LeaveCommentsParam;
};

export type LeaveCommentsRouteParams = RouteProp<
  LeaveCommentsParamList,
  typeof LEAVE_COMMENTS
>;

export interface LeaveRequestSuccessParam {}

export type LeaveRequestSuccessParamList = {
  [LEAVE_REQUEST_SUCCESS]: LeaveRequestSuccessParam;
};

export type LeaveRequestSuccessRouteParams = RouteProp<
  LeaveRequestSuccessParamList,
  typeof LEAVE_REQUEST_SUCCESS
>;
