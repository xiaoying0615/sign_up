<template>
<div class="clear">
  <!--<div class="scan-info full-height fl">-->
    <!--<p class="scan-info-title">谁最帅</p>-->
    <!--<div class="scan-info-body">-->
      <!--<Avatar class="scan-info-avatar fl" -->
              <!--v-for="(item, key) in male" :key="key" -->
              <!--type="horizontal"-->
              <!--:data="item"></Avatar>-->
    <!--</div>-->
  <!--</div>-->
  <!--<div class="scan-info full-height fr">-->
    <!--<p class="scan-info-title">谁最美</p>-->
    <!--<div class="scan-info-body">-->
      <!--<Avatar class="scan-info-avatar fl" -->
              <!--v-for="(item, key) in female" :key="key" -->
              <!--type="horizontal"-->
              <!--:data="item"></Avatar>-->
    <!--</div>-->
  <!--</div>-->
  <div class="scanner-body-box full-height relative">
    <div class="scanner-body position-center">
      <Scanner></Scanner>
    </div>
  </div>

</div>
</template>

<script>
import Scanner from '../components/Scanner'
import Avatar from '../components/Avatar'

export default {
  name: 'Horizontal',
  components: { Scanner, Avatar },
  data () {
    return {
      female: [],
      male: []
    }
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
.scanner-body-box {
  margin: 0 11vw;
}

.scanner-body {
  width: 60vh;
  height: 60vh;
}

.scan-info {
  width: 11vw;
  color: #fff;
  background: rgba(255, 255, 255, .2);
}

.scan-info-title {
  height: 2vw;
  margin: 10px 0;
  text-align: center;
  font-size: 2vw;
  line-height: 1.2;
}

.scan-info-body {
  height: calc( 100vh - 2vw - 20px );
}

.scan-info-avatar {
  height: 20%;
}
</style>
