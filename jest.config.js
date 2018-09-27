module.exports = {
  preset: 'jest-preset-angular',
  setupTestFrameworkScriptFile: '<rootDir>/src/setup-jest.ts',
  coverageDirectory: 'report/coverage',
  collectCoverageFrom: ['projects/**/*.ts', 'src/app/**/*.ts'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 90,
      statements: 90,
    },
  },
  modulePathIgnorePatterns: ['<rootDir>/dist'],
};
