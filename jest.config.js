module.exports = {
  preset: 'jest-preset-angular',
  setupTestFrameworkScriptFile: '<rootDir>/src/setup-jest.ts',
  coverageDirectory: 'report/coverage',
  collectCoverageFrom: ['projects/**/*.ts', 'src/app/**/*.ts'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 90,
      lines: 99,
      statements: 99,
    },
  },
  modulePathIgnorePatterns: ['<rootDir>/dist'],
};
