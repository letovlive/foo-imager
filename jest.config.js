module.exports = {
  'setupFiles': [
    '<rootDir>/src/tests/test-env.js'
  ],
  'moduleFileExtensions': [
    'js',
    'json',
    'vue'
  ],
  'transform': {
    // process js with babel-jest
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    // process *.vue files with vue-jest
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },
  'testPathIgnorePatterns': [
    '/node_modules/'
  ],
  'transformIgnorePatterns': [
    // 'node_modules/(?!core-js|@babel/runtime)'
  ],
  'moduleDirectories': [
    'node_modules',
    'src'
  ],
  'moduleNameMapper': {
    // support the same @ -> src alias mapping in source code
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/tests/mocks/fileMock.js',
    '\\.(css|less|scss|styl)$': '<rootDir>/src/tests/mocks/styleMock.js'
  },
  // serializer for snapshots
  'snapshotSerializers': [
    '<rootDir>/node_modules/jest-serializer-vue'
  ],
  'globals': {
    'window': true,
    'document': true,
  },
  'collectCoverage': true,
  'collectCoverageFrom': [
    '**/*.{js,vue}',
    '!**/node_modules/**'
  ]
};
