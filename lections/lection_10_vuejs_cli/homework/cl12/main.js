var store = {
  title: 'Some title',
  bg: {
    desktop: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350',
    mobile: ''
  },
  price: 69,
  btnTitle: {
    desktop: 'Change to mobile view',
    mobile: 'Change to desktop view'
  }
};

Vue.component('banner-config', {
  props: ['type', 'title', 'price', 'btnTitle', 'bg'],
  template: `
    <div v-bind:style="{background: bgImage}" class="banner">
      <h1>{{title}}</h1>
      <div class="banner__price">
        <p>Price: {{price}}$</p>
        <button type="button" @click="$emit('change-view')">{{btnTitle[type]}}</button>
      </div>
    </div>
  `,
  computed: {
    bgImage() {
      const bg = this.bg[this.type];
      if (bg && bg.length) {
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
  },
  methods: {
    changeType() {
      if (this.type === 'desktop') {
        this.type = 'mobile';
      } else {
        this.type = 'desktop';
      }
    }
  }
});