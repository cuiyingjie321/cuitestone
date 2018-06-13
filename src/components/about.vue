<template>
  <div class="main">
    <div class="mAboutImg"><img src="./../assets/images/mAbout.png" alt="华网文学"/></div>
    <div class="mAboutTi">华网文学</div>
    <div class="mAboutInfo">Copyright © 2018<br/>北京华网智讯信息有限公司</div>
  </div>
</template>

<script>
export default {
  methods: {
    parameter: function () {
      this.$emit('mParameter', {'mType': '3', 'mName': this.mName})
    }
  },
  mounted: function () {
    this.parameter()
  }
}
</script>

<style scoped>
.mAbout{width:10rem;background-color:#fff;padding:0 0.4rem;display:flex;flex-direction:column;overflow:hidden;box-sizing:border-box;}
.mAboutImg{width:4rem;height:4rem;margin:1.6rem auto 0;display:block;overflow:hidden;}
.mAboutTi{width:10rem;font-size:0.8rem;line-height:1rem;text-align:center;color:#42c079;margin-top:0.6rem;display:block;overflow:hidden;}
.mAboutInfo{width:10rem;font-size:0.426667rem;line-height:0.6rem;text-align:center;color:#a7a7a7;margin-top:6.666667rem;padding-bottom:0.4rem;display:block;overflow:hidden;}
</style>
