let arr = [{
  value: 10
}, {
  value: 12
}, {
  value: 3
}, {
  value: 84
}, {
  value: 1
}, {
  value: -4
}, {
  value: 41
}, {
  value: 65
}];


let res = arr
            .sort((a, b) => a.value - b.value)
            .map(e => e.value);

console.log('Массив отсортированный по возрастанию (по ключу "value"):', arr);
console.log('Массив простых значений (по ключу "value"):', res);
