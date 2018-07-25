<template>
<div class="full-screen" id="wonder">

  <div class="login-box fixed">
    <div class="logo box-shadow margin-bottom-20">
      <img src="@/assets/logo-2.png" alt="">
    </div>

    <div class="login box-shadow">
      <SignIn v-if="pannel === 'signIn'"
              @on-switch="pannelChanged"
              @on-submit="submit"></SignIn>
      <SignUp v-if="pannel === 'signUp'"
              @on-switch="pannelChanged"
              @on-submit="submit"></SignUp>
      <FindBack v-if="pannel === 'findBack'"
              @on-switch="pannelChanged"
              @on-submit="submit"></FindBack>
    </div>

    <CompanyInfo class="margin-top-20"></CompanyInfo>
  </div>
</div>
</template>

<script>
import Wonder from './Wonder'

import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import FindBack from './components/FindBack'
import CompanyInfo from '@/components/CompanyInfo'

export default {
  name: 'Login',
  components: { SignIn, SignUp, FindBack, CompanyInfo },
  data () {
    return {
      pannel: 'signIn'
    }
  },
  methods: {
    pannelChanged (pannel) {
      this.pannel = pannel
    },
    submit (formData) {
      $bus.$emit('LOGIN_LOADING')
      if (this.pannel === 'signUp') this.submitSignUp(formData)
      if (this.pannel === 'signIn') this.submitSignIn(formData)
      if (this.pannel === 'findBack') this.submitFindBack(formData)
    },

    // 注册
    submitSignUp (formData) {
      ajax.auto(apis.admin.register, {
        mobile: formData.telephone,
        password: formData.password,
        mobile_code: formData.code
      }).then(res => {
        this.$cookies.remove('_LOGIN_USER_')
        this.$Message.success('注册成功')
        setTimeout(() => {
          this.submitComplete(res.data)
        }, 1000)
      }).catch(err => {
        this.submitError(err)
      })
    },
    // 登录
    submitSignIn (formData) {
      ajax.auto(apis.admin.login, {
        mobile: formData.telephone,
        password: formData.password
      }).then(res => {
        this.$Message.success('登录成功')
        setTimeout(() => {
          this.savePassword(formData)
          this.submitComplete(res.data)
        }, 1000)
      }).catch(err => {
        this.submitError(err)
      })
    },
    // 找回密码
    submitFindBack (formData) {
      ajax.auto(apis.admin.resetPassword, {
        mobile: formData.telephone,
        password: formData.password,
        mobile_code: formData.code
      }).then(res => {
        this.$cookies.remove('_LOGIN_USER_')
        this.$Message.success('重置成功')
        setTimeout(() => {
          this.submitComplete()
        }, 1000)
      }).catch(err => {
        this.submitError(err)
      })
    },

    savePassword (formData) {
      if (this.pannel !== 'signIn') return
      if (formData.remember) {
        this.$cookies.set('_LOGIN_USER_', JSON.stringify({
          telephone: formData.telephone,
          password: formData.password,
          remember: true
        }), 60 * 60 * 24 * 7)
      } else {
        this.$cookies.remove('_LOGIN_USER_')
      }
    },
    submitComplete (userInfo) {
      if (this.pannel !== 'findBack') {
        window.localStorage.setItem('login', JSON.stringify(userInfo))
        this.$router.push({ name: 'activities' })
      }
      else {
        setTimeout(() => {
          this.pannel = 'signIn'
        }, 1000)
      }
    },
    submitError (err) {
      $bus.$emit('LOGIN_LOADING')
      this.$Message.error(err)
    }
  },
  mounted () {
    new Wonder({
      el: '#wonder',
      dotsNumber: 150,
      lineMaxLength: 300,
      dotsAlpha: .8,
      speed: 1.5,
      clickWithDotsNumber: 5
    })
  }
}
</script>

<style scoped>

#wonder{
  background: url('../../assets/bg-login.jpg') no-repeat;
  background-size: cover;
  background-position: center center;
  z-index: -1;
}

.login-box {
  width: 80%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.logo {
  padding: 30px 50px;
}

.login {
  padding: 20px;
  background: #fff;
  border-radius: 4px;
}
.logo,.login{
  width: 300px;
  margin:0 auto;
}
</style>
