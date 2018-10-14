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

module.exports = {
  sumList,
  compare
}