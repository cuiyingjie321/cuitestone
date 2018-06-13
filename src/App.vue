<template>
  <div id="app">
    <m-header v-if="!mHeaderHide" :mType="mType" :mTitle="mName" @mKeywordReceive="mKeywordReceive"></m-header>
    <router-view @mParameter="mParameters" :mKeyword="mKeyword"></router-view>
    <m-nav v-if="mNav" :mIndex="mIndex"></m-nav>
  </div>
</template>

<script>
// mType header区域类型,mHeader 是否显示header,mNav 是否显示底部导航,mIndex 底部导航索引(预防刷新导航失去索引),mStyle 我的 相关页面背景色,mName 标题名字(如果页面没有设置则用路由设置的名字),mKeyword 搜索关键词传值,mASetup_Style 文章页的颜色设置,mDay 文章页白天还是黑夜场景
export default {
  data () {
    return {
      mType: '0',
      mHeaderHide: '',
      mNav: 'true',
      mIndex: '0',
      mStyle: '',
      mName: '',
      mKeyword: '',
      mASetup_Style: '',
      mDay: ''
    }
  },
  methods: {
    mParameters: function (msg) {
      this.mType = msg.mType
      this.mNav = msg.mNav
      this.mHeaderHide = msg.mHeaderHide
      this.mIndex = msg.mIndex
      this.mStyle = msg.mStyle
      this.mName = msg.mName
      this.mKeyword = msg.mKeyword
      this.mASetup_Style = msg.mASetup_Style
      this.mDay = msg.mDay
    },
    mKeywordReceive: function (msg) {
      this.mKeyword = msg
      console.log(this.mKeyword)
    }
  },
  updated () {
    if (this.mStyle) {
      document.querySelector('html').classList.add('myClass')
      document.querySelector('body').classList.add('myClass')
    } else if (!this.mStyle) {
      document.querySelector('html').classList.remove('myClass')
      document.querySelector('body').classList.remove('myClass')
    }
    if (!this.mName) {
      this.mName = this.$route.name
    }
  },
  beforeCreate: function () {
    var mOffsetWidth = (document.documentElement.offsetWidth >= 750) ? 750 : document.documentElement.offsetWidth
    document.getElementsByTagName('html')[0].style.fontSize = mOffsetWidth / 10 + 'px'
  },
  watch: {
    mASetup_Style: function () {
      if (this.mASetup_Style) {
        document.querySelector('html').classList.remove('mStyle_0', 'mStyle_1', 'mStyle_2', 'mStyle_3', 'mStyle_4', 'mStyle_5')
        document.querySelector('body').classList.remove('mStyle_0', 'mStyle_1', 'mStyle_2', 'mStyle_3', 'mStyle_4', 'mStyle_5')
        document.querySelector('html').classList.add(this.mASetup_Style)
        document.querySelector('body').classList.add(this.mASetup_Style)
      } else if (!this.mASetup_Style) {
        document.querySelector('html').classList.remove('mStyle_0', 'mStyle_1', 'mStyle_2', 'mStyle_3', 'mStyle_4', 'mStyle_5')
        document.querySelector('body').classList.remove('mStyle_0', 'mStyle_1', 'mStyle_2', 'mStyle_3', 'mStyle_4', 'mStyle_5')
      }
    },
    mDay: function () {
      if (this.mDay) {
        document.querySelector('html').classList.add(this.mDay)
        document.querySelector('body').classList.add(this.mDay)
      } else if (!this.mDay) {
        document.querySelector('html').classList.remove('mNight')
        document.querySelector('body').classList.remove('mNight')
      }
    }
  }
}
</script>
<style src="./assets/css/reset.css"></style>
