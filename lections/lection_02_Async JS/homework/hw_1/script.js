function runAsyncAll(list, async) {
  if (async) {
    Promise
      .all(list)
      .then(results => console.log('async:', results))
    return;
  }
}

function asyncFunction(count, time) {
  let promise = new Promise((resolve)=>{
    setTimeout(() => {
      resolve(`${count}: ${time}`);
    }, time);
  })

  return promise.then((result) => result);
}



let list = [
  asyncFunction('#1', 500),
  asyncFunction('#2', 200),
  asyncFunction('#3', 400),
  asyncFunction('#4', 1200),
  asyncFunction('#5', 900)
];

runAsyncAll(list, true);
runAsyncAll(list, false);