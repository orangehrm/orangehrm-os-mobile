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

import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {call, takeEvery, put, all} from 'redux-saga/effects';
import {
  FETCH_TOKEN,
  LOGOUT,
  FETCH_MY_INFO,
  CHECK_INSTANCE,
  FetchTokenAction,
  CheckInstanceAction,
  FetchEnabledModulesAction,
  FETCH_ENABLED_MODULES,
} from 'store/auth/types';
import {authenticate, checkLegacyInstance} from 'services/authentication';
import {
  checkInstance as checkInstanceRequest,
  checkInstanceCompatibility,
  checkRemovedEndpoints,
  checkDeprecatedEndpoints,
  getEnabledModules,
} from 'services/instance-check';
import {
  USERNAME,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  SCOPE,
  TOKEN_TYPE,
  EXPIRES_AT,
  INSTANCE_URL,
} from 'services/storage';
import {
  openLoader,
  closeLoader,
  showSnackMessage,
} from 'store/saga-effects/globals';
import {apiCall, apiGetCall} from 'store/saga-effects/api';
import {
  storageSetMulti,
  selectAuthParams,
  selectInstanceUrl,
  storageSetItem,
} from 'store/saga-effects/storage';
import {
  fetchMyInfoFinished,
  checkInstanceFinished,
  fetchEnabledModulesFinished,
} from 'store/auth/actions';
import {getExpiredAt} from 'store/auth/helper';
import {AuthParams} from 'store/storage/types';
import {TYPE_ERROR, TYPE_WARN} from 'store/globals/types';
import {getMessageAlongWithGenericErrors} from 'services/api';
import {API_ENDPOINT_MY_INFO, prepare} from 'services/endpoints';
import {AuthenticationError} from 'services/errors/authentication';
import {InstanceCheckError} from 'services/errors/instance-check';

/**
 * Check instance existence & compatibility
 * @param action this param can be undefined when calling this generator from another generator
 */
function* checkInstance(action?: CheckInstanceAction) {
  try {
    yield openLoader();
    let instanceUrl: string = yield selectInstanceUrl();
    let response: Response = yield call(checkInstanceRequest, instanceUrl);

    // check instance in advanced
    if (!response.ok) {
      const urlPortions = [
        '/symfony/web',
        '/symfony/web/index.php',
        '/index.php',
      ];
      const effects = urlPortions.map((urlPortion) => {
        return call(checkInstanceRequestWithCatch, instanceUrl + urlPortion);
      });
      const responses: Response[] = yield all(effects);

      for (let i = 0; i < responses.length; i++) {
        if (responses[i]?.ok) {
          response = responses[i];
          instanceUrl = instanceUrl + urlPortions[i];
          break;
        }
      }
    }

    // check instance is legacy
    if (!response.ok) {
      const urlPortions = [
        '',
        '/symfony/web',
        '/symfony/web/index.php',
        '/index.php',
      ];
      const effects = urlPortions.map((urlPortion) => {
        return call(checkLegacyInstanceWithCatch, instanceUrl + urlPortion);
      });
      const responses: Response[] = yield all(effects);

      for (let i = 0; i < responses.length; i++) {
        if (responses[i]?.ok) {
          throw new InstanceCheckError(
            'OrangeHRM System Is Not Supported With Mobile App.',
          );
        }
      }
    }

    if (response.ok) {
      yield storageSetItem(INSTANCE_URL, instanceUrl);
      const data = yield call([response, response.json]);

      checkInstanceCompatibility(data);
      checkRemovedEndpoints(data);
      const usingDeprecatedEndpoints = checkDeprecatedEndpoints(data);
      if (usingDeprecatedEndpoints) {
        yield showSnackMessage('Please Update the Application.', TYPE_WARN);
      }

      yield* fetchEnabledModules();

      yield put(checkInstanceFinished(false));
    } else {
      yield storageSetItem(INSTANCE_URL, null);
      yield showSnackMessage('Invalid URL.', TYPE_ERROR);
      yield put(checkInstanceFinished(true));
    }
  } catch (error) {
    yield storageSetItem(INSTANCE_URL, null);
    yield put(checkInstanceFinished(true));

    const netState: NetInfoState = yield NetInfo.fetch();

    if (netState?.isInternetReachable === false) {
      const message = 'Connection Error! OrangeHRM System Is Not Accessible.';
      if (action) {
        yield showSnackMessage(message, TYPE_ERROR);
      } else {
        throw new InstanceCheckError(message);
      }
    } else {
      if (action) {
        let message = 'OrangeHRM System Is Not Accessible.';
        if (error instanceof InstanceCheckError) {
          message = error.message;
        }
        yield showSnackMessage(message, TYPE_ERROR);
      } else {
        throw error;
      }
    }
  } finally {
    yield closeLoader();
  }
}

