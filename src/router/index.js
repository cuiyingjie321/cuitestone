import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '书架',
      component: resolve => require(['@/components/bookshelf'], resolve)
    }, {
      path: '/choice',
      name: '精选',
      component: resolve => require(['@/components/choice'], resolve)
    }, {
      path: '/list',
      name: '书城',
      component: resolve => require(['@/components/list'], resolve)
    }, {
      path: '/my',
      name: '我的',
      component: resolve => require(['@/components/my'], resolve)
    }, {
      path: '/classifylist',
      name: '小说频道',
      component: resolve => require(['@/components/classifylist'], resolve)
    }, {
      path: '/recentreading',
      name: '最近阅读',
      component: resolve => require(['@/components/recentreading'], resolve)
    }, {
      path: '/record',
      name: '我的相关',
      component: resolve => require(['@/components/record'], resolve)
    }, {
      path: '/about',
      name: '关于我们',
      component: resolve => require(['@/components/about'], resolve)
    }, {
      path: '/search',
      name: '搜索',
      component: resolve => require(['@/components/search'], resolve)
    }, {
      path: '/book',
      name: '书籍详情',
      component: resolve => require(['@/components/book'], resolve)
    }, {
      path: '/article',
      name: '书籍名称',
      component: resolve => require(['@/components/article'], resolve)
    }, {
      path: '/author',
      name: '微信授权',
      component: resolve => require(['@/components/author'], resolve)
    }
  ]
})
