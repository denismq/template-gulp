/*const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const rename = require('gulp-rename');
const sassGlob = require('gulp-sass-glob');
const browserSync = require('browser-sync').create();
const babelify = require('babelify');
const notify = require('gulp-notify');
//const imagemin = require('gulp-imagemin');
*/
//const gulp = require('gulp');
import gulp from 'gulp';
//const sass = require('gulp-sass');
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

//import * as sass from 'sass';

//const sass = require('gulp-sass')(require('sass'));
import autoprefixer from 'gulp-autoprefixer';
//const autoprefixer = require('gulp-autoprefixer');
import sourcemaps from 'gulp-sourcemaps';
//const sourcemaps = require('gulp-sourcemaps');
import browserify from 'browserify';
//const browserify = require('browserify');
import source from 'vinyl-source-stream';
//const source = require('vinyl-source-stream');
import buffer from 'vinyl-buffer';
//const buffer = require('vinyl-buffer');
import uglify from 'gulp-uglify';
//const uglify = require('gulp-uglify');
import plumber from 'gulp-plumber';
//const plumber = require('gulp-plumber');
import pug from 'gulp-pug';
//const pug = require('gulp-pug');
import rename from 'gulp-rename';
//const rename = require('gulp-rename');
import sassGlob from 'gulp-sass-glob';
//const sassGlob = require('gulp-sass-glob');
import browserSync from 'browser-sync';
//const browserSync = require('browser-sync').create();
import babelify from 'babelify';
//const babelify = require('babelify');
import notify from 'gulp-notify';
//const notify = require('gulp-notify');
//const imagemin = import('gulp-imagemin');
import imagemin from 'gulp-imagemin';
//const imagemin = require('gulp-imagemin');
import imageminGifsicle from 'imagemin-gifsicle';
//const imageminGifsicle = require('imagemin-gifsicle');
import imageminJpegtran from 'imagemin-jpegtran';
//const imageminJpegtran = require('imagemin-jpegtran');
import imageminOptipng from 'imagemin-optipng';
//const imageminOptipng = require('imagemin-optipng');

var config = {
  stylesheets: {
    //main: 'source/scss/index.scss',
    main: 'source/scss/**/*.scss',
    watch: 'source/scss/**/*.scss',
    output: 'dist/css',
  },
  // javascript: {
  //     main: 'source/javascript/main.js',
  //     watch: 'source/javascript/**/*.js',
  //     files: [],
  //     output: 'dist/javascript'
  // },
  javascript: {
    //main: 'source/javascript/main.js',
    folder: 'source/javascript/',
    watch: 'source/javascript/**/*.js',
    files: ['main.js', 'test.js'],
    output: 'dist/javascript',
  },
  html: {
    main: 'source/pug/views/**/*.pug',
    watch: 'source/pug/**/*.pug',
    output: 'dist',
  },
  images: {
    main: 'source/images/**/*',
    output: 'dist/images',
  },
  fonts: {
    main: 'source/fonts/**/*',
    output: 'dist/fonts',
  },
};

function reload() {
  browserSync.reload();
  // done();
}

gulp.task('scss', function () {
  return gulp
    .src([
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      //config.stylesheets.main,
      'source/scss/**/*.scss',
    ])
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(
      sass({
        includePaths: ['node_modules/'],
      })
    )
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false,
      })
    )
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.stylesheets.output))
    .pipe(browserSync.stream());
  // .pipe(browserSync.reload({ // Reloading with Browser Sync
  //     stream: true
  // }))
});

gulp.task('html', function () {
  return gulp
    .src(config.html.main)
    .pipe(plumber())
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest(config.html.output));
});

gulp.task('js', function (done) {
  config.javascript.files.map(function (entry) {
    return (
      browserify({
        entries: [config.javascript.folder + entry],
      })
        .transform(babelify, { presets: ['@babel/preset-env'] })
        .bundle()
        .on(
          'error',
          notify.onError({
            message: 'Error: <%= error.message %>',
            title: 'Failed running browserify',
          })
        )
        .pipe(source(entry))
        // .pipe( rename({ extname: '.min.js' }))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        //.pipe( uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.javascript.output))
        .pipe(browserSync.stream())
    );
  });
  done();
});

gulp.task('images', function () {
  return gulp
    .src(config.images.main)
    .pipe(
      imagemin([
        //imagemin.gifsicle({ interlaced: true }),
        //imagemin.jpegtran({ progressive: true }),
        //imagemin.optipng({ optimizationLevel: 5 }),
        // imagemin.svgo({ plugins: [{ removeViewBox: true }] })
        imageminGifsicle({ interlaced: true }),
        imageminJpegtran({ progressive: true }),
        imageminOptipng({ optimizationLevel: 5 }),
      ])
    )
    .pipe(gulp.dest(config.images.output));
});

gulp.task('fonts', () => {
  gulp.src(config.fonts.main).pipe(gulp.dest(config.fonts.output));
});

gulp.task('watch', function () {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
  });

  gulp
    .watch(config.stylesheets.watch, gulp.series('scss'))
    .on('change', reload);
  gulp.watch(config.html.watch, gulp.series('html')).on('change', reload);
  gulp.watch(config.javascript.watch, gulp.series('js')).on('change', reload);
});

gulp.task('build', gulp.parallel('scss', 'html', 'js', 'images', 'fonts'));
//gulp.task('build', gulp.parallel('scss', 'html', 'js'));

gulp.task('default', gulp.parallel('watch', 'build'));
