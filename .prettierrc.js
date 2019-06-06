module.exports = {
  printWidth: 80, // 80
  tabWidth: 2, // 2
  useTabs: false, // false
  semi: false, // true
  singleQuote: true, // false
  trailingComma: 'es5', // none | es5 | all
  bracketSpacing: true, // true
  overrides: [
    {
      files: '*src/app.js',
      options: {
        printWidth: 100,
      },
    },
  ],
  // jsxBracketSameLine: false // false
  // arrowParens: avoid // avoid | always
}
