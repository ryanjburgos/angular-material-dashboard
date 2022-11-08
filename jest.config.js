module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
    'chart.js': '<rootDir>node_modules/chart.js/dist/chart.mjs',
  },
};
