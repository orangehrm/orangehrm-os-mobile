// Mock for react-native-safe-area-context
// This provides default safe area insets for testing

import React from 'react';

// Consumers that read the context directly (rather than via useSafeAreaInsets) get
// null, i.e. "no provider" — the same value the real context has outside a provider.
export const SafeAreaInsetsContext = React.createContext(null);

export const useSafeAreaInsets = () => ({
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
});

export const SafeAreaProvider = ({children}) => children;

export const SafeAreaView = ({children, ...props}) => children;

export const SafeAreaConsumer = ({children}) =>
  children({top: 0, bottom: 0, left: 0, right: 0});

export const withSafeAreaInsets = (Component) => Component;

export const useSafeAreaFrame = () => ({
  x: 0,
  y: 0,
  width: 375,
  height: 812,
});

export default {
  SafeAreaInsetsContext,
  SafeAreaProvider,
  SafeAreaView,
  SafeAreaConsumer,
  withSafeAreaInsets,
  useSafeAreaFrame,
  useSafeAreaInsets,
};
