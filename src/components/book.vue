<template>
  <div class="main">
    <div>
      <ul class="mModuleLista mModuleLista_1">
        <li>
          <div class="mModuleaL"><img :src="dataDetail.books.info.cover_img" :alt="dataDetail.books.info.name"/></div>
          <div class="mModuleaR">
            <div class="mModuleaR_Ti">{{ dataDetail.books.info.name }}</div>
            <div class="mModuleaR_Info">{{ dataDetail.books.info.author }}</div>
            <div class="mModuleaR_Rate">
              <div class="mStar"><div :style="'width:'+dataDetail.books.info.read_num +'%'"></div></div>{{ dataDetail.books.info.read_num }}人阅读
            </div>
            <div class="mModuleaR_Leaves">{{ dataDetail.books.info.user_money }}</div>
          </div>
        </li>
      </ul>
      <div class="mIntroduce">{{ dataDetail.books.info.desc }}</div>
    </div>
    <div class="mModuleb">
      <div class="mSeeTi">查看目录：{{ chapterInfo.chapter_count }}章</div>
      <div class="mSeeTe">
        <router-link v-for="list in chapterInfo.chapters.slice(0,7)" :key="list.id" :to="'/article?id=1&chapter='+list.chapter_id">{{ list.title }}<span v-if ="list.free < 1">免费</span></router-link>
      </div>
      <div v-if="chapterInfo.chapters.length > 7" class="mSeeBtn" @click="mSideBtn">查看更多章节 ></div>
    </div>
    <div class="mModule">
      <h3 class="mModuleTi">喜欢这本书的人也喜欢<router-link to="/classifylist?id=1">查看更多 &gt;</router-link></h3>
      <ul class="mModuleList">
        <li v-for="list in bookRecommend.books" :key="list.id"><router-link :to="'/book?book_id='+list.book_id"><span><img :src="list.cover_img" :alt="list.name"/></span><p>{{ list.name }}</p></router-link></li>
      </ul>
    </div>
    <div class="mModule">
      <h3 class="mModuleTi">图书更多信息</h3>
      <div v-if="mMoreInfo_Zs" class="mMoreInfo">字数：{{ mMoreInfo_Zs }}</div>
      <div v-if="mMoreInfo_Dx" class="mMoreInfo">大小：{{ mMoreInfo_Dx }}</div>
      <div v-if="mMoreInfo_Rq" class="mMoreInfo">上架时间：{{ mMoreInfo_Rq }}</div>
      <div v-if="mMoreInfo_Cbs" class="mMoreInfo">出版社：{{ mMoreInfo_Cbs }}</div>
      <div v-if="mMoreInfo_Sh" class="mMoreInfo">书号：{{ mMoreInfo_Sh }}</div>
      <div v-if="mMoreInfo_Mz" class="mMoreInfo">免责声明：{{ mMoreInfo_Mz }}</div>
    </div>
    <div class="mBookNav">
      <div @click="mBookShelf" class="mBookNavL">加入书架</div>
      <router-link to="/article?id=1&chapter=1" class="mBookNavR">免费试读</router-link>
    </div>
    <div v-if="mSideNav" @click="mSideBtn" class="mSideNavBj"></div>
    <div v-if="mSideNav" class="mSideNav">
      <div class="mSideNav_Ti">连载 本书共{{ chapterInfo.chapter_count }}章</div>
      <div class="mSideNav_List">
        <router-link v-for="list in  chapterInfo.chapters" :key="list.id" :to="'/article?id=1&chapter='+list.chapter_id">{{ list.title }}<span v-if="list.free < 1">免费</span></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import test from './../assets/images/mImg_1.jpg'
