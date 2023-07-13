const config = {
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/index.ts',
    '!src/utils.ts',
    '!src/backdraft-*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['clover', 'json', 'text', 'html'],
  transform: {
    '\\.ts$': 'ts-jest'
  },
  rootDir: '.',
  testEnvironment: 'jsdom',
  testMatch: ['**/*.spec.ts']
};

export default config;
