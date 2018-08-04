var gulp = require('gulp');
let fs = require('fs');
let path = './translates';
let re = /.+\./;
let all_tr = {};

gulp.task('translates', () => {
  return gulp.src('translates')
    .pipe(
      fs.readdir(path, (err, items) => {
        if (err) {
          console.log(err);
          return err;
        }

        Promise
          .all(
            items.map(item => new Promise(resolve => {
              let lang = item.match(re)[0].slice(0, -1);
              let translates = require(`${path}/${item}`);
              resolve(new Map().set(lang, translates));
            }))
          )
          .then((result) => {
            result.forEach(tr => {
              for (let key of tr.keys()) {
                all_tr[key] = tr.get(key);
              }
            })
            console.log(all_tr);
          })
      })

    )


})