// mMoreInfo_Zs 字数,mMoreInfo_Dx 大小,mMoreInfo_Rq 日期,mMoreInfo_Cbs 出版社,mMoreInfo_Sh 书号,mMoreInfo_Mz 免责声明,mSideNav 是否显示侧导航,Relevant 喜欢这本书的人也喜欢列表,Book 当前书籍信息,BookList 书籍目录
export default {
  data () {
    return {
	  dataInfo:[],
	  dataDetail:[],
	  chapterInfo:[],
	  bookRecommendData:[],
	  bookRecommend:[],
      mMoreInfo_Zs: '12.1万字',
      mMoreInfo_Dx: '14.01MB',
      mMoreInfo_Rq: '2018-03-21',
      mMoreInfo_Cbs: '湖南文艺出版社',
      mMoreInfo_Sh: '0299393902020202',
      mMoreInfo_Mz: '本书数字版权由“博集新媒”提供，并由其授权中华股份科技有限公司制作发行，若书中含有不良信息，请书友积极告知客服。',
      mSideNav: '',
      Book: [{
        href: '/book',
        title: '我所有的朋友都死了1',
        introduce: '世界上有趣的事太多世界上有趣的事太多世界上有趣的事太多世界上有趣的事太多',
        author: '洛城东',
        info: '肌肤天卷｜大半',
        rate: '129393',
        star: '40',
        leaves: '1100',
        img: test
      }],
      BookList: [{
        href: '/article?id=1&chapter=1',
        title: '版权信息',
        free: 'true'
      }, {
        href: '/article?id=1&chapter=2',
        title: '楔子',
        free: 'true'
      }, {
        href: '/article?id=1&chapter=3',
        title: '第一章 唯若初见',
        free: 'true'
      }, {
        href: '/article?id=1&chapter=4',
        title: '第二章 你的甜蜜',
        free: 'true'
      }, {
        href: '/article?id=1&chapter=5',
        title: '第三章 你的厄劫',
        free: 'true'
      }, {
        href: '/article?id=1&chapter=6',
        title: '第四章 时光如初',
        free: 'true'
      }, {
        href: '/article?id=1&chapter=7',
        title: '第五章 若是分离',
        free: 'true'
      }, {
        href: '/article?id=1&chapter=8',
        title: '第六章 唯若初见',
        free: 'true'
      }, {
        href: '/article?id=1&chapter=9',
        title: '第七章 唯若初见',
        free: 'true'
      }, {
        href: '/article?id=1&chapter=10',
        title: '第八章 唯若初见',
        free: 'true'
      }, {
        href: '/article?id=1&chapter=11',
        title: '第九章 你的甜蜜',
        free: 'true'
      }, {
        href: '/article?id=1&chapter=12',
        title: '第十章 你的厄劫'
      }, {
        href: '/article?id=1&chapter=13',
        title: '第十一章 时光如初'
      }, {
        href: '/article?id=1&chapter=14',
        title: '第十二章 若是分离'
      }],
      Relevant: [{
        href: '/book',
        title: '我所有的朋友都死了1',
        img: test
      }, {
        href: '/book',
        title: '我所有的朋友都死了2',
        img: test
      }, {
        href: '/book',
        title: '我所有的朋友都死了3',
        img: test
      }, {
        href: '/book',
        title: '我所有的朋友都死了4',
        img: test
      }, {
        href: '/book',
        title: '我所有的朋友都死了5',
        img: test
      }, {
        href: '/book',
        title: '我所有的朋友都死了6',
        img: test
      }]
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
    },
	getbookrecommend: function () {
		this.$http.get("/wap/book/bookRecommend",{params:{book_id:this.$route.query.bookid}}).then(function(res){
			this.bookRecommendData  = res.data
			this.bookRecommend 	= this.bookRecommendData.data		
		},function(res){  
			alert(res.status) 
		})
	},
	getbookinfo: function () {
		this.$http.get("/wap/book",{params:{book_id:this.$route.query.bookid}}).then(function(res){
			this.dataInfo  	= res.data333
			this.dataDetail 	= this.dataInfo.data
			this.chapterInfo 	= this.dataDetail.books.chapter_info			
		},function(res){  
			alert(res.status) 
		})
	} 
  },
  mounted: function () {
    this.parameter()
	this.getbookinfo()
	this.getbookrecommend()	
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
@-webkit-keyframes mSideNavR{
0%{opacity:0;-webkit-transform:translate(14rem,0);}
100%{opacity:1;-webkit-transform:translate(0,0);}
}
@keyframes mSideNavR{
0%{opacity:0;transform:translate(14rem,0);}
100%{opacity:1;transform:translate(0,0);}
}
</style>
