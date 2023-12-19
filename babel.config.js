// babel.config.js
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json','.png'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@theme': './src/theme',
          '@assets': './src/assets',
        },
      },
    ],
  ],
};
