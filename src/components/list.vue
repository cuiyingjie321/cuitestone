<template>
  <div class="main">
    <section class="mContent_w">
      <ul class="mClassify">
        <li v-for="list in bookList.item" :key="list.id">
          <router-link :to="'/classifylist?id='+list.id" class="mClassifyL"><img :src="list.category_image" :alt="list.category_name"/></router-link>
          <div class="mClassifyR">
            <div class="mClassifyR_Ti"><router-link :to="'/classifylist?id='+list.id">{{ list.category_name }}频道</router-link></div>
            <div class="mClassifyR_Te">{{ list.count }}</div>
          </div>
        </li>
      </ul>
      <div v-if="!bookListMsg" class="mLoadArticle"><img src="./../assets/images/mLoad.gif" alt="加载中..." /></div>
    </section>
  </div>
</template>

<script>
// mTitle 标题,Classify 书城分类
export default {
  data () {
    return {
      dataInfo: [],
      bookList: [],
      bookListMsg: ''
    }
  },
  methods: {
    parameter: function () {
      this.$emit('mParameter', {'mType': '0', 'mNav': 'true', 'mIndex': '2'})
    },
    getbooklist: function () {
      this.$http.get('/wap/store', {}).then(function (res) {
        this.dataInfo = res.data
        this.bookList = this.dataInfo.data
        this.bookListMsg = this.dataInfo.return_msg
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

<style scoped>
.mClassify{width:10rem;padding-left:0.4rem;padding-right:0.4rem;display:flex;justify-content:space-between;flex-wrap:wrap;overflow:hidden;box-sizing:border-box;}
.mClassify li{width:3.733333rem;padding:0.4rem 0.133333rem 0.133333rem;display:flex;justify-content:space-between;overflow:hidden;}
.mClassifyL{width:1.6rem;border-radius:0.1rem;display:inline-table;overflow:hidden;-webkit-box-shadow:0 2px 4px 0 rgba(178,178,178,0.50);box-shadow:0 2px 4px 0 rgba(178,178,178,0.50);}
.mClassifyR{width:1.733333rem;display:flex;flex-direction:column;overflow:hidden;}
.mClassifyR_Ti{width:100%;font-size:0.426667rem;line-height:0.533333rem;margin-top:0.293333rem;display:flex;overflow:hidden;}
.mClassifyR_Ti a{color:#262b33;}
.mClassifyR_Ti a:active{color:#42c079;}
.mClassifyR_Te{width:100%;font-size:0.373333rem;line-height:0.533333rem;color:#a7a7a7;margin-top:0.133333rem;display:flex;overflow:hidden;}
</style>
