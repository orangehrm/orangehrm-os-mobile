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
import {AuthState, MyInfo, EnabledModules} from 'store/auth/types';
import {$PropertyType} from 'utility-types';

export const selectAuth = (state: RootState): AuthState => state.auth;

export const selectMyInfoSuccess = createSelector<
  RootState,
  AuthState,
  boolean
>([selectAuth], (auth) => auth.myInfoSuccess);

export const selectMyInfo = createSelector<
  RootState,
  AuthState,
  MyInfo | undefined
>([selectAuth], (auth) => auth.myInfo);

export const selectIsCalledMyInfo = createSelector<
  RootState,
  AuthState,
  boolean
>([selectAuth], (auth) => auth.isCalledMyInfo);

export const selectInstanceExists = createSelector<
  RootState,
  AuthState,
  boolean | undefined
>([selectAuth], (auth) => auth.instanceExists);

export const selectCheckingInstance = createSelector<
  RootState,
  AuthState,
  boolean
>([selectAuth], (auth) => auth.checkingInstance);

export const selectMyInfoFinished = createSelector<
  RootState,
  AuthState,
  boolean
>([selectAuth], (auth) => auth.isFinishedMyInfo);

export const selectEnabledModules = createSelector<
  RootState,
  AuthState,
  EnabledModules | undefined
>([selectAuth], (auth) => auth.enabledModules);

export const selectMyInfoFailed = createSelector<
  RootState,
  AuthState,
  $PropertyType<AuthState, 'myInfoFailed'>
>([selectAuth], (auth) => auth.myInfoFailed);

export const selectMyInfoError = createSelector<
  RootState,
  AuthState,
  $PropertyType<AuthState, 'myInfoError'>
>([selectAuth], (auth) => auth.myInfoError);
