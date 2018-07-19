function connectDB(f, list) {
  var request = indexedDB.open("InCart");

  request.onerror = function (err) {
    console.log(err);
  };
  request.onsuccess = function () {
    f(request.result);
  }
  request.onupgradeneeded = function (e) {
    if (!list) return;

    var data_default = e.currentTarget.result.createObjectStore("goods", {
      keyPath: "id",
      autoIncrement: true
    });

    for (let item of list) {
      data_default.add(item);
    }

    connectDB(f);
  }
}

function setBase(list) {
  connectDB(function (db) {
    var transaction = db
      .transaction(["goods"], "readwrite")
      .objectStore("goods");

    var goodsFromDB = [];
    transaction.openCursor().onsuccess = function (event) {
      var cursor = event.target.result;

      if (cursor) {
        goodsFromDB.push(cursor.value);
        cursor.continue();
      }
    };
  }, list);
}

function orderSavedBase() {
  connectDB(async function(db) {
    if (!db.objectStoreNames.length) {
      indexedDB.deleteDatabase('InCart');
      return;
    }

    var transaction = await db
      .transaction(["goods"], "readonly")
      .objectStore("goods")
      .getAll();
      transaction.onsuccess = function (e) {
        let goods = event.target.result;
        console.log('goods are ordered:');
        goods.forEach((e)=>{
          console.log(`id ${e.id} q ${e.q}`);
        });
        indexedDB.deleteDatabase('InCart');
      }
  });

}

module.exports = {
  setBase,
  orderSavedBase
};