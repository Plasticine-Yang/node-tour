import { build } from 'esbuild'

/** @type { import('esbuild').BuildOptions } */
const buildOptions = {
  entryPoints: ['./browser/index.js'],
  outfile: './dist/index.js',
  bundle: true,
  minify: true,
}

build(buildOptions)
