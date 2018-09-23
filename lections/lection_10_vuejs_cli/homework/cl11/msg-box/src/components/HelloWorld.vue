<template>
  <section class="msg-box">
      <input type="text" v-model="msg" placeholder="enter msg text"/>
      <div class="msg-box__btns">
        <button v-on:click="data={text: msg, type: 'info'},msg=null">info</button>
        <button v-on:click="data={text: msg, type: 'success'},msg=null">success</button>
        <button v-on:click="data={text: msg, type: 'error'},msg=null">error</button>
        <button v-on:click="data={text: msg},msg=null">no type</button>
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
      msg: null
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
</style>
