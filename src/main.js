import Vue from 'vue'
import VueResource from 'vue-resource'
import wx from 'weixin-js-sdk'
import App from './App'
import router from './router'
import mNav from '@/components/public/nav'
import mHeader from '@/components/public/header'
import VueScroller from 'vue-scroller'
Vue.use(VueResource)
Vue.component('mNav', mNav)
Vue.component('mHeader', mHeader)
Vue.use(VueScroller)
Vue.config.productionTip = false
Vue.http.options.emulateHTTP = true
Vue.http.options.emulateJSON = true
Vue.prototype.wx = wx
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
