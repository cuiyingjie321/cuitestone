<template>
  <div class="main">
    <ul v-if="dataDetail.name" class="mModuleLista mModuleLista_1">
      <li>
        <div class="mModuleaL"><img :src="dataDetail.cover_img" :alt="dataDetail.name"/></div>
        <div class="mModuleaR">
          <div class="mModuleaR_Ti">{{ dataDetail.name }}</div>
          <div class="mModuleaR_Info">{{ dataDetail.author }}</div>
          <div class="mModuleaR_Rate">
            <div class="mStar"><div :style="'width:60%'"></div></div>{{ dataDetail.read_num }}人阅读
          </div>
          <div class="mModuleaR_Leaves">{{ dataDetail.user_money }}</div>
        </div>
      </li>
    </ul>
    <div v-if="dataDetail.name" class="mIntroduce">{{ dataDetail.desc }}</div>
    <div v-if="!dataDetail.name" class="mLoad"><img src="./../assets/images/mLoad.gif" alt="加载中..." /></div>
    <div class="mModuleb">
      <div v-if="chapterInfo.chapter_count" class="mSeeTi">查看目录：{{ chapterInfo.chapter_count }}章</div>
      <div v-if="chapterInfo.chapter_count" class="mSeeTe">
        <router-link v-for="list in catalogInfoDetail.slice(0,7)" :key="list.id" :to="'/article?book_id='+dataDetail.book_id+'&chapter_id='+list.chapter_id">{{ list.title }}<span v-if ="list.free == 1">免费</span></router-link>
      </div>
      <div v-if="chapterInfo.chapter_count && catalogInfoDetail.length > 7" class="mSeeBtn" @click="mSideBtn">查看更多章节 ></div>
      <div v-if="!chapterInfo.chapter_count" class="mLoad"><img src="./../assets/images/mLoad.gif" alt="加载中..." /></div>
    </div>
    <div class="mModule">
      <h3 class="mModuleTi">喜欢这本书的人也喜欢<router-link to="/classifylist?id=1">查看更多 &gt;</router-link></h3>
      <ul class="mModuleList mModuleList_PB">
        <li v-for="list in bookRecommend.books" :key="list.id"><div @click="mBookBtn(list.book_id)"><span><img :src="list.cover_img" :alt="list.name"/></span><p>{{ list.name }}</p></div></li>
      </ul>
      <div v-if="!bookRecommend.books" class="mLoad"><img src="./../assets/images/mLoad.gif" alt="加载中..." /></div>
    </div>
    <div v-if="chapterInfo.chapter_count" class="mBookNav">
      <div @click="mBookShelf" class="mBookNavL"><span v-if="dataAdd === 0 && this.dataAddLoad">加入书架</span><span v-if="dataAdd === 1 && this.dataAddLoad">移除书架</span><span v-if="!this.dataAddLoad">正在请求...</span></div>
      <router-link v-for="list in catalogInfoDetail.slice(0,1)" :key="list.id" :to="'/article?book_id='+dataDetail.book_id+'&chapter_id='+list.chapter_id" class="mBookNavR">免费试读</router-link>
    </div>
    <div v-if="mSideNav" @click="mSideBtn" class="mSideNavBj"></div>
    <div v-if="mSideNav" class="mSideNav">
      <div class="mSideNav_List">
        <div class="mSideNav_Ti">{{ mBookState }} 本书共{{ catalogInfoDetail.length }}章</div>
        <router-link v-for="list in catalogInfoDetail" :key="list.id" :to="'/article?book_id='+dataDetail.book_id+'&chapter_id='+list.chapter_id">{{ list.title }}<span v-if="list.free === 0">付费</span></router-link>
      </div>
    </div>
  </div>
</template>

