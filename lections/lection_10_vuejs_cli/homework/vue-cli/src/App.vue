<template>
  <div id="app">
    <div id="nav" v-if="$route.name !== 'login'">
      <router-link to="/">HOME</router-link>
      <!-- <router-link to="/">HOME</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<style>
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  body {
    display: flex;
    margin: 0;
    height: 100vh;
    min-height: 100vh;
    font-size: 16px;
    background: #fff;
  }

  #app {
    margin: auto;
    height: 95%;
    width: 95%;
    max-width: 980px;
    padding: 16px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    background: #90d1cb;
    color: #fff;
    box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.3);
  }
  h1 {
    margin-top: 0;
  }
</style>
