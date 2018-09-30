module.exports = {
  'setupFiles': [
    '<rootDir>/src/tests/test-env.js'
  ],
  'moduleFileExtensions': [
    'js',
    'vue'
  ],
  'transform': {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },
  'testPathIgnorePatterns': [
    '/node_modules/'
  ],
  'transformIgnorePatterns': [],
  'moduleDirectories': [
    'node_modules',
    'src'
  ],
  'moduleNameMapper': {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/tests/mocks/fileMock.js',
    '\\.(css|less|scss|styl)$': '<rootDir>/src/tests/mocks/styleMock.js'
  },
  'globals': {
    'window': true,
    'document': true,
    'babel-jest': {
      'babelrcFile': 'src/tests/.babelrc'
    }
  }
};
