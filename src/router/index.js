import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import App from '../App'
import Tick from '../Tick'

const routes = [
  {
    path: '/app',
    component: App
  },
  {
    path: '/tick',
    component: Tick
  },
  {
    path: '/',
    component: App
  },
]

export default new Router({
  routes
})