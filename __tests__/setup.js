// https://github.com/react-native-community/react-native-netinfo#errors-while-running-jest-tests
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';
jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

// https://github.com/react-navigation/react-navigation/issues/1792
jest.mock('@react-navigation/drawer', () => {
  return {
    addEventListener: jest.fn(),
    createDrawerNavigator: jest.fn(),
  };
});
