<template>
  <div></div>
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
      this.$emit('mParameter', {'mType': '1'})
    },
    login: function () {
      window.location.href = 'http://wenxueww.creditdev.com/wx/login/url'
    }
  },
  created: function () {
    let sessionId = this.$route.query.session_id
    if (!sessionId) {
      sessionId = sessionStorage.getItem('sessionId')
    }
    if (sessionId) {
      sessionStorage.setItem('sessionId', sessionId)
      window.location.href = '/'
    } else {
      this.login()
    }
  }
}
</script>
