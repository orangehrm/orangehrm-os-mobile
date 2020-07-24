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

import {useSelector, useDispatch} from 'react-redux';
import {
  selectLoader,
  selectSnackMessage,
  selectPreviousRoute,
  selectCurrentRoute,
} from 'store/globals/selectors';
import {
  openLoader,
  closeLoader,
  showSnackMessage,
  closeSnackMessage,
  changeCurrentRoute,
} from 'store/globals/actions';
import {GlobalsState} from 'store/globals/types';

const useGlobals = () => {
  const loader = useSelector(selectLoader);
  const snackMessage = useSelector(selectSnackMessage);
  const previousRoute = useSelector(selectPreviousRoute);
  const currentRoute = useSelector(selectCurrentRoute);
  const dispatch = useDispatch();
  return {
    loader,
    snackMessage,
    previousRoute,
    currentRoute,
    openLoader: (...args: Parameters<typeof openLoader>) => {
      dispatch(openLoader(...args));
    },
    closeLoader: (...args: Parameters<typeof closeLoader>) => {
      dispatch(closeLoader(...args));
    },
    showSnackMessage: (...args: Parameters<typeof showSnackMessage>) => {
      dispatch(showSnackMessage(...args));
    },
    closeSnackMessage: (...args: Parameters<typeof closeSnackMessage>) => {
      dispatch(closeSnackMessage(...args));
    },
    changePreviousRoute: (...args: Parameters<typeof changeCurrentRoute>) => {
      dispatch(changeCurrentRoute(...args));
    },
  };
};

export interface Globals extends GlobalsState {
  openLoader: typeof openLoader;
  closeLoader: typeof closeLoader;
  showSnackMessage: typeof showSnackMessage;
  closeSnackMessage: typeof closeSnackMessage;
  changePreviousRoute: typeof changeCurrentRoute;
}

export default useGlobals;
