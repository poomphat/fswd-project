module.exports = {
  'extends': 'nss',
  'env': {
    'node': true,
    'es6': true,
  },
  'rules': {
    'no-unused-vars': [
      'error',
      {
        'args': 'none',
        'caughtErrors': 'all',
      }
    ],
  },
}
