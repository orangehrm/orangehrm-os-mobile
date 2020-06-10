/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';

// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';

it('renders correctly', async () => {
  // https://github.com/facebook/jest/issues/6434
  jest.useFakeTimers();
  await act(async () => {
    renderer.create(<App />);
  });
});
