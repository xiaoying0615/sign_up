<template>
  <div class="container clear">
    <div class="fl" style="width:200px;">
      <Affix :offset-top="60">
        <Menu ref="menu" mode="vertical" theme="dark" width="200px" active-name="1-1" :open-names="['1']"
              @on-select="menuSelected">
          <Submenu name="1">
            <template slot="title">
              <Icon type="compose"/>
              签到设置
            </template>
            <MenuItem name="1-1">基础设置</MenuItem>
            <MenuItem name="1-2">屏幕规格</MenuItem>
            <MenuItem name="1-3">主题背景</MenuItem>
            <MenuItem name="1-4">签到墙</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="trophy"/>
              抽奖设置
            </template>
            <MenuItem name="2-1">抽奖设置</MenuItem>
          </Submenu>
        </Menu>
      </Affix>
    </div>
    <router-view class="subview fr"></router-view>
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
          case '1-1':
            this.$router.replace({name: 'settingSignIn', params: {activityId: this.activityId}, get: {menu: 1}})
            break
          case '1-2':
            this.$router.replace({name: 'settingSignIn', params: {activityId: this.activityId}, get: {menu: 2}})
            break
          case '1-3':
            this.$router.replace({name: 'settingSignIn', params: {activityId: this.activityId}, get: {menu: 3}})
            break
          case '1-4':
            this.$router.replace({name: 'settingSignIn', params: {activityId: this.activityId}, get: {menu: 4}})
            break

          case '2-1':
            this.$router.replace({name: 'settingDrawAward', params: {activityId: this.activityId}})
            break
        }
      }
    }
  }
</script>
<style scoped>
  .subview{
    width:calc(100% - 210px);
  }
  .subview > div {
    /*margin-left: 210px !important;*/
    width: 100%;
  }
</style>
