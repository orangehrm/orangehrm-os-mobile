import {
  StorageState,
  SET_ITEM,
  SET_MULTI,
  CHANGE_LOADED,
  NullableString,
  SetMultiAction,
  SetItemAction,
  ChangeLoadedAction,
} from './types';

export const setItem = (key: string, value: NullableString): SetItemAction => {
  return {
    type: SET_ITEM,
    key,
    value,
  };
};

export const setMulti = (
  keyValuePairs: Partial<StorageState>,
): SetMultiAction => {
  return {
    type: SET_MULTI,
    keyValuePairs,
  };
};

export const changeLoaded = (
  state: boolean,
  error: any = undefined,
): ChangeLoadedAction => {
  return {
    type: CHANGE_LOADED,
    state,
    error,
  };
};
