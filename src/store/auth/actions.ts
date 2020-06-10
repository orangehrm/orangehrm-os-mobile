import {
  FETCH_TOKEN,
  FETCH_TOKEN_SUCCESS,
  FetchTokenAction,
  FetchTokenSuccessAction,
} from './types';

export const fetchAuthToken = (
  instanceUrl: string,
  username: string,
  password: string,
): FetchTokenAction => {
  return {
    type: FETCH_TOKEN,
    instanceUrl,
    username,
    password,
  };
};

export const fetchAuthTokenSuccess = (): FetchTokenSuccessAction => {
  return {
    type: FETCH_TOKEN_SUCCESS,
  };
};
