module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: "airbnb-base",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "linebreak-style": "off",
    "no-console": "off",
    "class-method-use-this": "off",
    "import/first": "off",
    "arrow-parens": "off",
    "no-param-reassign": "off",
    "object-curly-newline": "off",
    "operator-linebreak": "off",
    camelcase: "off",
    quotes: 0,
  },
};
