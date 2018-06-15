<template>
  <div class="main" style="position:fixed;overflow:visible;">
    <scroller style="top:1.133333rem;overflow:visible;" :on-infinite="infinite">
      <ul v-for="mlist in bookList" :key="mlist.id" class="mModuleLista mModuleLista_1">
        <li v-for="list in mlist.books" :key="list.id">
          <router-link :to="'/book?book_id='+list.book_id" class="mModuleaL"><img :src="list.cover_img" :alt="list.name"/></router-link>
          <div class="mModuleaR">
            <div class="mModuleaR_Ti"><router-link :to="'/book?book_id='+list.book_id">{{ list.name }}</router-link></div>
            <div class="mModuleaR_Te">{{ list.desc }}</div>
          </div>
          <div class="mModuleaR_Author">{{ list.author }}</div>
          <div class="mModuleaR_Read">{{ list.read_num }}人阅读</div>
        </li>
      </ul>
    </scroller>
  </div>
</template>
<script>
// Channel 频道内页
export default {
  data () {
    return {
      pages: 1,
      dataInfo: [],
      bookList: []
    }
  },
  methods: {
    parameter: function () {
      this.$emit('mParameter', {'mType': '3', 'mHeaderFixed': true})
    },
    getbooklist: function () {
      this.$http.get('/wap/store/categoryInfo', {'pages': this.pages}).then(function (res) {
        this.dataInfo = res.data
        this.bookList.push(this.dataInfo.data)
      },
      function (res) {
        alert(res.status)
      })
    },
    infinite: function (done) {
      setTimeout(() => {
        this.pages = this.pages + 1
        this.getbooklist()
        done()
      }, 1500)
    }
  },
  created: function () {
    this.parameter()
    this.getbooklist()
  }
}
</script>
