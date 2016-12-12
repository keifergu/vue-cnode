import Vue from 'vue'
import iView from 'iview'
import VueRouter from 'vue-router'

import routes from './config/routes'

import 'iview/dist/styles/iview.css'

Vue.use(VueRouter);
Vue.use(iView);

Vue.config.devtools = true;

const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
}).$mount('#app');
