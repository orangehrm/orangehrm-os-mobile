import {SET_STATUS_BAR_COLOR, SetStatusBarColorAction} from './types';

export const setStatusBarColor = (color: string): SetStatusBarColorAction => {
  return {
    type: SET_STATUS_BAR_COLOR,
    color,
  };
};
