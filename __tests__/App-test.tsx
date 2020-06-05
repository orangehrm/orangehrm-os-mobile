/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  // https://github.com/facebook/jest/issues/6434
  jest.useFakeTimers();
  renderer.create(<App />);
});
