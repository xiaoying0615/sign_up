<template>
<div ref="avatar" class="avatar" :style="avatarRender">
  <img :src="data.avatar" :style="imageRender">
  <!-- <p class="text-align-center text-over" :style="fontRender">{{data.nick}}：{{data.beauty}}分</p> -->
  <p class="text-align-center text-over" :style="fontRender">颜值:{{data.beauty}}分</p>
</div>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    data: {
      type: Object
    },
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      imageSize: 0,
      fontSize: 0,
      padding: 0,
    }
  },
  computed: {
    avatarRender () {
      return {
        padding: `${this.padding / 2}px ${this.padding}px`
      }
    },

    imageRender () {
      return {
        borderRadius: this.padding / 2 + 'px'
      }
    },

    fontRender () {
      return {
        fontSize: this.fontSize + 'px'
      }
    }
  },
  mounted () {
    const $avatar = this.$refs.avatar

    if (this.type === 'vertical') {
      this.padding = $avatar.clientWidth * 0.1
    } else {
      this.padding = $avatar.clientWidth * 0.15
    }
    this.fontSize = ($avatar.clientWidth - this.padding * 2) * 0.15
  }
}
</script>

<style>
.avatar {
  width: 100%;
  height: 100%;
}

img {
  margin: 0 auto;
}
</style>