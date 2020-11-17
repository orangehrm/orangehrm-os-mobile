import { FETCH_PUNCH_STATUS, FETCH_PUNCH_STATUS_FINISHED, FetchPunchStatusAction, FetchPunchStatusFinishedAction, PunchStatus } from './types';



export const fetchPunchStatus = (): FetchPunchStatusAction => ({
    type: FETCH_PUNCH_STATUS,
});

export const fetchPunchStatusFinished = (
    payload?: PunchStatus,
    error: boolean = false,
): FetchPunchStatusFinishedAction => ({
    type: FETCH_PUNCH_STATUS_FINISHED,
    payload,
    error,
});
