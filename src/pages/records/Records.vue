<template>
<div class="container clear margin-10">
  <div class="fl" style="200px;">
    <Affix :offset-top="70">
      <Menu ref="menu"
            mode="vertical" theme="light" width="200px"
            :active-name="activeMenu"
            @on-select="menuSelected">
        <Menu-item name="signIn">
          <Icon type="film-marker"></Icon>签到数据
        </Menu-item>
        <Menu-item name="drawAward">
          <Icon type="trophy"></Icon>抽奖数据
        </Menu-item>
      </Menu>
    </Affix>
  </div>

  <router-view class="subview"></router-view>
</div>
</template>

<script>
export default {
  name: 'Setting',
  data () {
    return {
      activityId: this.$route.params.activityId,
      activeMenu: 'signIn'
    }
  },
  methods: {
    menuSelected (name) {
      switch (name) {
        case 'signIn':
          this.$router.replace({ name: 'recordsSignIn', params: { activityId: this.activityId } })
          break

        case 'drawAward':
          this.$router.replace({ name: 'recordsDrawAward', params: { activityId: this.activityId } })
          break
      }
    }
  }
}
</script>
<style scoped>
  .subview {
    margin-left: 210px !important;
  }

</style>
