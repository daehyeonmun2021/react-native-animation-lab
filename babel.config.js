module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '*': '.',
          '@root': './',
          '@src': './src',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@providers': './src/providers',
          '@screens': './src/screens',
          '@types': './src/types',
          '@utils': './src/utils',
        },
      },
    ],
    ['react-native-reanimated/plugin', { disableInlineStylesWarning: true }],
  ],
};
