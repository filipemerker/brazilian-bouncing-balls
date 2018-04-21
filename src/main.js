import Vue from 'vue'
import App from './App.vue'
import Meta from 'vue-meta'
import router from './router'
import VueLazyload from 'vue-lazyload'


Vue.use(VueLazyload)
Vue.use(Meta)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
