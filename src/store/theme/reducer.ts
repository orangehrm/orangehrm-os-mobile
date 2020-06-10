import {ThemeState, SET_STATUS_BAR_COLOR, ThemeActionTypes} from './types';
import defaultTheme from 'theme/default';

const initialState: ThemeState = defaultTheme;

const themeReducer = (
  state = initialState,
  action: ThemeActionTypes,
): ThemeState => {
  switch (action.type) {
    case SET_STATUS_BAR_COLOR:
      return {
        ...state,
        palette: {
          ...state.palette,
          statusBar: action.color,
        },
      };
    default:
      return state;
  }
};

export default themeReducer;
