module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    "civicsource"
  ],
  rules:{
    "react/jsx-no-bind": false
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 8
  }
}
