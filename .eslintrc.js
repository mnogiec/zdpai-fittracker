module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-import', 'unicorn'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:unicorn/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prefer-ternary': 'off',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['index', 'sibling', 'parent']],
        pathGroupsExcludedImportTypes: ['react'],
        pathGroups: [
          {
            pattern: 'react**',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '+(@)/**',
            group: 'internal',
            position: 'after',
          },
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
  overrides: [
    {
      files: ['src/migrations/**/*.ts'],
      rules: {
        'unicorn/filename-case': 'off',
      },
    },
  ],
};
