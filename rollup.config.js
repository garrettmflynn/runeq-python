// Install Rollup Plugins
// yarn add rollup @babel/core @rollup/plugin-commonjs @babel/preset-env @web/rollup-plugin-copy @rollup/plugin-node-resolve rollup-plugin-minify-html-literals rollup-plugin-summary rollup-plugin-typescript2 rollup-plugin-terser rollup-plugin-import-css @rollup/plugin-node-resolve @rollup/plugin-babel @babel/plugin-proposal-class-properties -D

import {copy} from '@web/rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
import minifyHTML from 'rollup-plugin-minify-html-literals';
// import summary from 'rollup-plugin-summary';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import {terser} from "rollup-plugin-terser";
import css from "rollup-plugin-import-css";
import node_resolve from "@rollup/plugin-node-resolve";
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
 input: './src/index.ts', // our source file
 output: [
  {
    file: pkg.main,
    format: 'umd', // the preferred format
    exports: 'named',
    name: 'runeq'
  },
  {
   file: pkg.module,
   format: 'es' // the preferred format
  }
 ],
//  external: [
//   ...Object.keys(pkg.dependencies || {})
//  ],
 plugins: [
    commonjs(),
    node_resolve(),
    babel({
        babelHelpers: 'bundled',
        plugins: ["@babel/plugin-proposal-class-properties"]
    }),
    css(),
    // Resolve bare module specifiers to relative paths
    resolve(),
    // Minify HTML template literals
    minifyHTML(),
    // Minify JS
    terser(
        // {
        // ecma: 2020,
        // module: true,
        // warnings: true,
        // }
    ),
    // Print bundle summary
    // summary(),
    // Optional: copy any static assets to build directory
    copy({
      patterns: ['../src/styles/**/*'],
    }),
    // Support Typescript
  typescript({ 
   typescript: require('typescript'),
  }),
 ],
//  preserveEntrySignatures: 'strict',
}

export default config