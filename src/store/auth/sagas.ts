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
import {call, takeEvery, put, all, select} from 'redux-saga/effects';
import {
  FETCH_TOKEN,
  LOGOUT,
  FETCH_MY_INFO,
  CHECK_INSTANCE,
  FetchTokenAction,
  CheckInstanceAction,
  FetchEnabledModulesAction,
  FETCH_ENABLED_MODULES,
  FETCH_NEW_TOKEN_FINISHED,
  FetchMyInfoAction,
  FetchNewTokenFinishedAction,
} from 'store/auth/types';
import {authenticate, checkLegacyInstance} from 'services/authentication';
import {
  checkInstance as checkInstanceRequest,
  checkInstanceCompatibility,
  checkRemovedEndpoints,
  checkDeprecatedEndpoints,
  getEnabledModules,
  getOpenApiDefinition,
  getOpenApiDefinitionPaths,
} from 'services/instance-check';
import {
  USERNAME,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  SCOPE,
  TOKEN_TYPE,
  EXPIRES_AT,
  INSTANCE_URL,
  INSTANCE_API_VERSION,
  INSTANCE_API_PATHS,
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
  myInfoFailed,
  fetchNewAuthTokenFinished,
} from 'store/auth/actions';
import {getExpiredAt} from 'store/auth/helper';
import {AuthParams, ApiDetails} from 'store/storage/types';
import {selectApiDetails} from 'store/storage/selectors';
import {TYPE_ERROR, TYPE_WARN} from 'store/globals/types';
import {
  getMessageAlongWithGenericErrors,
  isJsonParseError,
  ERROR_NO_ASSIGNED_EMPLOYEE,
  ERROR_JSON_PARSE,
} from 'services/api';
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
    const urls = getAbsoluteUrlsForChecking(instanceUrl);

    // if user enter web system login screen url
    if (
      (!response.ok || !isJsonResponse(response)) &&
      instanceUrl.includes('/index.php')
    ) {
      const splitedInstanceUrl =
        instanceUrl.split('/index.php')[0] + '/index.php';
      const res: Response = yield call(
        checkInstanceRequestWithCatch,
        splitedInstanceUrl,
      );
      if (res.ok && isJsonResponse(res)) {
        response = res;
        instanceUrl = splitedInstanceUrl;
      }
    }

    if (!response.ok || !isJsonResponse(response)) {
      const effects = urls.map((url) => {
        return call(checkInstanceRequestWithCatch, url);
      });
      const responses: Response[] = yield all(effects);

      for (let i = 0; i < responses.length; i++) {
        if (responses[i]?.ok && isJsonResponse(responses[i])) {
          response = responses[i];
          instanceUrl = urls[i];
          break;
        }
      }
    }

    // check instance is legacy
    if (!response.ok || !isJsonResponse(response)) {
      // evaluate original URL without concat paths
      urls.unshift(instanceUrl);
      const effects = urls.map((url) => {
        return call(checkLegacyInstanceWithCatch, url);
      });
      const responses: Response[] = yield all(effects);

      for (let i = 0; i < responses.length; i++) {
        // `/oauth/issueToken` endpoint content-type is `text/html`. Don't check isJsonResponse(response)
        if (responses[i]?.ok) {
          throw new InstanceCheckError(
            'OrangeHRM System Is Not Supported With Mobile App.',
          );
        }
      }
    }

    if (response.ok && isJsonResponse(response)) {
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

function isJsonResponse(response: Response) {
  return response?.headers.get('Content-Type') === 'application/json';
}

function getAbsoluteUrlsForChecking(instanceUrl: string) {
  return [
    instanceUrl + '/symfony/web',
    instanceUrl + '/symfony/web/index.php',
    instanceUrl + '/index.php',
  ];
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
        yield put(fetchNewAuthTokenFinished());
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

    const rawResponse: Response = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_MY_INFO, {}, {withPhoto: true}),
      true,
    );

    if (rawResponse.ok) {
      try {
        const response = yield call([rawResponse, rawResponse.json]);
        if (response.data.employee) {
          yield put(fetchMyInfoFinished(response.data));
        } else {
          // No employee assign to logged in user
          yield put(
            myInfoFailed(true, {
              error: ERROR_NO_ASSIGNED_EMPLOYEE,
              code: rawResponse.status,
            }),
          );
          yield put(fetchMyInfoFinished(undefined, true));
        }
      } catch (error) {
        if (isJsonParseError(error)) {
          yield put(
            myInfoFailed(true, {
              error: ERROR_JSON_PARSE,
              code: rawResponse.status,
            }),
          );
        } else {
          throw error;
        }
      }
    } else {
      yield put(myInfoFailed(true, {code: rawResponse.status}));
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

function* fetchApiDefinition(
  action: FetchMyInfoAction | FetchNewTokenFinishedAction,
) {
  try {
    // only continue generator if `INSTANCE_API_VERSION` key not available in storage
    if (action.type === FETCH_MY_INFO) {
      const apiDetails: ApiDetails = yield select(selectApiDetails);
      if (
        apiDetails[INSTANCE_API_VERSION] !== null ||
        apiDetails[INSTANCE_API_VERSION] !== undefined
      ) {
        return;
      }
    }

    const instanceUrl: string = yield selectInstanceUrl();
    const response: Response = yield call(getOpenApiDefinition, instanceUrl);
    const apiDefinition = yield call([response, response.json]);

    checkInstanceCompatibility(apiDefinition);
    checkRemovedEndpoints(apiDefinition);
    const usingDeprecatedEndpoints = checkDeprecatedEndpoints(apiDefinition);
    if (usingDeprecatedEndpoints) {
      yield showSnackMessage('Please Update the Application.', TYPE_WARN);
    }

    const apiVersion = apiDefinition?.info?.version;
    const apiPaths = Object.keys(getOpenApiDefinitionPaths(apiDefinition));
    yield storageSetMulti({
      [INSTANCE_API_VERSION]: apiVersion ? apiVersion : null,
      [INSTANCE_API_PATHS]: apiPaths ? JSON.stringify(apiPaths) : null,
    });
  } catch (error) {
    yield showSnackMessage(
      getMessageAlongWithGenericErrors(
        error,
        'Failed to Fetch API Definition.',
      ),
      TYPE_ERROR,
    );
  }
}

export function* watchAuthActions() {
  yield takeEvery(FETCH_TOKEN, fetchAuthToken);
  yield takeEvery(LOGOUT, logout);
  yield takeEvery(FETCH_MY_INFO, fetchMyInfo);
  yield takeEvery(CHECK_INSTANCE, checkInstance);
  yield takeEvery(FETCH_ENABLED_MODULES, fetchEnabledModules);
  yield takeEvery(FETCH_NEW_TOKEN_FINISHED, fetchApiDefinition);
  yield takeEvery(FETCH_MY_INFO, fetchApiDefinition);
}
