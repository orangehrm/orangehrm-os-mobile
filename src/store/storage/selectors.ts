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
import {
  INSTANCE_URL,
  USERNAME,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  EXPIRES_AT,
  INSTANCE_API_VERSION,
  INSTANCE_API_PATHS,
  DATE_FORMAT,
  WARNING_MODAL_STATUS,
} from 'services/storage';
import {
  NullableString,
  StorageState,
  AuthParams,
  ApiDetails,
} from 'store/storage/types';

export const selectStorage = (state: RootState): StorageState => state.storage;

export const selectInstanceUrl = createSelector<
  RootState,
  StorageState,
  NullableString
>(selectStorage, (storage) => storage[INSTANCE_URL]);

export const selectUsername = createSelector<
  RootState,
  StorageState,
  NullableString
>(selectStorage, (storage) => storage[USERNAME]);

export const selectStorageLoaded = createSelector<
  RootState,
  StorageState,
  {loaded?: boolean; error: any}
>([selectStorage], ({loaded, error}) => ({loaded, error}));

export const selectAccessToken = createSelector<
  RootState,
  StorageState,
  NullableString
>([selectStorage], (storage) => storage[ACCESS_TOKEN]);

export const selectAuthParams = createSelector<
  RootState,
  StorageState,
  AuthParams
>([selectStorage], (storage) => ({
  [INSTANCE_URL]: storage[INSTANCE_URL],
  [ACCESS_TOKEN]: storage[ACCESS_TOKEN],
  [REFRESH_TOKEN]: storage[REFRESH_TOKEN],
  [EXPIRES_AT]: storage[EXPIRES_AT],
  fetchingAccessTokenLock: storage.fetchingAccessTokenLock,
}));

export const selectApiDetails = createSelector<
  RootState,
  StorageState,
  ApiDetails
>([selectStorage], (storage) => {
  const paths = storage[INSTANCE_API_PATHS];
  return {
    [INSTANCE_API_VERSION]: storage[INSTANCE_API_VERSION],
    [INSTANCE_API_PATHS]: paths ? JSON.parse(paths) : null,
  };
});

export const selectDateFormat = createSelector<
  RootState,
  StorageState,
  NullableString
>([selectStorage], (storage) => storage[DATE_FORMAT]);

export const selectWarningModalStatus = createSelector<
  RootState,
  StorageState,
  Boolean
>([selectStorage], (storage) => storage[WARNING_MODAL_STATUS] === 'true');
