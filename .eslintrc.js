// .eslintrc.js

// eslint-disable-next-line no-undef
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:angular/johnpapa'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'angular'],
  rules: {
    'indent': ['error', 2], // Enforce 2-space indentation
    'semi': ['error', 'always'], // Require semicolons at the end of statements
    'no-console': 'warn', // Warn against using console.log()
    'max-len': ['error', { 'code': 240 }], 
    'space-infix-ops': ['error', { 'int32Hint': true }],
    '@typescript-eslint/no-explicit-any': 'off',
  },  
  
};
  