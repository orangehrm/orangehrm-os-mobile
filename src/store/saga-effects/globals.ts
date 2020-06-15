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

import {put} from 'redux-saga/effects';
import {
  openLoader as openLoaderAction,
  closeLoader as closeLoaderAction,
  showSnackMessage as showSnackMessageAction,
  closeSnackMessage as closeSnackMessageAction,
} from 'store/globals/actions';

export const openLoader = (...args: Parameters<typeof openLoaderAction>) => {
  return put(openLoaderAction(...args));
};

export const closeLoader = (...args: Parameters<typeof closeLoaderAction>) => {
  return put(closeLoaderAction(...args));
};

export const showSnackMessage = (
  ...args: Parameters<typeof showSnackMessageAction>
) => {
  return put(showSnackMessageAction(...args));
};

export const closeSnackMessage = (
  ...args: Parameters<typeof closeSnackMessageAction>
) => {
  return put(closeSnackMessageAction(...args));
};
