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
          if (!this.name.length || !this.email.length) return;
          if (!this.email.match(/^[\dA-Za-z\-_.+%]+@{1}[^.][A-Za-z\d.-]+[^.]\.{1}[A-Za-z]{2,4}/)) return;
          this.counter++;
          break;
        case 2:
          if (!this.city.length) return;
          this.counter++;
          break;
        default:
          break;
      }
    }
  }
})