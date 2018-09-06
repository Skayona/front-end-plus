Vue.component(
  'co-worker', {
    template: `<div class="co-worker" v-if="toShow">
      <div class="co-worker__col co-worker__col--id"> {{ id }} </div>
      <div class="co-worker__col co-worker__col--name"> {{ name }} </div>
      <div class="co-worker__col co-worker__col--age"> {{ age }} </div>
      <div class="co-worker__col co-worker__col--address"> {{ address }} </div>
      <div class="co-worker__col co-worker__col--del">
        <button @click="deleteMember()">delete</button>
      </div>
    </div>`,
    methods: {
      addName() {
        console.log('addName');
      },
      deleteMember() {
        if (this.id.length ||
            this.name.length ||
            this.age.length ||
            this.address.length) {
          console.log('data');
          return;
        }
        this.toShow = false;
      }
    },
    data: function() {
      return {
        id: '',
        name: '',
        age: '',
        address: '',
        toShow: true
      }
    }

  })
const vm = new Vue({
  el: '#table',
  data: {
    members: 0
  },
  methods: {
    addCoworker() {
      this.members++;
    }
  }
})

