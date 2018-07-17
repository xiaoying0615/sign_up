<template>
<div class="company-footer">
  苏ICP备14047536号-3 Copyright © {{year}} 南京乔戈里信息科技有限公司
</div>
</template>

<script>
export default {
  name: 'CompanyInfo',
  data () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.company-footer {
  height: 40px;
  line-height: 40px;
  font-size: 10px;
  color: #666;
  text-align: center;
  /*text-shadow: 1px 1px 0 #333;*/
}
</style>