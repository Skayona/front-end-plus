
function load(method, data) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, data, true);

  xhr.send();

  let async = new Promise((resolve,reject) => {
    xhr.onreadystatechange = function() {
      if (xhr.readyState != 4) {
          return;
      }
      resolve(JSON.parse(xhr.responseText));
    }
  })
  return async;
}

let data = load('GET', 'assets/data.json');
let info = load('GET', 'assets/info.json');

Promise
  .all([data,info])
  .then(args => {
    console.log(args);
    let res = [];
    args.forEach((e) => {
      res = e.status ? [...res, ...e.values] : [...res];
    })
    console.log(res);
  });