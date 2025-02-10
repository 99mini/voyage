import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';

import dotenv from 'dotenv';

import pkg from './package.json';

dotenv.config();

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: pkg.exports['.'].import,
        format: 'esm',
      },
      {
        file: pkg.exports['.'].require,
        format: 'cjs',
      },
    ],
    plugins: [
      typescript({ tsconfig: 'tsconfig.json' }),
      json(),
      nodeResolve({ preferBuiltins: false }),
      commonjs(),
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
        preventAssignment: true,
      }),
    ],
  },
];
