module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:react/recommended', 'prettier/react'],
  plugins: ['react', 'react-hooks', 'jsx-a11y'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es6: true,
    commonjs: true,
  },
  globals: {
    process: 'readonly',
  },
  rules: {
    'react/prop-types': 'off',
  },
}
