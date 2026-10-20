import base from '@mybooks/config/eslint';

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
