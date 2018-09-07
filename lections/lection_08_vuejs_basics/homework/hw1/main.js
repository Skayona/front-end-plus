Vue.component(
  'co-worker', {
    props: ['index'],
    template: `<div class="co-worker" v-if="toShow" :id="index" @click="addName()">
      <div class="co-worker__col co-worker__col--id"> {{ id }} </div>
      <div class="co-worker__col co-worker__col--name"> {{ name }} </div>
      <div class="co-worker__col co-worker__col--age"> {{ age }} </div>
      <div class="co-worker__col co-worker__col--address"> {{ address }} </div>
      <div class="co-worker__col co-worker__col--del">
        <button @click="$emit('delete-member', deleteOPtions, index)">delete</button>
      </div>
    </div>`,
    methods: {
      addName() {
        console.log('addName');
        
      },
      deleteOPtions() {

        if (this.id.length ||
          this.name.length ||
          this.age.length ||
          this.address.length) {
          console.log('data');
          return false;
        }

        return true;
      }
    },
    data: function () {
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
    members: []
  },
  methods: {
    addCoworker() {
      this.members.push('co-worker');
    },
    deletes(a, i) {
      a();
      this.members.splice(i, 1);
    }
  }
})