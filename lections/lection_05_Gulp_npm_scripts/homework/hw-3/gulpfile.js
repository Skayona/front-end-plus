const gulp = require('gulp');
const merge = require('gulp-merge-json');
const re = /.+\./;


gulp.task('lang', () => {

  return gulp.src('./translates/*.json')
    .pipe(merge({
      fileName: 'translates.json',
      edit: (parsedJson, file) => {
        let lang = file.relative.match(re)[0].slice(0, -1);
        let tr = {};
        tr[lang] = parsedJson;
        return tr;
      }
    }))
    .pipe(gulp.dest('./'));
})