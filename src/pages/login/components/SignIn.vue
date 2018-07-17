<template>
<!-- 登录 -->
<div>
  <h1 class="text-align-center margin-bottom-20">会员登录</h1>

  <FormList type="signIn" ref="form"></FormList>

  <Button type="success" long icon="log-in" class="margin-bottom-10"
          :loading="loading"
          @click="submit">立即登录</Button>

  <p class="clear">
      <a href="javascript:;" class="fl"
         @click="switchPannel('signUp')">
        <Icon type="person-add"></Icon>
        注册会员
      </a>
      <a href="javascript:;" class="fr"
         @click="switchPannel('findBack')">
        <Icon type="help"></Icon>
        忘记密码
      </a>
    </p>
</div>
</template>

<script>
import FormList from './FormList'

export default {
  name: 'SignIn',
  components: { FormList },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    switchPannel (pannel) {
      this.$emit('on-switch', pannel)
    },
    submit () {
      this.$refs.form.doValidate(formData => {
        this.$emit('on-submit', formData)
      })
    }
  },
  created () {
    $bus.$on('LOGIN_LOADING', () => { this.loading = !this.loading })
  }
}
</script>