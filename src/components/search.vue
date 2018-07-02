<template>
  <div class="main">
    <div v-if="!mKeyword" class="mHistory_w">
      <div class="mHistory_Ti">历史搜索<img src="./../assets/images/mMyIcon_11.png" alt="删除历史搜索" @click="Delete"></div>
      <span>
        <router-link v-for="list in historyData" :key="list.id" :to="'/search?keyword='+list">{{ list }}</router-link>
      </span>
    </div>
    <div v-if="!mKeyword" class="mHot_w">
      <div class="mHistory_Ti">热门搜索</div>
      <span>
        <router-link v-for="(list , index) in hotSearchData" :key="list.id" :to="'/search?keyword='+list"><i :class="'mHot_I'+(index)">{{ (index+1) }}</i>{{ list }}</router-link>
      </span>
    </div>
    <div v-if="mKeyword" class="mResult">
      <div class="mResult_Ti">{{ descInfo }}</div>
      <ul class="mModuleLista mModuleLista_1">
        <li v-for="list in booklist" :key="list.id">
          <router-link :to="'/book?book_id='+list.book_id" class="mModuleaL"><img :src="list.cover_img" :alt="list.name"/></router-link>
          <div class="mModuleaR">
            <div class="mModuleaR_Ti"><router-link :to="'/book?book_id='+list.book_id">{{ list.name }}</router-link></div>
            <div class="mModuleaR_Te">{{ list.desc }}</div>
          </div>
          <div class="mModuleaR_Author">{{ list.author }}</div>
          <div class="mModuleaR_Read">{{ list.read_num }}人阅读</div>
        </li>
      </ul>
      <div class="mResult_Ti">为您推荐同类书籍</div>
      <ul class="mModuleLista mModuleLista_1">
        <li v-for="list in relatedBook" :key="list.id">
          <router-link :to="'/book?book_id='+list.book_id" class="mModuleaL"><img :src="list.cover_img" :alt="list.name"/></router-link>
          <div class="mModuleaR">
            <div class="mModuleaR_Ti"><router-link :to="'/book?book_id='+list.book_id">{{ list.name }}</router-link></div>
            <div class="mModuleaR_Te">{{ list.desc }}</div>
          </div>
          <div class="mModuleaR_Author">{{ list.author }}</div>
          <div class="mModuleaR_Read">{{ list.read_num }}人阅读</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// default 默认关键词,mKeyword 搜索关键词,History 历史搜索列表,Hot 热门搜索列表,Result 结果列表
export default {
  data () {
    return {
      historyData: [],
      hotSearchData: [],
      booklist: [],
      relatedBook: [],
      descInfo: []
    }
  },
  props: ['mKeyword'],
  watch: {
    mKeyword: 'getbooklist'
  },
  methods: {
    parameter: function () {
      this.$emit('mParameter', {'mType': '1'})
    },
    Delete: function () {
      // 删除搜索记录
      this.History = ''
    },
    // 搜索历史
    getsearchhistory: function () {
      let sessionId = sessionStorage.getItem('sessionId')
      this.$http.get('/wap/search/searchHistory', {'params': {'book_id': this.$route.query.book_id, 'session_id': sessionId}}).then(function (res) {
        this.historyData = res.data.data.search_list
        this.hotSearchData = res.data.data.hot_recommend
      },
      function (res) {
        alert(res.status)
      })
    },
    // 搜索结果
    getbooklist: function (curVal, oldVal) {
      let sessionId = sessionStorage.getItem('sessionId')
      this.$http.get('/wap/search', {'params': {'keywords': curVal, 'session_id': sessionId}}).then(function (res) {
        this.booklist = res.data.data.books
        this.descInfo = res.data.data.desc
        this.relatedBook = res.data.data.recommend
      },
      function (res) {
        alert(res.status)
      })
    }
  // 缺少同类书籍推荐
  },
  created: function () {
    this.parameter()
    this.getsearchhistory()
  }
}
</script>

<style scoped>
.mHistory_w{width:10rem;padding-top:0.666667rem;margin:0 auto;display:flex;flex-direction:column;overflow:hidden;}
.mHistory_Ti{width:10rem;height:0.533333rem;line-height:0.533333rem;font-size:0.32rem;color:#a6a6a6;padding:0 0.4rem;display:flex;justify-content:space-between;overflow:hidden;box-sizing:border-box;}
.mHistory_Ti img{width:0.4rem;height:0.4rem;margin-top:0.066667rem;display:flex;cursor:pointer;}
.mHistory_w span{width:10rem;padding:0 0.2rem;margin-top:0.2rem;flex-wrap:wrap;display:flex;overflow:hidden;box-sizing:border-box;}
.mHistory_w a{width:auto;font-size:0.373333rem;line-height:0.746667rem;color:#242424;white-space:nowrap;padding:0 0.2rem;display:flex;overflow:hidden;}
.mHot_w{width:10rem;padding-top:0.466667rem;margin:0 auto;display:flex;flex-direction:column;overflow:hidden;}
.mHot_w span{width:10rem;padding:0 0.2rem;margin-top:0.2rem;flex-wrap:wrap;justify-content:space-between;display:flex;overflow:hidden;box-sizing:border-box;}
.mHot_w a{width:4.2rem;height:1rem;line-height:1rem;font-size:0.373333rem;color:#242424;white-space:nowrap;text-overflow:ellipsis;padding:0 0.2rem;display:block;overflow:hidden;}
.mHot_w i{width:0.32rem;height:0.32rem;line-height:0.32rem;font-size:0.24rem;color:#fff;text-align:center;margin-top:0.34rem;margin-right:0.133333rem;border-radius:2px;background-color:#d8d8d8;float:left;display:block;overflow:hidden;}
.mHot_w i.mHot_I0{background-color:#ff384e;}
.mHot_w i.mHot_I1{background-color:#ff5d13;}
.mHot_w i.mHot_I2{background-color:#f5a623;}
.mHistory_w a:active,.mHot_w a:active{color:#42c079;}
.mResult{width:10rem;margin:0 auto;display:flex;flex-direction:column;overflow:hidden;}
.mResult_Ti{width:10rem;height:0.853333rem;line-height:0.853333rem;font-size:0.373333rem;color:#a6a6a6;padding:0 0.4rem;background-color:#f7f7f7;display:flex;overflow:hidden;box-sizing:border-box;}
</style>
