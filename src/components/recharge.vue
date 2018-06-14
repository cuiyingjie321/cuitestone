<template>
  <div class="main">
    <ul v-if="RecordType == 'recharge'" class="mRecord">
      <li v-for="list in Record" :key="list.id">
        <div class="mRecordT">
          <div>{{ list.mode }}</div>
          <div>+{{ list.leaves }}花瓣</div>
        </div>
        <div class="mRecordB">
          <div>{{ list.date }}</div>
          <div>{{ list.money }}.00元</div>
        </div>
      </li>
    </ul>
    <ul v-if="RecordType == 'consume'" class="mRecord">
      <li v-for="list in Record" :key="list.id">
        <div class="mRecordT">
          <div><router-link :to="list.href">{{ list.item }}</router-link></div>
          <div>-{{ list.leaves }}花瓣</div>
        </div>
        <div class="mRecordB">
          <div>{{ list.detailed }}</div>
          <div>{{ list.date }} {{ list.time }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// RecordType recharge 充值记录 consume 消费记录
export default {
  data () {
    return {
      RecordType: this.$route.query.type,
      mName: '',
      Record: [{
        mode: '微信支付',
        date: '2018-08-09',
        time: '10:24',
        leaves: '1000',
        money: '10',
        item: '烈火如歌',
        href: '/book',
        detailed: '第三章 时光深入'
      }, {
        mode: '微信支付',
        date: '2018-08-09',
        time: '10:24',
        leaves: '1000',
        money: '10',
        item: '烈火如歌',
        href: '/book',
        detailed: '第三章 时光深入'
      }, {
        mode: '微信支付',
        date: '2018-08-09',
        time: '10:24',
        leaves: '1000',
        money: '10',
        item: '烈火如歌',
        href: '/book',
        detailed: '第三章 时光深入'
      }, {
        mode: '微信支付',
        date: '2018-08-09',
        time: '10:24',
        leaves: '1000',
        money: '10',
        item: '烈火如歌',
        href: '/book',
        detailed: '第三章 时光深入'
      }, {
        mode: '微信支付',
        date: '2018-08-09',
        time: '10:24',
        leaves: '1000',
        money: '10',
        item: '烈火如歌',
        href: '/book',
        detailed: '第三章 时光深入'
      }, {
        mode: '微信支付',
        date: '2018-08-09',
        time: '10:24',
        leaves: '1000',
        money: '10',
        item: '烈火如歌',
        href: '/book',
        detailed: '第三章 时光深入'
      }]
    }
  },
  methods: {
    parameter: function () {
      if (this.RecordType === 'recharge') {
        this.mName = '充值记录'
      } else if (this.RecordType === 'consume') {
        this.mName = '消费记录'
      }
      this.$emit('mParameter', {'mType': '3', 'mName': this.mName, 'mStyle': 'true'})
    }
  },
  created: function () {
    this.parameter()
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
.mRecordT a{color:#242424;}
.mRecordT a:active{color:#42c079;}
</style>
