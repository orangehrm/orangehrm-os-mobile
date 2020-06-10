export interface AuthState {}

export const FETCH_TOKEN = 'AUTH_FETCH_TOKEN';
export const FETCH_TOKEN_SUCCESS = 'AUTH_FETCH_TOKEN_SUCCESS';
export const FETCH_TOKEN_FAILED = 'AUTH_FETCH_TOKEN_FAILED';

export interface FetchTokenAction {
  type: typeof FETCH_TOKEN;
  instanceUrl: string;
  username: string;
  password: string;
}

export interface FetchTokenSuccessAction {
  type: typeof FETCH_TOKEN_SUCCESS;
}

export interface FetchTokenFailedAction {
  type: typeof FETCH_TOKEN_FAILED;
}

export type AuthActionTypes =
  | FetchTokenAction
  | FetchTokenSuccessAction
  | FetchTokenFailedAction;
