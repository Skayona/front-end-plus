let fs = require('fs');
let path = require('path');
let initilaDir = './img';
let finalDir = './new-img';
let name = 'image_FR_';
let map = [2, 1, 4, 3];
let imgOrder = new Object();


function copyImg(path, dest) {
  fs.copyFile(path, dest, (err) => {
    if (err) throw err;
  })
}

function clearDir(path) {
  fs.readdir(path, (err, files) => {
    if (err) throw err;
    if (!files.length) return;
    for (let item of files) {
      fs.unlinkSync(`${path}/${item}`);
    }
  })
}

Promise
  .resolve(fs.existsSync(finalDir))
  .then(res => {
    if (res) {
      clearDir(finalDir);
    } else {
      fs.mkdir(finalDir);
    }
  })
  .then(() => {
    fs.readdir(initilaDir, (err, items) => {
      if (err) throw err;
      items.forEach((img, i) => {
        let ext = path.extname(img);
        let count = (i < 9) ? `0${i+1}` : i + 1;
        let newName = `${name}${count}${ext}`;
        let pos = map[i];
        imgOrder[pos] = newName;
        copyImg(`${initilaDir}/${img}`, `${finalDir}/${newName}`);
      });
      let json = JSON.stringify(imgOrder);
      fs.writeFile(`${finalDir}/images-order.json`, json, 'utf8', (err) => {
        if (err) throw err;
      });
    });
  })