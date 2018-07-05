<template>
  <div class="main">
    <section class="mContent_w">
      <div class="mModule mModule_N">
        <h3 class="mModuleTi">我的书架 <span @click="mBookShelfRemove" class="mBookShelfRemove"><i v-if="!mBookShelfBtn">删除</i><i v-if="mBookShelfBtn">取消</i></span></h3>
        <ul v-if="MyBookShelfMsg" class="mModuleList">
          <li v-for="(list , index) in MyBookShelf" :key="list.id" v-if="!list.remove"><router-link :to="'/book?book_id='+list.book_id"><span><img :src="list.cover_img" :alt="list.name"/></span><p>{{ list.name }}</p></router-link><div v-if="mBookShelfBtn" class="mRemoveBj"></div><i @click="mRemove(list.book_id, index)" v-if="mBookShelfBtn" :class="['mRemove', { 'mRemove_hov': list.removeload}]"></i><div v-if="list.removeload" class="mLoadRemove"><img src="./../assets/images/mLoad.gif" alt="加载中..." /></div></li>
        </ul>
        <div v-if="MyBookShelfMsg === 'ok' && MyBookShelf.length === 0" class="mModuleNull">还没有阅读，快去阅读吧~</div>
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
import Vue from 'vue'
// MyBookShelf 我的书架,Relevant 相关推荐,mBookShelfBtn 是否显示书架删除按钮
export default {
  data () {
    return {
      MyBookShelf: [],
      Relevant: [],
      MyBookShelfMsg: '',
      RelevantMsg: '',
      mBookShelfBtn: false
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
      this.$http.get('/wap/index', {'params': {'offset': 0, 'session_id': sessionId}}).then(function (res) {
        this.MyBookShelf = res.data.data.item
        this.Relevant = res.data.data.books
        this.MyBookShelfMsg = res.data.return_msg
        this.RelevantMsg = res.data.return_msg
      },
      function (res) {
        // alert(res.status)
      })
    },
    mBookShelfRemove: function () {
      // 显示删除按钮
      this.mBookShelfBtn = !this.mBookShelfBtn
    },
    mRemove: function (val, index) {
      // 删除按钮
      if (!this.MyBookShelf[index].removeload) {
        Vue.set(this.MyBookShelf, index, {'book_id': this.MyBookShelf[index].book_id, 'cover_img': this.MyBookShelf[index].cover_img, 'name': this.MyBookShelf[index].name, 'removeload': true})
        let sessionId = sessionStorage.getItem('sessionId')
        this.$http.get('/wap/book/bookCase', {'params': {'book_id': val, 'session_id': sessionId}}).then(function (res) {
          if (res.data.return_code === 0) {
            Vue.set(this.MyBookShelf, index, {'remove': true})
          } else {
            Vue.set(this.MyBookShelf, index, {'book_id': this.MyBookShelf[index].book_id, 'cover_img': this.MyBookShelf[index].cover_img, 'name': this.MyBookShelf[index].name, 'removeload': false})
            alert('移除书籍失败')
          }
        },
        function (res) {
          alert(res.status)
        })
      }
    }
  },
  created: function () {
    this.parameter()
    this.getbooklist()
  }
}
</script>

<style scoped>
.mBookShelfRemove{font-size:0.373333rem;color:#a7a7a7;}
.mRemoveBj{width:100%;height:100%;background:url(./../assets/images/1.gif) no-repeat 0 0;position:absolute;cursor:pointer;}
.mRemove{width:0.65rem;height:0.65rem;background:url(./../assets/images/mRemove.png) no-repeat 0 0;background-size:cover;margin-right:0.2rem;display:block;position:absolute;top:0.366667rem;right:0.1rem;}
.mRemove:active,.mRemove_hov{background:url(./../assets/images/mRemove_hov.png) no-repeat 0 0;background-size:cover;}
</style>
