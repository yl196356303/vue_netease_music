import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Discovery from '../pages/discovery/index.vue'
import Playlist from '../pages/playlist/index.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: Home,
    redirect: '/discovery',
    children: [
      { path: '/discovery', name: 'discovery', component: Discovery },
      { path: '/playlist/:id', name: 'playlist', component: Playlist }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
