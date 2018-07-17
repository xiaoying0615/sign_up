<template>
<div class="loading-box">
  <Spin fix>
    <Icon type="load-c" size="18" class="loading"></Icon>
    <p><slot></slot></p>
  </Spin>
</div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style scoped>
.loading-box {
  position: relative;
  height: 80px;
  margin: 30px 0;
}

.loading {  
  animation: loading-animation 1s linear infinite;
}

.ivu-spin-fix {
  background-color: transparent;
}

@keyframes loading-animation {
  from {transform: rotate(0deg);}
  50%  {transform: rotate(180deg);}
  to   {transform: rotate(360deg);}
}
</style>