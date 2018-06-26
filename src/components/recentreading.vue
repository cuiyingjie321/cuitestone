<template>
  <div class="main">
    <section class="mContent_w mContent_N">
      <div class="mModule mModule_N">
        <h3 class="mModuleTi">最近阅读</h3>
        <ul class="mModuleList">
          <li v-for="list in readhistory.item" :key="list.id"><router-link :to="'/article?book_id=' + list.book_id + '&chapter_id=' + list.chapter_id"><span><img :src="list.cover_img" :alt="list.name"/></span><p>{{ list.name }}</p></router-link></li>
        </ul>
        <div v-if="code === 0 && !readhistory.item" class="mModuleNull">还没有阅读，快去阅读吧~</div>
        <div v-if="code !== 0" class="mLoad"><img src="./../assets/images/mLoad.gif" alt="加载中..." /></div>
      </div>
      <div class="mModule mModule_30">
        <h3 class="mModuleTi">相关推荐</h3>
        <ul class="mModuleList">
          <li v-for="list in readhistory.books" :key="list.id"><router-link :to="'/book?book_id=' + list.book_id"><span><img :src="list.cover_img" :alt="list.name"/></span><p>{{ list.name }}</p></router-link></li>
        </ul>
        <div v-if="code !== 0" class="mLoad"><img src="./../assets/images/mLoad.gif" alt="加载中..." /></div>
      </div>
    </section>
  </div>
</template>

<script>
// RecentReading 最近阅读,Relevant 相关推荐
export default {
  data () {
    return {
      readhistory: [],
      code: false
    }
  },
  methods: {
    parameter: function () {
      this.$emit('mParameter', {'mType': '3'})
    },
    getreadhistory: function () {
      // 最近阅读
      this.$http.get('wap/user/readhistory', {'params': {'session_id': '888888'}}).then(function (res) {
        this.readhistory = res.data.data
        this.code = parseInt(res.data.return_code)
      },
      function (res) {
        alert(res.status)
      })
    }
  },
  created: function () {
    this.parameter()
    this.getreadhistory()
  }
}
</script>

<style scoped>
.mModule_30{border-top:0.4rem solid #f7f7f7;}
</style>
