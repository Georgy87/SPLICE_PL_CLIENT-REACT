const path = require('path');

const { pathsToModuleNameMapper } = require('ts-jest');

const { compilerOptions } = require('./tsconfig.json');
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@selectors': path.resolve(__dirname, 'src/store/selectors'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@core': path.resolve(__dirname, 'src/core'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@workers': path.resolve(__dirname, 'src/workers'),
      '@router': path.resolve(__dirname, 'src/router'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@slices': path.resolve(__dirname, 'src/store/slices'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@mocks': path.resolve(__dirname, 'src/mocks'),
      '@hocs': path.resolve(__dirname, 'src/hocs'),
      '@config': path.resolve(__dirname, 'src/config'),
    },
  },
  jest: {
    configure: {
      preset: 'ts-jest',
      collectCoverage: false,
      collectCoverageFrom: ['src/**/*.{ts,tsx}'],
      coverageReporters: ['text', 'lcov'],
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/src/',
      }),
    },
  },
};
