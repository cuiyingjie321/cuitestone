<template>
  <div id="main" class="main">
    <div @touchstart="PagingStart($event)" @touchend="PagingEnd($event)" class="mAticle" :style="'font-size:' + ( mASetup_Font / 75 ) +'rem'" @click="mAticleBtn">
      <p v-if="mChaptercontent" v-for="list in mChaptercontent" :key="list.id">{{ list }}</p>
      <div v-if="!mChaptercontent" class="mLoadArticle"><img src="./../assets/images/mLoad.gif" alt="加载中..." /></div>
    </div>
    <div v-if="mAticleSetup && mAticleNav" class="mASetup">
      <!-- 事件暂时调用的是章节进度条 <div class="mASetup_Bright">
        <div class="mASetup_BrightL">
          <div class="mASetup_BrightL_Icon_1"></div>
          <div class="mASetup_BrightL_Bar dragbox" @touchmove="timeMove($event)" @touchleave="timeEnd($event)">
            <div class="progress" @click="timeClick($event)">
              <div class="progressbar" :style="{width:mPercent +'%',transition:'width '+transTime+'s'}">
              </div>
            </div>
            <div class="bardrag" @touchstart="timeDown($event)" @touchend="timeEnd($event)" :style="{left:mPercent +'%'}">
            </div>
          </div>
          <div class="mASetup_BrightL_Icon_2"></div>
        </div>
        <div class="mASetup_BrightR">系统</div>
      </div> -->
      <div class="mASetup_Font">
        <div class="mASetup_FontL">
          <div @click="mASetup_Font_Reduce">A-</div>
          <span>{{ mASetup_Font }}</span>
          <div @click="mASetup_Font_Add">A+</div>
        </div>
        <!-- <div class="mASetup_FontR"><img src="./../assets/images/mArticleIcon_4.png"/></div> -->
      </div>
      <div class="mASetup_Style">
        <div v-for="(list , index) in mASetup_Style" :key="list.id" :class="{ hov:mASetup_Style_Index == index}" @click="mASetup_Style_Btn(index)"></div>
      </div>
      <!-- <div class="mASetup_Type">
        <div v-for="(list , index) in mASetup_Type" :key="list.id" :class="{ hov:mASetup_Type_Index == index}" @click="mASetup_Type_Btn(index)">{{ list }}</div>
      </div> -->
    </div>
    <!-- v-if="mPagingBar && !mAticleSetup && mAticleNav" -->
    <div v-if="!mAticleSetup && mAticleNav" class="mPagingInfo">
      <div class="mPagingInfo_L">
        <div>{{ chapters[nowNum].title }}</div>
        <div>全书{{ nowNum+1 }}/{{ chapter_count }}页，位置{{ mPercent | mPercentFilter }}%</div>
      </div>
      <div class="mPagingInfo_Icon"></div>
      <div class="mPagingInfo_Icon" @click="mPagingInfo_Icon"><img src="./../assets/images/mArticleIcon_6.png"/></div>
    </div>
    <div v-if="!mAticleSetup && mAticleNav" class="mPaging">
      <span @click="mPrev">上一章</span>
      <div class="dragbox" @touchmove="timeMove($event)" @touchleave="timeEnd($event)">
        <div class="progress" @click="timeClick($event)">
          <div class="progressbar" :style="{width:mPercent +'%',transition:'width '+transTime+'s'}">
          </div>
        </div>
        <div class="bardrag" @touchstart="timeDown($event)" @touchend="timeEnd($event)" :style="{left:mPercent +'%'}">
        </div>
      </div>
      <span @click="mNext">下一章</span>
    </div>
    <div id="mAticleNav" v-if="mAticleNav" class="mAticleNav">
      <div @click="mSideBtn"><span></span><p>目录</p></div>
      <div @click="mDayBtn"><span :class="{ hov:mDayTitle != '日间'}"></span><p :class="{ hov:mDayTitle != '日间'}">{{ mDayTitle }}</p></div>
      <div @click="mASetupBtn"><span :class="{ hov:mAticleSetup}"></span><p :class="{ hov:mAticleSetup}">设置</p></div>
    </div>
    <div v-if="mSideNav || mBuy" @click="mSideBtn" class="mSideNavBj"></div>
    <div :class="['mSideNav', { 'mSideNav_hov': mSideNav}]">
      <div id="mSideNav_List" class="mSideNav_List">
        <div class="mSideNav_Ti">{{ mBookState }} 本书共{{ chapter_count }}章</div>
        <div v-for="(list , index) in chapters" :key="list.id" :class="{ 'hov':list.chapter_id === chapters[nowNum].chapter_id}" @click="mSideNav_ListBtn(list.chapter_id, index)">{{ list.title }}<span v-if="list.free === 0">付费</span></div>
      </div>
    </div>
    <div v-if="mBuy" class="mBuy">
      <div class="mBuyBt">购买章节</div>
      <div class="mBuyTi">{{ mBookName }}</div>
      <div @click="mBuyChoice" class="mBuyChoice"><span :class="{ 'hov':mChoice}"></span>自动购买后续章节</div>
      <div class="mBuyBtn_w">
        <div @click="mBuyBtn_Cancel" class="mBuyBtn_a">取消</div>
        <div @click="mBuyBtn_Determine" class="mBuyBtn_b">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
