<template>
  <div class="msg-box-container" v-if="list.length">
    <button @click="list=[]">close all</button>
    <p v-for="(item, id) of list" :key="id" v-bind:class="msgClass(item.type)" @click="removeMsg(item.id)">
      {{item.text}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'MessageBox',
  props: ['msg'],
  data: function () {
    return {
      list: [],
      counter: 0
    }
  },
  watch: {
    msg: {
      deep: true,
      handler: function (newMsg, oldMsg) {
        let list = this.list.map(e => e)
        list.unshift(newMsg)
        this.list = []
        let ms = newMsg.type === 'error' ? 10000 : 5000
        newMsg.id = ++this.counter
        newMsg.remove = false
        let errMsgs = list.filter(item => item.type === 'error')
        let otherMsgs = list.filter(item => item.type !== 'error')
        if (errMsgs) {
          this.list = [...this.list, ...errMsgs]
        }
        if (otherMsgs) {
          this.list = [...this.list, ...otherMsgs]
        }
        setTimeout(() => {
          newMsg.remove = true
        }, ms)
      }
    }
  },
  mounted: function () {
    setInterval(() => {
      this.list = this.list.filter(item => !item.remove)
    }, 2000)
  },
  methods: {
    msgClass (type) {
      return type || 'info'
    },
    removeMsg (id) {
      this.list = this.list.filter(e => e.id !== id)
    }
  }
}
</script>

<style scoped>
  p:not(:last-child) {
    margin-bottom: 16px;
  }
  p {
    margin-top: 0;
    padding: 16px;
    color: #fff;
    background: rgba(0, 0 , 0, 0.2);
  }
  .error {
    background: red;
  }
  .success{
    background: green;
  }
  .info {
    background: blue;
  }
  .msg-box-container {
    max-width: 768px;
    margin: auto;
  }
  button {
    display: block;
    margin-left: auto;
    margin-bottom: 8px;
  }
</style>
