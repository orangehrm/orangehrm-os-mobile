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
  FETCH_TOKEN,
  LOGOUT,
  FETCH_MY_INFO,
  FETCH_MY_INFO_FINISHED,
  FetchTokenAction,
  LogoutAction,
  FetchMyInfoAction,
  FetchMyInfoFinishedAction,
  MyInfo,
} from 'store/auth/types';

export const fetchAuthToken = (
  username: string,
  password: string,
): FetchTokenAction => {
  return {
    type: FETCH_TOKEN,
    username,
    password,
  };
};

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
