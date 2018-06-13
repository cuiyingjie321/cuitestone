import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import mNav from '@/components/public/nav'
import mHeader from '@/components/public/header'
Vue.use(VueResource)
Vue.component('mNav', mNav)
Vue.component('mHeader', mHeader)
Vue.config.productionTip = false
Vue.http.options.emulateHTTP = true
Vue.http.options.emulateJSON = true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
