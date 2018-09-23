<template>
  <div class="msg-box-container" v-if="list.length">
    <p v-for="(item, id) of list" :key="id" v-bind:class="msgClass(item.type)">
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
        let ms = newMsg.type === 'error' ? 10000 : 5000
        newMsg.id = ++this.counter
        newMsg.remove = false
        newMsg.type === 'error' ? this.list.unshift(newMsg) : this.list.push(newMsg)
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
</style>
