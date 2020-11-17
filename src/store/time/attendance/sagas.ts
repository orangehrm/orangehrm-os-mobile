import { takeEvery, put } from 'redux-saga/effects';
import { apiCall, apiGetCall, apiPostCall } from 'store/saga-effects/api';
import {
    openLoader,
    closeLoader,
    showSnackMessage,
} from 'store/saga-effects/globals';
import { FETCH_PUNCH_STATUS, FETCH_PUNCH_STATUS_FINISHED } from './types';
import { fetchPunchStatusFinished } from './actions';
import { API_ENDPOINT_PUNCH_STATUS } from 'services/endpoints'

function* fetchPunchStatus() {
    try {
        yield openLoader();
        const response = yield apiCall(
            apiGetCall,
            API_ENDPOINT_PUNCH_STATUS,
        );
        yield put(fetchPunchStatusFinished(response.data));
    } catch (error) {
        yield put(fetchPunchStatusFinished(undefined, true));
    } finally {
        yield closeLoader();
    }
}

export function* watchPunchStatusActions() {
    yield takeEvery(FETCH_PUNCH_STATUS, fetchPunchStatus);
}
