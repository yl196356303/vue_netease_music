import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Discovery from '../pages/discovery/index.vue'
import Playlist from '../pages/playlist/index.vue'
import FM from '../pages/FM/index.vue'
import MVS from '../pages/MVS/index.vue'
import MV from '../pages/MV/index.vue'
import Dynamic from '../pages/dynamic/index.vue'
import Local from '../pages/local/index.vue'
import Download from '../pages/download/index.vue'
import Cloud from '../pages/cloud/index.vue'
import Collection from '../pages/collection/index.vue'
import Myestablish from '../pages/Myestablish/index.vue'
import Mycollection from '../pages/Mycollection/index.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: Home,
    redirect: '/discovery',
    children: [
      { path: '/discovery', name: 'discovery', component: Discovery },
      { path: '/playlist/:id', name: 'playlist', component: Playlist },
      { path: '/fm', name: 'fm', component: FM },
      { path: '/mvs', name: 'mvs', component: MVS },
      {
        path: '/mv/:id', name: 'mv', components: { default: MV, mv: MV }
      },
      { path: '/dynamic', name: 'dynamic', component: Dynamic },
      { path: '/local', name: 'local', component: Local },
      { path: '/download', name: 'download', component: Download },
      { path: '/cloud', name: 'cloud', component: Cloud },
      { path: '/collection', name: 'collection', component: Collection },
      { path: '/myestablish', name: 'myestablish', component: Myestablish },
      { path: '/mycollection', name: 'mycollection', component: Mycollection }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
