<template>
<div>
  <div ref="scannerBox" class="scanner-box">
    <div class="scanner-body">
      <Scanner :scannerStyle = "scannerStyle" :complex="complex"></Scanner>
    </div>
  </div>

</div>
</template>

<script>
import Scanner from '../components/Scanner'

export default {
  name: 'Small',
  components: { Scanner},
  props:{
    complex: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      scannerStyle:"small"
    }
  },
  created () {
  }
}
</script>

<style scoped>
.scanner-box {
  position: relative;
  height: 100vh;
}
.scanner-body{
  width: 100vw;
  height: 100vh;
}

.scanner-body {
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
}

</style>
