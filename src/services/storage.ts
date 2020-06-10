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