<script>
// mMoreInfo_Zs 字数,mMoreInfo_Dx 大小,mMoreInfo_Rq 日期,mMoreInfo_Cbs 出版社,mMoreInfo_Sh 书号,mMoreInfo_Mz 免责声明,mSideNav 是否显示侧导航,Relevant 喜欢这本书的人也喜欢列表,Book 当前书籍信息,BookList 书籍目录,dataAdd 是否加入了书架,dataAddLoad 预防书架按钮多次点击
export default {
  data () {
    return {
      dataInfo: [],
      dataDetail: [],
      catalogInfo: [],
      catalogInfoDetail: [],
      chapterInfo: [],
      bookRecommendData: [],
      bookRecommend: [],
      mSideNav: '',
      mBookState: '',
      chapters: [],
      mPaging: 0, // url更新时请求数据
      dataAdd: 0,
      dataAddLoad: true
    }
  },
  methods: {
    parameter: function () {
      this.$emit('mParameter', {'mType': '3'})
    },
    mSideBtn: function () {
      // 侧导航展开关闭
      this.mSideNav = !this.mSideNav
    },
    mBookShelf: function () {
      // 加入书架
      if (this.dataAddLoad === true) {
        this.dataAddLoad = false
        let sessionId = sessionStorage.getItem('sessionId')
        this.$http.get('/wap/book/bookCase', {'params': {'book_id': this.$route.query.book_id, 'session_id': sessionId}}).then(function (res) {
          if (res.data.return_code === 0) {
            this.dataAdd = (this.dataAdd === 0) ? 1 : 0
            if (res.data.data.status === 1) {
              alert('加入书架成功')
            } else {
              alert('移除书架成功')
            }
          } else {
            if (this.dataAdd === 0) {
              alert('加入书架失败')
            } else {
              alert('移除书架失败')
            }
          }
          this.dataAddLoad = true
        },
        function (res) {
          alert(res.status)
        })
      }
    },
    getbookrecommend: function () {
      this.$http.get('/wap/book/bookRecommend', {'params': {'book_id': this.$route.query.book_id}}).then(function (res) {
        this.bookRecommendData = res.data
        this.bookRecommend = this.bookRecommendData.data
      },
      function (res) {
        alert(res.status)
      })
    },
    getbookinfo: function () {
      let sessionId = sessionStorage.getItem('sessionId')
      this.$http.get('/wap/book', {'params': {'book_id': this.$route.query.book_id, 'session_id': sessionId}}).then(function (res) {
        this.dataInfo = res.data
        this.dataAdd = this.dataInfo.data.is_add
        this.dataDetail = this.dataInfo.data.books.info
        this.chapterInfo = this.dataInfo.data.books.chapter_info
        this.chapters = this.dataInfo.data.books.chapter_info.chapters
      },
      function (res) {
        alert(res.status)
      })
    },
    getbookcataloginfo: function () {
      let sessionId = sessionStorage.getItem('sessionId')
      this.$http.get('/wap/book/catalogInfo', {'params': {'book_id': this.$route.query.book_id, 'session_id': sessionId}}).then(function (res) {
        this.catalogInfo = res.data
        this.catalogInfoDetail = this.catalogInfo.data.chapters
        this.mBookState = this.catalogInfo.data.progress
      },
      function (res) {
        alert(res.status)
      })
    },
    mBookBtn: function (val, index) {
      this.mPaging = val
    }
  },
  created: function () {
    this.parameter()
    this.getbookinfo()
    this.getbookrecommend()
    this.getbookcataloginfo()
  },
  watch: {
    mPaging: function (val) {
      this.dataDetail = []
      this.chapterInfo = []
      this.bookRecommend = []
      this.$router.replace('/book?book_id=' + val)
      this.getbookinfo()
      this.getbookrecommend()
      this.getbookcataloginfo()
      this.parameter()
    }
  }
}
</script>

<style scoped>
.mIntroduce{width:10rem;line-height:0.533333rem;font-size:0.373333rem;color:#a7a7a7;padding:0.306667rem 0.4rem 0.2rem;border-top:1px solid #f1f1f1;display:flex;overflow:hidden;box-sizing:border-box;}
.mModuleaR_Info,.mModuleaR_Rate,.mModuleaR_Leaves{width:100%;font-size:0.32rem;color:#a7a7a7;display:flex;overflow:hidden;}
.mModuleaR_Info{line-height:0.666667rem;}
.mModuleaR_Rate{height:0.453333rem;line-height:0.453333rem;}
.mModuleaR_Leaves{line-height:0.533333rem;}
.mStar{width:1.333335rem;height:0.266667rem;margin-top:0.093333rem;background:url(./../assets/images/mStar.png) repeat-x 0 0;background-size:0.266667rem 0.266667rem;display:flex;overflow:hidden;margin-right:0.133333rem;}
.mStar div{width:20%;height:0.266667rem;background:url(./../assets/images/mStar_hov.png) repeat-x 0 0;background-size:0.266667rem 0.266667rem;display:block;overflow:hidden;}
.mSeeTi{width:100%;line-height:1.093333rem;font-size:0.426667rem;color:#262b33;border-bottom:1px solid #f1f1f1;padding:0 0.4rem;display:flex;overflow:hidden;box-sizing:border-box;}
.mSeeTe{width:100%;padding:0 0.4rem;display:flex;flex-direction:column;overflow:hidden;box-sizing:border-box;}
.mSeeTe a{width:100%;line-height:1.093333rem;font-size:0.426667rem;color:#262b33;border-bottom:1px solid #f1f1f1;display:flex;justify-content:space-between;overflow:hidden;box-sizing:border-box;}
.mSeeTe a:active{color:#42c079;}
.mSeeTe span{color:#a7a7a7;}
.mSeeBtn{width:100%;line-height:1.093333rem;font-size:0.426667rem;color:#262b33;padding:0 0.4rem;display:flex;justify-content:center;overflow:hidden;box-sizing:border-box;cursor:pointer;}
.mMoreInfo{width:100%;line-height:0.533333rem;font-size:0.373333rem;color:#bababa;padding:0 0.4rem;display:flex;overflow:hidden;box-sizing:border-box;}
.mMoreInfo:last-child{padding-bottom:1.3rem;}
.mBookNav{width:10rem;height:1.36rem;line-height:1.36rem;position:fixed;bottom:0;left:50%;margin-left:-5rem;display:flex;justify-content:space-between;overflow:hidden;}
.mBookNavL,.mBookNavR{width:5rem;height:1.36rem;line-height:1.36rem;color:#f60;background-color:#fff;justify-content:center;display:flex;overflow:hidden;cursor:pointer;}
.mBookNavL{border-top:1px solid #d8d8d8;border-right:1px solid #d8d8d8;}
.mBookNavR{color:#fff;background-color:#f60;}
.mSideNav{right:50%;margin-right:-5rem;-webkit-animation:mSideNavR 0.8s ease-in-out forwards;animation:mSideNavR 0.8s ease-in-out forwards;}
.mModuleList_PB{padding-bottom:1rem;}
@-webkit-keyframes mSideNavR{
0%{opacity:0;-webkit-transform:translate(14rem,0);}
100%{opacity:1;-webkit-transform:translate(0,0);}
}
@keyframes mSideNavR{
0%{opacity:0;transform:translate(14rem,0);}
100%{opacity:1;transform:translate(0,0);}
}
</style>
