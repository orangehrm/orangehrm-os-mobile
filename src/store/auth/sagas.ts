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
  LOGOUT,
  FETCH_MY_INFO,
  CHECK_INSTANCE,
  CheckInstanceAction,
  FetchMenuItemsAction,
  FETCH_ENABLED_MODULES,
  FETCH_NEW_TOKEN_FINISHED,
  MyInfo,
  MenuItems,
  Employee,
} from 'store/auth/types';
import {
  PUBLIC_MOBILE_CLIENT_ID,
  OAUTH_CALLBACK_URL,
} from 'services/authentication';
import {
  checkInstance as checkInstanceRequest,
  checkLegacyInstance,
  checkInstanceCompatibility,
  getRestApiVersion,
  RestApiVersion,
  checkNotSupported5xInstance,
} from 'services/instance-check';
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  SCOPE,
  TOKEN_TYPE,
  EXPIRES_AT,
  INSTANCE_URL,
  INSTANCE_API_VERSION,
} from 'services/storage';
import {
  openLoader,
  closeLoader,
  showSnackMessage,
} from 'store/saga-effects/globals';
import {apiCall, apiGetCall, ApiResponse} from 'store/saga-effects/api';
import {
  storageSetMulti,
  selectAuthParams,
  selectInstanceUrl,
  storageSetItem,
} from 'store/saga-effects/storage';
import {
  fetchMyInfoFinished,
  checkInstanceFinished,
  fetchMenuItemsFinished,
  myInfoFailed,
  fetchNewAuthTokenFinished,
} from 'store/auth/actions';
import {getExpiredAt, HTTP_UNAUTHORIZED} from 'services/api';
import {AuthParams, ApiDetails} from 'store/storage/types';
import {selectApiDetails} from 'store/storage/selectors';
import {TYPE_ERROR} from 'store/globals/types';
import {
  getMessageAlongWithGenericErrors,
  isJsonParseError,
  ERROR_NO_ASSIGNED_EMPLOYEE,
  ERROR_JSON_PARSE,
} from 'services/api';
import {
  API_ENDPOINT_MY_INFO,
  OAUTH_ENDPOINT_TOKEN,
  OAUTH_ENDPOINT_AUTHORIZE,
  prepare,
  API_ENDPOINT_MOBILE_MENU_ITEMS,
} from 'services/endpoints';
import {InstanceCheckError} from 'services/errors/instance-check';
import {
  authorize,
  AuthorizeResult,
  AuthConfiguration,
} from 'react-native-app-auth';
import {$PropertyType} from 'utility-types';

/**
 * Check instance existence & compatibility
 * @param action this param can be undefined when calling this generator from another generator
 */
