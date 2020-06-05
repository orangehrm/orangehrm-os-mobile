import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import SelectInstance from 'screens/login/SelectInstance';

import {Provider} from 'react-redux';
import configureStore from 'store/configureStore';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <SelectInstance />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
