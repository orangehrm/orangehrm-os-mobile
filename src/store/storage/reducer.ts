import {
  StorageState,
  StorageActionTypes,
  SET_ITEM,
  SET_MULTI,
  CHANGE_LOADED,
} from './types';
import {
  INSTANCE_URL,
  USERNAME,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  EXPIRES_AT,
  SCOPE,
  TOKEN_TYPE,
} from 'services/storage';

const initialState: StorageState = {
  [INSTANCE_URL]: null,
  [USERNAME]: null,
  [ACCESS_TOKEN]: null,
  [REFRESH_TOKEN]: null,
  [EXPIRES_AT]: null,
  [SCOPE]: null,
  [TOKEN_TYPE]: null,
  loaded: false,
};

const storageReducer = (
  state = initialState,
  action: StorageActionTypes,
): StorageState => {
  switch (action.type) {
    case SET_ITEM:
      return {
        ...state,
        [action.key]: action.value,
      };
    case SET_MULTI:
      return {
        ...state,
        ...action.keyValuePairs,
      };
    case CHANGE_LOADED:
      return {
        ...state,
        loaded: action.state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default storageReducer;
