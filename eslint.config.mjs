import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.ts'] },
  { 
    languageOptions: { 
    globals: globals.node,
    parserOptions: {
      project: './tsconfig.json'
    },
  },
  
  },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
      rules: {
        quotes: ['error', 'single'],
        'object-curly-spacing': ['error', 'always'],
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/method-signature-style': 'off',
        '@typescript-eslint/return-await': 'off',
        'import/export': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/no-explicit-any': 'off'
      }
    }
];