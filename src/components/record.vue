<template>
  <div :class="['main', { 'mFixed': mFixed}]">
    <scroller v-if="RecordType == 'recordrecharge' || RecordType == 'recordconsume'" :on-infinite="infinite">
      <div class="mSeize"></div>
      <ul v-for="mlist in Data" :key="mlist.id" class="mRecord">
        <li v-for="list in mlist.records" :key="list.id">
          <!-- 充值记录 -->
          <div v-if="RecordType == 'recordrecharge'" class="mRecordT">
            <div>{{ list.pay_name }}</div>
            <div>{{ list.petal }}</div>
          </div>
          <div v-if="RecordType == 'recordrecharge'" class="mRecordB">
            <div>{{ list.pay_time }}</div>
            <div>{{ list.recharge_account }}</div>
          </div>
          <!-- 消费记录 -->
          <div v-if="RecordType == 'recordconsume'" class="mRecordT">
            <div>{{ list.book_name }}</div>
            <div>{{ list.consume_account }}</div>
          </div>
          <div v-if="RecordType == 'recordconsume'" class="mRecordB">
            <div>{{ list.chapter_title }}</div>
            <div>{{ list.consume_time }}</div>
          </div>
        </li>
      </ul>
    </scroller>
    <!-- 绑定手机号 -->
    <div v-if="RecordType == 'binding'" class="mBinding_w">
      <div class="mBinding">
        <div class="mBindingL">手机号码</div>
        <div class="mBindingC"><input type="text" placeholder="输入您的手机号" maxlength="11" v-model="mPhone" @focus="mPhoneFocus"/></div>
      </div>
      <div class="mBinding">
        <div class="mBindingL">短信验证码</div>
        <div class="mBindingC"><input type="text" placeholder="请输入短信验证码" maxlength="6" v-model="mCode" @focus="mCodeFocus"/></div>
        <div :class="['mBindingR', { mBindingR_hov: mPhoneCould, mBindingR_hova: mCodePromptCould }]" @click="mCodeBtn">{{ mCodePrompt }}</div>
      </div>
    </div>
    <input v-if="RecordType == 'binding'" type="submit" class="mBinding_Btn" @click="mBindingBtn" value="绑定手机"/>
    <!-- 设置 -->
    <div v-if="RecordType == 'setup'" class="mBinding_w mSetup_w">
      <div class="mSetup">
        <div class="mSetupL">当前版本</div>
        <div class="mSetupR">{{ mVersion }}</div>
      </div>
      <router-link to="/about" class="mSetup">
        <span class="mSetupL">关于华网文学</span>
        <span class="mSetupRIcon"></span>
      </router-link>
    </div>
    <input v-if="RecordType == 'setup'" type="submit" class="mExitLogon" @click="mExitLogon" value="退出登录"/>
    <!-- 充值中心 -->
    <div v-if="RecordType == 'recharge' && ReturnCode === 0" class="mRecharge_w">
      <div class="mRecharge_Balance">当前余额： {{ Data.balance }}</div>
      <div class="mRecharge_Opt_w">请选择充值金额</div>
      <ul class="mRecharge_Opt">
        <li v-for="(list , index) in Data.item" :key="list.id" :class="{ hov:mRechargeIndex == index}" @click="mRechargeBtn(index)"><span>{{ list.sum }}</span><p>{{ list.petals }}</p></li>
      </ul>
      <div class="mRecharge_Money">支付金额：<span>{{ mRecharge_Money }}</span></div>
      <div v-if="!this.mRechargeLoad" class="mLoad"><img src="./../assets/images/mLoad.gif" alt="加载中..." /></div>
      <div class="mRecharge_Submit" @click="mRecharge_Submit"><img src="./../assets/images/mMyIcon_9.png" alt="立即支付"/>立即支付</div>
      <div class="mRecharge_Prompt">温馨提示：<br/>1. 花瓣兑换规则：1元＝100花瓣<br/>2. 充值阅读权仅限在书城使用</div>
    </div>
    <div v-if="RecordType == 'font'" class="mBinding_w mSetup_w">
      <div v-for="(list , index) in Font" :key="list.id" :class="['mFont', { mFont_hov: mFontIndex == index}]" @click="mFontBtn(index)">
        <div class="mSetupL">{{ list.title }}</div>
        <div class="mSetupRIcon_1"></div>
      </div>
    </div>
    <div v-if="(ReturnCode !== 0 && !mFixed) || !mobilerequest" class="mLoad"><img src="./../assets/images/mLoad.gif" alt="加载中..." /></div>
  </div>
