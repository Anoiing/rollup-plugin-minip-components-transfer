import typescript from '@rollup/plugin-typescript';

const config = {
  input: 'src/index.ts',
  plugins: [
    typescript()
  ],
  output: [
		{
			file: 'dist/rollup-plugin-minip-components-transfer.cjs.js',
			format: 'cjs',
		},
		{
			file: 'dist/rollup-plugin-minip-components-transfer.es.js',
			format: 'es',
		},
	],
};

export default config;
