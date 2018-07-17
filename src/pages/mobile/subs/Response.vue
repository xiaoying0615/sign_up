<template>
<div ref="mobile" class="mobile layer" :style="backgroundRender">
  <div class="mobile-body text-align-center" style="width: 80%;">
    <img v-if="avatar" :src="avatar" class="response-avatar" :style="avatarRender">
    <p class="response-tip tip-success">报名成功</p>
    <p class="response-tip tip-sign-way">与会当日您可通过刷脸完成签到</p>
    
    <img :src="qrCodeSrc" class="response-qrcode" :style="qrcodeRender" v-if="qrCodeSrc">

    <p style="font-weight: bold; color: #2d8cf0;">二维码可作为签到凭证<br>请截图保存此页面备用</p>
  </div>

  <p class="support-tip" v-if="showVersion"><a href="javascript:;">靠我啦kaowola</a> 免费技术支持</p>
</div>
</template>

<script>
import qrCode from 'qrcode'

import defaultBackground from '@/assets/bg-form.jpg'

export default {
  name: 'Response',
  data () {
    return {
      clientWidth: 0,
      qrCodeSrc: '',
      background: '',
      avatar: '',
      showVersion: true
    }
  },
  computed: {
    backgroundRender () {
      return {
        background: `url(${this.background ? this.background : defaultBackground}) center center / cover no-repeat`
      }
    },
    avatarRender () {
      return {
        width: this.clientWidth * 0.2 + 'px',
        height: this.clientWidth * 0.2 + 'px'
      }
    },
    qrcodeRender () {
      return {
        width: this.clientWidth * 0.5 + 'px',
        height: this.clientWidth * 0.5 + 'px'
      }
    }
  },
  methods: {
    fetchData () {
      if (this.$route.query.id !== undefined) {
        this.fetchDataInBrowser()
      } else {
        this.fetchDataInWX()
      }
    },


    // 没用
    fetchDataInWX () {
      ajax.auto(apis.mobile.index, { id: this.$route.params.activityId })
          .then(res => {
            const data = res.data
            // 未登录 未报名
            if (!Number(data.is_login) || !Number(data.is_clock)) this.$router.replace({ name: 'mobileSign' })
            // 已报名
            else {
              document.title = data.name
              this.showVersion = !!Number(data.version_show)
              this.background = data.sign_background
              this.avatar = data.avatar
              this.setQrCode(JSON.stringify({
                id: this.$route.params.activityId,
                sign: data.id
              }))
            }
          }).catch(err => {
            this.$Message.error(err)
          })
    },

    fetchDataInBrowser () {
      ajax.auto(apis.mobile.signInfo, {
        activity_id: this.$route.params.activityId,
        sign_id: this.$route.query.id
      }).then(res => {
        const data = res.data
        document.title = data.name
        this.showVersion = !!Number(data.version_show)
        this.background = data.sign_background
        this.avatar = data.avatar
        this.setQrCode(JSON.stringify({
          id: data.activity_id,
          sign: data.sign_id
        }))
      }).catch(err => {
        this.$Message.error(err)
        // this.$router.replace({ name: 'mobileSign' })
      })
    },

    setQrCode (data) {
      qrCode.toDataURL(data, {
        scale: 10
      }, (err, url) => {
        if (err) console.error('qrcode', err)
        this.qrCodeSrc = url
      })
    }
  },
  mounted () {
    this.clientWidth = this.$refs.mobile.clientWidth
    this.fetchDataInBrowser()
  }
}
</script>

<style scoped>
@import url('../mobile.css')
</style>