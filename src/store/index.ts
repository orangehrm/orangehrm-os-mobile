/*
 * This file is part of OrangeHRM
 *
 * Copyright (C) 2020 onwards OrangeHRM (https://www.orangehrm.com/)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

import {combineReducers} from 'redux';
import authReducer from './auth/reducer';
import themeReducer from './theme/reducer';
import storageReducer from './storage/reducer';
import globalsReducer from './globals/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  storage: storageReducer,
  globals: globalsReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
