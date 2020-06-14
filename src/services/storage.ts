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

import AsyncStorage from '@react-native-community/async-storage';

export const get = async (key: string): Promise<string | null | undefined> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    return undefined;
  }
};

export const set = async (
  key: string,
  value: string | null,
): Promise<boolean> => {
  try {
    if (value === null) {
      await AsyncStorage.removeItem(key);
    } else {
      await AsyncStorage.setItem(key, value);
    }
    return true;
  } catch (e) {
    return false;
  }
};

interface StringMap {
  [key: string]: string | null;
}

export const multiGet = async (
  keys: string[],
): Promise<StringMap | undefined> => {
  try {
    const keyValuePairs = await AsyncStorage.multiGet(keys);
    const keyValueObj: StringMap = {};
    keyValuePairs.forEach((pair) => {
      keyValueObj[pair[0]] = pair[1];
    });
    return keyValueObj;
  } catch (e) {
    return undefined;
  }
};

export default {get, set, multiGet};

const INSTANCE_URL = 'instanceUrl';
const USERNAME = 'username';
const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';
const EXPIRES_AT = 'expiresAt';
const SCOPE = 'scope';
const TOKEN_TYPE = 'tokenType';

export {
  INSTANCE_URL,
  USERNAME,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  EXPIRES_AT,
  SCOPE,
  TOKEN_TYPE,
};
