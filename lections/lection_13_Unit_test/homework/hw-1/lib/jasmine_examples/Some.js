function sumList() {
  return [].reduce.call(arguments, (prev, item) => prev + item, 0);
}

function compare(source, data) {
  if (!source) {
    return null;
  }

  if (source && source.x && data && data.x) {
    return source.x === data.x;
  }
}

function getByKey(source, key) {
  if (!source || !key) return;

  return source[key];
}

module.exports = {
  sumList,
  compare,
  getByKey
}