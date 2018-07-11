<template>
  <div class="mWxDl">微信授权登陆中~~~~</div>
</template>

<script>
export default {
  data () {
    return {
      historyData: []
    }
  },
  methods: {
    parameter: function () {
      this.$emit('mParameter', {'mType': '1', 'mHeaderHide': true})
    },
    login: function () {
      let url = 'http://wenxue.china.com/index.html#/author'
      window.location.href = 'http://wenxueapptest.creditdev.com/wx/login/url?state=' + encodeURIComponent(url)
    },
    getQueryString: function (name) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      let r1 = window.location.href
      let r2 = r1.split('?')
      if (r2[1]) {
        let r = r2[1].match(reg)
        if (r !== null) {
          return unescape(r[2])
        } else {
          return null
        }
      } else {
        return null
      }
    }
  },
  created: function () {
    this.parameter()
    let name = 'session_id'
    let sessionId = ''
    let beforeLoginUrl = sessionStorage.getItem('beforeLoginUrl')
    let sessionIdOne = this.getQueryString(name)
    let sessionIdTwo = sessionStorage.getItem('sessionId')
    if (sessionIdOne || sessionIdTwo) {
      if (sessionIdOne) {
        sessionId = sessionIdOne
      } else {
        sessionId = sessionIdTwo
      }
      sessionStorage.setItem('sessionId', sessionId)
      window.location.href = beforeLoginUrl
    } else {
      this.login()
    }
  }
}
</script>

<style scoped>
  .mWxDl{width:10rem;font-size:0.426667rem;color:#262b33;line-height:1rem;text-align:center;position:fixed;top:50%;left:50%;margin-top:-0.5rem;margin-left:-5rem;}
</style>
