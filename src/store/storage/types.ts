import {
  INSTANCE_URL,
  USERNAME,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  EXPIRES_AT,
  SCOPE,
  TOKEN_TYPE,
} from 'services/storage';

export interface StorageState {
  [INSTANCE_URL]: NullableString;
  [USERNAME]: NullableString;
  [ACCESS_TOKEN]: NullableString;
  [REFRESH_TOKEN]: NullableString;
  [EXPIRES_AT]: NullableString;
  [SCOPE]: NullableString;
  [TOKEN_TYPE]: NullableString;
  loaded?: boolean;
  error?: any;
}

export type NullableString = string | null;

export const SET_ITEM = 'STORAGE_SET_ITEM';
export const SET_MULTI = 'STORAGE_SET_MULTI';
export const CHANGE_LOADED = 'STORAGE_CHANGE_LOADED';

export interface SetItemAction {
  type: typeof SET_ITEM;
  key: string;
  value: NullableString;
}

export interface SetMultiAction {
  type: typeof SET_MULTI;
  keyValuePairs: Partial<StorageState>;
}

export interface ChangeLoadedAction {
  type: typeof CHANGE_LOADED;
  state: boolean;
  error?: any;
}

export type StorageActionTypes =
  | SetItemAction
  | SetMultiAction
  | ChangeLoadedAction;
