<template>
  <section class="msg-box">
      <div class="msg-box__btns">
        <button v-on:click="data={text: 'btn 1', type: 'info'}">btn 1</button>
        <button v-on:click="data={text: 'btn 2', type: 'success'}">btn 2</button>
        <button v-on:click="data={text: 'btn 3', type: 'error'}">btn 3</button>
        <button v-on:click="data={text: 'btn 4 (no type)'}">btn 4</button>
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
        text: 'Some text',
        type: 'error'
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
</style>
