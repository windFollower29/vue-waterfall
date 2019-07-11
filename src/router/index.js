import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import App from '../App'
import Tick from '../Tick'
import Scroll from '../Scroll'
import Touch from '../Touch'

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
    path: '/scroll',
    component: Scroll
  },
  {
    path: '/Touch',
    component: Touch
  },
  {
    path: '/',
    component: Touch
  },
]

export default new Router({
  routes
})