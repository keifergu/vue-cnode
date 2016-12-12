import Vue from 'vue'
import MuseUI from 'muse-ui'
import VueRouter from 'vue-router'

import routes from './config/routes'

import 'muse-ui/dist/muse-ui.css'

Vue.use(VueRouter);
Vue.use(MuseUI);

Vue.config.devtools = true;

const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
}).$mount('#app');
