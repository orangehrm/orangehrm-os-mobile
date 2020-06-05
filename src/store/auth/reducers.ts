import {AuthState} from './types';

const initialState: AuthState = {};

export function authReducer(state = initialState, action: any): AuthState {
  switch (action.type) {
    default:
      return state;
  }
}
