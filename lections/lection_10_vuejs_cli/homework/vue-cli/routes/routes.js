
let fs = require('fs');
let path = '.';
let users = '/users';


function pathConcat(pathname) {
  return path + '/' + pathname;
}

function filereader(fsRef, path) {
  if (typeof (path) === 'object') {
    return Promise.all(path.map(user => {
      return new Promise(resolve => {
        let url = pathConcat(`api${users}/${user}/get.json`);
        fsRef.readFile(url, 'utf8', function (e, d) {
          if (e) throw (e);
          resolve(JSON.parse(d)[0]);
        });
      })
    }))
  }
  return new Promise(function (resolve, reject) {
    fsRef.readFile(path, 'utf8', function (e, d) {
      if (e) reject(e);
      else resolve(JSON.parse(d));
    });
  });
}

function routes(req, res) {
  let name = req.url.replace('/users/:', '');
  let url = `/users/${name}`;
  let path = pathConcat(`api${url}/get.json`);
  let servicePromise = filereader(fs, path);
  console.log(path);

  servicePromise
    .then((response) => res.json(response));
}


module.exports = {
  routes
};