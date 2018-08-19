let express = require('express');
let fs = require('fs');
// let bodyParser = require('body-parser');
let app = express();
let port = 3780;
let forbidden = false;

function interception(req, res, next) {
  if (forbidden)
    return next(new Error());

  return next();
}

app.use(interception);

app.use('/hack', function (req, res, next) {
  forbidden = true;
  next(new Error());
})

app.use(function (req, res, next) {
  let msg = {
    method: req.method,
    path: req.url,
    time: Date.now()
  }
  fs.appendFile('./log.txt', `${JSON.stringify(msg)}, \n`, 'utf8', (err) => {
    if (err) throw err;
  });

  next();
});

app.use(function (error, req, res, next) {
  fs.appendFile('./log.txt', `${error}, \n`, 'utf8', (err) => {
    if (err) throw err;
  });
  next();
})

app.listen(port);

console.log('Mock server listening on port ' + port);