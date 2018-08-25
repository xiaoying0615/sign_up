<template>
<Modal title="配置接口"
       width="460"
       v-model="show"
       :loading="true">
  <Form ref="form"
        label-position="left"
        :model="formData"
        :label-width="80"
        style="padding: 20px;">

    <Form-item label="API Key" prop="apiKey">
      <Input v-model="formData.apiKey" placeholder="请输入API Key" type="text"></Input>
    </Form-item>

    <Form-item label="Secret Key" prop="secretKey">
      <Input v-model="formData.secretKey" placeholder="请输入Secret Key" type="text"></Input>
    </Form-item>
  </Form>
  <p>登录<a href="https://ai.baidu.com/">百度AI开放平台</a>获取API Key和Secret Key。	<a href="https://shimo.im/docs/3S37iQkpQ6Q66qrU/">如何获取？</a></p>
  <div slot="footer">
    <Button long
            type="primary"
            :loading="loading"
            @click="submit">保存</Button>
  </div>

</Modal>
</template>

<script>
export default {
  name: 'ConfigureInterface',
  data () {
    return {
      show: false,
      loading: false,
      formData: {
        apiKey: '',
        secretKey: ''
      }
    }
  },
  methods: {
    fetchData () {
      ajax.auto(apis.user.getFaceSite).then(res => {
        if (res.status) {
          this.formData.apiKey = res.data.baidu_client_id
          this.formData.secretKey = res.data.baidu_client_secret
        } else if (res.status == "-1"){
            this.$Message.error(res.msg)
            window.localStorage.removeItem('login')
            this.$router.push({ name: 'login' })
        }
//        else{
//          this.$Message.error(res.msg)
//        }
      }).catch(err => {
        this.$Message.error(err)
      })
    },

    submit () {
      ajax.auto(apis.user.editFaceSite, {
        baidu_client_id: this.formData.apiKey,
        baidu_client_secret: this.formData.secretKey
      }).then(res => {
        if (res.status){
            this.show = false;
          this.$Message.success(res.msg)
        }else if (res.status == "-1"){
          this.$Message.error(res.msg)
          window.localStorage.removeItem('login')
          this.$router.push({ name: 'login' })
        }else{
          this.$Message.error(res.msg)
        }
      }).catch(err => {
        this.$Message.error(err)
      })
    }
  },
  mounted () {
    $bus.$on('CONFIGURE_INTERFACE', () => {
      this.show = true
    })
  },
  created () {
    this.fetchData()
  }
}
</script>

<style scoped>
  p{
    font-size: 14px;
    text-align: center;
  }
</style>
