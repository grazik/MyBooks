import base from '@mybooks/config/eslint';
import globals from 'globals';

export default [
  ...base,
  {
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
