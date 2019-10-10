var gulp = require('gulp'),
	rename = require('gulp-rename'),
	argv = require('yargs').argv,
	replace = require('gulp-replace'),

	fs = require('fs')
	
/**
 * 首字母大写
 */
function cap (str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 从模板创建一个页面, 包括 page.js and page.html
 * gulp createPage --n index --t title
 * or
 * npm run cp -- -n index --t title
 */
gulp.task('createPage', function () {

	var name = argv.n,
		title = argv.t || '园圈地图';

	gulp.src('./template/template-page.js')
		.pipe(replace(/_name_/g, cap(name)))
		.pipe(rename(name + '.js'))
		.pipe(gulp.dest('./src/pages/'));

	// create svelte file
	fs.writeFileSync('./src/pages/' + cap(name) + '.svelte', `<div>\n\n</div>\n\n<script>\n\t\n</script>`);

	// create page html file
	return gulp.src('./template/template-page.html')
		.pipe(replace(/_TITLE_/g, title))
		.pipe(replace(/_FILENAME_/g, name))
		.pipe(rename(name + '.html'))
		.pipe(gulp.dest('./public/'))

})

/**
 * 删除页面
 * gulp removePage --n index
 * or
 * npm run rp -- -n index
 */
gulp.task('removePage', function () {
	var name = argv.n;

	fs.unlinkSync(`./src/pages/${name}.js`);
	fs.unlinkSync(`./src/pages/${name}.svelte`);
	fs.unlinkSync(`./public/${name}.html`);

	try {
		fs.unlinkSync(`./public/js/${name}.js`);
		fs.unlinkSync(`./public/css/${name}.css`);
	} catch(e) {
		console.log(e.message);
	}
	

})




