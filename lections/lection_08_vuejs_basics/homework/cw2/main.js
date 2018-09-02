Vue.component('step-1', {
  props: ['name', 'email'],
  template: `<div>
    <input v-model="name" type="text" placeholder="name" required />
    <input v-model="email" type="email" placeholder="email" required />
  </div>`
})

Vue.component('step-2', {
  props: ['city'],
  template: `<div>
    <input v-model="city" type="text" placeholder="city" required />
  </div>`
})

Vue.component('step-3', {
  props: ['name', 'email', 'city'],
  template: `<div>
    <p>name: {{ name }}</p>
    <p>email: {{ email }}</p>
    <p>city: {{ city }}</p>
  </div>`
})
const form = new Vue({
  el: '#form',
  data: {
    name: '',
    email: '',
    city: '',
    counter: 1
  },
  methods: {
    clickNext() {
      switch (this.counter) {
        case 1:

          break;
        case 2:
          console.log(1);
          break;
        case 3:
          console.log(3);
          break;
        default:
          break;
      }
      this.counter++;
    }
  }
})