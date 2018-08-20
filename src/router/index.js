import Vue from 'vue'
import Router from 'vue-router'

import Navigation from '@/components/Navigation'
import CompanyInfo from '@/components/CompanyInfo'

import Login from '@/pages/login/Login'
import Activities from '@/pages/activities/Activities'
import Design from '@/pages/design/Design'
import Helper from '@/pages/helper/Helper'
import Admin from '@/pages/admin/Admin'

import Setting from '@/pages/setting/Setting'
import SettingSignIn from '@/pages/setting/subs/SignIn'
import SettingDrawAward from '@/pages/setting/subs/DrawAward'

import Records from '@/pages/records/Records'
import RecordsSignIn from '@/pages/records/subs/SignIn'
import RecordsDrawAward from '@/pages/records/subs/DrawAward'

import Mobile from '@/pages/mobile/Mobile'
import MobileRegister from '@/pages/mobile/subs/Register'
import MobileResponse from '@/pages/mobile/subs/Response'
import MobileRegisterQuick from '@/pages/mobile/subs/RegisterQuick'

import Screen from '@/pages/screen/Screen'
import ScreenVertical from '@/pages/screen/subs/Vertical'
import ScreenVerticalAvatar from '@/pages/screen/subs/VerticalAvatar'
import ScreenVerticalBeauty from '@/pages/screen/subs/VerticalBeauty'
import ScreenHorizontal from '@/pages/screen/subs/Horizontal'
import ScreenHorizontalAvatar from '@/pages/screen/subs/HorizontalAvatar'
import ScreenHorizontalBeauty from '@/pages/screen/subs/HorizontalBeauty'
import ScreenSmall from '@/pages/screen/subs/Small'


Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  }, {
    path: '/',
    name: 'activities',
    components: {
      default: Activities,
      nav: Navigation,
      company: CompanyInfo
    },
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/design/:activityId',
    name: 'design',
    components: {
      default: Design,
      nav: Navigation,
      company: CompanyInfo
    },
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/helper',
    name: 'helper',
    components: {
      default: Helper,
      nav: Navigation,
      company: CompanyInfo
    },
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/admin',
    name: 'admin',
    components: {
      default: Admin,
      nav: Navigation,
      company: CompanyInfo
    },
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/setting/:activityId',
    name: 'setting',
    components: {
      default: Setting,
      nav: Navigation,
      company: CompanyInfo
    },
    meta: {
      requiresAuth: true
    },
    children: [{
      path: 'signIn',
      name: 'settingSignIn',
      component: SettingSignIn,
      meta: {
        requiresAuth: true
      }
    }, {
      path: 'drawAward',
      name: 'settingDrawAward',
      component: SettingDrawAward,
      meta: {
        requiresAuth: true
      }
    }]
  }, {
    path: '/records/:activityId',
    name: 'records',
    components: {
      default: Records,
      nav: Navigation,
      company: CompanyInfo
    },
    meta: {
      requiresAuth: true
    },
    children: [{
      path: 'signIn',
      name: 'recordsSignIn',
      component: RecordsSignIn,
      meta: {
        requiresAuth: true
      }
    }, {
      path: 'drawAward',
      name: 'recordsDrawAward',
      component: RecordsDrawAward,
      meta: {
        requiresAuth: true
      }
    }]
  }, {
    path: '/mobile/:activityId',
    name: 'mobile',
    component: Mobile,
    meta: {
      requiresAuth: false
    },
    children: [{
      path: 'sign',
      name: 'mobileSign',
      component: MobileRegister,
      meta: {
        requiresAuth: false
      }
    }, {
      path: 'response',
      name: 'mobileResponse',
      component: MobileResponse,
      meta: {
        requiresAuth: false
      }
    }, {
      path: 'signquick',
      name: 'mobileSignQuick',
      component: MobileRegisterQuick,
      meta: {
        requiresAuth: false
      }
    }]
  }, {
    path: '/screen/:activityId',
    name: 'screen',
    component: Screen,
    meta: {
      requiresAuth: false
    },
    children: [{
      path: 'vertical',
      name: 'screenVertical',
      component: ScreenVertical,
      meta: {
        requiresAuth: false
      }
    },{
      path: 'verticalavatar',
      name: 'screenVerticalAvatar',
      component: ScreenVertical,
      meta: {
        requiresAuth: false
      }
    },{
      path: 'verticalbeauty',
      name: 'screenVerticalBeauty',
      component: ScreenVertical,
      meta: {
        requiresAuth: false
      }
    }, {
      path: 'horizontal',
      name: 'screenHorizontal',
      component: ScreenHorizontal,
      meta: {
        requiresAuth: false
      }
    }, {
      path: 'horizontalavatar',
      name: 'screenHorizontalAvatar',
      component: ScreenHorizontal,
      meta: {
        requiresAuth: false
      }
    }, {
      path: 'horizontalbeauty',
      name: 'screenHorizontalBeauty',
      component: ScreenHorizontal,
      meta: {
        requiresAuth: false
      }
    }, {
      path: 'small',
      name: 'screenSmall',
      component: ScreenHorizontal,
      meta: {
        requiresAuth: false
      }
    }]
  }]
})

const isMobile = !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/)
if (!isMobile) document.body.style = 'min-width: 1080px;'

// 游客页面
router.beforeEach((to, from, next) => {
  // next()
  if (to.meta.requiresAuth){
    window.localStorage.login ? next() : next({ name: 'login' })
  } else next()
})

export default router
