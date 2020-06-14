/**
 * OrangeHRM is a comprehensive Human Resource Management (HRM) System that captures
 * all the essential functionalities required for any enterprise.
 * Copyright (C) 2006 OrangeHRM Inc., http://www.orangehrm.com
 *
 * OrangeHRM is free software; you can redistribute it and/or modify it under the terms of
 * the GNU General Public License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * OrangeHRM is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this program;
 * if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor,
 * Boston, MA  02110-1301, USA
 */
import {
  StorageState,
  StorageActionTypes,
  SET_ITEM,
  SET_MULTI,
  CHANGE_LOADED,
} from './types';
import {
  INSTANCE_URL,
  USERNAME,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  EXPIRES_AT,
  SCOPE,
  TOKEN_TYPE,
} from 'services/storage';

const initialState: StorageState = {
  [INSTANCE_URL]: null,
  [USERNAME]: null,
  [ACCESS_TOKEN]: null,
  [REFRESH_TOKEN]: null,
  [EXPIRES_AT]: null,
  [SCOPE]: null,
  [TOKEN_TYPE]: null,
  loaded: false,
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
      return {
        ...state,
        ...action.keyValuePairs,
      };
    case CHANGE_LOADED:
      return {
        ...state,
        loaded: action.state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default storageReducer;
