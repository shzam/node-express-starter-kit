import { pathsToModuleNameMapper } from 'ts-jest';

const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src/tests'],
    setupFiles: ['<rootDir>/src/tests/setup.ts'],
    moduleNameMapper: pathsToModuleNameMapper(
        {
            '@core/*': ['./src/core/*'],
            '@database': ['./src/database.ts'],
            '@helpers/*': ['./src/helpers/*'],
            '@apps': ['./src/apps/index.ts'],
            '@apps/*': ['./src/apps/*'],
            '@test/*': ['./src/tests/*'],
            '@config': ['./src/config.ts'],
            '@app': ['./src/app.ts'],
            '@server': ['./src/server.ts']
        },
        {
            prefix: '<rootDir>/'
        }
    ),
    collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!**/node_modules/**']
};

export default config;
