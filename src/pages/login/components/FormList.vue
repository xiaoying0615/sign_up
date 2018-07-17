<template>
<Form class="margin-bottom-10"
      ref="form" :model="formData" :rules="formValidate">
  <Form-item prop="telephone">
    <Input v-model="formData.telephone" placeholder="请输入手机号" icon="ios-telephone"></Input>
  </Form-item>

  <Form-item prop="code" v-if="type !== 'signIn'">
    <Input placeholder="请输入验证码" v-model="formData.code">
      <Button slot="append" style="min-width: 92px;"
              @click="getSMSCode">{{leftTime === 0 ? '获取验证码' : leftTime + ' 秒'}}</Button>
    </Input>
  </Form-item>

  <Form-item prop="password">
    <Input v-model="formData.password" :placeholder="type === 'findBack' ? '请输入你的新密码' : '请输入密码'" type="password" icon="key"></Input>
  </Form-item>

  <Form-item v-if="type === 'signIn'" style="margin-bottom: 0;">
    <Checkbox v-model="formData.remember">记住密码</Checkbox>
  </Form-item>
</Form>
</template>

<script>
const waitTime = 30
let interval

export default {
  name: 'FormList',
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      leftTime: 0,

      formData: {
        telephone: '',
        code: '',
        password: '',
        remember: false
      },
      formValidate: {
        telephone: [{ required: true, message: '请输入手机号', trigger: 'blur' },
                    { type: 'string', len: 11, message: '请输入正确的手机号', trigger: 'blur'}],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        password: [{ required: true, message: this.type === 'findBack' ? '请输入你的新密码' : '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    getSMSCode () {
      if (this.leftTime) {
        this.$Message.warning('验证码正在发送中...')
        return
      }
      if (Number(this.formData.telephone[0]) !==1 || isNaN(this.formData.telephone) || this.formData.telephone.length !== 11) {
        this.$Message.warning('请输入正确的手机号')
        return
      }
      ajax.auto(apis.admin[this.type === 'signUp' ? 'registerSendSMS' : 'resetPasswordSendSMS'], { mobile: this.formData.telephone })
          .then(res => {
            this.$Message.success('验证码已发送')
            this.leftTime = waitTime
            interval = setInterval(() => {
              this.leftTime -= 1
              if (!this.leftTime) clearInterval(interval)
            }, 1000)
          })
          .catch(err => {
            this.$Message.error(err)
          })
    },

    doValidate (submit) {
      this.$refs.form.validate(valid => {
        if (valid) submit && submit(this.formData)
        else this.$Message.error('表单验证失败，请修改')
      })
    },

    showRememberedUser () {
      if (this.type !== 'signIn') return
      let user = this.$cookies.get('_LOGIN_USER_')
      if (!user) return
      Object.assign(this.formData, JSON.parse(user))
    }
  },
  created () {
    this.showRememberedUser()
  }
}
</script>