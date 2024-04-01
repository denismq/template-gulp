const gulp = require('gulp');
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
    .src(config.stylesheets.main)
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

/*gulp.task('images', function() {
    return gulp.src(config.images.main)
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 })
            // imagemin.svgo({ plugins: [{ removeViewBox: true }] })
        ]))
        .pipe(gulp.dest(config.images.output));
})*/

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

//gulp.task('build', gulp.parallel('scss', 'html', 'js', 'images'));
gulp.task('build', gulp.parallel('scss', 'html', 'js'));

gulp.task('default', gulp.parallel('watch', 'build'));
