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
  StorageState,
  SET_ITEM,
  SET_MULTI,
  CHANGE_LOADED,
  SET_FETCHING_ACCESS_TOKEN_LOCK,
  NullableString,
  SetMultiAction,
  SetItemAction,
  ChangeLoadedAction,
  SetFetchingAccessTokenLockAction,
} from './types';

export const setItem = (key: string, value: NullableString): SetItemAction => {
  return {
    type: SET_ITEM,
    key,
    value,
  };
};

export const setMulti = (
  keyValuePairs: Partial<StorageState>,
): SetMultiAction => {
  return {
    type: SET_MULTI,
    keyValuePairs,
  };
};

export const changeLoaded = (
  state: boolean,
  error: any = undefined,
): ChangeLoadedAction => {
  return {
    type: CHANGE_LOADED,
    state,
    error,
  };
};

export const setFetchingAccessTokenLock = (
  state: boolean,
): SetFetchingAccessTokenLockAction => ({
  type: SET_FETCHING_ACCESS_TOKEN_LOCK,
  state,
});
