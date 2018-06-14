<template>
  <div class="main">
    <ul class="mModuleLista mModuleLista_1">
      <li v-for="list in bookList.books" :key="list.id">
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
</template>

<script>
// Channel 频道内页
export default {
  data () {
    return {
      dataInfo: [],
      bookList: []
    }
  },
  methods: {
    parameter: function () {
      this.$emit('mParameter', {'mType': '3'})
    },
    getbooklist: function () {
      this.$http.get('/wap/store/categoryInfo', {}).then(function (res) {
        this.dataInfo = res.data
        this.bookList = this.dataInfo.data
      },
      function (res) {
        alert(res.status)
      })
    }
  },
  created: function () {
    this.parameter()
    this.getbooklist()
  }
}
</script>
