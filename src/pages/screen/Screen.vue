<template>
<div class="screen" :style="backgroundRender">
  <audio :src="audioSuccess" id="audio-success" preload="load"></audio>
  <audio :src="audioAlready" id="audio-already" preload="load"></audio>
  <router-view></router-view>
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
      audioSuccess,
      audioAlready
    }
  },
  computed: {
    backgroundRender () {
      return {
        background: `url(${this.background ? this.background : defaultBackground}) center center / cover no-repeat`
      }
    }
  },
  methods: {
    initScreen () {
      ajax.auto(apis.screen.init, { id: this.$route.params.activityId })
          .then(res => {
            const data = res.data
            document.title = data.name
            this.background = data.background
            $bus.$emit('SCREEN_CONTENT_COMPLEX', Number(data.content_type) === 1 ? false : true)
            $bus.$emit('SCREEN_BEAUTY_RANK', {
              female: data.female_list,
              male: data.male_list
            })
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