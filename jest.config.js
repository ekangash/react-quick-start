module.exports = {
    coverageDirectory: '<rootDir>/__tests__/_coverage',
    moduleFileExtensions: ['js', 'jsx', 'json'],
    moduleNameMapper: {
        '^@mocks(.*)$': '<rootDir>/__tests__/__mocks__$1',
        '^@tests-utils(.*)$': '<rootDir>/__tests__/_tests-utils$1',
        '^@common(.*)$': '<rootDir>/src/common$1',
        '^@config(.*)$': '<rootDir>/src/config$1',
        '^@entities(.*)$': '<rootDir>/src/entities$1',
        '^@hooks(.*)$': '<rootDir>/src/hooks$1',
        '^@packages(.*)$': '<rootDir>/src/packages$1',
        '^@store(.*)$': '<rootDir>/src/store$1',
        '^@endpoints(.*)$': '<rootDir>/src/endpoints$1',

        '^@app(.*)$': '<rootDir>/src/app$1',
        '^@shared(.*)$': '<rootDir>/src/components/shared$1',
        '^@layout(.*)$': '<rootDir>/src/components/layout$1',
        '^@features(.*)$': '<rootDir>/src/components/features$1',
        '^@pages(.*)$': '<rootDir>/src/pages$1',
        '^@enums(.*)$': '<rootDir>/src/enums$1',
    },
    roots: ['<rootDir>'],
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    testEnvironment: 'jest-environment-jsdom',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|jsx)?$',
    testPathIgnorePatterns: ['/node_modules/', '<rootDir>/__tests__/_coverage', '<rootDir>/__tests__/__mocks__', '<rootDir>/__tests__/_tests-utils'],
    transform: {
        '\\.(css|scss)$': '<rootDir>/__tests__/__mocks__/styleMocks.js',
        '\\.(js(x)?)$': 'babel-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(nanoid)/)',
    ],
};
