import {Theme} from 'theme/default';

export interface ThemeState extends Theme {}

export const SET_STATUS_BAR_COLOR = 'THEME_SET_MULTI';

export interface SetStatusBarColorAction {
  type: typeof SET_STATUS_BAR_COLOR;
  color: string;
}

export type ThemeActionTypes = SetStatusBarColorAction;
