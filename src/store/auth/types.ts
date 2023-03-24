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

import {$PropertyType, MutableKeys} from 'utility-types';

export const USER_ROLE_ADMIN = 'Admin';
export const USER_ROLE_ESS = 'ESS';

export interface AuthState {
  myInfo?: MyInfo;
  myInfoSuccess: boolean;
  isCalledMyInfo: boolean;
  isFinishedMyInfo: boolean;
  checkingInstance: boolean;
  instanceExists?: boolean;
  enabledModules?: EnabledModules;
  myInfoFailed?: boolean;
  myInfoError?: ErrorResponse;
}

export const FETCH_TOKEN = 'AUTH_FETCH_TOKEN';
export const LOGOUT = 'AUTH_LOGOUT';
export const FETCH_MY_INFO = 'AUTH_FETCH_MY_INFO';
export const FETCH_MY_INFO_FINISHED = 'AUTH_FETCH_MY_INFO_FINISHED';
export const CHECK_INSTANCE = 'AUTH_CHECK_INSTANCE';
export const CHECK_INSTANCE_FINISHED = 'AUTH_CHECK_INSTANCE_FINISHED';
export const FETCH_ENABLED_MODULES = 'AUTH_FETCH_ENABLED_MODULES';
export const FETCH_ENABLED_MODULES_FINISHED =
  'AUTH_FETCH_ENABLED_MODULES_FINISHED';
export const MY_INFO_FAILED = 'AUTH_MY_INFO_FAILED';
export const FETCH_NEW_TOKEN_FINISHED = 'AUTH_FETCH_NEW_TOKEN_FINISHED';
export const FETCH_API_VERSION = 'AUTH_FETCH_API_VERSION';

// export interface FetchTokenAction {
//   type: typeof FETCH_TOKEN;
//   username: string;
//   password: string;
// }

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type WithLogoutAction<T> = LogoutAction | T;

export interface FetchMyInfoAction {
  type: typeof FETCH_MY_INFO;
}

export interface FetchMyInfoFinishedAction {
  type: typeof FETCH_MY_INFO_FINISHED;
  payload?: MyInfo;
  error: boolean;
}

export interface CheckInstanceAction {
  type: typeof CHECK_INSTANCE;
}

export interface CheckInstanceFinishedAction {
  type: typeof CHECK_INSTANCE_FINISHED;
  error?: boolean;
}

export interface FetchEnabledModulesAction {
  type: typeof FETCH_ENABLED_MODULES;
}

export interface FetchEnabledModulesFinishedAction {
  type: typeof FETCH_ENABLED_MODULES_FINISHED;
  payload?: EnabledModules;
  error: boolean;
}

export interface MyInfoFailedAction {
  type: typeof MY_INFO_FAILED;
  state: $PropertyType<AuthState, 'myInfoFailed'>;
  error?: ErrorResponse;
}

export interface FetchNewTokenFinishedAction {
  type: typeof FETCH_NEW_TOKEN_FINISHED;
}

export type AuthActionTypes =
  | LogoutAction
  | FetchMyInfoAction
  | FetchMyInfoFinishedAction
  | CheckInstanceAction
  | CheckInstanceFinishedAction
  | FetchEnabledModulesAction
  | FetchEnabledModulesFinishedAction
  | MyInfoFailedAction
  | FetchNewTokenFinishedAction;

export interface AuthSuccessResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string | null;
  refresh_token: string;
}

export interface AuthErrorResponse {
  error: string;
  error_description: string;
}

export interface ErrorResponse {
  error?: string;
  code: number;
}

export type NullableString = string | null;

export interface Employee {
  firstName: string;
  lastName: string;
  middleName: string;
  fullName: string;
  employeeId: string;
  code: string | null;
  jobTitle: JobTitle;
  unit: SubUnit;
  supervisor: null | Supervisor[];
}

export interface EmployeePhoto {
  employeePhoto: NullableString;
}

export interface User {
  userRole: typeof USER_ROLE_ADMIN | typeof USER_ROLE_ESS;
  isSupervisor: boolean;
  isProjectAdmin: boolean;
  isManager: boolean;
  isDirector: boolean;
  isAcceptor: boolean;
  isOfferer: boolean;
  isHiringManager: boolean;
  isInterviewer: boolean;
}

export interface MyInfo {
  employee: Employee;
  employeePhoto: NullableString;
  user: User;
  // employeeId: string; //add employeeId can use in other places
  // firstName: string;
  // lastName: string;
  // middleName: string;
  // jobTitle: JobTitle; //add JobTitle need to change in other place
  // subUnit: SubUnit; //add SubUnit need to change in other place previously unit
  // supervisor: null | Supervisor[];
  // employeePhoto: NullableString;
}

export interface JobTitle {
  id: string;
  title: string;
  isDeleted: boolean;
}

export interface SubUnit {
  id: string;
  name: string;
}

export interface Supervisor {
  id: string;
  name: string;
}

export type AuthResponse = AuthSuccessResponse | AuthErrorResponse;

export const MODULE_ADMIN = 'admin';
export const MODULE_PIM = 'pim';
export const MODULE_LEAVE = 'leave';
export const MODULE_TIME = 'time';
export const MODULE_RECRUITMENT = 'recruitment';
export const MODULE_PERFORMANCE = 'performance';
export const MODULE_DIRECTORY = 'directory';
export const MODULE_MAINTENANCE = 'maintenance';
export const MODULE_MOILE = 'mobile';

export type Modules = MutableKeys<$PropertyType<EnabledModules, 'modules'>>;

export interface EnabledModules {
  modules: {
    [MODULE_ADMIN]: boolean;
    [MODULE_PIM]: boolean;
    [MODULE_LEAVE]: boolean;
    [MODULE_TIME]: boolean;
    [MODULE_RECRUITMENT]: boolean;
    [MODULE_PERFORMANCE]: boolean;
    [MODULE_DIRECTORY]: boolean;
    [MODULE_MAINTENANCE]: boolean;
    [MODULE_MOILE]: boolean;
  };
  meta: {
    [MODULE_LEAVE]: {
      isLeavePeriodDefined: boolean;
    };
    [MODULE_TIME]: {
      isTimesheetPeriodDefined: boolean;
    };
  };
}
