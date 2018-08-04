const gulp = require('gulp');
const sass = require('gulp-sass');


gulp.task('sass', function () {
  return gulp.src(['./sass/**/*.sass', './sass/**/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('./css'))
});