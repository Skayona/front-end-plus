const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
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
const notify = require('gulp-notify');

gulp.task('html', () => {
  console.log('---------- SASS  ----------');
  return gulp.src('./src/html/*.html')
    .pipe(gulp.dest('./build/'))
    .pipe(reload({
      stream: true
    }));
})

gulp.task('sass', () => {
  console.log('---------- SASS  ----------');

  return gulp.src(['./src/sass/**/*.sass', './src/sass/**/*.scss'])
    .pipe(sass().on('error', notify.onError(function (err) {
      return {
        title: "SASS error!",
        message: err.message
      }
    })))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./build/css/'))
    .pipe(reload({
      stream: true
    }));
});


gulp.task('js', () => {
  console.log('---------- JS  ----------');

  return gulp.src('./src/js/**/*.js')
    // .pipe(babel({
    //   presets: ['env']
    // }))
    .pipe(concat('bundle.min.js'))
    // .pipe(uglify())
    // .pipe(obfuscate())
    .pipe(gulp.dest('./build/js/'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('browserSync', ['html', 'sass', 'js'], () => {
  console.log('---------- BROWSER SYNC  ----------');
  browserSync.init({
    server: {
      baseDir: './build'
    },
    middleware: [
      historyFallback()
    ],
    port: 4900,
    open: true,
    notify: false
  })

  gulp.watch(['./src/sass/**/*.sass', './src/sass/**/*.scss'], ['sass']);
  gulp.watch('./src/js/**/*.js', ['js']);
  gulp.watch('./src/html/**/*.html', ['html']);
});

gulp.task('watch', ['browserSync']);

gulp.task('build', ['html', 'sass', 'js'], () => {
  console.log('---------- BUILD  ----------');

  // gulp.src(['./src/img/**'])
  //   .pipe(imagemin([
  //     imagemin.gifsicle(),
  //     imageminMozjpeg(),
  //     imageminPngquant()
  //   ], {
  //     verbose: true
  //   }))
  //   .pipe(svgo())
  //   .pipe(gulp.dest('./build/img'))
});