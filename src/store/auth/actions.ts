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

import {
  // FETCH_TOKEN,
  LOGOUT,
  FETCH_MY_INFO,
  FETCH_MY_INFO_FINISHED,
  CHECK_INSTANCE,
  CHECK_INSTANCE_FINISHED,
  FETCH_ENABLED_MODULES,
  FETCH_ENABLED_MODULES_FINISHED,
  MY_INFO_FAILED,
  FETCH_NEW_TOKEN_FINISHED,
  // FetchTokenAction,
  LogoutAction,
  FetchMyInfoAction,
  FetchMyInfoFinishedAction,
  CheckInstanceAction,
  CheckInstanceFinishedAction,
  MyInfo,
  FetchEnabledModulesFinishedAction,
  FetchEnabledModulesAction,
  EnabledModules,
  MyInfoFailedAction,
  FetchNewTokenFinishedAction,
} from 'store/auth/types';
import {$PropertyType} from 'utility-types';

// export const fetchAuthToken = (
//   username: string,
//   password: string,
// ): FetchTokenAction => {
//   return {
//     type: FETCH_TOKEN,
//     username,
//     password,
//   };
// };

export const logout = (): LogoutAction => {
  return {
    type: LOGOUT,
  };
};

export const fetchMyInfo = (): FetchMyInfoAction => {
  return {
    type: FETCH_MY_INFO,
  };
};

export const fetchMyInfoFinished = (
  payload?: MyInfo,
  error: boolean = false,
): FetchMyInfoFinishedAction => {
  return {
    type: FETCH_MY_INFO_FINISHED,
    payload,
    error,
  };
};

export const checkInstance = (): CheckInstanceAction => ({
  type: CHECK_INSTANCE,
});

export const checkInstanceFinished = (
  error?: boolean,
): CheckInstanceFinishedAction => ({
  type: CHECK_INSTANCE_FINISHED,
  error,
});

export const fetchEnabledModules = (): FetchEnabledModulesAction => ({
  type: FETCH_ENABLED_MODULES,
});

export const fetchEnabledModulesFinished = (
  payload?: EnabledModules,
  error: boolean = false,
): FetchEnabledModulesFinishedAction => ({
  type: FETCH_ENABLED_MODULES_FINISHED,
  payload,
  error,
});

export const myInfoFailed = (
  state: $PropertyType<MyInfoFailedAction, 'state'>,
  error?: $PropertyType<MyInfoFailedAction, 'error'>,
): MyInfoFailedAction => ({
  type: MY_INFO_FAILED,
  state,
  error,
});

export const fetchNewAuthTokenFinished = (): FetchNewTokenFinishedAction => ({
  type: FETCH_NEW_TOKEN_FINISHED,
});
