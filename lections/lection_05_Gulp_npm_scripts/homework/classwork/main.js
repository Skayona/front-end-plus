let fs = require('fs');
let path = './lang';
let re = /_.+\./;
let all_tr = {};

fs.readdir(path, (err, items) => {
  if (err) {
    console.log(err);
    return err;
  }

  Promise
    .all(
      items.map(item => {
        return new Promise(resolve => {
          let lang = item.match(re)[0].slice(1, -1);
          let translates = require(`${path}/${item}`);
          resolve(new Map().set(lang, translates));
        });
      })
    )
    .then((result) => {
      result.forEach(tr => {
        for (let key of tr.keys()) {
          all_tr[key] = tr.get(key);
        }
      })
      console.log(all_tr);
    })
});