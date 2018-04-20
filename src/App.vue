<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,800');

body {
  background: #35495e;
  margin: 0;
  font-family: 'Open Sans', sans-serif;
}
.fade-fast-enter-active, .fade-fast-leave-active {
  transition: all .2s;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .35s;
}
.fade-fast-enter, .fade-fast-leave-to {
  margin-top: -5px;
  opacity: 0;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
</style>
