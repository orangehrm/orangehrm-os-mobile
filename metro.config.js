/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    assetExts: ['png', 'jpg', 'jpeg', 'gif', 'svg', 'ttf', 'otf'],
    sourceExts: ['tsx', 'ts', 'jsx', 'js', 'json'],
  },
  server: {
    port: 8081,
  },
  // Required for React Native 0.77+ (Flow `component` syntax in core libraries).
  transformer: {
    hermesParser: true,
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
