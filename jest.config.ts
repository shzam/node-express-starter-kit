const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src/tests'],
    setupFiles: ['<rootDir>/src/tests/setup.ts'],
    moduleNameMapper: {
        '@core/(.*)': ['<rootDir>/src/core/$1'],
        '@helpers/(.*)': ['<rootDir>/src/helpers/$1'],
        '@apps': ['<rootDir>/src/apps/index.ts'],
        '@apps/(.*)': ['<rootDir>/src/apps/$1'],
        '@test/(.*)': ['<rootDir>/src/tests/$1'],
        '@app': ['<rootDir>/src/app.ts'],
        '@server': ['<rootDir>/src/server.ts'],
        '@config': ['<rootDir>/src/config.ts'],
        '@database': ['<rootDir>/src/database.ts']
    },
    collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!**/node_modules/**']
};

export default config;