function* checkInstance(action?: CheckInstanceAction) {
  try {
    yield openLoader();
    let instanceUrl: string = yield selectInstanceUrl();
    // eslint-disable-next-line no-undef
    let response: Response = yield call(checkInstanceRequest, instanceUrl);

    // check instance in advanced
    const urls = getAbsoluteUrlsForChecking(instanceUrl);

    // if user enter web system login screen url
    let splitedInstanceUrl: string | null = null;
    if (
      (!response.ok || !isJsonResponse(response)) &&
      instanceUrl.includes('/index.php')
    ) {
      splitedInstanceUrl = instanceUrl.split('/index.php')[0] + '/index.php';
      // eslint-disable-next-line no-undef
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
      // eslint-disable-next-line no-undef
      const responses: Response[] = yield all(effects);

      for (let i = 0; i < responses.length; i++) {
        if (responses[i]?.ok && isJsonResponse(responses[i])) {
          response = responses[i];
          instanceUrl = urls[i];
          break;
        }
      }
    }

    /**
     * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     * + Start: Check whether instance is 5.3 or below
     * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     */
    if (!response.ok || !isJsonResponse(response)) {
      if (splitedInstanceUrl !== null) {
        urls.unshift(splitedInstanceUrl);
      }
      const effects = urls.map((url) => {
        return call(checkNotSupported5xInstanceRequestWithCatch, url);
      });
      // eslint-disable-next-line no-undef
      const responses: Response[] = yield all(effects);

      for (let i = 0; i < responses.length; i++) {
        if (
          responses[i]?.status === HTTP_UNAUTHORIZED &&
          isJsonResponse(responses[i])
        ) {
          throw new InstanceCheckError(
            'OrangeHRM Mobile app is not supported with this instance. Please contact your system administrator.',
          );
        }
      }
    }
    /**
     * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     * + End: Check whether instance is 5.3 or below
     * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     */

    /**
     * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     * + Start: Check whether instance is 4.x
     * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     */
    const urlsFor4x = getAbsoluteUrlsFor4xChecking(instanceUrl);
    // evaluate original URL without concat paths
    urlsFor4x.unshift(instanceUrl);
    if (splitedInstanceUrl !== null) {
      urlsFor4x.unshift(splitedInstanceUrl);
    }

    // check instance is 4x
    if (!response.ok || !isJsonResponse(response)) {
      const effects = urlsFor4x.map((url) => {
        return call(checkLegacyInstanceWithCatch, url);
      });
      // eslint-disable-next-line no-undef
      const responses: Response[] = yield all(effects);

      for (let i = 0; i < responses.length; i++) {
        // `/oauth/issueToken` endpoint content-type is `text/html`. Don't check isJsonResponse(response)
        if (responses[i]?.ok) {
          throw new InstanceCheckError(
            'OrangeHRM Mobile app is not supported with this instance (OrangeHRM Web 4.x). Please contact your system administrator.',
          );
        }
      }
    }
    /**
     * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     * + End: Check whether instance is 4.x
     * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     */

    if (response.ok && isJsonResponse(response)) {
      yield storageSetItem(INSTANCE_URL, instanceUrl);
      const data: {
        data: RestApiVersion;
      } = yield call([response, response.json]);

      checkInstanceCompatibility(data.data);

      yield* fetchAuthToken();
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

function checkNotSupported5xInstanceRequestWithCatch(instanceUrl: string) {
  return checkNotSupported5xInstance(instanceUrl).catch(() => {
    return null;
  });
}

function checkLegacyInstanceWithCatch(instanceUrl: string) {
  return checkLegacyInstance(instanceUrl).catch(() => {
    return null;
  });
}

// eslint-disable-next-line no-undef
function isJsonResponse(response: Response) {
  return response?.headers.get('Content-Type') === 'application/json';
}

function getAbsoluteUrlsForChecking(instanceUrl: string) {
  return [
    instanceUrl + '/web/index.php',
    instanceUrl + '/web',
    instanceUrl + '/index.php',
  ];
}

function getAbsoluteUrlsFor4xChecking(instanceUrl: string) {
  return [
    instanceUrl + '/symfony/web',
    instanceUrl + '/symfony/web/index.php',
    instanceUrl + '/index.php',
  ];
}

function* fetchMenuItems(action?: FetchMenuItemsAction) {
  try {
    if (action) {
      yield openLoader();
    }

    // eslint-disable-next-line no-undef
    const response: Response = yield apiCall(
      apiGetCall,
      API_ENDPOINT_MOBILE_MENU_ITEMS,
      true,
    );

    if (response.ok) {
      const responseData: ApiResponse<
        $PropertyType<MenuItems, 'menuItems'>,
        $PropertyType<MenuItems, 'meta'>
      > = yield call([response, response.json]);

      if (responseData.data) {
        yield put(
          fetchMenuItemsFinished({
            menuItems: responseData.data,
            meta: responseData.meta,
          }),
        );
      } else {
        throw new InstanceCheckError('Failed to Load Menu Items.');
      }
    } else {
      throw new InstanceCheckError('Failed to Load Menu Items.');
    }
  } catch (error) {
    if (error instanceof InstanceCheckError && action === undefined) {
      throw error;
    }
    yield showSnackMessage(
      getMessageAlongWithGenericErrors(error, 'Failed to Load Menu Items.'),
      TYPE_ERROR,
    );
    yield put(fetchMenuItemsFinished(undefined, true));
  } finally {
    if (action) {
      yield closeLoader();
    }
  }
}

function* fetchAuthToken() {
  try {
    yield openLoader();

    const authParams: AuthParams = yield selectAuthParams();

    if (authParams.instanceUrl !== null) {
      const config: AuthConfiguration = {
        serviceConfiguration: {
          authorizationEndpoint:
            authParams.instanceUrl + OAUTH_ENDPOINT_AUTHORIZE,
          tokenEndpoint: authParams.instanceUrl + OAUTH_ENDPOINT_TOKEN,
        },
        clientId: PUBLIC_MOBILE_CLIENT_ID,
        scopes: [],
        redirectUrl: OAUTH_CALLBACK_URL,
        usePKCE: true,
        useNonce: false,
        additionalHeaders: {Accept: 'application/json'},
        connectionTimeoutSeconds: 5,
      };

      const authState: AuthorizeResult = yield call(authorize, config);

      yield storageSetMulti({
        [ACCESS_TOKEN]: authState.accessToken,
        [REFRESH_TOKEN]: authState.refreshToken,
        [TOKEN_TYPE]: authState.tokenType,
        [SCOPE]: authState.scopes.join(' '),
        [EXPIRES_AT]: getExpiredAt(authState.accessTokenExpirationDate),
      });
      yield put(fetchNewAuthTokenFinished());
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
    yield* fetchMenuItems();

    // eslint-disable-next-line no-undef
    const rawResponse: Response = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_MY_INFO, {}, {model: 'summary'}),
      true,
    );

    if (rawResponse.ok) {
      try {
        const response: ApiResponse<Employee> = yield call([
          rawResponse,
          rawResponse.json,
        ]);
        if (response.data) {
          const data: MyInfo = {
            employee: response.data,
          };
          yield put(fetchMyInfoFinished(data));
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

function* fetchApiDefinition() {
  try {
    // only continue generator if `INSTANCE_API_VERSION` key not available in storage
    const apiDetails: ApiDetails = yield select(selectApiDetails);
    if (
      apiDetails[INSTANCE_API_VERSION] !== null ||
      apiDetails[INSTANCE_API_VERSION] !== undefined
    ) {
      return;
    }

    const instanceUrl: string = yield selectInstanceUrl();
    // eslint-disable-next-line no-undef
    const response: Response = yield call(getRestApiVersion, instanceUrl);
    const apiVersion: RestApiVersion = yield call([response, response.json]);

    checkInstanceCompatibility(apiVersion);

    yield storageSetMulti({
      [INSTANCE_API_VERSION]: apiVersion.version,
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
  yield takeEvery(LOGOUT, logout);
  yield takeEvery(FETCH_MY_INFO, fetchMyInfo);
  yield takeEvery(CHECK_INSTANCE, checkInstance);
  yield takeEvery(FETCH_ENABLED_MODULES, fetchMenuItems);
  yield takeEvery(FETCH_NEW_TOKEN_FINISHED, fetchApiDefinition);
}