// mSideNav 是否显示侧导航,mPagingBar 进度条,mAticleSetup 底部导航设置,BookList 书籍目录,mASetup_Style_Index 颜色选择默认索引,mASetup_Type_Index 翻页模式默认索引,mASetup_Font 默认字号,mAticleNav 底部导航是否显示,mHeaderHide header是否显示,mDayTitle 白天还是黑夜场景,mBookState 连载还是完结
export default {
  data () {
    return {
      mSideNav: '',
      // mPagingBar: false,
      mAticleSetup: true,
      mASetup_Style_Index: '0',
      mASetup_Type_Index: '0',
      mASetup_Font: '32',
      mAticleNav: '',
      mDayTitle: '日间',
      mPercent: '',
      mChaptercontent: [],
      chapters: [],
      mASetup_Style: ['mStyle_0', 'mStyle_1', 'mStyle_2', 'mStyle_3', 'mStyle_4', 'mStyle_5'],
      mASetup_Type: ['仿真', '覆盖', '滑动', '无'],
      pos: {}, // 上一章下一章开始
      startX: null,
      locked: false,
      distance: 0, // 当前位置
      endDistance: 0, // 上次操作结束位置
      transTime: 0.3, // 点击拖动动画
      dragWidth: 0, // 进度条宽度
      nowNum: 0,
      PagingStartX: 0,
      PagingEndX: 0,
      mPaging: 0, // url更新时请求数据
      chapter_count: 0,
      mBookState: '',
      mBookPosition: 0, // 当前章节在数组中的位置
      mChoice: true,
      is_pay: 0,
      auto_pay: 0,
      mBuy: false
    }
  },
  methods: {
    parameter: function () {
      this.$emit('mParameter', {'mType': '4', 'mHeaderHide': !this.mAticleNav, 'mName': this.mBookName, 'mASetup_Style': this.mASetup_Style[this.mASetup_Style_Index], 'mDay': this.DayStyle, 'mHeaderFixed': this.mAticleNav})
    },
    mSideBtn: function () {
      // 侧导航展开关闭
      if (this.mBuy) {
        this.mBuy = !this.mBuy
      } else {
        this.mSideNav = !this.mSideNav
        // 计算侧边栏打开时位置
        if (this.mSideNav) {
          document.getElementById('mSideNav_List').scrollTop = parseInt(this.mRatio * ((this.mBookPosition * 1.133333) * 75))
        }
      }
    },
    mASetupBtn: function () {
      // 设置展开关闭
      this.mAticleSetup = !this.mAticleSetup
    },
    mASetup_Style_Btn: function (index) {
      // 颜色选择
      this.mASetup_Style_Index = index
      this.parameter()
    },
    mASetup_Type_Btn: function (index) {
      // 翻页模式
      this.mASetup_Type_Index = index
    },
    mAticleBtn: function () {
      // 显示导航
      this.mAticleNav = !this.mAticleNav
      // this.mPagingBar = false
      this.mAticleSetup = false
      this.parameter()
      // 重新打开章节进度条时复位到当前章节位置
      if (this.mAticleNav) {
        this.distance = this.mBookPosition * (this.dragWidth / this.chapter_count)
        this.countNum(this.distance)
      }
    },
    mPagingInfo_Icon: function () {
      // 章节跳转按钮后隐藏导航
      this.mPaging = this.chapters[this.nowNum].chapter_id
    },
    mASetup_Font_Add: function () {
      // 字号加
      if (this.mASetup_Font < 76) {
        this.mASetup_Font = parseInt(this.mASetup_Font) + 2
      }
    },
    mASetup_Font_Reduce: function () {
      // 字号减
      if (this.mASetup_Font > 24) {
        this.mASetup_Font = parseInt(this.mASetup_Font) - 2
      }
    },
    mDayBtn: function () {
      // 白天还是黑夜场景
      if (this.mDayTitle === '日间') {
        this.mDayTitle = '夜间'
        this.DayStyle = 'mNight'
      } else {
        this.mDayTitle = '日间'
        this.DayStyle = ''
      }
      this.parameter()
    },
    mousePos: function (e) {
      // 通用获取X轴位置
      var pos = {}
      pos.x = e.changedTouches[0].pageX
      this.pos = pos
      return pos
    },
    timeDown: function (e) {
      // 章节进度条开始碰触
      this.transTime = 0
      this.mousePos(e)
      this.startX = this.pos.x
      this.locked = true
      this.endDistance = this.distance
    },
    timeMove: function (e) {
      if (!this.locked) return
      var pos = this.mousePos(e)
      var moveX = pos.x - this.startX
      if (this.distance < 0) {
        this.distance = 0
      } else if (this.distance > this.dragWidth) {
        this.distance = this.dragWidth
      } else {
        if ((this.distance <= 0 && moveX < 0) || (this.distance >= this.dragWidth && moveX > 0)) return
        this.distance = this.endDistance + moveX
      }
      this.countNum(this.distance)
      // this.mPagingBar = true
    },
    timeEnd: function (e) {
      this.transTime = 0.3
      this.locked = false
    },
    timeClick: function (e) {
      // 点击拖动到指定位置
      var x = e.offsetX
      var moveX = x - this.distance
      this.distance += moveX
      this.countNum(this.distance)
      // this.mPagingBar = true
    },
    countNum: function (num) {
      var len = this.chapter_count
      var scale = this.dragWidth / len
      this.nowNum = parseInt(num / scale)
      // 预防当前位置超过数组范围
      if (this.nowNum < 0) {
        this.nowNum = 0
      } else if (this.nowNum >= this.chapter_count - 1) {
        this.nowNum = this.chapter_count - 1
      }
      this.mPercent = num / this.dragWidth * 100
    },
    mPrev: function () {
      // 上一章
      this.nowNum = this.nowNum - 1
      this.mPaging = this.chapters[this.nowNum].chapter_id
    },
    mNext: function () {
      // 下一章
      this.nowNum = this.nowNum + 1
      this.mPaging = this.chapters[this.nowNum].chapter_id
    },
    PagingStart: function (e) {
      // 书籍翻页开始碰触
      this.mousePos(e)
      this.PagingStartX = this.pos.x
    },
    PagingEnd: function (e) {
      this.mousePos(e)
      this.PagingEndX = this.pos.x
      if (this.PagingStartX - this.PagingEndX > 50) {
        this.mPrev()
      } else if (this.PagingStartX - this.PagingEndX < -50) {
        this.mNext()
      }
    },
    mSideNav_ListBtn: function (val, index) {
      this.nowNum = index
      this.mPaging = val
    },
    getchaptercontent: function () {
      let sessionId = sessionStorage.getItem('sessionId')
      this.mChaptercontent = false
      this.$http.get('/wap/book/chapterInfo', {'params': {'book_id': this.$route.query.book_id, chapter_id: this.$route.query.chapter_id, 'session_id': sessionId}}).then(function (res) {
        if (res.data.data.free === 0) {
          if (res.data.data.is_buy === 0) {
            if (res.data.data.auto_pay === 0) {
              if (res.data.return_code === 2) {
                // 未登录
                alert('请先登录')
                this.$router.push('/my')
              } else {
                this.mBookName = res.data.data.title
                this.mChaptercontent = res.data.data.content.split('\n')
                this.mBuy = true
              }
            } else {
              this.mBookName = res.data.data.title
              this.mChaptercontent = res.data.data.content.split('\n')
            }
          } else {
            this.mBookName = res.data.data.title
            this.mChaptercontent = res.data.data.content.split('\n')
            this.mBuy = false
          }
        } else {
          // 免费章节不显示购买
          this.mBuy = false
          this.mBookName = res.data.data.title
          this.mChaptercontent = res.data.data.content.split('\n')
        }
      },
      function (res) {
        alert(res.status)
      })
    },
    getcatalogInfo: function () {
      let sessionId = sessionStorage.getItem('sessionId')
      this.$http.get('/wap/book/catalogInfo', {'params': {'book_id': this.$route.query.book_id, 'session_id': sessionId}}).then(function (res) {
        this.dataCatalog = res.data.data
        this.chapter_count = this.dataCatalog.chapters.length
        this.chapters = this.dataCatalog.chapters
        this.mBookState = this.dataCatalog.progress
        for (var i in this.chapters) {
          if (parseInt(this.chapters[i].chapter_id) === parseInt(this.$route.query.chapter_id)) {
            this.mBookPosition = i
            this.distance = i * (this.dragWidth / this.chapter_count)
            this.countNum(this.distance)
          }
        }
      },
      function (res) {
        alert(res.status)
      })
    },
    mBuyChoice: function () {
      // 购买弹窗 是否连续购买
      this.mChoice = !this.mChoice
    },
    mBuyBtn_Cancel: function () {
      // 购买弹窗 取消
      this.$router.replace('/book?book_id=' + this.$route.query.book_id)
    },
    mBuyBtn_Determine: function () {
      // 购买弹窗 确定
      this.mBuy = false
      this.is_pay = 1
      if (this.mChoice === true) {
        this.auto_pay = 1
      } else {
        this.auto_pay = 0
      }
      let sessionId = sessionStorage.getItem('sessionId')
      this.mChaptercontent = false
      this.$http.get('/wap/book/chapterInfo', {'params': {'book_id': this.$route.query.book_id, chapter_id: this.$route.query.chapter_id, 'session_id': sessionId, is_pay: this.is_pay, auto_pay: this.auto_pay}}).then(function (res) {
        if (res.data.return_code === 2) {
          // 未登录
          alert('请先登录')
          this.$router.push('/my')
        } else if (res.data.return_code === 3) {
          // 余额不足时跳转到充值页面
          alert('余额不足,请先充值')
          this.$router.push('/record/?type=recharge')
        } else if (res.data.return_code === 6) {
          // 请求超时
          alert('网络错误')
        } else if (res.data.return_code === 0) {
          // 余额充足时扣费完成弹窗消失
          this.mBuy = false
          this.mBookName = res.data.data.title
          this.mChaptercontent = res.data.data.content.split('\n')
          alert('购买完成')
        }
      },
      function (res) {
        alert(res.status)
      })
      // this.$router.replace('/book?book_id=' + this.$route.query.book_id)
      // 是否连续购买 this.mChoice
      // 余额不足时跳转到充值页面 this.$router.push('/record/?type=recharge')
      // 余额充足时弹窗消失 this.mBuy = false
    }
  },
  mounted: function () {
    this.mRatio = document.getElementById('main').offsetWidth / 750
    this.dragWidth = parseInt(this.mRatio * (6.466667 * 75))
  },
  filters: {
    mPercentFilter (value) {
      // 截取当前数据到小数点后两位
      let realVal = Number(value).toFixed(2)
      // num.toFixed(2)获取的是字符串
      return Number(realVal)
    }
  },
  created: function () {
    this.parameter()
    this.getchaptercontent()
    this.getcatalogInfo()
  },
  watch: {
    mPaging: function (val) {
      this.mAticleNav = false
      // this.mPagingBar = false
      this.$router.replace('/article?book_id=' + this.$route.query.book_id + '&chapter_id=' + val)
      this.getchaptercontent()
      this.parameter()
      this.distance = this.nowNum * (this.dragWidth / this.chapter_count)
      this.countNum(this.distance)
      for (var i in this.chapters) {
        if (parseInt(this.chapters[i].chapter_id) === parseInt(val)) {
          this.mBookPosition = i
        }
      }
    }
  }
}
</script>

