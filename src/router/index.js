import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../components/Home.vue')
const Discovery = () => import('../pages/discovery/index.vue')
const Playlist = () => import('../pages/playlist/index.vue')
const FM = () => import('../pages/FM/index.vue')
const MVS = () => import('../pages/MVS/index.vue')
const MV = () => import('../pages/MV/index.vue')
const Dynamic = () => import('../pages/dynamic/index.vue')
const Local = () => import('../pages/local/index.vue')
const Download = () => import('../pages/download/index.vue')
const Cloud = () => import('../pages/cloud/index.vue')
const Collection = () => import('../pages/collection/index.vue')
const Search = () => import('../pages/search/index.vue')
const searchSongs = () => import('../pages/search/songs.vue')
const searchPlayLists = () => import('../pages/search/playlists.vue')
const searchMvs = () => import('../pages/search/mvs.vue')

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
