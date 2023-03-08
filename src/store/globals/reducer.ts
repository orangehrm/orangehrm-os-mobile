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
  CHANGE_CURRENT_ROUTE,
  TYPE_SUCCESS,
} from 'store/globals/types';
import {MY_LEAVE_ENTITLEMENT_AND_USAGE} from 'screens';
import {LOGOUT, WithLogoutAction} from 'store/auth/types';

const initialState: GlobalsState = {
  snackMessage: {
    open: false,
    message: '',
  },
  snackMessages: [],
  loader: {
    open: false,
    count: 0,
  },
  initialRoute: MY_LEAVE_ENTITLEMENT_AND_USAGE,
  currentRoute: MY_LEAVE_ENTITLEMENT_AND_USAGE,
};

const globalsReducer = (
  state = initialState,
  action: WithLogoutAction<GlobalsActionTypes>,
): GlobalsState => {
  switch (action.type) {
    case SHOW_SNACK_MESSAGE: {
      const snackMessages = [...state.snackMessages];
      const snack = {
        message: action.message,
        type: action.snackType ? action.snackType : TYPE_SUCCESS,
      };

      if (snackMessages.length > 0) {
        if (
          state.snackMessages[state.snackMessages.length - 1].message !==
          action.message
        ) {
          snackMessages.push(snack);
        }
      } else {
        snackMessages.push(snack);
      }

      if (snackMessages.length > 1) {
        return {
          ...state,
          snackMessages,
        };
      }
      return {
        ...state,
        snackMessages,
        snackMessage: {
          open: true,
          ...snack,
        },
      };
    }
    case CLOSE_SNACK_MESSAGE: {
      // const [snackMessage, ...restSnackMessages] = state.snackMessages;
      const [, ...restSnackMessages] = state.snackMessages;
      if (restSnackMessages.length > 0) {
        // Open snack message when one closed
        return {
          ...state,
          snackMessages: restSnackMessages,
          snackMessage: {
            ...restSnackMessages[0],
            open: true,
          },
        };
      }
      return {
        ...state,
        snackMessages: restSnackMessages,
        snackMessage: {
          ...initialState.snackMessage,
          open: false,
        },
      };
    }
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
          open: state.loader.count - 1 > 0,
          count: state.loader.count > 0 ? state.loader.count - 1 : 0,
        },
      };
    case CHANGE_CURRENT_ROUTE:
      if (
        state.currentRoute === action.route ||
        (state.currentRoute !== undefined &&
          state.currentRoute === state.previousRoute)
      ) {
        return state;
      }
      return {
        ...state,
        currentRoute: action.route,
        previousRoute: state.currentRoute,
      };
    case LOGOUT:
      return {
        ...state,
        currentRoute: initialState.currentRoute,
        previousRoute: initialState.previousRoute,
      };
    default:
      return state;
  }
};

export default globalsReducer;
