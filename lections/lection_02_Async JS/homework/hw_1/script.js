function runAsyncAll(list, async) {
  if (async) {
    Promise
      .all(list.map(item => item()))
      .then(result => console.log('async', result))
    return;
  }

  Promise
    .resolve(list)
    .then(async (list) => {
      let result = [];
      for (let item of list) {
        await item().then(res => result.push(res));
      }
      console.log('sync', result)
    })
}


const f1 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // console.log(`f1: 1200`);
      resolve(`f1: 1200`);
    }, 1200);
  })
}

const f2 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // console.log(`f2: 300`);
      resolve(`f2: 300`);
    }, 300);
  })
}

const f3 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // console.log(`f3: 1300`);
      resolve(`f3: 1300`);
    }, 1300);
  })
}

const f4 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // console.log(`f4: 600`);
      resolve(`f4: 600`);
    }, 600);
  })
}

const f5 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // console.log(`f5: 2500`);
      resolve(`f5: 2500`);
    }, 2500);
  })
}


let list = [f1, f2, f3, f4, f5];

runAsyncAll(list, true);
runAsyncAll(list, false);
