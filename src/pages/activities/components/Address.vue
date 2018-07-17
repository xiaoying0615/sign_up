<template>
<Modal v-model="show"
       title="参与地址入口">
  <Row>
    <Col span="6" offset="2" class="address-item">
      <i class="badge"></i>
      <span class="bolder">表单报名地址：</span>
    </Col>
    <Col span="12" class="address-item clear">
      <Input readonly v-model="address.signLink" id="signLink">
        <Button slot="append" @click="copy('#signLink input')">复制</Button>
      </Input>
    </Col>

    <Col span="6" offset="2" class="address-item">
      <i class="badge"></i>
      <span class="bolder">人脸识别地址：</span>
    </Col>
    <Col span="12" class="address-item clear">
      <Input readonly v-model="address.faceLink" id="faceLink">
        <Button slot="append" @click="copy('#faceLink input')">复制</Button>
      </Input>
    </Col>

    <template v-if="address.threedLink">
      <Col span="6" offset="2" class="address-item">
        <i class="badge"></i>
        <span class="bolder">中转服务器地址：</span>
      </Col>
      <Col span="12" class="address-item clear">
        <Input readonly v-model="address.threedLink" id="threedLink">
          <Button slot="append" @click="copy('#threedLink input')">复制</Button>
        </Input>
      </Col>
    </template>

    <Col span="19" offset="2" class="margin-top-20">
      <p class="margin-bottom-10">登录<a href="https://cli.im/" target="_blank">草料二维码</a>，复制地址粘贴到“网址”点击生成二维码并下载即可。</p>

      <img src="@/assets/img-caoliao.png">
    </Col>
  </Row>

  

  <Button slot="footer" type="primary" @click="show = false">确定</Button>
</Modal>
</template>

<script>
export default {
  name: 'Address',
  data () {
    return {
      show: false,
      address: {
        signLink: '',
        faceLink: '',
        threedLink: ''
      }
    }
  },
  methods: {
    copy (selector) {
      document.querySelector(selector).select()
      document.execCommand('copy', false, null)
      this.$Message.success('复制成功')
    }
  },
  created () {
    $bus.$on('SHOW_ADDRESS', (address) => {
      this.show = true
      Object.assign(this.address, address)
    })
  }
}
</script>

<style scoped>
.badge {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 5px;
  background: #3399ff;
}

.address-item {
  height: 40px;
  line-height: 40px;
}

.address-link {
  height: 24px;
  line-height: 24px;
  margin-top: 8px;
  margin-right: 10px;
  padding: 0 5px;
  border: 1px solid #dddee1;
  border-radius: 4px;
}
</style>