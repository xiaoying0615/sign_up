<template>
  <div class="screen" :style="backgroundRender">
    <router-view :info = "info" :styleId="styleId" :complex="complex"></router-view>

    <p class="support-tip" v-if="versionShow"><a href="javascript:;">靠我啦kaowola</a> 免费技术支持</p>
  </div>
</template>

<script>
  import defaultHBackground from '@/assets/bg-screen-h.jpg'
  import defaultVBackground from '@/assets/bg-screen-v.jpg'

  export default {
    name: 'Screen',
    data () {
      return {
        background: '',
        backgroundColor: '',
        versionShow: true,
        complex:true,
        styleId:1,
        info: {
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
        //小屏没有背景色
        if (location.href.indexOf("small") > 0) {
          this.background = ""
          this.backgroundColor = "#000"
        }else if (location.href.indexOf("horizontal") > 0 && this.background === "") {
          this.background = defaultHBackground
        }else if (location.href.indexOf("vertical") > 0 && this.background === "") {
          this.background = defaultVBackground
        }
        if (this.backgroundColor !== "") {
          return {
            background: `${this.backgroundColor}`
          }
        } else {
          return {
            background: `url(${this.background ? this.background : defaultHBackground}) center center / cover no-repeat`
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
            this.styleId = data.style_id
            this.complex = Number(data.content_type) === 1 ? true : false
            this.info.avatarShow = Number(data.avatar_show) === 1 ? true : false
            this.info.female = data.female_list
            this.info.male = data.male_list
            this.info.sign = data.sign_list
            this.info.signNum = data.sign_num
//            $bus.$emit('SCREEN_CONTENT_COMPLEX', Number(data.content_type) === 1 ? false : true)
//            $bus.$emit('SCREEN_CONTENT_STYLE', data.style_id)
          })
          .catch(err => {
            this.$Message.error(err)
          })
      }
    },
    created () {
      this.initScreen()
    }
  }
</script>

<style>
  @import url("./screen.css")
</style>
