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
  GlobalsState,
  GlobalsActionTypes,
  SHOW_SNACK_MESSAGE,
  CLOSE_SNACK_MESSAGE,
  OPEN_LOADER,
  CLOSE_LOADER,
  TYPE_SUCCESS,
} from 'store/globals/types';
import {MY_LEAVE_ENTITLEMENT_AND_USAGE} from 'screens';

const initialState: GlobalsState = {
  snackMessage: {
    open: false,
    message: '',
  },
  loader: {
    open: false,
    count: 0,
  },
  initialRoute: MY_LEAVE_ENTITLEMENT_AND_USAGE,
};

const globalsReducer = (
  state = initialState,
  action: GlobalsActionTypes,
): GlobalsState => {
  switch (action.type) {
    case SHOW_SNACK_MESSAGE:
      return {
        ...state,
        snackMessage: {
          open: true,
          message: action.message,
          type: action.snackType ? action.snackType : TYPE_SUCCESS,
        },
      };
    case CLOSE_SNACK_MESSAGE:
      return {
        ...state,
        snackMessage: {
          ...initialState.snackMessage,
          open: false,
        },
      };
    case OPEN_LOADER:
      return {
        ...state,
        loader: {
          open: state.loader.count + 1 > 0,
          content: action.content,
          count: state.loader.count + 1,
        },
      };
    case CLOSE_LOADER:
      return {
        ...state,
        loader: {
          open: state.loader.count - 1 !== 0,
          count: state.loader.count - 1,
        },
      };
    default:
      return state;
  }
};

export default globalsReducer;
