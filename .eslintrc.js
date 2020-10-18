module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  env: {
    browser: true,
    jest: true,
    node: true,
    es2020: true,
  },
  plugins: [
    'vue',
  ],
  extends: [
    // add more generic rule sets here, such as:
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  rules: {
    // override/add rules settings here, such as:
    'vue/no-unused-vars': 'error',
    /**
     * Please use v-html responsible.
     * v-html is used only for translations rendering.
     */
    'vue/no-v-html': 0,
    'no-console': 'off',
    'no-restricted-syntax': [
      'error',
      {
        'selector': 'CallExpression[callee.object.name=\'console\'][callee.property.name!=/^(log|warn|error|info|trace)$/]',
        'message': 'Unexpected property on console object was called'
      }
    ],
    'semi': [2, 'always'],
    'no-useless-escape': 'off',
    'no-debugger': 'off'
  },
};
