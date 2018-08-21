<template>
  <div class="screen" :style="backgroundRender">
    <audio :src="audioSuccess" id="audio-success" preload="load"></audio>
    <audio :src="audioAlready" id="audio-already" preload="load"></audio>
    <router-view></router-view>

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
        versionShow: true
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
        $bus.$emit('SCREEN_CONTENT_COMPLEX', Number(data.content_type) === 1 ? false : true)
        $bus.$emit('SCREEN_BEAUTY_RANK', {
          avatarShow:data.avatar_show,
          female: data.female_list,
          male: data.male_list
        })
        $bus.$emit('SCREEN_AVATAR_RANK', {
          avatarShow:data.avatar_show,
          sign: data.sign_list
        })
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
