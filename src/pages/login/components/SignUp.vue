<template>
<!-- 注册 -->
<div>
  <h1 class="text-align-center margin-bottom-20">会员注册</h1>

  <FormList type="signUp" ref="form"></FormList>

  <Button type="success" long icon="person-add" class="margin-bottom-10"
          :loading="loading"
          @click="submit">立即注册</Button>

  <p class="clear">
      <a href="javascript:;" class="fl"
         @click="switchPannel('signIn')">
        <Icon type="log-in"></Icon>
        会员登录
      </a>
    </p>
</div>
</template>

<script>
import FormList from './FormList'

export default {
  name: 'SignUp',
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