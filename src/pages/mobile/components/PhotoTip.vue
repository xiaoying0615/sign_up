<template>
<Modal v-model="show"
       title="上传人脸照片">
  <Alert class="margin-bottom-10" v-if="progress">上传中，已完成 - {{progress}}%</Alert>
  <img src="@/assets/img-upload-tip.jpg">

  <ImageUpload slot="footer"
               :url="url"
               :crop="true"
               :maxWidth="640"
               :params="extraData"
               @on-oversize="imageOversize"
               @on-error="imageUploadError"
               @upload-progress="imageOnProgress"
               @upload-success="uploadSuccess"
               @upload-fail="uploadFail">
    <Button type="primary" long>上传照片</Button>
  </ImageUpload>
</Modal>
</template>

<script>
import ImageUpload from '@/components/imageUpload/ImageUpload'

export default {
  name: 'PhotoTip',
  components: { ImageUpload },
  data () {
    return {
      show: false,

      url: apis.mobile.avatar,
      maxSize: 2,
      progress: 0,
      extraData: [{
        key: 'id',
        value: this.$route.params.activityId
      }],
    }
  },
  methods: {
    choosePhoto () {
      this.show = false
    },
    imageOversize (size) {
      this.$Message.warning(`请上传${this.maxSize}Mb以内的照片`)
    },
    imageUploadError (err) {
      this.$Message.error(err)
    },
    imageOnProgress (progress) {
      this.progress = Math.floor((progress.loaded / progress.total) * 100)
    },
    uploadSuccess (res) {
      if (res.status !== 1) {
        this.uploadFail(res.msg)
        return
      }
      $bus.$emit('AVATAR_SUCCESS', res.data.avatar)
      this.$Message.success(`图片上传成功`)
      this.show = false
      this.progress = 100
    },
    uploadFail (err) {
      console.error('design upload fail', err)
      this.$Message.error(err)
      this.progress = 0
    }
  },
  created () {
    $bus.$on('SHOW_PHOTO_TIP', () => {
      this.progress = 0
      this.show = true
    })
  }
}
</script>