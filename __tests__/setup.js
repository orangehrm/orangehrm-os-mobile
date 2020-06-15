// https://github.com/react-navigation/react-navigation/issues/1792
jest.mock('@react-navigation/drawer', () => {
  return {
    addEventListener: jest.fn(),
    createDrawerNavigator: jest.fn(),
  };
});
