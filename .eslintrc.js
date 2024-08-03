module.exports = {
  root: true,
  env: {
    node: true,
    "cypress/globals": true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:cypress/recommended",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
  },
  plugins: ["cypress"],
  rules: {
    "no-unused-vars": ["error", { varsIgnorePattern: "Plugin$" }],
  },
};
