/**
 * Updated by augustus.hyu_'s author on January 02, 2024
 * Sample Eslint config for NodeJS ExpressJS MongoDB project
 */
import globals from 'globals'
import pluginJs from '@eslint/js'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-console': 'warn',
      'no-extra-boolean-cast': 'off',
      'no-lonely-if': 'warn',
      'no-unused-vars': 'warn',
      'no-trailing-spaces': 'warn',
      'no-multi-spaces': 'warn',
      'no-multiple-empty-lines': 'warn',
      'space-before-blocks': ['error', 'always'],
      'object-curly-spacing': ['warn', 'always'],
      'indent': ['warn', 2],
      'semi' : ['warn', 'never'],
      'quotes': ['error', 'single'],
      'array-bracket-spacing': 'warn',
      'linebreak-style': 'off',
      'no-unexpected-multiline': 'warn',
      'keyword-spacing': 'warn',
      'comma-dangle': 'warn',
      'comma-spacing': 'warn',
      'arrow-spacing': 'warn'
    }
  }
]
