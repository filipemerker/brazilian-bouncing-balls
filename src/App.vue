<template>
  <div id="app">
    <Map />
  </div>
</template>

<script>
import Map from './components/Map.vue'

export default {
  name: 'app',
  metaInfo: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  components: {
    Map
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,800');

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
  margin-top: 60px;
}
</style>
