<template>
<!-- 忘记密码 -->
<div>
  <h1 class="text-align-center margin-bottom-20">重置密码</h1>

  <FormList type="findBack" ref="form"></FormList>

  <Button type="error" long icon="unlocked" class="margin-bottom-10"
          :loading="loading"
          @click="submit">立即重置</Button>

  <p class="clear">
      <a href="javascript:;" class="fl"
         @click="switchPannel('signIn')">
        <Icon type="log-in"></Icon>
        会员登录
      </a>
      <a href="javascript:;" class="fr"
         @click="switchPannel('signUp')">
        <Icon type="person-add"></Icon>
        注册会员
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
    $bus.$on('LOGIN_LOADING', () => { this.loading = this.loading })
  }
}
</script>