import base from '@mybooks/config/eslint';
import globals from 'globals';

export default [
  { ignores: ['dist/', 'generated/'] },
  ...base,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
