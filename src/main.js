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
Vue.prototype.wx = wx 
Vue.config.productionTip = false
Vue.http.options.emulateHTTP = true
Vue.http.options.emulateJSON = true
/* eslint-disable no-new */
// router.beforeEach((to, from, next) => {
//   let sessionId = sessionStorage.getItem('sessionId')
//   if (!sessionId && to.path !== '/author') {
//     // 第一次进入项目 // 保存用户进入的url
//     // store.state.beforeLoginUrl = to.fullPath
//     // sessionStorage.setItem("user_name",to.fullPath)
//     // sessionStorage.setItem("user_name","test22")
//     // alert(store.state.beforeLoginUrl)
//     // setCookie('beforeLoginUrl', to.fullPath)
//     next('/author')
//     return false
//   }
//   next()
// })
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
