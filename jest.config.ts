import { pathsToModuleNameMapper } from 'ts-jest';

// import { compilerOptions } from './tsconfig.json';

const TS_CONFIG_PATH = './tsconfig.json';
const SRC_PATH = '<rootDir>/src';

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
            '@server': ['./src/server.ts'],
            '@bin/*': ['./src/bin/*']
        },
        {
            prefix: '<rootDir>/'
        }
    ),
    collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!**/node_modules/**']
};

export default config;
