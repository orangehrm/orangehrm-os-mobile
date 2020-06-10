import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './index';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const preloadedState = {};
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(sagaMiddleware),
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
