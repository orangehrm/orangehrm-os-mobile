import {RootState} from 'store';
import {createSelector} from 'reselect';
import {INSTANCE_URL, USERNAME} from 'services/storage';

export const selectStorage = (state: RootState) => state.storage;

export const selectInstanceUrl = createSelector(
  selectStorage,
  (storage) => storage[INSTANCE_URL],
);

export const selectUsername = createSelector(
  selectStorage,
  (storage) => storage[USERNAME],
);

export const selectStorageLoaded = createSelector(
  selectStorage,
  ({loaded, error}) => ({loaded, error}),
);
