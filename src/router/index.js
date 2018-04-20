import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Map from '@/views/Map'
import Detail from '@/views/Detail'

export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/detail', component: Detail },
    { path: '/', component: Map }
  ]
})
