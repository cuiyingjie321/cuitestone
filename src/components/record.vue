<template>
  <div class="main">
    <!-- 充值记录 -->
    <ul v-if="RecordType == 'recordrecharge'" class="mRecord">
      <li v-for="list in Record" :key="list.id">
        <div class="mRecordT">
          <div>{{ list.pay_name }}</div>
          <div>{{ list.petal }}</div>
        </div>
        <div class="mRecordB">
          <div>{{ list.pay_time }}</div>
          <div>{{ list.recharge_account }}</div>
        </div>
      </li>
    </ul>
    <!-- 消费记录 -->
    <ul v-if="RecordType == 'recordconsume'" class="mRecord">
      <li v-for="list in Record" :key="list.id">
        <div class="mRecordT">
          <div>{{ list.book_name }}</div>
          <div>{{ list.consume_account }}</div>
        </div>
        <div class="mRecordB">
          <div>{{ list.chapter_title }}</div>
          <div>{{ list.consume_time }}</div>
        </div>
      </li>
    </ul>
    <!-- 绑定手机号 -->
    <div v-if="RecordType == 'binding'" class="mBinding_w">
      <div class="mBinding">
        <div class="mBindingL">手机号码</div>
        <div class="mBindingC"><input type="text" placeholder="输入您的手机号" maxlength="11" v-model="mPhone" @focus="mPhoneFocus"/></div>
      </div>
      <div class="mBinding">
        <div class="mBindingL">短信验证码</div>
        <div class="mBindingC"><input type="text" placeholder="请输入短信验证码" maxlength="4" v-model="mCode" @focus="mCodeFocus"/></div>
        <div :class="['mBindingR', { mBindingR_hov: mPhoneCould, mBindingR_hova: mCodePromptCould }]" @click="mCodeBtn">{{ mCodePrompt }}</div>
      </div>
    </div>
    <input v-if="RecordType == 'binding'" type="submit" class="mBinding_Btn" @click="mBindingBtn" value="绑定手机"/>
    <!-- 设置 -->
    <div v-if="RecordType == 'setup'" class="mBinding_w mSetup_w">
      <div class="mSetup mSetupa" @click="mClear">
        <div class="mSetupL">清除缓存</div>
        <div class="mSetupR">{{ mCache }}</div>
      </div>
      <router-link to="评分" class="mSetup">
        <span class="mSetupL">给华网文学评分</span>
        <span class="mSetupRIcon"></span>
      </router-link>
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
    <div v-if="RecordType == 'recharge'" class="mRecharge_w">
      <div class="mRecharge_Balance">当前余额： {{ mRecharge_Balance }}.00 花瓣</div>
      <div class="mRecharge_Opt_w">请选择充值金额</div>
      <ul class="mRecharge_Opt">
        <li v-for="(list , index) in Recharge" :key="list.id" :class="{ hov:mRechargeIndex == index}" @click="mRechargeBtn(index)"><span>{{ list.money }}元</span><p>{{ list.leaves }}花瓣</p></li>
      </ul>
      <div class="mRecharge_Money">支付金额：<span>{{ mRecharge_Money }}元</span></div>
      <div class="mRecharge_Submit" @click="mRecharge_Submit"><img src="./../assets/images/mMyIcon_9.png" alt="立即支付"/>立即支付</div>
      <div class="mRecharge_Prompt">温馨提示：<br/>1. 花瓣兑换规则：1元＝100花瓣<br/>2. 充值阅读权仅限在书城使用</div>
    </div>
    <div v-if="RecordType == 'font'" class="mBinding_w mSetup_w">
      <div v-for="(list , index) in Font" :key="list.id" :class="['mFont', { mFont_hov: mFontIndex == index}]" @click="mFontBtn(index)">
        <div class="mSetupL">{{ list.title }}</div>
        <div class="mSetupRIcon_1"></div>
      </div>
    </div>
    <!-- <div v-if="code !== 0" class="mLoadArticle"><img src="./../assets/images/mLoad.gif" alt="加载中..." /></div> -->
  </div>
</template>

