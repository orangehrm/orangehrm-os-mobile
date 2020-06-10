import 'react-native-gesture-handler';
import React from 'react';
import Navigator from './Navigator';

import {Provider} from 'react-redux';
import configureStore from 'store/configureStore';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
