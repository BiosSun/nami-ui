module.exports = {
    extends: [
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/react',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
        'plugin:jest/recommended',
    ],
    plugins: ['react', '@typescript-eslint'],
    env: {
        browser: true,
        es6: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    rules: {
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'react/jsx-props-no-spreading': 'off',
        'react/no-array-index-key': 'off',
        '@typescript-eslint/no-namespace': 'off',
        'no-nested-ternary': 'off',
        'import/prefer-default-export': 'off',
        'no-restricted-syntax': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
    },
}