/**
 * Wrap checkInstanceRequest function to catch errors
 * @param {string} instanceUrl
 */
function checkInstanceRequestWithCatch(instanceUrl: string) {
  return checkInstanceRequest(instanceUrl).catch(() => {
    return null;
  });
}

function checkLegacyInstanceWithCatch(instanceUrl: string) {
  return checkLegacyInstance(instanceUrl).catch(() => {
    return null;
  });
}

function* fetchEnabledModules(action?: FetchEnabledModulesAction) {
  try {
    if (action) {
      yield openLoader();
    }
    const instanceUrl: string = yield selectInstanceUrl();
    const response: Response = yield call(getEnabledModules, instanceUrl);

    if (response.ok) {
      const responseData = yield call([response, response.json]);

      if (responseData.data) {
        yield put(fetchEnabledModulesFinished(responseData.data));
        if (!responseData.data.modules.mobile) {
          // Logout in case loggedin user
          yield* logout();
          throw new InstanceCheckError(
            'The Mobile App Is Not Enabled, Please Contact Your System Administrator.',
          );
        }
      } else {
        throw new InstanceCheckError('Failed to Load Enabled Modules.');
      }
    } else {
      throw new InstanceCheckError('Failed to Load Enabled Modules.');
    }
  } catch (error) {
    if (error instanceof InstanceCheckError && action === undefined) {
      throw error;
    }
    yield showSnackMessage(
      getMessageAlongWithGenericErrors(
        error,
        'Failed to Load Enabled Modules.',
      ),
      TYPE_ERROR,
    );
    yield put(fetchEnabledModulesFinished(undefined, true));
  } finally {
    if (action) {
      yield closeLoader();
    }
  }
}

function* fetchAuthToken(action: FetchTokenAction) {
  try {
    yield openLoader();
    yield* checkInstance();

    const authParams: AuthParams = yield selectAuthParams();

    if (authParams.instanceUrl !== null) {
      const response: Response = yield call(
        authenticate,
        authParams.instanceUrl,
        action.username,
        action.password,
      );

      const data = yield call([response, response.json]);
      if (data.error) {
        if (data.error === 'authentication_failed') {
          throw new AuthenticationError(data.error_description);
        } else {
          throw new AuthenticationError('Invalid Credentials.');
        }
      } else {
        yield storageSetMulti({
          [USERNAME]: action.username,
          [ACCESS_TOKEN]: data.access_token,
          [REFRESH_TOKEN]: data.refresh_token,
          [TOKEN_TYPE]: data.token_type,
          [SCOPE]: data.scope,
          [EXPIRES_AT]: getExpiredAt(data.expires_in),
        });
      }
    } else {
      yield showSnackMessage('Instance URL is empty.', TYPE_ERROR);
    }
  } catch (error) {
    yield showSnackMessage(
      getMessageAlongWithGenericErrors(error, 'Authentication Failed.'),
      TYPE_ERROR,
    );
  } finally {
    yield closeLoader();
  }
}

function* logout() {
  try {
    yield openLoader();
    yield storageSetMulti({
      [USERNAME]: null,
      [ACCESS_TOKEN]: null,
      [REFRESH_TOKEN]: null,
      [TOKEN_TYPE]: null,
      [SCOPE]: null,
      [EXPIRES_AT]: null,
    });
  } catch (error) {
    yield showSnackMessage('Failed to Perform Action.', TYPE_ERROR);
  } finally {
    yield closeLoader();
  }
}

function* fetchMyInfo() {
  try {
    yield* fetchEnabledModules();

    const response = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_MY_INFO, {}, {withPhoto: true}),
    );
    if (response.data) {
      yield put(fetchMyInfoFinished(response.data));
    } else {
      yield put(fetchMyInfoFinished(undefined, true));
    }
  } catch (error) {
    if (error instanceof InstanceCheckError) {
      yield showSnackMessage(
        getMessageAlongWithGenericErrors(error, 'Failed to Check Instance.'),
        TYPE_ERROR,
      );
    }
    yield put(fetchMyInfoFinished(undefined, true));
  }
}

export function* watchAuthActions() {
  yield takeEvery(FETCH_TOKEN, fetchAuthToken);
  yield takeEvery(LOGOUT, logout);
  yield takeEvery(FETCH_MY_INFO, fetchMyInfo);
  yield takeEvery(CHECK_INSTANCE, checkInstance);
  yield takeEvery(FETCH_ENABLED_MODULES, fetchEnabledModules);
}
