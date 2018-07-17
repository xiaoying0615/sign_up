<template>
<div class="container">
  <div class="design-body clear">
    <div class="mobile-box fl">
      <img src="@/assets/img-mobile.png">

      <div class="mobile-body">
        <Register :isModel="true" v-model="data" :versionPaied="!showVersion"></Register>
      </div>
    </div>

    <div style="margin-left: 380px;">
      <Editor :id="id" @on-change="editorChanged"></Editor>
    </div>
  </div>
</div>
</template>

<script>
import Register from '@/pages/mobile/subs/Register'
import Editor from './components/Editor'

export default {
  name: 'Design',
  components: { Register, Editor },
  data () {
    return {
      loading: true,
      id: this.$route.params.activityId,
      data: {},
      showVersion: true
    }
  },
  methods: {
    editorChanged (data) {
      this.data = data
    }
  },
  created () {
    $bus.$on('DESIGN_VERSION_SHOW', show => {
      this.showVersion = show
    })
  }
}
</script>

<style scoped>
.design-body {
  padding: 20px 40px;
}

.mobile-box {
  position: relative;
  width: 320px;
  /*height: 504px;*/
  /*border-radius: 4px;*/
  /*box-shadow: 0 1px 6px rgba(0,0,0,.5);*/
  overflow: hidden;
}

.mobile-body {
  position: absolute;
  left: 29px;
  top: 76px;
  width: 266px;
  height: 470px;
  z-index: 1;
}
</style>