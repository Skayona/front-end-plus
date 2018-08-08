const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const reload = browserSync.reload;
const historyFallback = require('connect-history-api-fallback');
const del = require('del');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const svgo = require('gulp-svgo');
const rename = require('gulp-rename');


gulp.task('sass', () => {
  console.log('---------- SASS  ----------');

  return gulp.src(['./src/sass/**/*.sass', './src/sass/**/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('./src/css'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('css', ['sass'], () => {
  console.log('---------- CSS  ----------');

  return gulp.src('./src/css/**/*.css')
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./src/bin/'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('js', () => {
  console.log('---------- JS  ----------');

  return gulp.src('./src/js/**/*.js')
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./src/bin/'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('browserSync', ['css', 'js'], () => {
  console.log('---------- BROWSER SYNC  ----------');
  browserSync.init({
    server: {
      baseDir: './src'
    },
    middleware: [
      historyFallback()
    ],
    port: 4900,
    open: true,
    notify: false
  })

  gulp.watch(['./src/sass/**/*.sass', './src/sass/**/*.scss'], ['css']);
  gulp.watch('./src/js/**/*.js', ['js']);
});

gulp.task('watch', ['browserSync']);

gulp.task('build', ['sass', 'css', 'js'], () => {
  console.log('---------- CLEAN BUILD ----------');
  del.sync('build');

  console.log('---------- BUILD  ----------');

  gulp.src('./src/*.html')
    .pipe(gulp.dest('./build/'))

  gulp.src(['./src/bin/*.css'])
    .pipe(gulp.dest('./build/bin'))

  gulp.src('./src/bin/*.js')
    .pipe(gulp.dest('./build/bin'))

  gulp.src(['./src/img/**'])
    .pipe(imagemin([
      imagemin.gifsicle(),
      imageminMozjpeg(),
      imageminPngquant()
    ], {
      verbose: true
    }))
    .pipe(svgo())
    .pipe(gulp.dest('./build/img'))

  gulp.src(['./src/fonts/**'])
    .pipe(gulp.dest('./build/fonts'))
});