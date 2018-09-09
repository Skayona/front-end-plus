// ver 1
// const LOCATIONS = [
//   {
//     country: 'Україна',
//     cities: ['Київ', 'Харків', 'Вінниця']
//   }, {
//     country: 'Polska',
//     cities: ['Krakow', 'Warszawa', 'Wrocław ']
//   }, {
//     country: 'Deutschland',
//     cities: ['Berlin', 'München', 'Hamburg ']
//   }
// ];

// let vm = new Vue({
//   el: '#app',
//   data: {
//     country: 'не выбрано',
//     city: 'не выбрано',
//     locations: LOCATIONS
//   },
//   methods: {
//     selectedCountry() {
//       return this.locations.find(location => location.country === this.country);
//     }
//   }
// })

const COUNTRIES = {
  UA: 'Україна',
  PL: 'Polska',
  DE: 'Deutschland'
}
const CITIES = {
  UA: ['Київ', 'Харків', 'Вінниця'],
  PL: ['Krakow', 'Warszawa', 'Wrocław '],
  DE: ['Berlin', 'München', 'Hamburg ']
};

let vm = new Vue({
  el: '#app',
  data: {
    cities: CITIES,
    countries: COUNTRIES,
    city: 'не выбрано',
    country: 'UA'
  }
});