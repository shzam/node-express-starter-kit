const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src/tests'],
    setupFiles: ['<rootDir>/src/tests/setup.ts'],
    moduleNameMapper: {
        '@core/(.*)': ['<rootDir>/src/core/$1'],
        '@helpers/(.*)': ['<rootDir>/src/helpers/$1'],
        '@routes/(.*)': ['<rootDir>/src/routes/$1'],
        '@test/(.*)': ['<rootDir>/src/tests/$1'],
        '@config': ['<rootDir>/src/config.ts']
    },
    collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!**/node_modules/**']
};

export default config;
