<template>
<div class="scanner">
  <i class="scanner-decorate scanner-corner corner-top-left"></i>
  <i class="scanner-decorate scanner-corner corner-top-right"></i>
  <i class="scanner-decorate scanner-corner corner-bottom-left"></i>
  <i class="scanner-decorate scanner-corner corner-bottom-right"></i>
  

  <div class="scanner-camera position-center">
    <!-- <i class="scanner-decorate scanner-bar"></i> -->
    <Video2Image ref="video2Image" @on-error="videoError"></Video2Image>
  </div>

  <UserCard v-if="user" v-model="user" :complex="complex"></UserCard>
</div>
</template>

<script>
import Video2Image from '@/components/Video2Image'
import UserCard from './UserCard'

let interval
let timeout
// let faceppApi = 'https://api-cn.faceplusplus.com/facepp/v3/detect'
// let api_key = '4FvhPRTbgZ9i0V6CqwLTqRCjhsMXgQYR'
// let api_secret = 'G9U6J9haqIvO9EeWtfd8B29vkrHUBDUY'

export default {
  name: 'Scanner',
  components: { Video2Image, UserCard },
  data () {
    return {
      $audioSuccess: null,
      $audioAlready: null,

      complex: false,
      user: null
    }
  },
  methods: {
    // 播放音频 success already
    playAudio (type) {
      this.pauseAudio()
      type === 'success' ? this.$audioSuccess.play() : this.$audioAlready.play()
    },
    
    // 暂停音频
    pauseAudio () {
      this.$audioSuccess.pause()
      this.$audioAlready.pause()
      this.$audioSuccess.currentTime = 0
      this.$audioAlready.currentTime = 0
    },

    videoError (err) {
      this.$Message.error(err.toString())
    },

    getImageDataUrl () {
      return this.$refs.video2Image.getImageDataUrl()
    },

    faceDetect () {
      ajax.auto(apis.screen.doSign, {
        id: this.$route.params.activityId,
        file: this.getImageDataUrl()
      }, true).then(res => {
        if (res.status === 0) return
        if (res.status === 99) {
          this.$Message.error(res.msg)
          return
        }
        const data = res.data
        this.playAudio(res.status === 2 ? 'already' : 'success')
        this.user = {
          avatar: data.avatar,
          name: data.nick,
          score: data.beauty,
          form: data.form ? data.form : []
        }
        $bus.$emit('SCREEN_BEAUTY_RANK', {
          female: data.female_list,
          male: data.male_list
        })
        // 匹配成功时停止扫描展示用户信息
        // 3秒后用户信息消失继续扫描
        clearInterval(interval)
        timeout = setTimeout(() => {
          this.user = null
          this.startScan()
          clearTimeout(timeout)
        }, 3000)
      })
    },

    startScan () {
      interval = setInterval(() => {
        this.faceDetect()
      }, 2000)
    }
  },
  mounted () {
    this.$audioSuccess = document.getElementById('audio-success')
    this.$audioAlready = document.getElementById('audio-already')
    this.startScan()
  },

  created () {
    $bus.$on('SCREEN_CONTENT_COMPLEX', complex => {
      this.complex = complex
    })
  },
  destroyed () {
    clearInterval(interval)
    clearTimeout(timeout)
  }
}
</script>

<style scoped>
.scanner {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, .5);
}

.scanner-decorate {
  position: absolute;
  z-index: 10;
}

.scanner-corner {
  width: 10%;
  height: 10%;
}
.corner-top-left {
  left: -1px;
  top: -1px;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
}
.corner-top-right {
  right: -1px;
  top: -1px;
  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
}
.corner-bottom-left {
  left: -1px;
  bottom: -1px;
  border-bottom: 2px solid #fff;
  border-left: 2px solid #fff;
}
.corner-bottom-right {
  right: -1px;
  bottom: -1px;
  border-bottom: 2px solid #fff;
  border-right: 2px solid #fff;
}

.scanner-camera {
  width: 90%;
  height: 90%;
  border-radius: 50%;
  background: #000;
  overflow: hidden;
}

.scanner-camera:before {
  content: "";
  display: block;
  position: absolute;
  z-index: 10;
  width: 90%;
  height: 4px;
  left: 5%;
  border-radius: 50%;
  background: rgba(255, 255, 255, .5);
  animation: scan 2s linear infinite
}
@keyframes scan {
  from { top: 0; }
  to { top: calc( 100% - 4px ); }
}
</style>