<style scoped>
.mAticleNav{width:10rem;height:1.546667rem;background-color:#2c2a2b;margin-left:-5rem;border-top:1px solid #3e3b3d;position:fixed;bottom:0;left:50%;display:flex;justify-content:center;overflow:hidden;}
.mAticleNav div{width:3.333333rem;padding-top:0.266667rem;display:flex;flex-direction:column;overflow:hidden;cursor:pointer;}
.mAticleNav div:active{color:#42c079;}
.mAticleNav div:nth-child(1) span{background-image:url(./../assets/images/mArticleIcon_1.png);}
.mAticleNav div:nth-child(2) span{background-image:url(./../assets/images/mArticleIcon_2.png);}
.mAticleNav div:nth-child(3) span{background-image:url(./../assets/images/mArticleIcon_3.png);}
.mAticleNav div:nth-child(2) span.hov{background-image:url(./../assets/images/mArticleIcon_2_hov.png);}
.mAticleNav div:nth-child(3) span.hov{background-image:url(./../assets/images/mArticleIcon_3_hov.png);}
.mAticleNav span{width:0.613333rem;height:0.613333rem;margin:0 auto;background-repeat:no-repeat;background-position:0 0;background-size:0.613333rem 0.613333rem;display:block;overflow:hidden;}
.mAticleNav p{width:100%;line-height:0.533333rem;font-size:0.32rem;text-align:center;color:#8c8c8c;margin-top:0.066667rem;display:block;overflow:hidden;}
.mAticleNav p.hov{color:#56cd8a;}
.mAticleCode{width:10rem;text-align:center;line-height:1.3;font-size:0.64rem;padding:0 1rem;position:fixed;top:50%;left:50%;margin-left:-5rem;margin-top:-0.416rem;display:block;overflow:hidden;box-sizing:border-box;}
.mAticleCode a{color:#333;}
.mPaging{width:10rem;height:1.093333rem;background-color:#2c2a2b;margin-left:-5rem;position:fixed;bottom:1.546667rem;left:50%;display:flex;justify-content:center;align-items:center;overflow:hidden;}
.mPaging span{width:1.733333rem;line-height:1.093333rem;font-size:0.32rem;color:#8c8c8c;display:flex;justify-content:center;overflow:hidden;cursor:pointer;}
.mPagingInfo{width:9.2rem;background-color:#2c2a2b;border:1px solid #222021;border-radius:0.2rem;padding:0.133333rem 0.4rem;margin-left:-4.6rem;position:fixed;bottom:2.906667rem;left:50%;display:block;overflow:hidden;box-sizing:border-box;}
.mPagingInfo_L{width:7.333333rem;overflow:hidden;}
.mPagingInfo_L div{width:100%;line-height:0.533333rem;font-size:0.32rem;color:#fff;overflow:hidden;}
.mPagingInfo_Icon{width:0.426667rem;height:0.426667rem;position:absolute;top:50%;margin-top:-0.213334rem;right:0.4rem;}
.mASetup{width:10rem;padding:0 0.4rem 0.4rem;background-color:#2c2a2b;margin-left:-5rem;position:fixed;bottom:1.546667rem;left:50%;display:flex;flex-direction:column;overflow:hidden;box-sizing:border-box;}
.mASetup_Bright{margin-top:0.506667rem;display:flex;justify-content:space-between;align-items:center;overflow:hidden;}
.mASetup_BrightL{display:flex;align-items:center;overflow:hidden;}
.mASetup_BrightR{height:0.426667rem;line-height:0.426667rem;font-size:0.266667rem;color:#fff;padding:0 0.133333rem;border:1px solid #474747;border-radius:0.1rem;display:flex;overflow:hidden;cursor:pointer;}
.mASetup_BrightL_Icon_1{width:0.453333rem;height:0.453333rem;background:url(./../assets/images/mArticleIcon_5.png) no-repeat 0 0;background-size:0.453333rem 0.453333rem;margin-right:0.4rem;}
.mASetup_BrightL_Icon_2{width:0.586667rem;height:0.586667rem;background:url(./../assets/images/mArticleIcon_5.png) no-repeat 0 0;background-size:0.586667rem 0.586667rem;}
.mASetup_Font{margin-top:0.506667rem;display:flex;/*justify-content:space-between;*/flex-direction:column;align-items:center;overflow:hidden;}
.mASetup_FontL{display:flex;overflow:hidden;}
.mASetup_FontR{width:0.773333rem;height:0.773333rem;line-height:0.773333rem;border:1px solid #474747;border-radius:50%;display:flex;overflow:hidden;cursor:pointer;}
.mASetup_FontL div,.mASetup_FontL span{width:2.933333rem;height:0.853333rem;line-height:0.853333rem;font-size:0.373333rem;color:#fff;border:1px solid #474747;border-radius:0.1rem;display:flex;justify-content:center;overflow:hidden;box-sizing:border-box;cursor:pointer;}
.mASetup_FontL span{width:1.866667rem;font-size:0.32rem;border:0 none;cursor:default;}
.mASetup_Style{margin-top:0.533333rem;display:flex;justify-content:space-between;overflow:hidden;}
.mASetup_Style div{width:0.8rem;height:0.8rem;background-color:#eddec1;border-radius:50%;display:flex;overflow:hidden;box-sizing:border-box;cursor:pointer;}
.mASetup_Style div:nth-child(2){background-color:#dfdeda;}
.mASetup_Style div:nth-child(3){background-color:#f0e5dd;}
.mASetup_Style div:nth-child(4){background-color:#cedfd4;}
.mASetup_Style div:nth-child(5){background-color:#c7d8e1;}
.mASetup_Style div:nth-child(6){background-color:#000a15;}
.mASetup_Style div.hov{border:2px solid #56cd8a;}
.mASetup_Type{margin-top:0.533333rem;display:flex;justify-content:space-between;overflow:hidden;}
.mASetup_Type div{width:1.6rem;height:0.693333rem;line-height:0.693333rem;font-size:0.32rem;color:#fff;border:1px solid #474747;border-radius:0.1rem;display:flex;justify-content:center;overflow:hidden;box-sizing:border-box;cursor:pointer;}
.mASetup_Type div.hov{border:1px solid #56cd8a;color:#56cd8a;}
.mSideNav{left:50%;margin-left:-5rem;opacity:0;-webkit-transform:translate(-14rem,0);transform:translate(-14rem,0);}
.mSideNav_hov{-webkit-animation:mSideNavR 0.8s ease-in-out forwards;animation:mSideNavR 0.8s ease-in-out forwards;}
.mAticle_w{width:100%;display:flex;flex-direction:column;overflow:hidden;}
.mAticle{font-size:0.426667rem;line-height:1.3;padding:0.4rem;display:flex;flex-direction:column;overflow:hidden;}
.mAticle p{text-indent:2em;padding:0.1rem 0;display:flex;overflow:hidden;}
.dragbox,.mASetup_BrightL_Bar{width:6.466667rem;height:1.093333rem;position:relative;display:block;align-items:center;}
.progress{width:100%;height:0.066667rem;background-color:#454545;position:absolute;top:50%;left:0;margin-top:-0.033334rem;display:block;cursor:pointer;}
.progressbar{width:0;height:0.066667rem;background-color:#56cd8a;font-size:0;line-height:0;}
.bardrag{width:0.32rem;height:0.32rem;background-color:#454545;border:2px solid #56cd8a;border-radius:50%;position:absolute;top:50%;left:0;margin-top:-0.16rem;margin-left:-0.16rem;display:block;overflow:hidden;box-sizing:border-box;}
.mASetup_BrightL_Bar{width:6.066667rem;margin-right:0.4rem;}
.mBuy{width:7.2rem;position:fixed;top:50%;left:50%;background-color:#fff;border-radius:0.266667rem;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);overflow:hidden;z-index:3;}
.mBuyBt,.mBuyTi,.mBuyChoice,.mBuyBtn_w{width:100%;font-size:0.426667rem;line-height:0.666667rem;text-align:center;overflow:hidden;box-sizing:border-box;}
.mBuyBt{color:#42c079;margin-top:0.533333rem;}
.mBuyTi{color:#2e3230;margin-top:0.133333rem;padding:0 0.4rem;}
.mBuyChoice{color:#2e3230;font-size:0.32rem;line-height:0.586667rem;margin-top:0.133333rem;display:flex;justify-content:center;align-items:center;}
.mBuyChoice span.hov{background:url(./../assets/images/mChoice_hov.png) no-repeat 0 0;background-size:cover;}
.mBuyChoice span{width:0.32rem;height:0.32rem;background:url(./../assets/images/mChoice.png) no-repeat 0 0;background-size:cover;margin-right:0.2rem;display:flex;}
.mBuyBtn_w{border-top:2px solid #eee;margin-top:0.4rem;display:flex;}
.mBuyBtn_w div{width:50%;line-height:1.2rem;display:flex;justify-content:center;overflow:hidden;box-sizing:border-box;cursor:pointer;}
.mBuyBtn_a{border-right:2px solid #eee;color:#707070;}
.mBuyBtn_b{background-color:#42c079;color:#fff;}
@-webkit-keyframes mSideNavR{
0%{opacity:0;-webkit-transform:translate(-14rem,0);}
100%{opacity:1;-webkit-transform:translate(0,0);}
}
@keyframes mSideNavR{
0%{opacity:0;transform:translate(-14rem,0);}
100%{opacity:1;transform:translate(0,0);}
}
</style>
