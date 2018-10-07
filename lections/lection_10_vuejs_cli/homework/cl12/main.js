var store = {
  title: 'Some title',
  bg: {
    desktop: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350',
    mobile: ''
  },
  price: 69,
  btnTitle: {
    desktop: 'D btn',
    mobile: 'M btn'
  }
};

Vue.component('banner-config', {
  props: ['type', 'title', 'price', 'btnTitle', 'bg'],
  template: `
    <section v-bind:style="{background: bgImage}">
      <h1>{{title}}</h1>
      <div>
        <p>Price: {{price}}$</p>
        <button type="button">{{btnTitle[type]}}</button>
      </div>
    </section>
  `,
  computed: {
    bgImage() {
      if (this.bg[this.type] && this.bg[this.type].length) {
        return `url(${this.bg[this.type]})`
      }
      return `#ccc`;
    }
  }
});


const app = new Vue({
  el: '#app',
  data: {
    store,
    type: 'desktop'
  }
});