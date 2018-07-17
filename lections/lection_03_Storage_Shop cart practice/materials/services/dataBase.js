let refreshDB = function (db) {
  var transaction = db
    .transaction(["goods"], "readwrite")
    .objectStore('goods');

  var goodsFromDB = [];
  transaction.openCursor().onsuccess = function (event) {
    var cursor = event.target.result;

    if (cursor) {
      goodsFromDB.push(cursor.value);
      cursor.continue();
    } else {
      console.log("Got all customers: ", goodsFromDB);
    }
  };
}

function connectDB(list) {
  var request = indexedDB.open("InCart", 3);
  request.onerror = function (err) {
    console.log(err);
  };
  request.onsuccess = function () {
    refreshDB(request.result);
  }
  request.onupgradeneeded = function (e) {
    var data_default = e.currentTarget.result.createObjectStore("goods", {
      keyPath: "id",
      autoIncrement: true
    });

    for (let item of list) {
      data_default.add(item);
    }

    connectDB(refreshDB);
  }
}

module.exports = connectDB;