</template>

<script>
// RecordType recordrecharge 充值记录,recordconsume 消费记录,mName 标题,mPhone 电话号,mPhoneCould 电话号是否通过验证,mCode 验证码,mCodePrompt 验证码提示,mCodePromptCould 验证码提示class显示,count 倒计时数字,Data 数据列表,Recharge 充值列表,mRecharge_Money 支付金额,mFontIndex 字体选择索引
export default {
  data () {
    return {
      RecordType: this.$route.query.type,
      mName: '',
      mPhone: '',
      mPhoneCould: false,
      mCode: '',
      mCodePrompt: '发送短信',
      mCodePromptCould: false,
      mobilerequest: true,
      mobilecode: 0,
      count: '',
      config: '',
      mVersion: '1.0.0',
      mRechargeIndex: 0,
      mRecharge_Money: 0,
      mRecharge_Moneys: 0,
      mFontIndex: 0,
      Data: [],
      ReturnCode: false,
      mNum: 0,
      mExercise: true,
      mFixed: false,
      mRechargeLoad: true,
      Font: [{
        title: '默认'
      }, {
        title: '繁宋体'
      }, {
        title: '卡通'
      }, {
        title: '羿创旗黑'
      }]
    }
  },
  methods: {
    parameter: function () {
      if (this.RecordType === 'recordrecharge') {
        this.mName = '充值记录'
      } else if (this.RecordType === 'recordconsume') {
        this.mName = '消费记录'
      } else if (this.RecordType === 'binding') {
        this.mName = '绑定手机号'
      } else if (this.RecordType === 'setup') {
        this.mName = '设置'
      } else if (this.RecordType === 'recharge') {
        this.mName = '充值中心'
      } else if (this.RecordType === 'font') {
        this.mName = '字体设置'
      }
      if (this.RecordType === 'recordrecharge' || this.RecordType === 'recordconsume') {
        this.$emit('mParameter', {'mType': '3', 'mName': this.mName, 'mStyle': 'true', 'mHeaderFixed': true})
        this.mFixed = true
      } else {
        this.$emit('mParameter', {'mType': '3', 'mName': this.mName, 'mStyle': 'true'})
      }
    },
    mCodeBtn: function () {
      // 发送请求 接受验证码
      if (this.mPhoneCould && !this.mCodePromptCould) {
        // 发送验证码
        this.getsmsCode()
        // 验证码倒计时
        const TIME_COUNT = 60
        this.mCodePromptCould = true
        if (!this.timer) {
          this.count = TIME_COUNT
          this.mCodePrompt = this.count + 's重新发送'
          this.show = false
          this.timer = setInterval(() => {
            if (this.count > 1 && this.count <= TIME_COUNT) {
              this.count--
              this.mCodePrompt = this.count + 's重新发送'
            } else {
              this.mCodePrompt = '发送短信'
              this.mCodePromptCould = false
              this.show = true
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
        }
      } else if (!this.mCodePromptCould) {
        this.mPhone = '请输入正确手机号'
      }
    },
    mBindingBtn: function () {
      // 提交绑定号码
      var mCodeNum = /^\d{6}$/
      if (!this.mPhoneCould) {
        this.mPhone = '请输入正确手机号'
      } else if (!mCodeNum.test(this.mCode)) {
        this.mCode = '请输入正确验证码'
      } else if (this.mPhoneCould && this.mCode && this.mobilerequest) {
        this.mobilerequest = false
        this.getmobile(this.mCode)
      }
    },
    mPhoneFocus: function () {
      // 手机焦点获取
      var mobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
      if (!mobile.test(this.mPhone)) {
        this.mPhone = ''
      }
    },
    mCodeFocus: function () {
      // 验证码焦点获取
      var mCodeNum = /^\d{6}$/
      if (!mCodeNum.test(this.mCode)) {
        this.mCode = ''
      }
    },
    mExitLogon: function () {
      // 退出登录
    },
    mRechargeBtn: function (index) {
      // 充值列表选择
      this.mRechargeIndex = index
      this.mRecharge_Money = this.Data.item[index].sum
    },
    mRecharge_Submit: function (index) {
      if (this.mRechargeLoad) {
        this.mRechargeLoad = false
        let sessionId = sessionStorage.getItem('sessionId')
        this.mRecharge_Moneys = parseInt(this.mRecharge_Money)
        this.$http.post('/wap/user/weixin', {'sessionId': sessionId, 'money': this.mRecharge_Moneys}).then(function (res) {
          this.orderData = res.data.data
          this.wx.chooseWXPay({
            appId: this.orderData.appId,
            timestamp: this.orderData.timeStamp,
            nonceStr: this.orderData.nonceStr,
            package: this.orderData.package,
            signType: this.orderData.signType,
            paySign: this.orderData.paySign,
            success: function (res) {
              // 支付成功后的回调函数
              if (res.errMsg === 'chooseWXPay:ok') {
                alert('支付成功')
                window.location.href = 'http://wenxue.china.com/#/my'
              }
            },
            cancel: function (res) {
              alert('支付取消')
              window.location.href = 'http://wenxue.china.com/#/my'
            },
            fail: function (res) {
              alert('网络错误')
              window.location.href = 'http://wenxue.china.com/#/my'
            }
          })
        },
        function (res) {
          alert(res.status)
        })
        // 充值提交
        // console.log(this.mRecharge_Money)
      }
    },
    mFontBtn: function (index) {
      // 字体选择
      this.mFontIndex = index
    },
    NotLogged: function () {
      alert('请先登录')
      this.$router.push('/my')
    },
    More: function (val) {
      if (val === -1) {
        this.mNum = -1
      } else {
        this.mNum = this.mNum + val
        this.mExercise = true
      }
    },
    getrechargelog: function () {
      // 充值记录
      let sessionId = sessionStorage.getItem('sessionId')
      this.$http.get('/wap/user/rechargelog', {'params': {'session_id': sessionId, 'offset': this.mNum}}).then(function (res) {
        this.Data.push(res.data.data)
        this.More(res.data.data.offset)
        this.ReturnCode = parseInt(res.data.return_code)
      },
      function (res) {
        alert(res.status)
      })
    },
    getconsumelog: function () {
      // 消费记录
      let sessionId = sessionStorage.getItem('sessionId')
      this.$http.get('/wap/user/consumelog', {'params': {'session_id': sessionId, 'offset': this.mNum}}).then(function (res) {
        this.Data.push(res.data.data)
        this.More(res.data.data.offset)
        this.ReturnCode = parseInt(res.data.return_code)
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
            this.ReturnCode = false
            if (this.RecordType === 'recordrecharge') {
              this.getrechargelog()
            } else if (this.RecordType === 'recordconsume') {
              this.getconsumelog()
            }
          }
          done()
        }, 1500)
      }
    },
    getrechargeAccount: function () {
      // 充值中心
      let sessionId = sessionStorage.getItem('sessionId')
      this.$http.get('/wap/user/rechargeAccount', {'params': {'session_id': sessionId}}).then(function (res) {
        this.Data = res.data.data
        this.mRecharge_Money = this.Data.item[0].sum
        this.ReturnCode = parseInt(res.data.return_code)
      },
      function (res) {
        alert(res.status)
      })
    },
    getsmsCode: function () {
      // 手机获取验证码
      let sessionId = sessionStorage.getItem('sessionId')
      this.$http.get('/wap/user/smsCode', {'params': {'session_id': sessionId, 'phone': this.mPhone}}).then(function (res) {
      },
      function (res) {
        alert(res.status)
      })
    },
    getmobile: function (val) {
      // 效验验证码
      let sessionId = sessionStorage.getItem('sessionId')
      this.$http.get('/wap/user/mobile', {'params': {'session_id': sessionId, 'phone': this.mPhone, 'sms_pwd': val}}).then(function (res) {
        this.mobilerequest = true
        this.mobilecode = parseInt(res.data.return_code)
        if (this.mobilecode > 0) {
          alert(res.data.return_msg)
          this.mCode = ''
        } else {
          alert('绑定成功')
          this.$router.push('/my')
        }
      },
      function (res) {
        alert(res.status)
      })
    },
    wxconfig: function () {
      this.wx.config({
        debug: false,
        appId: this.config.app_id,
        timestamp: this.config.timestamp,
        nonceStr: this.config.nonce_str,
        signature: this.config.signature,
        jsApiList: ['chooseWXPay']
      })
      this.wx.error(function (res) {
        alert('网络错误')
      })
    },
    getconfig: function () {
      // sdk授权
      let url = window.location.href
      this.$http.get('/wap/user/wxSign', {'params': {'current_url': url}}).then(function (res) {
        this.configData = res.data.data
        this.config = this.configData.data
        this.wxconfig()
      },
      function (res) {
        alert(res.status)
      })
    },
    redirecturl: function () {
      alert('111')
      this.mRechargeLoad = true
      this.$router.push('/my')
    }
  },
  created: function () {
    this.parameter()
    this.getconfig()
    if (this.RecordType === 'recharge') {
      // 充值中心
      this.getrechargeAccount()
    }
    if (this.RecordType === 'binding' || this.RecordType === 'setup' || this.RecordType === 'font') {
      // 进来时不需要加载动画
      this.ReturnCode = parseInt(0)
    }
  },
  watch: {
    // 手机号码验证
    mPhone: function (val) {
      var mobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
      if (val.length === 11) {
        if (!mobile.test(val)) {
          this.mPhone = '请输入正确手机号'
          this.mPhoneCould = false
        } else {
          this.mPhoneCould = true
        }
      } else {
        this.mPhoneCould = false
      }
    },
    // 返回状态码
    ReturnCode: function (val) {
      if (val === 2) {
        this.NotLogged()
      }
    },
    // 返回状态码
    mRechargeLoads: function () {
      this.mRechargeLoad = true
    }
  }
}
</script>

<style scoped>
.mRecord{width:10rem;background-color:#fff;padding:0 0.4rem;display:flex;flex-direction:column;overflow:hidden;box-sizing:border-box;}
.mRecord li{width:100%;font-size:0.426667rem;line-height:1.36rem;color:#242424;border-bottom:1px solid #f1f1f1;padding:0.2rem 0;display:flex;flex-direction:column;overflow:hidden;box-sizing:border-box;}
/*.mRecord li:last-child{border-bottom:0 none;}*/
.mRecordT,.mRecordB{width:100%;display:flex;justify-content:space-between;overflow:hidden;}
.mRecordT{font-size:0.426667rem;line-height:0.64rem;color:#242424;}
.mRecordB{font-size:0.32rem;line-height:0.426667rem;color:#adadad;}
.mBinding_w{width:10rem;margin-top:0.4rem;padding:0 0.4rem;margin-left:auto;margin-right:auto;background-color:#fff;display:flex;flex-direction:column;overflow:hidden;box-sizing:border-box;}
.mBinding,.mSetup,.mFont{width:100%;height:1.36rem;line-height:1.36rem;color:#242424;border-bottom:1px solid #f1f1f1;position:relative;display:flex;overflow:hidden;box-sizing:border-box;}
.mBindingL{width:2.4rem;font-size:0.373333rem;display:flex;overflow:hidden;}
.mBindingC{width:4.533333rem;display:flex;overflow:hidden;}
.mBindingC input{width:100%;height:1.36rem;line-height:100%;font-size:0.373333rem;color:#242424;border:0 none;display:block;overflow:hidden;box-sizing:border-box;}
.mBindingC input::-webkit-input-placeholder{color:#d8d8d8;}
.mBindingR{width:auto;height:1.36rem;font-size:0.373333rem;color:#d8d8d8;white-space:nowrap;position:absolute;top:0;right:0;display:flex;overflow:hidden;cursor:pointer;}
.mBindingR_hov{color:#42c079;}
.mBindingR_hova{color:#d8d8d8;}
.mBinding_Btn{width:9.2rem;height:1.2rem;line-height:1.2rem;font-size:0.48rem;color:#fff;text-align:center;border:0 none;border-radius:0.1rem;margin:0.8rem auto 0;background-color:#42c079;display:block;overflow:hidden;cursor:pointer;}
.mSetupL{font-size:0.426667rem;line-height:1.36rem;color:#4a4a4a;}
.mSetupR{font-size:0.32rem;line-height:1.36rem;color:#bababa;}
.mSetupRIcon{width:0.186667rem;height:0.346667rem;position:absolute;top:50%;right:0;margin-top:-0.173334rem;background:url(./../assets/images/mMyIcon_8.png) no-repeat 0 0;background-size:cover;display:block;overflow:hidden;}
.mBinding:last-child,.mSetup:last-child,.mFont:last-child{border-bottom:0 none;}
.mSetupa{cursor:pointer;}
.mSetup_w{margin-top:0;}
.mExitLogon{width:10rem;height:1.36rem;line-height:1.36rem;font-size:0.426667rem;color:#42c079;text-align:center;border:0 none;margin:0.4rem auto 0;background-color:#fff;display:block;overflow:hidden;cursor:pointer;}
.mSetup,.mFont{justify-content:space-between;}
.mFont{cursor:pointer;}
.mRecharge_w{width:10rem;margin:0 auto;padding-top:0.666667rem;display:flex;flex-direction:column;overflow:hidden;}
.mRecharge_Balance{width:100%;line-height:0.613333rem;font-size:0.373333rem;color:#a7a7a7;padding:0 0.4rem;display:flex;overflow:hidden;box-sizing:border-box;}
.mRecharge_Opt_w{width:100%;line-height:1rem;font-size:0.426667rem;color:#242424;padding:0 0.4rem;display:flex;overflow:hidden;box-sizing:border-box;}
.mRecharge_Opt{width:100%;padding:0 0.266667rem;display:flex;justify-content:space-around;flex-wrap:wrap;overflow:hidden;box-sizing:border-box;}
.mRecharge_Opt li{width:2.88rem;line-height:0.533333rem;margin-top:0.266667rem;padding-top:0.4rem;padding-bottom:0.333333rem;background-color:#fff;border:1px solid #e1e1e1;border-radius:0.1rem;display:flex;flex-direction:column;overflow:hidden;box-sizing:border-box;cursor:pointer;}
.mRecharge_Opt span,.mRecharge_Opt p{width:100%;display:flex;justify-content:center;overflow:hidden;}
.mRecharge_Opt span{font-size:0.426667rem;color:#242424;}
.mRecharge_Opt p{font-size:0.373333rem;color:#a7a7a7;}
.mRecharge_Opt li.hov{border-color:#42c079;}
.mRecharge_Money{width:100%;line-height:0.693333rem;font-size:0.373333rem;color:#a7a7a7;margin-top:0.933333rem;padding:0 0.4rem;display:flex;overflow:hidden;box-sizing:border-box;}
.mRecharge_Money span{font-size:0.48rem;color:#ff384e;}
.mRecharge_Submit{width:9.2rem;height:1.2rem;line-height:1.2rem;font-size:0.426667rem;color:#fff;text-align:center;background-color:#42c079;border-radius:0.1rem;margin:0.4rem auto 0;display:block;overflow:hidden;cursor:pointer;box-sizing:border-box;}
.mRecharge_Submit img{width:0.533333rem;height:0.533333rem;display:inline-block;margin-right:0.4rem;}
.mRecharge_Prompt{width:100%;line-height:0.533333rem;font-size:0.373333rem;color:#a7a7a7;margin-top:0.733333rem;padding:0 0.4rem 0.4rem;display:flex;overflow:hidden;box-sizing:border-box;}
.mSetupRIcon_1{width:0.533333rem;height:0.533333rem;background:url(./../assets/images/mMyIcon_10.png) no-repeat 0 0;background-size:cover;margin-top:-0.266667rem;position:absolute;top:50%;right:0;display:none;overflow:hidden;}
.mFont_hov .mSetupRIcon_1{display:block;}
</style>
