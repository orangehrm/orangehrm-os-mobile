import {combineReducers} from 'redux';
import authReducer from './auth/reducer';
import themeReducer from './theme/reducer';
import storageReducer from './storage/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  storage: storageReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
