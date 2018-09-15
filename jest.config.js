module.exports = {
  preset: 'jest-preset-angular',
  setupTestFrameworkScriptFile: '<rootDir>/src/setup-jest.ts',
  coverageDirectory: 'report/coverage',
  collectCoverageFrom: ['projects/**/*.ts', 'src/app/**/*.ts'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  modulePathIgnorePatterns: ['<rootDir>/dist'],
};
