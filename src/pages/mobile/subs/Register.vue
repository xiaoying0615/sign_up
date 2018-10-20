<template>
    <div  ref="mobile" class="mobile layer" :style="data.background | backgroundRender">
      <div v-if="pageLoading && !isModel">
        <Spin fix style="background: #fff;">
          <Icon type="load-c" size=60 class="spin-icon-load"></Icon>
          <div>数据加载中</div>
        </Spin>
      </div>
      <div v-else>
        <div class="mobile-body">

          <!-- 上传头像 -->
          <div class="text-align-center">
            <div class="camera-btn" :style="cameraRender" @click="upload">
              <Icon v-if="!avatar" type="camera"></Icon>
              <img class="camera-preview" v-else :src="baseUrl + avatar">
            </div>
            <p class="upload-tip margin-top-10" v-if="!this.data.background">请上传头像</p>
          </div>

          <div class="form" :style="{ width: clientWidth * 0.7 + 'px' }">

            <template v-for="item in data.form">
              <div class="form-item">
                <input type="tel" :placeholder="item.placeholder" v-model="item.value" v-if="item.type === 'telephone'">
                <input type="email" :placeholder="item.placeholder" v-model="item.value" v-if="item.type === 'email'">
                <input type="number" :placeholder="item.placeholder" v-model="item.value" v-if="item.type === 'number'">
                <input type="text" :placeholder="item.placeholder" v-model="item.value" v-if="item.type === 'text'">
                <template v-if="item.type === 'select'">
                  <select v-model="item.value">
                    <option value="unselectedOption">{{item.placeholder}}</option>
                    <option :value="option.value" v-for="option in item.options">{{option.value}}</option>
                  </select>
                  <Icon type="chevron-down" size="16" class="select-icon"></Icon>
                </template>
              </div>

              <!-- <div class="clear" v-if="item.needValid"> -->
              <div class="clear" v-if="item.type === 'telephone'">
                <Button type="ghost" class="mobile-btn code-sender fr"
                        @click="getSMSCode(item.value)">{{leftTime === 0 ? '获取验证码' : leftTime + ' 秒'}}</Button>
                <div class="form-item telephone-code">
                  <input type="number" placeholder="验证码" v-model="checkCode">
                </div>
              </div>
            </template>

            <Button type="ghost" class="mobile-btn submit margin-top-20"
                    long :loading="loading" @click="submit">提交</Button>

          </div>
        </div>

        <p class="support-tip" v-if="showVersion"><a href="javascript:;">靠我啦kaowola</a> 免费技术支持</p>

        <PhotoTip v-if="!isModel" ></PhotoTip>

        <div class="mobile" id="prevent-layer" v-if="isModel" ></div>
      </div>

    </div>
</template>

<script>
import PhotoTip from '../components/PhotoTip'
import util from '@/utils/util'

import defaultBackground from '@/assets/bg-form.jpg'

const waitTime = 30
let interval

export default {
  name: 'Register',
  components: { PhotoTip },
  model: {
    prop: 'info'
  },
  props: {
    isModel: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => ({ form: [] })
    },
    versionPaied: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      clientWidth: 0,
      loading: false,
      uploadImgUrl:apis.mobile.avatar,
      data: {
        background: '',
        form: []
      },
      avatar: '', //'https://static.cxstore.top/images/avatar1.jpg',
      checkCode: '',
      leftTime: 0,
      baseUrl:"",
      showVersion: true,
      pageLoading:true
    }
  },
  computed: {
    cameraRender () {
      return {
        width: this.clientWidth * 0.2 +'px',
        height: this.clientWidth * 0.2 +'px',
        lineHeight: this.clientWidth * 0.2 +'px'
      }
    }
  },
  filters: {
    backgroundRender (background) {
      return {
        background: `url(${background ? background.indexOf(apis.baseUrl) >= 0 ? background : apis.baseUrl + background : defaultBackground}) center center / cover no-repeat`
      }
    }
  },
  methods: {
    // 初始化 判断当前是移动端还是可视化操作
    init () {
      this.showVersion = !this.versionPaied
      if (this.isModel) {
        this.data = this.info
        document.getElementById('prevent-layer').onclick = (e) => {
          e.stopPropagation()
          e.preventDefault()
        }
      }
      else this.fetchData()
    },

    // 头像上传监听
    watchAvatar () {
      $bus.$on('AVATAR_SUCCESS', image => {
        this.avatar = image
      })
    },

    // 重置背景图
    resetBackground (background) {},

    // 上传图片 展示上传提示
    upload () {
      $bus.$emit('SHOW_PHOTO_TIP')
    },

    // 发送验证码
    getSMSCode (telephone) {
      if (this.leftTime) {
        this.$Message.warning('验证码已发送，请注意查收')
        return
      }
      if (Number(telephone[0]) !==1 || isNaN(telephone) || telephone.length !== 11) {
        this.$Message.warning('请输入正确的手机号')
        return
      }
      ajax.auto(apis.mobile.sendSMS, { mobile: telephone })
          .then(res => {
            this.$Message.success('验证码发送成功')
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

    // 移动端获取初始化数据
    fetchData () {
      ajax.auto(apis.mobile.index, { id: this.$route.params.activityId })
          .then(res => {
            const data = res.data
            // 未登录
            if (!Number(data.is_login)) {
              window.location.href = data.url
            }
            else{
              this.pageLoading = false
              // 未报名
              if (!Number(data.is_clock)) {
                document.title = data.name
                this.showVersion = !!Number(data.version_show)
                this.data.background = data.sign_background
                this.data.form = util.registerDataFormat(data.form)
              }
              // 已报名
              else {
                this.$router.replace({
                  name: 'mobileResponse',
                  query: {
                    id: data.sign_id
                  }
                })
              }
            }
          }).catch(err => {
            this.$Message.error(err)
          })
    },

    formValidate () {
      if (!this.avatar) {
        this.$Message.warning('请上传头像')
        return false
      }
      for (let i = 0; i < this.data.form.length; i++) {
        const item = this.data.form[i]
        if (!item.value || !item.value.length || item.value === 'unselectedOption') {
          this.$Message.warning(item.placeholder)
          return false
        }
        if (item.type === 'telephone' && !this.checkCode) {
          this.$Message.warning('请输入验证码')
          return false
        }
      }

      return true
    },

    submit () {
      if (!this.formValidate()) return
      this.loading = true
      ajax.auto(apis.mobile.doClock, {
        id: this.$route.params.activityId,
        avatar: this.avatar,
        form: util.registerClockDataStringify(this.data.form, this.checkCode)
      }).then(res => {
        this.$Message.success('提交成功')
        setTimeout(() => {
          this.$router.replace({
                name: 'mobileResponse',
                query: {
                  id: res.data.sign_id
                }
              })
        }, 1000)
      }).catch(err => {
        this.$Message.error(err)
        this.loading = false
      })

    }
  },
  watch: {
    info () {
      this.data = this.info
    },
    versionPaied () {
      this.showVersion = !this.versionPaied
    }
  },
  mounted () {
    document.title = ""
    this.clientWidth = this.$refs.mobile.clientWidth
    this.baseUrl = apis.baseUrl
    this.watchAvatar()
    this.init()
  }
}
</script>

<style scoped>
@import url('../mobile.css');
.spin-icon-load{
  margin-bottom: 15px;
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from { transform: rotate(0deg);}
  50%  { transform: rotate(180deg);}
  to   { transform: rotate(360deg);}
}

</style>
