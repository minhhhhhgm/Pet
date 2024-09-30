module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          navigation: './src/navigation',
          screens: './src/screens',
          components: './src/components',
          utils: './src/utils',
          reduxStore: './src/reduxStore',
          services: './src/services',
          hooks: './src/hooks',
          types: './src/types',
          assets: './assets',
        },
      },
    ],
  ],
};
