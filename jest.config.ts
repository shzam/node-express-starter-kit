const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src/tests'],
    setupFiles: ['<rootDir>/src/tests/setup.ts'],
    collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!**/node_modules/**']
};

export default config;
