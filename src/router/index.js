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
import Search from '../pages/search/index.vue'
import searchSongs from '../pages/search/songs.vue'
import searchPlayLists from '../pages/search/playlists.vue'
import searchMvs from '../pages/search/mvs.vue'

//  修复vue-router 重复点击路由报错的bug
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

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
      {
        path: '/search/:keywords',
        name: 'search',
        component: Search,
        redirect: '/search/:keywords/songs',
        children: [
          {
            path: 'songs',
            name: 'searchSongs',
            component: searchSongs
          },
          {
            path: 'playlists',
            name: 'searchPlayLists',
            component: searchPlayLists
          },
          {
            path: 'mvs',
            name: 'searchMvs',
            component: searchMvs
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
