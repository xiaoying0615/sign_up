<template>
<div>
  <div ref="scannerBox" class="scanner-box">
    <div class="scanner-body" :style="scannerRender">
      <Scanner></Scanner>
    </div>
  </div>
  <div class="scan-info clear">
    <p class="scan-info-title fl">谁最帅</p>
    <div class="scan-info-body">
      <Avatar class="scan-info-avatar fl" 
              v-for="(item, key) in male" :key="key" 
              type="vertical"
              :data="item"></Avatar>
    </div>
  </div>
  <div class="scan-info">
    <p class="scan-info-title">谁最美</p>
    <div class="scan-info-body clear">
      <Avatar class="scan-info-avatar fl" 
              v-for="(item, key) in female" :key="key" 
              type="vertical"
              :data="item"></Avatar>
    </div>
  </div>
</div>
</template>

<script>
import Scanner from '../components/Scanner'
import Avatar from '../components/Avatar'

export default {
  name: 'Vertical',
  components: { Scanner, Avatar },
  data () {
    return {
      scannerBoxWidth: 0,
      scannerBoxHeight: 0,

      female: [],
      male: []
    }
  },
  computed: {
    scannerRender () {
      let baseSize = 0
      let margin = 0

      if (this.scannerBoxWidth * 0.9 < this.scannerBoxHeight) {
        margin = this.scannerBoxWidth * 0.05
        baseSize = this.scannerBoxWidth - margin * 2
      } else {
        margin = this.scannerBoxHeight * 0.05
        baseSize = this.scannerBoxHeight - margin * 2
      }

      return {
        width: baseSize + 'px',
        height: baseSize + 'px',
        bottom: margin * 2 + 'px'
      }
    }
  },
  mounted () {
    this.scannerBoxWidth = this.$refs.scannerBox.clientWidth
    this.scannerBoxHeight = this.$refs.scannerBox.clientHeight
  },
  created () {
    $bus.$on('SCREEN_BEAUTY_RANK', rank => {
      this.male = rank.male
      this.female = rank.female
    })
  }
}
</script>

<style scoped>
.scanner-box {
  position: relative;
  height: 76vh;
}

.scan-info {
  position: relative;
  height: 11vh;
  color: #fff;
  margin-top: 1vh;
  background: rgba(255, 255, 255, .2);
}

.scanner-body {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.scan-info-title {
  position: absolute;
  width: 4vw;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 10px;
  text-align: center;
  font-size: 4vw;
  line-height: 1.2;
}

.scan-info-body {
  height: 100%;
  margin-left: calc( 4vw + 20px );
}

.scan-info-avatar {
  width: 20%;
}
</style>