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
  StorageActionTypes,
  SET_ITEM,
  SET_MULTI,
  CHANGE_LOADED,
  SET_FETCHING_ACCESS_TOKEN_LOCK,
} from 'store/storage/types';
import {
  INSTANCE_URL,
  USERNAME,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  EXPIRES_AT,
  SCOPE,
  TOKEN_TYPE,
  INSTANCE_API_VERSION,
  INSTANCE_API_PATHS,
  DATE_FORMAT,
  WARNING_MODAL_STATUS,
} from 'services/storage';
import {DEFAULT_DATE_FORMAT} from 'lib/helpers/date';

const initialState: StorageState = {
  [INSTANCE_URL]: null,
  [USERNAME]: null,
  [ACCESS_TOKEN]: null,
  [REFRESH_TOKEN]: null,
  [EXPIRES_AT]: null,
  [SCOPE]: null,
  [TOKEN_TYPE]: null,
  [INSTANCE_API_VERSION]: null,
  [INSTANCE_API_PATHS]: null,
  [DATE_FORMAT]: DEFAULT_DATE_FORMAT,
  [WARNING_MODAL_STATUS]: null,
  loaded: false,
  fetchingAccessTokenLock: false,
};

const storageReducer = (
  state = initialState,
  action: StorageActionTypes,
): StorageState => {
  switch (action.type) {
    case SET_ITEM:
      return {
        ...state,
        [action.key]: action.value,
      };
    case SET_MULTI:
      const keyValues = {...action.keyValuePairs};
      if (
        keyValues[DATE_FORMAT] === null ||
        keyValues[DATE_FORMAT] === undefined
      ) {
        keyValues[DATE_FORMAT] = DEFAULT_DATE_FORMAT;
      }
      return {
        ...state,
        ...keyValues,
      };
    case CHANGE_LOADED:
      return {
        ...state,
        loaded: action.state,
        error: action.error,
      };
    case SET_FETCHING_ACCESS_TOKEN_LOCK:
      return {
        ...state,
        fetchingAccessTokenLock: action.state,
      };
    default:
      return state;
  }
};

export default storageReducer;
