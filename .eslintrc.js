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
        'no-param-reassign': 'off',
        'no-nested-ternary': 'off',
        'no-restricted-syntax': 'off',

        'import/prefer-default-export': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: ['scripts/**/*', '**/__stories__/**/*'] },
        ],

        'react/prop-types': ['error', { skipUndeclared: true }],
        'react/jsx-props-no-spreading': 'off',
        'react/no-array-index-key': 'off',
        'react/jsx-uses-react': 'off', // use React 17
        'react/react-in-jsx-scope': 'off', // use React 17

        '@typescript-eslint/no-shadow': ['error', { allow: ['value'] }],
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',

        'jsx-a11y/label-has-associated-control': 'off', // has bug, wrap check is invalid
    },
}
