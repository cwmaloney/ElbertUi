// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 8,
    ecmaFeatures: { "experimentalObjectRestSpread": true },
    sourceType: 'module'
  },

  env: {
    browser: true,
    commonjs: true,
    es6: true
  },

  extends: [
    "eslint:recommended",
    "plugin:vue/recommended"
  ],

  // html plugin required to lint *.vue files
  plugins: [ "vue", "html"],

  // custom rules
  rules: {
    "no-console" : "off",

    // allow paren-less arrow functions
    "arrow-parens": "off",

    // allow async-await
    "generator-star-spacing": "off",

    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === 'production' ? "error" : "off",

    // allow semicolons
    "semi": "off",

    // no space before function parenthesis
    "space-before-function-paren": "off",

    "quotes": "off",

    "padded-blocks": "off",

    "no-unused-vars": [ "error", { "vars": "local", "args": "none" } ]
  }
};
