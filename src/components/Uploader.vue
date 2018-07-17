<template>
<div>
  <div class="upload-box">
    <ImageUpload :fileKeyName="fileKey"
                 :url="url"
                 :maxSize="maxSize * 1024 * 1024"
                 :params="data"
                 @on-oversize="imageOversize"
                 @on-error="imageUploadError"
                 @upload-progress="imageOnProgress"
                 @upload-start="uploadStart"
                 @upload-success="uploadSuccess"
                 @upload-fail="uploadFail">
      <Button class="blue-button" :class="{'fail': uploadFailStyle}" type="ghost" long>{{imageUploadTip}}</Button>
    </ImageUpload>
  </div>

  <div class="preview" v-if="preview">
    <img :src="previewSrc">
  </div>
</div>
</template>

<script>
import ImageUpload from './imageUpload/ImageUpload'

export default {
  name: 'Uploader',
  props: {
    url: {
      type: String,
      reqiured: true
    },
    fileKey: {
      type: String,
      default: 'file'
    },
    maxSize: {
      type: Number,
      default: 2
    },
    data: {
      type: Array,
      default: () => []
    },
    preview: {
      type: Boolean,
      default: true
    },
    previewImage: {
      type: String
    }
  },
  components: { ImageUpload },
  data () {
    return {
      imageUploading: false,
      imageUploadTip: '上传图片',
      uploadFailStyle: false,

      previewSrc: ''
    }
  },
  methods: {
    imageOversize () {
      this.$Message.warning(`图片大小请勿超过${this.maxSize}Mb`)
    },
    imageUploadError (err) {
      console.error('design upload error', err)
      this.$Message.error(`图片上传失败，请重新上传`)
    },
    imageOnProgress (progress) {
      this.imageUploading = true
      this.imageUploadTip = `正在上传 - 已完成 ${Math.floor(progress.loaded / progress.total)}%`
    },
    uploadStart (imageDataUrl) {
      if (this.preview) this.previewSrc = imageDataUrl
      this.triggerEvent('start', imageDataUrl)
    },
    uploadSuccess (res) {
      if (res.status !== 1) {
        this.uploadFail(res.msg)
        return
      }
      this.triggerEvent('success', res.data)
      this.$Message.success(`图片上传成功`)
      this.uploadFailStyle = false
      this.imageUploading = false
      this.imageUploadTip = `重新上传更换图片`
    },
    uploadFail (err) {
      console.error('design upload fail', err)
      this.$Message.error(err)
      this.uploadFailStyle = true
      this.imageUploading = false
      this.imageUploadTip = `上传失败，请重新上传`
    },

    triggerEvent (type, data) {
      this.$emit('on-change', { type, data })
    }
  },
  created () {
    if (this.preview) this.previewSrc = this.previewImage
  }
}
</script>

<style scoped>
.upload-box {
  width: 200px;
}

.preview {
  width: 200px;
  margin-top: 20px;
}

.fail {
  color: #ff3300;
  border-color: #ff3300;
}
</style>