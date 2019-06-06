module.exports = {
  parser: 'babel-eslint',
  plugins: ['react', 'jest'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  rules: {
    'no-console': 'off',
    'react/prop-types': 'off',
    'no-unused-vars': [
      'warn',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
    ],
  },
  globals: {
    document: false,
    module: false,
    window: false,
    console: false,
    require: false,
    setTimeout: false,
    clearTimeout: false,
    Promise: false,
    process: false,
    __dirname: false,
    __filename: false,
  },
  settings: {
    react: {
      version: '16.4.2', // React version, default to the latest React stable release
    },
  },
}