<script>
// RecordType recordrecharge 充值记录,recordconsume 消费记录,mName 标题,mPhone 电话号,mPhoneCould 电话号是否通过验证,mCode 验证码,mCodeCould 验证码是否通过验证,mCodeCorrect 正确验证码,mCodePrompt 验证码提示,mCodePromptCould 验证码提示class显示,count 倒计时数字,mRecharge_Balance 当前余额,Record 消费记录充值记录数据,Recharge 充值列表,mRecharge_Money 支付金额,mFontIndex 字体选择索引
export default {
  data () {
    return {
      RecordType: this.$route.query.type,
      mName: '',
      mPhone: '',
      mPhoneCould: '',
      mCode: '',
      mCodeCould: '',
      mCodeCorrect: '',
      mCodePrompt: '发送短信',
      mCodePromptCould: '',
      count: '',
      mCache: '657M',
      mVersion: '1.4.0(4)',
      mRecharge_Balance: '100',
      mRechargeIndex: '0',
      mRecharge_Money: '6',
      mFontIndex: '0',
      Record: [],
      code: false,
      Recharge: [{
        money: '6',
        leaves: '600'
      }, {
        money: '12',
        leaves: '1200'
      }, {
        money: '30',
        leaves: '3000'
      }, {
        money: '50',
        leaves: '5000'
      }, {
        money: '98',
        leaves: '9800'
      }, {
        money: '198',
        leaves: '19800'
      }],
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
      this.$emit('mParameter', {'mType': '3', 'mName': this.mName, 'mStyle': 'true'})
    },
    mCodeBtn: function () {
      // 发送请求 接受验证码
      if (this.mPhoneCould && !this.mCodePromptCould) {
        // 正确验证码
        this.mCodeCorrect = 'mmmm'
        // 验证码倒计时
        const TIME_COUNT = 60
        this.mCodeCould = ''
        this.mCodePromptCould = 'true'
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
              this.mCodePromptCould = ''
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
      if (!this.mPhoneCould) {
        this.mPhone = '请输入正确手机号'
      } else if (!this.mCodeCould) {
        this.mCode = '请输入正确验证码'
      } else if (this.mPhoneCould && this.mCodeCould) {
        // 验证通过 开始提交
      }
    },
    mPhoneFocus: function () {
      // 手机焦点获取
      if (this.mPhone === '请输入正确手机号') {
        this.mPhone = ''
      }
    },
    mCodeFocus: function () {
      // 验证码焦点获取
      if (this.mCode === '请输入正确验证码') {
        this.mCode = ''
      }
    },
    mClear: function () {
      // 清除缓存
    },
    mExitLogon: function () {
      // 退出登录
    },
    mRechargeBtn: function (index) {
      // 充值列表选择
      this.mRechargeIndex = index
      this.mRecharge_Money = this.Recharge[index].money
    },
    mRecharge_Submit: function (index) {
      // 充值提交
      console.log(this.mRecharge_Money)
    },
    mFontBtn: function (index) {
      // 字体选择
      this.mFontIndex = index
    },
    getrechargelog: function () {
      // 充值记录
      this.$http.get('wap/user/rechargelog', {'params': {'session_id': '888888', 'offset': '0'}}).then(function (res) {
        this.Record = res.data.data.records
        this.code = parseInt(res.data.return_code)
      },
      function (res) {
        alert(res.status)
      })
    },
    getconsumelog: function () {
      // 消费记录
      this.$http.get('wap/user/consumelog', {'params': {'session_id': '888888', 'offset': '2'}}).then(function (res) {
        this.Record = res.data.data.records
        this.code = parseInt(res.data.return_code)
      },
      function (res) {
        alert(res.status)
      })
    }
  },
  created: function () {
    this.parameter()
    if (this.RecordType === 'recordrecharge') {
      this.getrechargelog()
    } else if (this.RecordType === 'recordconsume') {
      this.getconsumelog()
    } else if (this.RecordType === 'binding') {
      this.mName = '绑定手机号'
    } else if (this.RecordType === 'setup') {
      this.mName = '设置'
    } else if (this.RecordType === 'recharge') {
      this.mName = '充值中心'
    } else if (this.RecordType === 'font') {
      this.mName = '字体设置'
    }
  },
  watch: {
    // 手机号码验证
    mPhone: function (val) {
      var mobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
      if (val.length === 11) {
        if (!mobile.test(val)) {
          this.mPhone = '请输入正确手机号'
          this.mPhoneCould = ''
        } else {
          this.mPhoneCould = 'true'
        }
      } else {
        this.mPhoneCould = ''
      }
    },
    // 码验证
    mCode: function (val) {
      if (val.length === 4) {
        if (val === this.mCodeCorrect) {
          this.mCodeCould = 'true'
        } else {
          this.mCode = '请输入正确验证码'
        }
      } else {
        this.mCodeCould = ''
      }
    }
  }
}
</script>

<style scoped>
.mRecord{width:10rem;background-color:#fff;padding:0 0.4rem;display:flex;flex-direction:column;overflow:hidden;box-sizing:border-box;}
.mRecord li{width:100%;font-size:0.426667rem;line-height:1.36rem;color:#242424;border-bottom:1px solid #f1f1f1;padding:0.2rem 0;display:flex;flex-direction:column;overflow:hidden;box-sizing:border-box;}
.mRecord li:last-child{border-bottom:0 none;}
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
