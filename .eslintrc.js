module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  ignorePatterns: [
    '**/*/*.js',
    '*.js',
    '*.svg',
    '*.json',
    '*.png',
    'package.json',
    'package-lock.json',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    'import',
    'react',
    'react-native',
    'prettier',
    'react-hooks',
    '@typescript-eslint',
    'promise',
    'unused-imports',
  ],
  env: {
    browser: true,
    es2021: true,
    'react-native/react-native': true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.d.ts',
          '.android.js',
          '.android.jsx',
          '.android.ts',
          '.android.tsx',
          '.ios.js',
          '.ios.jsx',
          '.ios.ts',
          '.ios.tsx',
          '.web.js',
          '.web.jsx',
          '.web.ts',
          '.web.tsx',
        ],
      },
    },
  },
  rules: {
    'import/order': [
      1,
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
      },
    ],
    'import/newline-after-import': [1],
    'import/no-useless-path-segments': [
      'error',
      {
        noUselessIndex: true,
      },
    ],
    /**
     * The default setting for Prettier is 'warn' because then it shows as yellow squiggly lines
     * in the VS Code IDE. However, it means `eslint` will not have an error code if there is warning
     * due to prettier unles you also add the `--max-warnings=0` flag in front of it. So, in the `lint-staged`
     * scripts in the packages within this monorepo, we add that flag so that the precommit hooks
     * associated with that script will fail when run.
     */
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-function': 'warn',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-console': [
      1,
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-empty-pattern': 'off',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: ['export'],
      },
      {
        blankLine: 'any',
        prev: ['export'],
        next: ['export'],
      },
    ],
    'react-native/no-inline-styles': 0,
    'react/react-in-jsx-scope': 2,
    'react/no-unstable-nested-components': 0,
    'react/display-name': 0,
    'react/prop-types': 0,
  },
};
