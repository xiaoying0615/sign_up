<template>
  <div class="screen" :style="backgroundRender">
    <audio :src="audioSuccess" id="audio-success" preload="load"></audio>
    <audio :src="audioAlready" id="audio-already" preload="load"></audio>
    <router-view :info = "info"></router-view>

    <p class="support-tip" v-if="versionShow"><a href="javascript:;">靠我啦kaowola</a> 免费技术支持</p>
  </div>
</template>

<script>
  import defaultBackground from '@/assets/bg-screen.jpg'

  import audioSuccess from '@/assets/success.wav'
  import audioAlready from '@/assets/already.wav'

  export default {
    name: 'Screen',
    data () {
      return {
        background: '',
        backgroundColor: '',
        audioSuccess,
        audioAlready,
        versionShow: true,
        info: {
          styleId: 1,
          avatarShow: true,
          female: [],
          male: [],
          sign: [],
          signNum:0
        }
      }
    },
    computed: {
      backgroundRender () {
        if (this.backgroundColor !== "") {
          return {
            background: `${this.backgroundColor}`
          }
        } else {
          return {
            background: `url(${this.background ? this.background : defaultBackground}) center center / cover no-repeat`
          }
        }
      }
    },
    methods: {
      initScreen () {
        ajax.auto(apis.screen.init, {id: this.$route.params.activityId})
          .then(res => {
            const data = res.data
            document.title = data.name
            this.background = data.background
            this.versionShow = Number(data.version_show) === 1 ? true : false
            this.info.styleId = data.style_id
            this.info.avatarShow = data.avatar_show
            this.info.female = data.female_list
            this.info.male = data.male_list
            this.info.sign = data.sign_list
            this.info.signNum = data.sign_num
            $bus.$emit('SCREEN_CONTENT_COMPLEX', Number(data.content_type) === 1 ? false : true)
            $bus.$emit('SCREEN_CONTENT_STYLE', data.style_id)
          })
          .catch(err => {
            this.$Message.error(err)
          })
      }
    },
    created () {
      this.initScreen()
      //小屏没有背景色
      if (location.href.indexOf("small") > 0) {
        this.backgroundColor = "#000"
      }
    }
  }
</script>

<style>
  @import url("./screen.css")
</style>
