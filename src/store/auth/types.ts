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

export const USER_ROLE_ADMIN = 'Admin';
export const USER_ROLE_ESS = 'ESS';

export interface AuthState {
  myInfo?: MyInfo;
  myInfoSuccess: boolean;
  isCalledMyInfo: boolean;
  isFinishedMyInfo: boolean;
  checkingInstance: boolean;
  instanceExists: boolean;
}

export const FETCH_TOKEN = 'AUTH_FETCH_TOKEN';
export const LOGOUT = 'AUTH_LOGOUT';
export const FETCH_MY_INFO = 'AUTH_FETCH_MY_INFO';
export const FETCH_MY_INFO_FINISHED = 'AUTH_FETCH_MY_INFO_FINISHED';
export const CHECK_INSTANCE = 'AUTH_CHECK_INSTANCE';
export const CHECK_INSTANCE_FINISHED = 'AUTH_CHECK_INSTANCE_FINISHED';

export interface FetchTokenAction {
  type: typeof FETCH_TOKEN;
  username: string;
  password: string;
}

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
  error: boolean;
}

export type AuthActionTypes =
  | FetchTokenAction
  | LogoutAction
  | FetchMyInfoAction
  | FetchMyInfoFinishedAction
  | CheckInstanceAction
  | CheckInstanceFinishedAction;

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

export type NullableString = string | null;

export interface Employee {
  firstName: string;
  lastName: string;
  middleName: string;
  fullName: string;
  employeeId: string;
  code: string;
  jobTitle: NullableString;
  unit: NullableString;
  supervisor: null | Supervisor[];
}

export interface EmployeePhoto {
  employeePhoto: NullableString;
}

export interface User {
  userName: string;
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
}

export interface Supervisor {
  id: string;
  name: string;
}

export type AuthResponse = AuthSuccessResponse | AuthErrorResponse;
