'use strict';

import plugins  from 'gulp-load-plugins';
import yargs    from 'yargs';
import gulp     from 'gulp';
import panini   from 'panini';
import rimraf   from 'rimraf';
import yaml     from 'js-yaml';
import fs       from 'fs';

// Load all Gulp plugins into one variable
const $ = plugins();


// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);


// Load settings from settings.yml
const { COMPATIBILITY, UNCSS_OPTIONS, PATHS } = loadConfig();

function loadConfig() {
	let ymlFile = fs.readFileSync('config.yml', 'utf8');
	return yaml.load(ymlFile);
}

// Build the "dist" folder by running all of the below tasks
gulp.task('build',
	gulp.series(clean, gulp.parallel(pages, sass, javascript_custom, javascript_vendor, javascript, fonts, images, copy)));


// Build the site, run the server, and watch for file changes
gulp.task('default',
	gulp.series('build', watch));


// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
	rimraf(PATHS.dist, done);
}


// Copy files out of the assets folder
function copy() {
	return gulp.src(PATHS.assets)
		.pipe(gulp.dest(PATHS.dist + '/'));
}


// Copy page templates into finished HTML files
function pages() {
  return gulp.src('src/pages/**/*.{html,php,htm,hbs,handlebars}') // <-must specify exactly what kind
	.pipe(panini({
		root: 'src/pages/',
		layouts: 'src/layouts/',
		// UNCOMMENT FOR PRODUCTION ::
		// layouts: 'src/layouts-production/',
		partials: 'src/partials/',
		data: 'src/data/',
		helpers: 'src/helpers/'
	}))
	.pipe(gulp.dest(PATHS.dist));
}


// Load updated HTML templates and partials into Panini
function resetPages(done) {
	panini.refresh();
	done();
}


// In production, compress CSS and append Autoprefixer
function sass() {
  return gulp.src('css/*.css')
	.pipe($.autoprefixer({
		browsers: COMPATIBILITY
	}))
	.pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
	.pipe($.if(PRODUCTION, $.cssnano()))
	.pipe(gulp.dest(PATHS.dist + '/css'));
}


// Combine Foundation JavaScript imports into one file (app.js)
// In production, the file is minified (app-min.js)
function javascript() {
	return gulp.src(PATHS.javascript)
		.pipe($.babel({ignore: ['what-input.js']}))
		.pipe($.concat('app-min.js'))
		.pipe($.if(PRODUCTION, $.uglify()
			.on('error', e => { console.log(e); })
		))
		.pipe(gulp.dest(PATHS.dist + '/js'));
}


// Watch and copy *-min.js files srced from js/src to js
// These files are fully compiled via Codekit and are not touched in the ZF6 build process
function javascript_custom() {
	return gulp.src('js/*-min.js')
		.pipe(gulp.dest(PATHS.dist + '/js'));
}


// Watch and copy .js files located in js/vendor to js/vendor in dist
// These js files are not touched by Codekit. For example, a jquery source file is in here
function javascript_vendor() {
	return gulp.src('js/vendor/**') // all sub-files and sub-folders except src
		.pipe(gulp.dest(PATHS.dist + '/js/vendor/'));
}


// Copy over fonts
function fonts() {
	return gulp.src('fonts/**')
		.pipe(gulp.dest(PATHS.dist + '/fonts'));
}


// Copy images to the "dist" folder
function images() {
	return gulp.src('img/**')
		.pipe(gulp.dest(PATHS.dist + '/img'));
}


// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {
	gulp.watch(PATHS.assets, copy);
	gulp.watch('js/**', javascript_custom);
	gulp.watch('src/pages/**', gulp.series(pages)); // <-watch for any type of additions
	gulp.watch('src/{layouts,partials}/**/*.html', gulp.series(resetPages, pages));
	gulp.watch('css/*.css', sass);
	gulp.watch('js/**', gulp.series(javascript_vendor, javascript));
	gulp.watch('img/**', images);
	gulp.watch('fonts/**', fonts);
}
