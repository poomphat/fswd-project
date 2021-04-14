module.exports = {
  'extends': 'nss',
  'env': {
    'browser': true,
    'es6': true,
    'jest': true,
  },
  'plugins': [
    'react-hooks'
  ],
  'rules': {
    'function-paren-newline': 'off',
    'lines-between-class-members': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-fragments': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        'additionalHooks': 'useRecoilCallback'
      }
    ]
  },
}
