import Vue from 'vue'
import Vuex from 'vuex'
import MuseUI from 'muse-ui'
import VueRouter from 'vue-router'

import { sync } from 'vuex-router-sync'

import store from './store'
import routes from './router'

import './utils/markdown.css'
import 'muse-ui/dist/muse-ui.css'

Vue.use(MuseUI)
Vue.use(VueRouter)

Vue.config.devtools = true

const router = new VueRouter({
  routes
})

sync(store, router)

/* eslint-disable no-new */
new Vue({
  router,
  store
}).$mount('#app')
