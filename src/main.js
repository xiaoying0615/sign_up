import Vue from 'vue'

import iView from 'iview'
import 'iview/dist/styles/iView.css'

import App from './App'
import router from './router'
import Cookies from 'vue-cookies'

import util from './utils/util'
import apis from './utils/apis'
import ajax from './utils/ajax'

import Loading from './components/Loading'

Vue.config.productionTip = false

Vue.use(iView)
Vue.use(Cookies)

Vue.component('Loading', Loading)

window.environment = require('../build/release')

window.$bus = new Vue()
window.util = util
window.apis = apis
window.ajax = ajax

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
