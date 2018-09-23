<template>
  <section class="msg-box">
      <input type="text" v-model="msg.text" placeholder="enter msg text" v-bind:class="msg.class"/>
      <div class="msg-box__btns">
        <button v-on:click="editMsg('info')">info</button>
        <button v-on:click="editMsg('success')">success</button>
        <button v-on:click="editMsg('error')">error</button>
        <button v-on:click="editMsg()">no type</button>
      </div>
      <h1 class="msg-box__title">Message box</h1>
      <MessageBox v-bind:msg="data"></MessageBox>
  </section>
</template>

<script>
import MessageBox from './MessageBox'

export default {
  name: 'HelloWorld',
  components: {
    MessageBox
  },
  data () {
    return {
      data: {
        text: null,
        type: null
      },
      msg: {
        text: null,
        class: null
      }
    }
  },
  methods: {
    editMsg (type = null) {
      if (typeof (this.msg.text) !== 'string') {
        this.msg.class = 'error'
        return
      }
      this.data = {
        text: this.msg.text,
        type: type
      }
      this.msg = {
        text: null,
        class: null
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
input {
  margin-bottom: 8px;
  padding: 2px 4px;
}
input.error {
  border-color: red
}
</style>
