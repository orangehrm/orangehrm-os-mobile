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
  AuthState,
  FETCH_MY_INFO,
  FETCH_MY_INFO_FINISHED,
  CHECK_INSTANCE,
  CHECK_INSTANCE_FINISHED,
  FETCH_ENABLED_MODULES_FINISHED,
  MY_INFO_FAILED,
  AuthActionTypes,
  TransformedMenuItems,
} from 'store/auth/types';
import {LOGOUT, WithLogoutAction} from 'store/auth/types';

const initialState: AuthState = {
  myInfoSuccess: false,
  isCalledMyInfo: false,
  isFinishedMyInfo: false,
  checkingInstance: false,
  isAuthenticated: false,
  menuItems: new Map(),
};

const authReducer = (
  state = initialState,
  action: WithLogoutAction<AuthActionTypes>,
): AuthState => {
  switch (action.type) {
    case FETCH_MY_INFO_FINISHED:
      return {
        ...state,
        myInfo: action.payload,
        myInfoSuccess: !action.error,
        myInfoFailed: action.error,
        isFinishedMyInfo: true,
      };
    case FETCH_MY_INFO:
      return {
        ...state,
        myInfoSuccess: false,
        isCalledMyInfo: true,
        isFinishedMyInfo: false,
      };
    case CHECK_INSTANCE:
      return {
        ...state,
        checkingInstance: true,
        instanceExists: initialState.instanceExists,
      };
    case CHECK_INSTANCE_FINISHED:
      return {
        ...state,
        checkingInstance: false,
        isAuthenticated: true,
        instanceExists: action.error === undefined ? undefined : !action.error,
      };
    case FETCH_ENABLED_MODULES_FINISHED: {
      const map: TransformedMenuItems = new Map();
      action.payload?.menuItems.forEach((menuItem) => {
        const children = new Map();
        menuItem.children.forEach((child) => {
          children.set(child.name, child);
        });
        map.set(menuItem.name, children);
      });

      return {
        ...state,
        menuItemsMetaData: action.payload?.meta,
        menuItems: map,
      };
    }
    case MY_INFO_FAILED:
      return {
        ...state,
        myInfoFailed: action.state,
        myInfoError: action.error,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default authReducer;
