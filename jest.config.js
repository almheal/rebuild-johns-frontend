module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/unit/jest.init.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@icons/(.*)$': '<rootDir>/src/components/icons/$1',
    '^@elements/(.*)$': '<rootDir>/src/components/elements/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@const': '<rootDir>/src/const/index.js',
    '^@utils': '<rootDir>/src/utils/index.js',
  },
}
