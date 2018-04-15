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
body {
  background: #35495e;
  margin: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .35s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
