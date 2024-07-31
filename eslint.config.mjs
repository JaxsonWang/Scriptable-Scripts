import eslint from '@eslint/js'
import tsEslint from 'typescript-eslint'
import configPrettier from 'eslint-config-prettier'
import pluginPrettier from 'eslint-plugin-prettier'

export default tsEslint.config([
  {
    ...eslint.configs.recommended,
    ...tsEslint.configs.recommended,
    ignores: ['**/.*', 'dist/*'],
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      ...configPrettier.rules,
      ...pluginPrettier.configs.recommended.rules,
      'no-debugger': 'off',
      'no-unused-vars': 'off',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto'
        }
      ]
    }
  }
])
