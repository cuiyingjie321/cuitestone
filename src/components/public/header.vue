<template>
  <header :class="['mHeader_w', { mHeaderc_w: mType == 4, mHeaderc_w: mHeaderFixed }]">
    <div v-if="mType == 0" class="mHeader">
      <div class="mHeader_Ti">{{mTitle}}</div>
      <router-link to="/search" class="mHeader_Search">搜索</router-link>
    </div>
    <div v-else-if="mType == 1" class="mHeadera">
      <div class="mHeaderaChoiceL"><input type="text" :placeholder="mDefault" v-model="mKeyword" @focus="mSearchFocus"/></div>
      <div class="mHeaderaChoiceR"><input type="submit" value="搜索" @click="mSearchBtn"/></div>
    </div>
    <div v-else-if="mType == 2 || mType == 3 || mType == 4" :class="['mHeaderb', { mHeaderc: mType == 4 }]">
      <div v-if="mType == 3 || mType == 4" v-on:click="back" class="mHeaderb_Back">返回</div>
      <div class="mHeaderb_Ti">{{mTitle}}</div>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {
      mDefault: '烈火如歌',
      mKeyword: ''
    }
  },
  props: ['mType', 'mTitle', 'mHeaderFixed'],
  methods: {
    back: function () {
      this.$router.go(-1)
    },
    mSearchBtn: function () {
      this.$emit('mKeywordReceive', this.mKeyword)
    },
    mSearchFocus: function () {
      if (this.$route.path !== '/search') {
        this.$router.push('/search')
      }
    }
  }
}
</script>

<style scoped>
.mHeader_w{width:10rem;height:1.133333rem;margin-left:auto;margin-right:auto;display:flex;flex-direction:column;box-sizing:border-box;z-index:2;}
.mHeader{width:10rem;height:1.133333rem;background-color:#42c079;position:relative;display:flex;flex-direction:column;overflow:hidden;box-sizing:border-box;}
.mHeader_Ti{width:6.133333rem;line-height:1.133333rem;font-size:0.48rem;color:#fff;margin-left:auto;margin-right:auto;display:flex;justify-content:center;overflow:hidden;}
.mHeader_Search{width:0.533333rem;height:0.533333rem;position:absolute;top:50%;right:0.4rem;margin-top:-0.266665rem;text-indent:-1000em;background:url(./../../assets/images/mIcon_1.png) no-repeat 0 0;background-size:0.533333rem 0.533333rem;display:block;overflow:hidden;}
.mHeadera{width:10rem;height:1.133333rem;background-color:#fff;padding:0 0.266667rem 0 0.4rem;position:relative;border-bottom:1px solid #eeeff2;display:flex;justify-content:space-between;overflow:hidden;box-sizing:border-box;}
.mHeaderaChoiceL{width:7.933333rem;height:0.693333rem;background-color:#eee;border-radius:0.1rem;margin-top:0.22rem;display:flex;overflow:hidden;box-sizing:border-box;}
.mHeaderaChoiceL input{width:7.933333rem;height:0.693333rem;line-height:0.693333rem;font-size:0.373333rem;color:#242424;background:url(./../../assets/images/mIcon_2.png) #eee no-repeat 0.2rem center;background-size:0.426667rem 0.426667rem;padding-left:0.866667rem;padding-right:0.2rem;border:0 none;display:block;overflow:hidden;box-sizing:border-box;-webkit-tap-highlight-color:transparent;tap-highlight-color:transparent;}
.mHeaderaChoiceL input::-webkit-input-placeholder{color:#a6a6a6;}
.mHeaderaChoiceR{width:1rem;height:0.693333rem;margin-top:0.22rem;display:flex;overflow:hidden;box-sizing:border-box;}
.mHeaderaChoiceR input{width:1rem;height:0.693333rem;line-height:0.693333rem;font-size:0.373333rem;color:#242424;background-color:#fff;border:0 none;overflow:hidden;box-sizing:border-box;cursor:pointer;}
.mHeaderaChoiceR input::-webkit-input-placeholder{color:#242424;}
.mHeaderb{width:10rem;height:1.133333rem;background-color:#fff;position:relative;border-bottom:1px solid #eeeff2;display:flex;flex-direction:column;overflow:hidden;box-sizing:border-box;}
.mHeaderb_Ti{width:6.133333rem;line-height:1.133333rem;font-size:0.48rem;color:#262b33;margin-left:auto;margin-right:auto;display:flex;justify-content:center;overflow:hidden;}
.mHeaderb_Back{width:0.293333rem;height:0.586667rem;position:absolute;top:50%;left:0.4rem;margin-top:-0.293333rem;background:url(./../../assets/images/mBack_1.png) no-repeat 0 0;background-size:0.293333rem 0.586667rem;display:block;overflow:hidden;text-indent:-1000em;cursor:pointer;}
.mHeaderc_w{position:fixed;top:0;left:50%;margin-left:-5rem;}
.mHeaderc{background-color:#2c2a2b;}
.mHeaderc .mHeaderb_Ti{color:#fff;}
.mHeaderc .mHeaderb_Back{background:url(./../../assets/images/mBack_2.png) no-repeat 0 0;background-size:0.293333rem 0.586667rem;}
</style>
