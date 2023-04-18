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

import {$PropertyType} from 'utility-types';

export interface AuthState {
  myInfo?: MyInfo;
  myInfoSuccess: boolean;
  isCalledMyInfo: boolean;
  isFinishedMyInfo: boolean;
  checkingInstance: boolean;
  instanceExists?: boolean;
  menuItems: TransformedMenuItems;
  menuItemsMetaData?: MenuItemsMetaData;
  myInfoFailed?: boolean;
  myInfoError?: ErrorResponse;
  isAuthenticated: boolean;
}

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

export interface FetchMenuItemsAction {
  type: typeof FETCH_ENABLED_MODULES;
}

export interface FetchMenuItemsFinishedAction {
  type: typeof FETCH_ENABLED_MODULES_FINISHED;
  payload?: MenuItems;
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
  | FetchMenuItemsAction
  | FetchMenuItemsFinishedAction
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
  empNumber: number;
  firstName: string;
  lastName: string;
  middleName: string;
  employeeId: string | null;
  jobTitle: JobTitle;
  subunit: SubUnit;
  terminationId: number | null;
}

export interface MyInfo {
  employee: Employee;
}

export interface JobTitle {
  id: number | null;
  title: string | null;
  isDeleted: boolean | null;
}

export interface SubUnit {
  id: string | null;
  name: string | null;
}

/**
 * @deprecated
 */
export interface Supervisor {
  id: string;
  name: string;
}

export type AuthResponse = AuthSuccessResponse | AuthErrorResponse;

export const MENU_LEAVE = 'Leave';
export const MENU_TIME = 'Time';

export type MenuNames = typeof MENU_LEAVE | typeof MENU_TIME;

interface ChildMenuItem {
  name: string;
}

export interface MenuItem {
  name: MenuNames;
  children: ChildMenuItem[];
}

export interface MenuItemsMetaData {
  isLeavePeriodDefined: boolean;
  isTimesheetPeriodDefined: boolean;
}

export interface MenuItems {
  menuItems: MenuItem[];
  meta: MenuItemsMetaData;
}

export type TransformedMenuItems = Map<MenuNames, Map<string, ChildMenuItem>>;
