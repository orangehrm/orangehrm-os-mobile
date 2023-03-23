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

import {takeEvery, put} from 'redux-saga/effects';
import {
  openLoader,
  closeLoader,
  showSnackMessage,
} from 'store/saga-effects/globals';
import {FetchHelpConfigAction, FETCH_HELP_CONFIG} from './types';
import {fetchHelpConfigFinished} from './actions';
import {HELP_REDIRECT_URL} from 'services/endpoints';
import {
  getMessageAlongWithGenericErrors,
  getMessageAlongWithResponseErrors,
} from 'services/api';
import {TYPE_ERROR} from 'store/globals/types';

//Commented imports
// import {prepare, API_ENDPOINT_HELP_CONFIG} from 'services/endpoints';
// import {apiCall, apiGetCall} from 'store/saga-effects/api';

//removed - action: FetchHelpConfigAction fetchConfigHelp(action: FetchHelpConfigAction)
function* fetchConfigHelp() {
  try {
    yield openLoader();
    // const response = yield apiCall(
    //   apiGetCall,
    //   prepare(
    //     API_ENDPOINT_HELP_CONFIG,
    //     {},
    //     {
    //       query: action.payload.query,
    //       mode: action.payload.mode,
    //     },
    //   ),
    // );
    const response = {
      data: {
        defaultRedirectUrl: HELP_REDIRECT_URL,
        redirectUrls: [],
      },
    };
    if (response.data) {
      yield put(fetchHelpConfigFinished(response.data));
    } else {
      yield showSnackMessage(
        getMessageAlongWithResponseErrors(
          response,
          'Failed to Fetch Help Configurations',
        ),
        TYPE_ERROR,
      );
    }
  } catch (error) {
    yield showSnackMessage(
      getMessageAlongWithGenericErrors(
        error,
        'Failed to Fetch Help Configurations.',
      ),
      TYPE_ERROR,
    );
  } finally {
    yield closeLoader();
  }
}

export function* watchHelpConfigActions() {
  yield takeEvery(FETCH_HELP_CONFIG, fetchConfigHelp);
}
