<template>
  <div class="main mFixed">
    <scroller :on-infinite="infinite">
      <div class="mSeize"></div>
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
      mNum: 0,
      mExercise: true,
      dataInfo: [],
      bookList: []
    }
  },
  methods: {
    parameter: function () {
      this.$emit('mParameter', {'mType': '3', 'mHeaderFixed': true})
    },
    More: function (val) {
      if (val === -1) {
        this.mNum = -1
      } else {
        this.mNum = this.mNum + val
        this.mExercise = true
      }
    },
    getbooklist: function () {
      this.$http.get('/wap/store/categoryInfo', {'params': {'offset': this.mNum, 'category_id': this.$route.query.category_id}}).then(function (res) {
        this.dataInfo = res.data
        this.More(res.data.data.offset)
        this.bookList.push(this.dataInfo.data)
      },
      function (res) {
        alert(res.status)
      })
    },
    infinite: function (done) {
      // 没有数据时
      if (this.mNum < 0) {
        setTimeout(() => {
          done(true)
        }, 1500)
        return
      }
      // 有数据时
      if (this.mNum >= 0) {
        setTimeout(() => {
          if (this.mExercise === true) {
            this.mExercise = false
            this.getbooklist()
          }
          done()
        }, 1500)
      }
    }
  },
  created: function () {
    this.parameter()
  }
}
</script>
