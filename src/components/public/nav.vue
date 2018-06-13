<template>
  <nav class="mNav_w">
    <ul>
      <li v-for="(nav , index) in mNavs" :key="nav.id" :class="{ mNav_hov:mIndex == index}" ><router-link :to="nav.href" :class="'mNav_'+(index+1)"><span></span><p>{{ nav.name }}</p></router-link></li>
    </ul>
  </nav>
</template>
<script>
export default {
  data () {
    return {
      mNavs: [{
        href: '/',
        name: '书架'
      }, {
        href: '/choice',
        name: '精选'
      }, {
        href: '/list',
        name: '书城'
      }, {
        href: '/my',
        name: '我的'
      }]
    }
  },
  props: ['mIndex']
}
</script>

<style scoped>
.mNav_w{width:10rem;height:1.333333rem;position:fixed;bottom:0;left:50%;margin-left:-5rem;border-top:1px solid #e7e7e7;background-color:#fff;display:flex;overflow:hidden;box-sizing:border-box;}
.mNav_w ul{width:100%;padding-top:0.133333rem;display:flex;overflow:hidden;}
.mNav_w li{width:2.5rem;display:flex;flex-direction:column;overflow:hidden;}
.mNav_w a{color:#bababa;display:flex;flex-direction:column;}
.mNav_w a:active,.mNav_hov a{color:#42c079;}
.mNav_w span{width:0.533333rem;height:0.533333rem;margin-left:auto;margin-right:auto;display:block;overflow:hidden;box-sizing:border-box;background-repeat:no-repeat;background-size:cover;background-position:center center;}
.mNav_w .mNav_1 span{background-image:url(./../../assets/images/mNav_1.png);}
.mNav_w .mNav_2 span{background-image:url(./../../assets/images/mNav_2.png);}
.mNav_w .mNav_3 span{background-image:url(./../../assets/images/mNav_3.png);}
.mNav_w .mNav_4 span{background-image:url(./../../assets/images/mNav_4.png);}
.mNav_w a:active.mNav_1 span,.mNav_hov .mNav_1 span{background-image:url(./../../assets/images/mNav_1_hov.png);}
.mNav_w a:active.mNav_2 span,.mNav_hov .mNav_2 span{background-image:url(./../../assets/images/mNav_2_hov.png);}
.mNav_w a:active.mNav_3 span,.mNav_hov .mNav_3 span{background-image:url(./../../assets/images/mNav_3_hov.png);}
.mNav_w a:active.mNav_4 span,.mNav_hov .mNav_4 span{background-image:url(./../../assets/images/mNav_4_hov.png);}
.mNav_w p{width:100%;line-height:0.613333rem;font-size:0.32rem;text-align:center;display:block;overflow:hidden;}
</style>
