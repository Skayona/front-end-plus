let fs = require('fs');
let path = '.';
let users = '/users';

function pathConcat(pathname) {
  return path + '/' + pathname;
}

function filereader(fsRef, path) {
  if (typeof(path) === 'object') {
    return Promise.all(path.map(user => {
      return new Promise(resolve => {
        let url = pathConcat('api' + `/users/${user}` + '/' + 'get.json');
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

function dirReader(fsRef, dir) {
  return new Promise(function (resolve, reject) {
    fsRef.readdir(dir, function (err, data) {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  })
}


async function routes(req, res) {
  let path;
  let dir, url;
  let dirPromise = dirReader(fs, pathConcat('api' + '/users'));
  await dirPromise.then(res => dir = res);
  let first = dir[0];
  let last = dir[dir.length - 1];

  switch (req.url) {
    case users:
    case `${users}/:all`:
      url = dir;
    break;
    case `${users}/:first`:
      url = `/users/${first}`;
      break;
    case `${users}/:last`:
      url = `/users/${last}`;
      break;
    default:
      let id = req.url.replace('/user/:user', '');
      url = `/users/${id}`;
      break;
  }

  path = typeof(url) === 'object' ? url : pathConcat('api' + url + '/' + req.method.toLowerCase() + '.json');

  let servicePromise = filereader(fs, path);

  console.log(path);

  servicePromise
    .then((response) => res.json(response));
}


module.exports = {
  pathConcat,
  routes
};