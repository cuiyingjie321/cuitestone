<template>
  <div class="main">
    <section class="mAd"><img :src="dataInfo.head_ima" alt="华网文学"/></section>
    <section class="mClassify">
      <ul>
        <li><router-link :to="'/classifylist?id='+dataInfoFirst.category_id"  class="mClassify_1"><span></span><p>{{ dataInfoFirst.category_name }}</p></router-link></li>
        <li><router-link :to="'/classifylist?id='+dataInfoSecond.category_id" class="mClassify_2"><span></span><p>{{ dataInfoSecond.category_name }}</p></router-link></li>
        <li><router-link :to="'/classifylist?id='+dataInfoThird.category_id" class="mClassify_3"><span></span><p>{{ dataInfoThird.category_name }}</p></router-link></li>
        <li><router-link to="/list" class="mClassify_4"><span></span><p>{{ dataInfoFourth.fourth_name }}</p></router-link></li>
    </ul>
    </section>
    <section class="mContent_w">
      <div class="mModule mGoodBook_w">
        <div class="mGoodBookL">
          <h3 class="mModuleTi">{{ dataInfoHead.name }}</h3>
          <div class="mModuleTe">舍不得读完的好书</div>
          <router-link  :to="'/book?book_id='+dataInfoBookList.book_id" class="mGoodBookLImg"><img :src="dataInfoBookList.cover_img" :alt="dataInfoBookList.name"/></router-link>
        </div>
        <div class="mGoodBookR">
          <h3 class="mModuleTi">{{ dataInfoChannelA.channel_name }}</h3>
          <div class="mModuleTe"><router-link :to="'/classifylist?category_id='+dataInfoChannelA.category_id">{{ dataInfoChannelA.label }}</router-link></div>
          <router-link to="'/classifylist?category_id='+dataInfoChannelA.category_id" class="mGoodBookBtn1">壮志豪言</router-link>
          <h3 class="mModuleTi mModuleTi1">女生频道</h3>
          <div class="mModuleTe"><router-link :to="'/classifylist?category_id='+dataInfoChannelB.category_id">{{ dataInfoChannelB.label }}</router-link></div>
          <router-link to="/classifylist?id=13" class="mGoodBookBtn2">言情细腻</router-link>
        </div>
      </div>
      <div class="mModule">
        <h3 class="mModuleTi">{{ dataInfoFirstChannelData.category_name }}</h3>
        <ul class="mModuleList">
          <li v-for="list in dataInfoFirstChannel.book_list" :key="list.id"><router-link :to="'/book?book_id='+list.book_id"><span><img :src="list.cover_img" :alt="list.name"/></span><p>{{ list.name }}</p></router-link></li>
        </ul>
      </div>
      <div class="mModule">
        <h3 class="mModuleTi">{{ dataInfoSecondChannelData.category_name }}<router-link :to="'/classifylist?id='+dataInfoSecondChannelData.category_id">查看更多 &gt;</router-link></h3>
        <ul class="mModuleList">
          <li v-for="list in dataInfoSecondChannel.book_list" :key="list.id"><router-link :to="'/book?book_id='+list.book_id"><span><img :src="list.cover_img" :alt="list.name"/></span><p>{{ list.name }}</p></router-link></li>
        </ul>
      </div>
      <div class="mModule">
        <h3 class="mModuleTi">{{ dataInfoThirdChannelData.category_name }}<router-link :to="'/classifylist?id='+dataInfoThirdChannelData.category_id">查看更多 &gt;</router-link></h3>
        <ul class="mModuleLista">
          <li v-for="list in dataInfoThirdChannel.book_list" :key="list.id">
            <router-link :to="'/book?book_id='+list.book_id" class="mModuleaL"><img :src="list.cover_img" :alt="list.name"/></router-link>
            <div class="mModuleaR">
              <div class="mModuleaR_Ti"><router-link :to="'/book?book_id='+list.book_id">{{ list.name }}</router-link></div>
              <div class="mModuleaR_Te">{{ list.desc }}</div>
            </div>
            <div class="mModuleaR_Author">{{ list.author }}</div>
            <div class="mModuleaR_Tab">
              <router-link  :to="'/book?book_id='+list.book_id">{{ list.category }}</router-link>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
