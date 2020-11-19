module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    project: ['./pkg/server/tsconfig.json'],
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'eslint-plugin-prettier', 'prettier', 'import'],
  rules: {
    'prettier/prettier': [
      "warn",
      {
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 100,
        tabWidth: 2,
        arrowParens: 'avoid',
      }
    ],
    "import/no-extraneous-dependencies": 'off',
    "import/no-unresolved": 'off',
    "import/extensions": 'off',
    "import/prefer-default-export": 'off',
    'import/no-named-default': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    "@typescript-eslint/explicit-function-return-type": ['error', {
      "allowExpressions": true,
      "allowTypedFunctionExpressions": true,
      "allowHigherOrderFunctions": true,
    }],
    "@typescript-eslint/camelcase": 'off',
    "camelcase": "off",
    "no-console": "off",
    "no-shadow": 'off',
  }
};
