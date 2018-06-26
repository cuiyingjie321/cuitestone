<template>
  <div class="main">
    <section v-if="!mUser.is_login" class="mMyInfo_w">
      <div class="mLoad"><img src="./../assets/images/mLoad.gif" alt="加载中..." /></div>
    </section>
    <section v-if="mUser.is_login === 1" class="mMyInfo_w">
      <div class="mMyInfoT">
        <router-link to="/reviseportrait" class="mMyInfoT_Tx"><img :src="mUser.head_image" :alt="mUser.nickname"/></router-link>
        <div :class="['mMyInfoTL', { 'mMyInfoTL_No': !mUser.phone }]">
          <div class="mMyInfoTLName">{{ mUser.nickname }}</div>
          <div class="mMyInfoTLPhone">{{ mUser.phone }}</div>
        </div>
        <router-link to="/record?type=recharge" class="mMyRecharge">充值</router-link>
      </div>
      <div class="mMyInfoB_w">
        <div class="mMyInfoB"><span>{{ mUser.book_count }}</span><p>我的书籍</p></div>
        <div class="mMyInfoB"><span>{{ mUser.balance }}</span><p>花瓣</p></div>
      </div>
    </section>
    <section v-else-if="mUser.is_login === 0" class="mMyInfoa_w">
      <router-link to="/login"><img src="./../assets/images/mMyIcon_7.png" alt="通过微信登录"/>通过微信登录</router-link>
    </section>
    <section class="mInterface_w">
      <router-link to="/record?type=binding" v-if="!mUser.phone"><i><img src="./../assets/images/mMyIcon_1.png" alt="绑定手机号"/></i><b>绑定手机号</b><span></span></router-link>
      <router-link to="/recentreading"><i><img src="./../assets/images/mMyIcon_2.png" alt="最近阅读"/></i><b>最近阅读</b><span></span></router-link>
    </section>
    <section class="mInterface_w">
      <router-link to="/record?type=recordrecharge"><i><img src="./../assets/images/mMyIcon_3.png" alt="充值记录"/></i><b>充值记录</b><span></span></router-link>
      <router-link to="/record?type=recordconsume"><i><img src="./../assets/images/mMyIcon_4.png" alt="消费记录"/></i><b>消费记录</b><span></span></router-link>
    </section>
    <section class="mInterface_w">
      <router-link to="/record?type=setup"><i><img src="./../assets/images/mMyIcon_5.png" alt="设置"/></i><b>设置</b><span></span></router-link>
      <router-link to="tel:4849202002"><i><img src="./../assets/images/mMyIcon_6.png" alt="客服热线"/></i><b>客服热线</b><p>4849202002</p></router-link>
    </section>
  </div>
</template>

<script>
// mTitle 标题,Classify 书城分类
export default {
  data () {
    return {
      mUser: []
    }
  },
  methods: {
    parameter: function () {
      this.$emit('mParameter', {'mType': '2', 'mNav': 'true', 'mIndex': '3', 'mStyle': 'true'})
    },
    getuser: function () {
      this.$http.get('wap/user', {'params': {'session_id': '888888'}}).then(function (res) {
        this.mUser = res.data.data
      },
      function (res) {
        alert(res.status)
      })
    }
  },
  created: function () {
    this.parameter()
    this.getuser()
  }
}
</script>

<style scoped>
body,html{background-color:#f7f7f7;}
.main{padding-bottom:1.4rem;}
.mMyInfo_w{width:10rem;background-color:#fff;padding:0.266667rem 0.4rem 0.4rem;display:flex;flex-direction:column;overflow:hidden;box-sizing:border-box;}
.mMyInfoT,.mMyInfoB_w{width:100%;display:flex;overflow:hidden;}
.mMyInfoT_Tx{width:1.333333rem;height:1.333333rem;border-radius:50%;margin-right:0.4rem;float:left;display:block;overflow:hidden;}
.mMyInfoT_Tx img,.mInterface_w a i img{width:100%;}
.mMyInfoTL{width:6.2rem;padding-top:0.066667rem;float:left;display:block;overflow:hidden;}
.mMyInfoTLName,.mMyInfoTLPhone{width:100%;font-size:0.426667rem;line-height:0.6rem;color:#242424;white-space:nowrap;display:block;overflow:hidden;}
.mMyInfoTL_No .mMyInfoTLName{line-height:1.2rem;}
.mMyInfoTL_No .mMyInfoTLPhone{display:none;}
.mMyRecharge{width:auto;height:0.533333rem;line-height:0.533333rem;color:#42c079;border-radius:1rem;border:1px solid #42c079;padding-left:0.24rem;padding-right:0.24rem;margin-top:0.373333rem;white-space:nowrap;float:right;display:block;overflow:hidden;}
.mMyInfoB_w{margin-top:0.533333rem;justify-content:space-between;}
.mMyInfoB{width:50%;display:flex;flex-direction:column;overflow:hidden;box-sizing:border-box;}
.mMyInfoB:last-child{border-left:2px solid #eee;}
.mMyInfoB span,.mMyInfoB p{width:100%;font-size:0.426667rem;line-height:0.533333rem;color:#242424;display:flex;justify-content:center;overflow:hidden;}
.mMyInfoB p{font-size:0.32rem;color:#a9a9a9;}
.mMyInfoa_w{width:10rem;background-color:#fff;padding:0.8rem 0;display:flex;flex-direction:column;overflow:hidden;box-sizing:border-box;}
.mMyInfoa_w a{width:7.813333rem;height:1rem;line-height:1rem;font-size:0.426667rem;color:#01c914;text-align:center;border:1px solid #42c079;border-radius:1rem;margin:0 auto;display:block;overflow:hidden;box-sizing:border-box;}
.mMyInfoa_w img{width:0.533333rem;height:0.533333rem;display:inline-block;margin-right:0.4rem;}
.mInterface_w{width:10rem;background-color:#fff;padding:0 0.4rem;margin-top:0.266667rem;display:flex;flex-direction:column;overflow:hidden;box-sizing:border-box;}
.mInterface_w a{width:100%;height:1.36rem;font-size:0.426667rem;line-height:1.36rem;color:#242424;border-bottom:1px solid #f1f1f1;padding-left:0.8rem;position:relative;display:flex;overflow:hidden;box-sizing:border-box;}
.mInterface_w a:after{color:#42c079;}
.mInterface_w a:last-child{border-bottom:0 none;}
.mInterface_w a i{width:0.533333rem;height:0.533333rem;position:absolute;top:50%;left:0;margin-top:-0.266667rem;display:block;overflow:hidden;}
.mInterface_w a b{width:auto;white-space:nowrap;float:left;display:block;overflow:hidden;}
.mInterface_w a span{width:0.186667rem;height:0.346667rem;position:absolute;top:50%;right:0;margin-top:-0.173334rem;float:right;display:block;overflow:hidden;}
.mInterface_w a p{width:auto;font-size:0.373333rem;color:#a7a7a7;white-space:nowrap;position:absolute;top:0;right:0;display:block;overflow:hidden;}
</style>