// mDefault 搜索默认词,mAd 横通,mClassify 分类导航,GoodBook 好书畅读,BoyTag 男标签,GirlTag 女标签
export default {
  data () {
    return {
      allData: [],
      dataInfo: [],
      dataInfoFirst: [],
      dataInfoSecond: [],
      dataInfoThird: [],
      dataInfoFourth: [],  
      dataInfoHead: [],
      dataInfoBookList: [],
      dataInfoChannelA: [],
      dataInfoChannelB: [],
      dataInfoFirstChannel: [],
      dataInfoSecondChannel: [],
      dataInfoThirdChannel: [],
      dataInfoFirstChannelData: [],
      dataInfoSecondChannelData: [],
      dataInfoThirdChannelData: []  
    }
  },
  methods: {
    parameter: function () {
      this.$emit('mParameter', {'mType': '1', 'mNav': 'true', 'mIndex': '1'})
    },
    getbooklist: function () {
      this.$http.get('/wap/chosen', {}).then(function (res) {
        this.allData = res.data
        this.dataInfo = this.allData.data
        this.dataInfoFirst = this.dataInfo.first.first_data
        this.dataInfoSecond = this.dataInfo.second.second_data
        this.dataInfoThird = this.dataInfo.third.third_data
        this.dataInfoFourth = this.dataInfo.fourth
        this.dataInfoHead = this.dataInfo.head
        this.dataInfoBookList = this.dataInfoHead.book_list
        this.dataInfoChannelA = this.dataInfoHead.channel_a
        this.dataInfoChannelB = this.dataInfoHead.channel_b
        this.dataInfoFirstChannel = this.dataInfo.first_channel
        this.dataInfoSecondChannel = this.dataInfo.second_channel
        this.dataInfoThirdChannel = this.dataInfo.third_channel
        this.dataInfoFirstChannelData = this.dataInfo.first_channel.first_channel_data
        this.dataInfoSecondChannelData = this.dataInfo.second_channel.second_channel_data
        this.dataInfoThirdChannelData = this.dataInfo.third_channel.second_channel_data   
      },
      function (res) {
        alert(res.status)
      })
    }
  },
  mounted: function () {
    this.parameter()
    this.getbooklist()
  }
}
</script>

<style scoped>
.mAd{width:10rem;margin:0 auto;overflow:hidden;}
.mClassify{width:10rem;padding:0.4rem 0 0.266667rem 0;margin:0 auto;overflow:hidden;}
.mClassify ul{width:100%;display:flex;flex-wrap:wrap;overflow:hidden;}
.mClassify li{width:2.5rem;display:flex;flex-direction:column;overflow:hidden;}
.mClassify a{color:#4a4a4a;display:flex;flex-direction:column;}
.mClassify a:active{color:#42c079;}
.mClassify span{width:0.533333rem;height:0.533333rem;margin-left:auto;margin-right:auto;display:block;overflow:hidden;box-sizing:border-box;background-repeat:no-repeat;background-size:cover;background-position:center center;}
.mClassify .mClassify_1 span{background-image:url(./../assets/images/mClassify_1.png);}
.mClassify .mClassify_2 span{background-image:url(./../assets/images/mClassify_2.png);}
.mClassify .mClassify_3 span{background-image:url(./../assets/images/mClassify_3.png);}
.mClassify .mClassify_4 span{background-image:url(./../assets/images/mClassify_4.png);}
.mClassify p{line-height:0.586667rem;font-size:0.373333rem;text-align:center;margin-top:0.16rem;display:flex;justify-content:center;overflow:hidden;}
.mGoodBook_w{justify-content:space-between;flex-direction:row;}
.mGoodBookL{width:4.6rem;border-right:2px solid #f7f7f7;display:flex;flex-direction:column;overflow:hidden;}
.mModuleTe{height:0.533333rem;line-height:0.533333rem;font-size:0.373333rem;color:#a7a7a7;padding:0 0.4rem;display:flex;overflow:hidden;}
.mGoodBookLImg{width:2.613333rem;color:#242424;margin-top:0.266667rem;margin-left:0.533333rem;border-radius:0.1rem;display:block;flex-direction:column;overflow:hidden;-webkit-box-shadow:0 2px 4px 0 rgba(178,178,178,0.50);box-shadow:0 2px 4px 0 rgba(178,178,178,0.50);}
.mGoodBookLImg:active,.mModuleTe a:active{color:#42c079;}
.mGoodBookR{width:4.2rem;padding-right:0.4rem;display:flex;flex-direction:column;overflow:hidden;}
.mModuleTe a{width:auto;color:#a7a7a7;margin-right:0.133333rem;display:flex;overflow:hidden;box-sizing:border-box;}
.mGoodBookR .mModuleTi,.mGoodBookR .mModuleTe{padding-left:0;padding-right:0;}
.mGoodBookBtn1,.mGoodBookBtn2{width:4.026667rem;height:1.066667rem;line-height:1.066667rem;font-size:0.533333rem;color:#fff;margin-top:0.293333rem;justify-content:center;border-radius:0.05rem;display:flex;overflow:hidden;}
.mGoodBookBtn1{background-image:linear-gradient(-148deg,#939fff 0%,#6373ed 100%);}
.mGoodBookBtn2{background-image:linear-gradient(-149deg,#ffaa92 0%,#ff7159 100%);}
.mModuleTi1{margin-top:0.4rem;}
</style>
