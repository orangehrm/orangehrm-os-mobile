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

import {ReactNode} from 'react';

export const TYPE_SUCCESS = 'success';
export const TYPE_ERROR = 'error';
export const TYPE_INFO = 'info';
export const TYPE_WARN = 'warning';

export interface GlobalsState {
  snackMessage: SnackMessage;
  loader: Loader;
  initialRoute: string;
}

export type SnackTypes =
  | typeof TYPE_SUCCESS
  | typeof TYPE_ERROR
  | typeof TYPE_INFO
  | typeof TYPE_WARN;

export interface SnackMessage {
  open: boolean;
  message: string;
  type?: SnackTypes;
}

export interface Loader {
  open: boolean;
  content?: ReactNode;
  count: number;
}

export const SHOW_SNACK_MESSAGE = 'GLOBALS_SHOW_SNACK_MESSAGE';
export const CLOSE_SNACK_MESSAGE = 'GLOBALS_CLOSE_SNACK_MESSAGE';
export const OPEN_LOADER = 'GLOBALS_OPEN_LOADER';
export const CLOSE_LOADER = 'GLOBALS_CLOSE_LOADER';

export interface ShowSnackAction {
  type: typeof SHOW_SNACK_MESSAGE;
  message: string;
  snackType?: SnackTypes;
}

export interface CloseSnackAction {
  type: typeof CLOSE_SNACK_MESSAGE;
}

export interface OpenLoaderAction {
  type: typeof OPEN_LOADER;
  content?: ReactNode;
}

export interface CloseLoaderAction {
  type: typeof CLOSE_LOADER;
}

export type GlobalsActionTypes =
  | ShowSnackAction
  | CloseSnackAction
  | OpenLoaderAction
  | CloseLoaderAction;
