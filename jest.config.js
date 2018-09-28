module.exports = {
  preset: 'jest-preset-angular',
  setupTestFrameworkScriptFile: '<rootDir>/src/setup-jest.ts',
  coverageDirectory: 'report/coverage',
  collectCoverageFrom: ['projects/**/*.ts', 'src/app/**/*.ts'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  moduleNameMapper: {
    '@mr/ngx-utils': '<rootDir>/projects/mr/ngx-utils/src/public_api.ts',
  },
};
