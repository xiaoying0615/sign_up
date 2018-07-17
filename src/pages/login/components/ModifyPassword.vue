<template>
<Modal title="修改密码"
       width="300"
       v-model="show"
       :loading="true">

  <Form ref="form" :model="formData" :rules="formValidate">
    <Form-item prop="oldPassword">
      <Input v-model="formData.oldPassword" placeholder="请输入旧密码" type="password"></Input>
    </Form-item>

    <Form-item prop="newPassword">
      <Input v-model="formData.newPassword" placeholder="请输入新密码" type="password"></Input>
    </Form-item>

    <Form-item prop="ensurePassword">
      <Input v-model="formData.ensurePassword" placeholder="请确认新密码" type="password"></Input>
    </Form-item>
  </Form>

  <div slot="footer">
    <Button type="error" long
            :loading="loading"
            @click="submit">修改密码</Button>
  </div>

</Modal>
</template>

<script>
export default {
  name: 'ModifyPassword',
  data () {
    return {
      show: false,
      loading: false,
      formData: {
        oldPassword: '',
        newPassword: '',
        ensurePassword: ''
      },
      formValidate: {
        oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        ensurePassword: [{ required: true, message: '请确认新密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.formData.newPassword !== this.formData.ensurePassword) {
            this.$Message.error('您的新密码两次输入不一致')
            return
          }

          //
          this.loading = true
          setTimeout(() => {
            this.show = false
            this.$Message.success('密码修改成功，请重新登录')
            window.localStorage.removeItem('login')
            this.$router.push({ name: 'login' })
          }, 1000)
        }
        else this.$Message.error('表单验证失败，请修改')
      })
    }
  },
  mounted () {
    $bus.$on('MODIFY_PASSWORD', () => {
      this.show = true
      this.$refs.form.resetFields()
    })
  }
}
</script>