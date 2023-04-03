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
import {
  SHOW_SNACK_MESSAGE,
  CLOSE_SNACK_MESSAGE,
  OPEN_LOADER,
  CLOSE_LOADER,
  CHANGE_CURRENT_ROUTE,
  Loader,
  SnackTypes,
  ShowSnackAction,
  CloseSnackAction,
  OpenLoaderAction,
  CloseLoaderAction,
  ChangeCurrentRouteAction,
} from './types';

export const showSnackMessage = (
  message: string,
  snackType?: SnackTypes,
): ShowSnackAction => {
  return {
    type: SHOW_SNACK_MESSAGE,
    message,
    snackType,
  };
};

export const closeSnackMessage = (): CloseSnackAction => {
  return {
    type: CLOSE_SNACK_MESSAGE,
  };
};

export const openLoader = (
  content?: $PropertyType<Loader, 'content'>,
): OpenLoaderAction => {
  return {
    type: OPEN_LOADER,
    content,
  };
};

export const closeLoader = (): CloseLoaderAction => {
  return {
    type: CLOSE_LOADER,
  };
};

/**
 * Derive previous route by current route
 * @param currentRoute
 */
export const changeCurrentRoute = (
  currentRoute: string,
): ChangeCurrentRouteAction => ({
  type: CHANGE_CURRENT_ROUTE,
  route: currentRoute,
});
