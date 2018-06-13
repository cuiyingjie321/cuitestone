<template>
  <div class="main">
    <section class="mContent_w mContent_N">
      <div class="mModule mModule_N">
        <h3 class="mModuleTi">最近阅读</h3>
        <ul class="mModuleList">
          <li v-for="list in RecentReading" :key="list.id"><router-link :to="list.href"><span><img :src="list.img" :alt="list.title"/></span><p>{{ list.title }}</p></router-link></li>
        </ul>
        <div v-if="!RecentReading" class="mModuleNull">还没有阅读，快去阅读吧~</div>
      </div>
      <div class="mModule mModule_30">
        <h3 class="mModuleTi">相关推荐</h3>
        <ul class="mModuleList">
          <li v-for="list in Relevant" :key="list.id"><router-link :to="list.href"><span><img :src="list.img" :alt="list.title"/></span><p>{{ list.title }}</p></router-link></li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import test from './../assets/images/mImg_1.jpg'
// RecentReading 最近阅读,Relevant 相关推荐
export default {
  data () {
    return {
      RecentReading: [{
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
    }
  },
  mounted: function () {
    this.parameter()
  }
}
</script>

<style scoped>
.mModule_30{border-top:0.4rem solid #f7f7f7;}
</style>
