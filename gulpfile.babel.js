'use strict';

import plugins  from 'gulp-load-plugins';
import yargs    from 'yargs';
import browser  from 'browser-sync';
import gulp     from 'gulp';
import panini   from 'panini';
import rimraf   from 'rimraf';
import sherpa   from 'style-sherpa';
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
  gulp.series(clean, gulp.parallel(pages, sass, javascript, javascript_other, images, copy)));

// Build the site, run the server, and watch for file changes
gulp.task('default',
  gulp.series('build', watch));

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
  rimraf(PATHS.dist, done);
}

// Copy files out of the assets folder
// This task skips over the "img", "js", and "scss" folders, which are parsed separately
// [ DEFAULT FOLDER CHANGED FROM '/ASSETS' TO '/' ]
// [ THIS MAKES IT EASIER TO RIGHTCLICK->COPY PATH WHILE CODING]
function copy() {
  return gulp.src(PATHS.assets)
    .pipe(gulp.dest(PATHS.dist + '/'));
}

// Copy page templates into finished HTML files
function pages() {
  // return gulp.src('src/pages/**/*.{html,hbs,handlebars}')
  return gulp.src('src/pages/**/*.{html,php,hbs,handlebars}')
    .pipe(panini({
      root: 'src/pages/',
      layouts: 'src/layouts/',
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


// Compile Sass into CSS
// In production, the CSS is compressed
// [ REMOVED SOURCE-MAPPING/ERROR-LOGGING FUNCTION]
function sass() {
  return gulp.src('css/app.css')
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    .pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
    .pipe($.if(PRODUCTION, $.cssnano()))
    .pipe(gulp.dest(PATHS.dist + '/css'))
    .pipe(browser.reload({ stream: true }));
}


// Combine JavaScript into one file
// In production, the file is minified
// [REMOVED SOURCE-MAPPING FUNCTION]
function javascript() {
  return gulp.src(PATHS.javascript)
    .pipe($.babel())
    .pipe($.concat('app-min.js'))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe(gulp.dest(PATHS.dist + '/js'));
}

function javascript_other() {
  return gulp.src('js/!(app-min).js')
    .pipe(gulp.dest(PATHS.dist + '/js'));
}

// Copy images to the "dist" folder
// In production, the images are compressed
// [ DEFAULT FOLDER CHANGED FROM '/ASSETS' TO '/' ]
// [ THIS MAKES IT EASIER TO RIGHTCLICK->COPY PATH WHILE CODING]
// [ ALSO REMOVED THE 'IMAGEMIN' FUNCTION PER PERSONAL PREFERENCE OF GRAPHICS EDITING FLOW ]
function images() {
  return gulp.src('img/*')
    .pipe(gulp.dest(PATHS.dist + '/img'));
}


// Watch for changes to static assets, pages, Sass, and JavaScript
// [ ALL OF THESE HAVE ALTERED PATHS: '/ASSETS' WAS REMOVED FROM PATHS]
// [ IMAGES STILL TO BE ADJUSTED ]
function watch() {
  gulp.watch(PATHS.assets, copy);
  gulp.watch('src/pages/**/*.html', gulp.series(pages));
  gulp.watch('src/pages/**/*.php', gulp.series(pages));
  gulp.watch('src/{layouts,partials}/**/*.html', gulp.series(resetPages, pages));
  gulp.watch('scss/**/*.scss', sass);
  gulp.watch('js/**/*.js', gulp.series(javascript, javascript_other));
}
