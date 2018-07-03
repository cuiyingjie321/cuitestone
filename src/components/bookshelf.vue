<template>
  <div class="main">
    <section class="mContent_w">
      <div class="mModule mModule_N">
        <h3 class="mModuleTi">我的书架</h3>
        <ul v-if="MyBookShelfMsg" class="mModuleList">
          <li v-for="list in MyBookShelf" :key="list.id"><router-link :to="'/book?book_id='+list.book_id"><span><img :src="list.cover_img" :alt="list.name"/></span><p>{{ list.name }}</p></router-link></li>
        </ul>
        <div v-if="MyBookShelfMsg && !MyBookShelf" class="mModuleNull">还没有阅读，快去阅读吧~</div>
        <div v-if="!MyBookShelfMsg" class="mLoad"><img src="./../assets/images/mLoad.gif" alt="加载中..." /></div>
      </div>
      <div class="mModule">
        <h3 class="mModuleTi">相关推荐</h3>
        <ul v-if="RelevantMsg" class="mModuleList">
          <li v-for="list in Relevant" :key="list.id"><router-link :to="'/book?book_id='+list.book_id"><span><img :src="list.cover_img" :alt="list.name"/></span><p>{{ list.name }}</p></router-link></li>
        </ul>
        <div v-if="!RelevantMsg" class="mLoad"><img src="./../assets/images/mLoad.gif" alt="加载中..." /></div>
      </div>
    </section>
  </div>
</template>
<script>
// MyBookShelf 我的书架,Relevant 相关推荐
export default {
  data () {
    return {
      MyBookShelf: [],
      Relevant: [],
      MyBookShelfMsg: '',
      RelevantMsg: ''
    }
  },
  methods: {
    parameter: function () {
      this.$emit('mParameter', {'mType': '0', 'mNav': 'true', 'mIndex': '0'})
    },
    getbooklist: function () {
      let sessionId = sessionStorage.getItem('sessionId')
      if (!sessionId) {
        sessionId = 0
      }
      this.$http.get('/wap', {'params': {'offset': 0, 'session_id': sessionId}}).then(function (res) {
        this.MyBookShelf = res.data.data.books
        this.MyBookShelfMsg = res.data.return_msg
      },
      function (res) {
        // alert(res.status)
      })
    },
    getbookRecommend: function () {
      this.$http.get('/wap/index/bookRecommend', {}).then(function (res) {
        this.Relevant = res.data.data.books
        this.RelevantMsg = res.data.return_msg
      },
      function (res) {
        // alert(res.status)
      })
    }
  },
  created: function () {
    this.parameter()
    this.getbooklist()
    this.getbookRecommend()
  }
}
</script>
