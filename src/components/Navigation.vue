<template>
<div class="nav">
  <Menu mode="horizontal" theme="primary"
        :active-name="menu"
        @on-select="menuSelected">

    <div class="nav-logo fl" @click="goHomePage">
      <img src="@/assets/logo-3.png">
    </div>

    <Menu-item name="activities">
      <Icon type="grid"></Icon>
      我的活动
    </Menu-item>

    <Menu-item name="helper">
      <Icon type="umbrella"></Icon>
      使用帮助
    </Menu-item>

    <Menu-item name="admin" v-if="isAdmin">
      <Icon type="person-stalker"></Icon>
      会员管理
    </Menu-item>

    <Dropdown class="account fr" @on-click="dropdownClicked">
      <a href="javascript:;">
        <Icon type="person"></Icon>
        欢迎您，{{userTel}}
        <Icon type="arrow-down-b"></Icon>
      </a>

      <Dropdown-menu slot="list">
        <Dropdown-item name="orderHistory">
          <Icon type="android-list"></Icon>
          交易记录
        </Dropdown-item>
        <Dropdown-item name="modifyPassword">
          <Icon type="unlocked"></Icon>
          修改密码
        </Dropdown-item>
        <Dropdown-item name="configureInterface">
          <Icon type="android-options"></Icon>
          配置接口
        </Dropdown-item>
        <Dropdown-item name="logout">
          <Icon type="power"></Icon>
          退出登录
        </Dropdown-item>
      </Dropdown-menu>
    </Dropdown>

    <!-- <Submenu name="account" class="fr">
      <template slot="title">
        欢迎您，13888888888
      </template>

      <Menu-item name="account-password">
        <Icon type="unlocked"></Icon>
        修改密码
      </Menu-item>

      <Menu-item name="account-trade">
        <Icon type="social-usd"></Icon>
        交易明细
      </Menu-item>

      <Menu-item name="account-logout">
        <Icon type="power"></Icon>
        退出登录
      </Menu-item>

    </Submenu> -->

  </Menu>
  <ConfigureInterface></ConfigureInterface>
  <ModifyPassword></ModifyPassword>
  <OrderHistory></OrderHistory>
</div>

</template>

<script>
import ConfigureInterface from '@/pages/setting/components/ConfigureInterface'
import ModifyPassword from '@/pages/login/components/ModifyPassword'
import OrderHistory from '@/pages/records/components/OrderHistory'

export default {
  name: 'Navigation',
  components: { ConfigureInterface,ModifyPassword, OrderHistory },
  data () {
    return {
      menu: 'activities',
      userTel: '',
      isAdmin: false
    }
  },
  methods: {
    goHomePage () {
      window.open('http://www.kaowola.com')
    },

    dropdownClicked (name) {
      if (name === 'configureInterface') {
        $bus.$emit('CONFIGURE_INTERFACE')
      } else if (name === 'modifyPassword') {
        $bus.$emit('MODIFY_PASSWORD')
      } else if (name === 'orderHistory') {
        $bus.$emit('ORDER_HISTORY')
      } else {
        this.$Modal.confirm({
          title: '是否确定退出？',
          content: '<p>您将退出靠我啦后台管理系统。</p>',
          onOk: () => {
            // logout
            window.localStorage.removeItem('login')
            this.$router.push({ name: 'login' })
          }
        })
      }
    },

    showSelectedMenu () {
      this.menu = this.$route.name
    },

    menuSelected (menu) {
      if (menu === 'helper') {
        window.open('http://www.kaowola.com/#/help')
      } else {
        this.$router.push({ name: menu })
      }
    },

    showUser () {
      const userInfo = JSON.parse(window.localStorage.login)
      this.isAdmin = !userInfo.role_id
      this.userTel = userInfo.mobile
    }
  },
  created () {
    // document.getElementById('app').style = "padding-top: 60px;"

    this.showUser()
    this.showSelectedMenu()
  }
}
</script>

<style scoped>
.nav {
  position: fixed;
  width: 100%;
  min-width: 1080px;
  left: 0;
  top: 0;
  z-index: 10;
}

.nav-logo {
  width: 60px;
  margin: 14px 20px;
  cursor: pointer;
}

.account a {
  padding: 0 20px;
  color: #fff;
}

.account .ivu-icon {
  margin-right: 6px;
}
</style>
