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

import {RootState} from 'store';
import {createSelector} from 'reselect';
import {GlobalsState, SnackMessage, Loader} from 'store/globals/types';

export const selectGlobals = (state: RootState) => state.globals;

export const selectSnackMessage = createSelector<
  RootState,
  GlobalsState,
  SnackMessage
>(selectGlobals, (globals) => globals.snackMessage);

export const selectLoader = createSelector<RootState, GlobalsState, Loader>(
  selectGlobals,
  (globals) => globals.loader,
);

export const selectInitialRoute = createSelector<
  RootState,
  GlobalsState,
  string
>(selectGlobals, (globals) => globals.initialRoute);

export const selectPreviousRoute = createSelector<
  RootState,
  GlobalsState,
  string | undefined
>(selectGlobals, (globals) => globals.previousRoute);

export const selectCurrentRoute = createSelector<
  RootState,
  GlobalsState,
  string | undefined
>(selectGlobals, (globals) => globals.currentRoute);
