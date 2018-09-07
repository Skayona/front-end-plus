Vue.component(
  'edit-modal', {
    props: ['member', 'modal'],
    template: `
      <div class="modal" v-if="modal">
        <div class="modal__content">
          <h2>{{title}} данные</h2>
          <label>
            <span>ID:</span>
            <input v-model="member.id" type="text" />
          </label>
          <label>
            <span>Name:</span>
            <input v-model="member.name" type="text" />
          </label>
          <label>
            <span>Age:</span>
            <input v-model="member.age" type="number" />
          </label>
          <label>
            <span>Address:</span>
            <textarea v-model="member.address">
            </textarea>
          </label>
          <div class="modal__btn">
            <button type="button">cancel</button>
            <button type="button">ok</button>
          </div>
        </div>
      </div>
    `,
    data: function () {
      return {
        title: this.getTitle()
      }
    },
    methods: {
      getTitle() {
        for (let prop in this.member) {
          if (!this.member[prop].toString().length) {
            return 'Редактировать';
          }
        }
        return 'Добавить';
      }
    }
  }
)

Vue.component(
  'co-worker', {
    props: ['index'],
    template: `<div class="co-worker" :id="index" @click="$emit('open-editor', $event, addData)">
      <div class="co-worker__col co-worker__col--id"> {{ id }} </div>
      <div class="co-worker__col co-worker__col--name"> {{ name }} </div>
      <div class="co-worker__col co-worker__col--age"> {{ age }} </div>
      <div class="co-worker__col co-worker__col--address"> {{ address }} </div>
      <div class="co-worker__col co-worker__col--del">
        <button type="button" @click="$emit('delete-member', deleteOptions, index)">delete</button>
      </div>
    </div>`,
    methods: {
      addData() {
        return {
          id: this.id,
          name: this.name,
          age: this.age,
          address: this.address
        }
      },
      deleteOptions() {
        if (this.id.length ||
          this.name.length ||
          this.age.length ||
          this.address.length) {
          return false;
        }

        return true;
      },
    },
    data: function () {
      return {
        id: '',
        name: '',
        age: '',
        address: ''
      }
    }

  })
const vm = new Vue({
  el: '#table',
  data: {
    members: [],
    value: {},
    openModal: false
  },
  methods: {
    addCoworker() {
      this.members.push('co-worker');
    },
    deleteMember(allow, i) {
      if (allow()) {
        this.members.splice(i, 1);
      }
    },
    openEditModal(e, data) {
      if (e.target.tagName === 'BUTTON') {
        return;
      }
      let member = data();
      if (!member) return;
      this.value = member;
      this.openModal = true;

    },
    fixedBody() {
      if (this.openModal) {
        console.log('+');

        return 'modal-is-open';
      }
    }
  }
})