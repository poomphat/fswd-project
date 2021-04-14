# eslint-config-nss

[![npm version](https://badge.fury.io/js/eslint-config-nss.svg)](http://badge.fury.io/js/eslint-config-nss)

ESLint config base on [eslint-config-airbnb](https://npmjs.com/eslint-config-airbnb).

## Installation
```sh
yarn add --dev eslint-config-nss
```

## Usage
### Node.js
Add `nss/node` to the "extends" array in your `.eslintrc` file.
```json
{
  "extends": ["nss/node"]
}
```
### React
If you're using React, use `nss/react` instead of `nss/node`.
- Support rules for React hooks (requires v16.8+).
- Rule for Recoil `"additionalHooks": "useRecoilCallback"`.
```json
{
  "extends": ["nss/react"]
}
```