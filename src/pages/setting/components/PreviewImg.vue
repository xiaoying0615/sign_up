<template>
<Modal width="70%"
       v-model="show"
       :loading="true"
       :closable="false"
       :footer-hide="true">
  <img :src="imgsrc" alt="">

</Modal>
</template>

<script>
export default {
  name: 'PreviewImg',
  data () {
    return {
      show: false,
      loading: false,
      imgsrc:""
    }
  },
  methods: {
  },
  mounted () {
    $bus.$on('PREVIEW-IMG', ({ imgsrc }) => {
      this.show = true
      this.imgsrc = imgsrc
    })
  },
  created () {
  }
}
</script>

<style scoped>
  img{
    width:auto;
    height:auto;
    max-width:100%;
    max-height:750px;
    margin:auto;
  }
</style>
