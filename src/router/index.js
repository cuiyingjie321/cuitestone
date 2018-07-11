import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'bookshelf',
      meta: { title: '书架' },
      component: resolve => require(['@/components/bookshelf'], resolve)
    }, {
      path: '/bookshelf',
      name: 'bookshelf',
      meta: { title: '书架' },
      component: resolve => require(['@/components/bookshelf'], resolve)
    }, {
      path: '/choice',
      name: 'choice',
      meta: { title: '精选' },
      component: resolve => require(['@/components/choice'], resolve)
    }, {
      path: '/list',
      name: 'list',
      meta: { title: '书城' },
      component: resolve => require(['@/components/list'], resolve)
    }, {
      path: '/my',
      name: '我的',
      meta: { title: '我的' },
      component: resolve => require(['@/components/my'], resolve)
    }, {
      path: '/classifylist',
      name: 'classifylist',
      meta: { title: '小说频道' },
      component: resolve => require(['@/components/classifylist'], resolve)
    }, {
      path: '/recentreading',
      name: 'recentreading',
      meta: { title: '书架' },
      component: resolve => require(['@/components/recentreading'], resolve)
    }, {
      path: '/record',
      name: 'record',
      meta: { title: '我的相关' },
      component: resolve => require(['@/components/record'], resolve)
    }, {
      path: '/about',
      name: 'about',
      meta: { title: '关于我们' },
      component: resolve => require(['@/components/about'], resolve)
    }, {
      path: '/search',
      name: 'search',
      meta: { title: '搜索' },
      component: resolve => require(['@/components/search'], resolve)
    }, {
      path: '/book',
      name: 'book',
      meta: { title: '书籍详情' },
      component: resolve => require(['@/components/book'], resolve)
    }, {
      path: '/article',
      name: 'article',
      meta: { title: '书籍名称' },
      component: resolve => require(['@/components/article'], resolve)
    }, {
      path: '/author',
      name: 'author',
      meta: { title: '微信授权' },
      component: resolve => require(['@/components/author'], resolve)
    }
  ]
})
