import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';

import globby from "globby";
import path from "path";

const production = !process.env.ROLLUP_WATCH;

//
// npm run files fs:file1/file2/file3...
//
var fs = process.env.fs;
var files = null;

if (fs) {
	files = fs.split('/').map(f => {
		return 'src/pages/' + f + '.js';
	})
}

function createConfig(inputFile, name) {
	return {
		input: inputFile,
		output: {
			sourcemap: false,
			format: 'umd',
			name,
			file: `public/js/${name}.js`
		},
		plugins: [
			svelte({

				dev: !production,
				css: css => {
					css.write(`public/css/${name}.css`, false);
				}

			}),

			resolve({
				browser: true,
				dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
			}),
			commonjs(),

			// production && buble({
			// 	objectAssign: 'Object.assign'
			// }),

			// Watch the `public` directory and refresh the
			// browser on changes when not in production
			!production && livereload('public'),

			production && terser({
				compress: {
					drop_console: true
				}
			})
		],
		watch: {
			clearScreen: false
		}
	}
}

/**
 * multiple pages
 */
if (!files) {
	files = globby.sync('src/pages/*.js');
}

var config = files.map(inputFile => {

	var name = path.basename(inputFile, '.js');
	return createConfig(inputFile, name);

});

export default config;
