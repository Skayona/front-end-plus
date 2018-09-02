Vue.component('box-item', {
  props: ['val'],
  template: `<div>{{ val }}</div>`
})

const app = new Vue({
  el: '#box',
  data: {
    left: [
      1, 2, 3, 4, 5, 6, 7
    ],
    right: []
  },
  methods: {
    clickLeft() {
      if (this.left.length) {
        this.right.push(this.left.pop());
      }
    },
    clickRight() {
      if (this.right.length) {
        this.left.push(this.right.pop());
      }
    }
  }
})