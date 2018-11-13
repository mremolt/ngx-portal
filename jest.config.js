module.exports = {
  preset: 'jest-preset-angular',
  setupTestFrameworkScriptFile: '<rootDir>/src/setup-jest.ts',
  coverageDirectory: 'report/coverage',
  collectCoverageFrom: ['projects/**/*.ts', 'src/app/**/*.ts'],
  coverageThreshold: {
    global: {
      branches: 70, // bug in branch coverage detection, Angular DI injections count as branch
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  moduleNameMapper: {
    '@mr/ngx-utils': '<rootDir>/projects/mr/ngx-utils/src/public_api.ts',
  },
};
