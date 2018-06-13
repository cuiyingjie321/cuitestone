<template>
  <div class="main">
    <section class="mContent_w">
      <div class="mModule mModule_N">
        <h3 class="mModuleTi">我的书架</h3>
        <ul class="mModuleList">
          <li v-for="list in MyBookShelf.data.books" :key="list.id"><router-link :to="'/book?bookid='+list.book_id"><span><img :src="list.cover_img" :alt="list.name"/></span><p>{{ list.name }}</p></router-link></li>
        </ul>	
        <div v-if="!MyBookShelf" class="mModuleNull">还没有阅读，快去阅读吧~</div>
      </div>
      <div class="mModule">
        <h3 class="mModuleTi">相关推荐</h3>
        <ul class="mModuleList">
          <li v-for="list in Relevant.data.books" :key="list.id"><router-link :to="'/book?bookid='+list.book_id"><span><img :src="list.cover_img" :alt="list.name"/></span><p>{{ list.name }}</p></router-link></li>
        </ul>
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
      Relevant: []
    }
  },
  methods: {
    parameter: function () {
      this.$emit('mParameter', {'mType': '0', 'mNav': 'true', 'mIndex': '0'})
    },
	getbooklist: function () {
		this.$http.get("/wap",{}).then(function(res){
			this.MyBookShelf = res.data 
		},function(res){  
			alert(res.status) 
		})
	},
	getbookRecommend: function () {
		this.$http.get("/wap/index/bookRecommend",{}).then(function(res){
			this.Relevant = res.data
		},function(res){  
			alert(res.status) 
		})
	}
  },
  mounted: function () {
    this.parameter()
	this.getbooklist()
	this.getbookRecommend()
  }
}
</script>
