<template>
  <div ref="mobile" class="mobile layer" :style="data.background | backgroundRender">
    <div class="mobile-body">

      <!-- 上传头像 -->
      <div class="text-align-center">
        <div class="camera-btn" :style="cameraRender" @click="upload">
          <Icon v-if="!avatar" type="camera" :size="clientWidth * 0.2" :style="{ lineHeight: clientWidth * 0.5 + 'px' }"></Icon>
          <img class="camera-preview" v-else :src="baseUrl + avatar">
        </div>
      </div>

      <Button type="ghost" class="mobile-btn submit margin-top-20" :style="{ width: clientWidth * 0.5 + 'px' }"
              long :loading="loading" @click="submit">提交
      </Button>

    </div>
    <PhotoTip ></PhotoTip>

  </div>
</template>

<script>
  import PhotoTip from '../components/PhotoTip'
  import util from '@/utils/util'

  import defaultBackground from '@/assets/bg-form.jpg'

  const waitTime = 30
  let interval

  export default {
    name: 'Register',
    components: {PhotoTip},
    data () {
      return {
        clientWidth: 0,
        loading: false,

        data: {
          background: ''
        },
        avatar: '', //'https://static.cxstore.top/images/avatar1.jpg',
        leftTime: 0,
        baseUrl:""
      }
    },
    computed: {
      cameraRender () {
        return {
          width: this.clientWidth * 0.5 + 'px',
          height: this.clientWidth * 0.5 + 'px',
          lineHeight: this.clientWidth * 0.5 + 'px'
        }
      }
    },
    filters: {
      backgroundRender (background) {
        return {
          background: `url(${background ? background : defaultBackground}) center center / cover no-repeat`
        }
      }
    },
    methods: {
      // 头像上传监听
      watchAvatar () {
        $bus.$on('AVATAR_SUCCESS', image => {
          this.avatar = image
        })
      },

      // 上传图片 展示上传提示
      upload () {
        $bus.$emit('SHOW_PHOTO_TIP')
      },

      formValidate () {
        if (!this.avatar) {
          this.$Message.warning('请上传头像')
          return false
        }
        return true
      },

      submit () {
        if (!this.formValidate()) return
        this.loading = true
        ajax.auto(apis.mobile.quickClock, {
          id: this.$route.params.activityId,
          avatar: this.avatar
        }).then(res => {
          this.$Message.success('提交成功')
          this.avatar = ""
          this.loading = false
        }).catch(err => {
          this.$Message.error(err)
          this.loading = false
        })

      }
    },
    mounted () {
      this.clientWidth = this.$refs.mobile.clientWidth
      this.baseUrl = apis.baseUrl
      this.watchAvatar()
    }
  }
</script>

<style scoped>
  @import url('../mobile.css')
</style>
