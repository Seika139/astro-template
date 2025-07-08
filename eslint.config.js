import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import astro from 'eslint-plugin-astro';
import astroParser from 'astro-eslint-parser';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsparser,
        extraFileExtensions: ['.astro'],
      },
    },
    plugins: {
      astro,
    },
    rules: {
      ...astro.configs.recommended.rules,
    },
  },
  {
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: {
        // ES2021 globals
        ...Object.fromEntries(
          [
            'AggregateError',
            'Array',
            'ArrayBuffer',
            'Atomics',
            'BigInt',
            'BigInt64Array',
            'BigUint64Array',
            'Boolean',
            'DataView',
            'Date',
            'Error',
            'EvalError',
            'FinalizationRegistry',
            'Float32Array',
            'Float64Array',
            'Function',
            'Infinity',
            'Int16Array',
            'Int32Array',
            'Int8Array',
            'Intl',
            'JSON',
            'Map',
            'Math',
            'NaN',
            'Number',
            'Object',
            'Promise',
            'Proxy',
            'RangeError',
            'ReferenceError',
            'Reflect',
            'RegExp',
            'Set',
            'SharedArrayBuffer',
            'String',
            'Symbol',
            'SyntaxError',
            'TypeError',
            'Uint16Array',
            'Uint32Array',
            'Uint8Array',
            'Uint8ClampedArray',
            'URIError',
            'WeakMap',
            'WeakRef',
            'WeakSet',
            'decodeURI',
            'decodeURIComponent',
            'encodeURI',
            'encodeURIComponent',
            'escape',
            'eval',
            'globalThis',
            'isFinite',
            'isNaN',
            'parseFloat',
            'parseInt',
            'undefined',
            'unescape',
          ].map((g) => [g, 'readonly'])
        ),
        // Node.js globals
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        exports: 'readonly',
        module: 'readonly',
        require: 'readonly',
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        location: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        alert: 'readonly',
        confirm: 'readonly',
        prompt: 'readonly',
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
];

// Lint対象から除外するパス
export const ignores = [
  'dist',
  '.astro',
  'node_modules',
  'coverage',
  '.devcontainer',
  '.vscode',
  'public',
];
