import {createStore} from 'redux';
import rootReducer from './index';

export default function configureStore() {
  const store = createStore(rootReducer);

  return store;
}
