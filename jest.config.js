module.exports = {
  // "moduleFileExtensions": ["js", "jsx", "ts", "tsx"],
  "moduleNameMapper": {
    // "^@api$": "<rootDir>/js/api",
    '^@api/(.+)': '<rootDir>/resources/js/api/$1',
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/resources/js/tests/__mocks__/fileMock.js",
    "\\.(css|scss)$": "<rootDir>/resources/js/tests/__mocks__/styleMock.js",
  },
}
