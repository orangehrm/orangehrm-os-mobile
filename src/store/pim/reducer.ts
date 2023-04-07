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

import {
  EMPLOYEE_PHOTO_SET_SOURCE,
  PimActionTypes,
  PimState,
} from 'store/pim/types';
import {
  FetchMyInfoFinishedAction,
  FETCH_MY_INFO_FINISHED,
  LOGOUT,
  WithLogoutAction,
} from 'store/auth/types';

const initialState: PimState = {
  employeePhotos: new Map(),
};

const pimReducer = (
  state = initialState,
  action: WithLogoutAction<PimActionTypes> | FetchMyInfoFinishedAction,
): PimState => {
  switch (action.type) {
    case EMPLOYEE_PHOTO_SET_SOURCE: {
      const map = new Map(state.employeePhotos.entries());
      map.set(action.empNumber, action.source);
      return {
        ...state,
        employeePhotos: map,
      };
    }
    case FETCH_MY_INFO_FINISHED: {
      // Listerning to fetching my info, and invalidate profile picture data
      const map = new Map(state.employeePhotos.entries());
      if (action.payload?.employee.empNumber !== undefined) {
        map.delete(action.payload?.employee.empNumber);
      }
      return {
        ...state,
        employeePhotos: map,
      };
    }
    case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default pimReducer;
