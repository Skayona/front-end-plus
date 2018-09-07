Vue.component(
  'edit-modal', {
    props: ['member'],
    template: `
      <section>
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
          <button type="button" @click="$emit('close-modal')">ОТМЕНА</button>
          <button type="button" @click="$emit('save-data')">СОХРАНИТЬ</button>
        </div>
      </section>
    `,
    data: function () {
      return {
        title: this.getTitle()
      }
    },
    methods: {
      getTitle() {
        for (let prop in this.member) {
          if (this.member[prop].toString().length && prop !== 'index') {
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
    props: ['index', 'member'],
    template: `<div class="co-worker" :id="index" @click="$emit('open-editor', $event, member, index)">
      <div class="co-worker__col co-worker__col--id"> {{ member.id }} </div>
      <div class="co-worker__col co-worker__col--name"> {{ member.name }} </div>
      <div class="co-worker__col co-worker__col--age"> {{ member.age }} </div>
      <div class="co-worker__col co-worker__col--address">
      <pre>{{ member.address }}</pre>
      </div>
      <div class="co-worker__col co-worker__col--del">
        <button type="button" @click="$emit('delete-member', member, index)">УДАЛИТЬ</button>
      </div>
    </div>`
  })


const vm = new Vue({
  el: '#table',
  data: {
    body: document.querySelector('body'),
    members: [],
    temporaryStore: {},
    modals: {
      open: false,
      edit: false,
      confirm: false
    }
  },
  methods: {
    addCoworker() {
      this.members.push({
        template: 'co-worker',
        data: {
          id: '',
          name: '',
          age: '',
          address: ''
        }
      });
    },
    deleteMember(member, i) {
      for (let prop in member) {
        if (member[prop].toString().length) {
          this.temporaryStore.index = i;
          this.modals.confirm = true;
          this.fixedBody();
          return;
        }
      }
      this.members.splice(i, 1);
    },
    confirmDelete() {
      this.members.splice(this.temporaryStore.index, 1);
      this.temporaryStore = {};
      this.modals.confirm = false;
      this.fixedBody();
    },
    openEditModal(e, member, i) {
      if (e.target.tagName === 'BUTTON') {
        return;
      }
      this.modals.edit = true;
      for (let prop in member) {
        this.temporaryStore[prop] = member[prop]
      }
      this.temporaryStore.index = i;
      this.fixedBody();
    },
    fixedBody() {
      this.modals.open = !this.modals.open;
      this.body.classList.toggle('modal-is-open');
    },
    saveData() {
      this.fixedBody();
      const i = this.temporaryStore.index;
      const member = this.members[i].data;
      for (let prop in member) {
        member[prop] = this.temporaryStore[prop];
      }
      this.temporaryStore = {};
      this.modals.edit = false;
    },
    closeModal() {
      this.fixedBody();
      if (this.modals.edit) {
        this.temporaryStore = {};
        this.modals.edit = false;
      }
      if (this.modals.confirm) {
        this.modals.confirm = false;
      }
    }
  }
})