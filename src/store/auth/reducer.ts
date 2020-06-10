import {AuthState} from './types';

const initialState: AuthState = {};

const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default authReducer;
