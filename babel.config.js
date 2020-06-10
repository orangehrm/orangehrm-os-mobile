module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          screens: './src/screens',
          components: './src/components',
          images: './src/images',
          store: './src/store',
          layouts: './src/layouts',
          theme: './src/theme',
          lib: './src/lib',
          services: './src/services',
        },
      },
    ],
  ],
};
