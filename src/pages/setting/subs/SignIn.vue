<template>
  <Loading v-if="loading">加载中，请稍候...</Loading>
  <div v-else>
    <div v-if="menu === '1-1'" class="baseSet padding-10 bg-white margin-top-10 margin-right-10 box-shadow">
      <p class="part-title">基础设置</p>
      <Form class="padding-right-10" :label-width="80" :model="formData">
        <Form-item label="活动名称" prop="name">
          <Input placeholder="请输入活动名称" v-model="formData.name"></Input>
          <p class="gray">活动主题将显示在大屏幕顶端，建议在15个汉字左右</p>
        </Form-item>
        <Form-item label="有效时间">
          <Date-picker type="date" v-model="formData.startTime" readonly></Date-picker>
          <span class="padding-10">-</span>
          <Date-picker v-model="formData.endTime" type="date" :clearable="false" :options="endDateLimit"
                       :readonly="status === 3"></Date-picker>

          <p class="gray" v-if="status === 3">高级活动不支持修改结束时间</p>
          <p class="gray" v-else>请在活动失效前使用，否则活动将被系统自己关闭</p>
        </Form-item>
      </Form>
      <p class="part-title">高级设置</p>
      <Tabs type="card">
        <TabPane label="版权信息">
          <div class="version">
            <p v-if="showVersion" class="clear">如需去除【靠我啦kaowola 免费技术支持】版权信息，请点击开通。
              <Button class="fr" shape="circle" type="primary" @click="removeVersion">开通</Button>
              <span class="fr">99元/场</span></p>
            <p v-else>您已去除版权信息</p>
          </div>
        </TabPane>
      </Tabs>
      <div class="clear">
        <Button type="primary" class="fr submit"
                :loading="submitLoading"
                @click="baseInfoSubmit">保存
        </Button>
      </div>
    </div>
    <div v-if="menu === '1-2'" class="padding-10 bg-white margin-top-10 margin-right-10 box-shadow">
      <p class="part-title">屏幕规格</p>
      <Form label-position="left" :label-width="90" class="margin-left-10 padding-left-10">
        <Form-item label="屏幕方向">
          <RadioGroup v-model="formData.screenType" type="button">
            <Radio :label="1">横向</Radio>
            <Radio :label="2">纵向</Radio>
            <Radio :label="3">小屏</Radio>
          </RadioGroup>
        </Form-item>

        <Form-item label="显示样式">
          <Radio-group v-model="formData.contentType" type="button">
            <Radio :label="1">人脸属性</Radio>
            <Radio :label="2">个人信息</Radio>
          </Radio-group>
        </Form-item>
      </Form>
      <div class="clear">
        <Button type="primary" class="fr submit"
                :loading="submitLoading"
                @click="screenInfoSubmit">保存
        </Button>
      </div>
    </div>
    <div v-if="menu === '1-3'" class="padding-10 bg-white margin-top-10 margin-right-10 box-shadow">
      <p class="part-title">背景图片</p>

      <Button v-if="formData.screenType === 3" disabled style="width: 200px">上传图片</Button>
      <Uploader v-else :url="url"
                :data="extraData"
                :previewImage="formData.backgroundImage"
                @on-change="uploadChanged"></Uploader>

      <p class="margin-top-20">请上传 2Mb 以内的图片，建议图片宽高比：竖屏9:16，横屏16:9</p>

      <p class="part-title">主题样式</p>
      <div class="pl-20">
        <Tabs type="card" v-if="formData.screenType !== 3">
          <TabPane label="头像模块">
            <div class="version">
              <p class="clear">
                设置是否需要显示/隐藏头像模块
                <i-switch v-model="formData.avatarShow" size="large" class="fr" :disabled="!avatarStyleOpen && !beautyStyleOpen" >
                  <span slot="open">显示</span>
                  <span slot="close">隐藏</span>
                </i-switch>
              </p>
            </div>
          </TabPane>
        </Tabs>
        <ul v-if="formData.screenType === 1" class="style h-style clear">
          <li :class="{selected: formData.styleId === 1}">
            <div class="img" @click="formData.styleId = 1">
              <img src="@/assets/set/h-1.jpg" alt="">
            </div>
            <p>默认 <a @click="previewImg($event)">预览</a></p>
          </li>
          <li :class="{selected: formData.styleId === 2}">
            <div class="img" @click="avatarStyleOpen ? formData.styleId = 2 : null">
              <img src="@/assets/set/h-2.jpg" alt="">
            </div>
            <p>头像姓名 <a @click="previewImg($event)">预览</a> <a v-if="!avatarStyleOpen" @click="openAvatarStyle">开通</a></p>
          </li>
          <li :class="{selected: formData.styleId === 3}">
            <div class="img" @click="beautyStyleOpen ? formData.styleId = 3 : null">
              <img src="@/assets/set/h-3.jpg" alt="">
            </div>
            <p>头像颜值 <a @click="previewImg($event)">预览</a> <a v-if="!beautyStyleOpen" @click="openBeautyStyle">开通</a></p>
          </li>
        </ul>
        <ul v-if="formData.screenType === 2" class="style v-style clear">
          <li  :class="{'selected': formData.styleId === 1}">
            <div class="img" @click="formData.styleId = 1">
              <img src="@/assets/set/v-1.jpg" alt="">
            </div>
            <p>默认 <a @click="previewImg($event)">预览</a></p>
          </li>
          <li :class="{'selected': formData.styleId === 2}">
            <div class="img" @click="avatarStyleOpen ? formData.styleId = 2 : null">
              <img src="@/assets/set/v-2.jpg" alt="">
            </div>
            <p>头像姓名 <a @click="previewImg($event)">预览</a> <a v-if="!avatarStyleOpen" @click="openAvatarStyle">开通</a></p>
          </li>
          <li :class="{'selected': formData.styleId === 3 }">
            <div class="img" @click="beautyStyleOpen ? formData.styleId = 3 : null">
              <img src="@/assets/set/v-3.jpg" alt="">
            </div>
            <p>头像颜值 <a @click="previewImg($event)">预览</a> <a v-if="!beautyStyleOpen" @click="openBeautyStyle">开通</a></p>
          </li>
        </ul>
        <ul v-if="formData.screenType === 3" class="style">
          <li class="selected">
            <div class="img">
              <img src="@/assets/set/small.jpg" alt="">
            </div>
            <p>默认 <a @click="previewImg($event)">预览</a></p>
          </li>
        </ul>
      </div>
      <div class="clear">
        <Button type="primary" class="fr submit"
                :loading="submitLoading"
                @click="backgroundSubmit" :disabled="formData.screenType === 3">保存
        </Button>
      </div>
    </div>
    <div v-if="menu === '1-4'" class="padding-10 bg-white margin-top-10 margin-right-10 box-shadow">
      <p class="part-title">签到墙</p>

      <Form label-position="left" :label-width="90" class="margin-left-10 padding-left-10">
        <Form-item label="头像上墙">
          <Radio-group v-model="formData.avatarType" type="button">
            <Radio :label="1">默认</Radio>
            <Radio :label="2">3D签到</Radio>
          </Radio-group>
        </Form-item>
      </Form>
      <div class="clear">
        <Button type="primary" class="fr submit"
                :loading="submitLoading"
                @click="avatarTypeSubmit">保存
        </Button>
      </div>
    </div>
    <Payment></Payment>
    <PreviewImg></PreviewImg>
  </div>
</template>
<script>
  import Uploader from '@/components/Uploader'
  import Payment from '@/components/Payment'
  import PreviewImg from '@/pages/setting/components/PreviewImg'

  export default {
    name: 'SignIn',
    components: {Uploader, Payment, PreviewImg},
    data () {
      return {
        loading: true,
        id: '',
        type: 'normal',
        url: apis.activity.uploadImage,
        extraData: [{
          key: 'id',
          value: 1
        }],
        submitLoading: false,
        formData: {
          name: '活动名称',
          startTime: '',
          endTime: '',
          screenType: 1, // horizontal-1 vertical-2 smallScreen-3
          contentType: 1, // terse-1 complex-2
          avatarType: 1, // default-1 3D-2
          backgroundImage: '',
          avatarShow: false,//	 false代表不显示，true代表显示 -----接口值互换 1=显示头像模块0=不显示
          styleId: 1, //主题风格ID，1=默认风格 2=头像风格 3=头像颜值风格
        },
        dataBack:{
        },
        isSave:false,//是否保存修改
        status: 0,
        menu: "1-1",
        showVersion: true,
        avatarStyleOpen: false,//false代表否，true头像风格已购买 -----"string,新增字段，1=头像风格已购买0=否",
        beautyStyleOpen: false,//false代表否，true代表颜值风格已购买 -----"string,新增字段，1=颜值风格已购买0=否"
        endDateLimit: {}
      }
    },
    methods: {
      uploadChanged (info) {
        if (info.type === 'success') this.formData.backgroundImage = info.data.background
      },

      readFromLocal () {
        const data = JSON.parse(window.localStorage.activityInfo)
        this.id = data.id
        this.type = data.status == 1 || data.status == 2 ? 'normal' : 'vip'
        this.formData.name = data.name
        this.formData.startTime = data.start_time
        this.formData.endTime = data.end_time
      },

      fetchData () {
        ajax.auto(apis.activity.fetchInfo, {id: this.id})
          .then(res => {
            this.loading = false
            const data = res.data
            this.type = data.status == 1 || data.status == 2 ? 'normal' : 'vip'
            this.formData.name = data.name
            this.formData.startTime = data.start_time
            this.formData.endTime = data.end_time
            this.formData.screenType = data.screen_type
            this.formData.contentType = data.content_type
            this.formData.avatarType = data.avatar_type
            this.formData.backgroundImage = apis.baseUrl + data.background  //把前缀补齐
            this.showVersion = !!Number(data.version_show)
            this.formData.avatarShow = !!Number(data.avatar_show)
            this.formData.styleId = data.style_id
            this.avatarStyleOpen = !!Number(data.avatar_style_open)
            this.beautyStyleOpen = !!Number(data.beauty_style_open)
            this.status = data.status
            this.dataBack = { ...this.formData }
            console.log(this.dataBack )
            this.endDateLimit = {
              disabledDate (date) {
                return date && date.valueOf() < new Date(data.start_time).getTime()
              }
            }
          })
          .catch(err => {
            this.$Message.error(err)
          })
      },

      removeVersion () {
        $bus.$emit('ACTIVITY-PAYMENT', {
          type: 'removeVersion',
          activityId: this.id
        })
      },

      openAvatarStyle () {
        $bus.$emit('ACTIVITY-PAYMENT', {
          type: 'openAvatarStyle',
          activityId: this.id
        })
      },

      openBeautyStyle () {
        $bus.$emit('ACTIVITY-PAYMENT', {
          type: 'openBeautyStyle',
          activityId: this.id
        })
      },

      formValidate () {
        if (!this.formData.name) {
          this.$Message.warning('请填写活动名称')
          return false
        }
        if (!this.formData.endTime) {
          this.$Message.warning('请选择活动结束时间')
          return false
        }
        // if (this.formData.startTime > this.formData.endTime) {
        //   this.$Message.error('活动结束时间不能早于或等于开始时间')
        //   return false
        // }
        // if (!this.formData.backgroundImage) {
        //   this.$Message.warning('请上传背景图片')
        //   return false
        // }
        return true
      },

      baseInfoSubmit () {
        if (!this.formValidate()) return
        this.submitLoading = true
        setTimeout(() => {
          this.submitLoading = false
        }, 500)
        ajax.auto(apis.activity.editBaseInfo, {
          id: this.id,
          name: this.formData.name,
          end_time: util.dateFormat(this.formData.endTime)
        }).then(res => {
          this.$Message.success('修改成功')
          this.isSave = true
          // this.$router.go(-1)
          // $bus.$emit('REDIRECT_PANNEL', this.type)
        }).catch(err => {
          this.$Message.error(err)
        })
      },

      screenInfoSubmit () {
//        if (!this.formValidate()) return
        this.submitLoading = true
        setTimeout(() => {
          this.submitLoading = false
        }, 500)
        ajax.auto(apis.activity.editScreenInfo, {
          id: this.id,
          screen_type: this.formData.screenType,
          content_type: this.formData.contentType
        }).then(res => {
          this.$Message.success('修改成功')
          this.isSave = true
          // this.$router.go(-1)
          // $bus.$emit('REDIRECT_PANNEL', this.type)
        }).catch(err => {
          this.$Message.error(err)
        })
      },

      avatarTypeSubmit () {
//        if (!this.formValidate()) return
        this.submitLoading = true
        setTimeout(() => {
          this.submitLoading = false
        }, 500)
        ajax.auto(apis.activity.editAvatarType, {
          id: this.id,
          avatar_type: this.formData.onWallType
        }).then(res => {
          this.$Message.success('修改成功')
          this.isSave = true
          // this.$router.go(-1)
          // $bus.$emit('REDIRECT_PANNEL', this.type)
        }).catch(err => {
          this.$Message.error(err)
        })
      },

      backgroundSubmit () {
//        if (!this.formValidate()) return
        this.submitLoading = true
        setTimeout(() => {
          this.submitLoading = false
        }, 500)
        ajax.auto(apis.activity.editBackground, {
          id: this.id,
          background: this.formData.backgroundImage,
          avatar_show: this.formData.avatarShow ? 1: 0,
          style_id: this.formData.styleId
        }).then(res => {
          this.$Message.success('修改成功')
          this.isSave = true
          // this.$router.go(-1)
          // $bus.$emit('REDIRECT_PANNEL', this.type)
        }).catch(err => {
          this.$Message.error(err)
        })
      },

      previewImg (event) {
        $bus.$emit('PREVIEW-IMG', {
          imgsrc: event.target.parentNode.parentNode.getElementsByTagName("img")[0].src
        })
      }
    },
    created () {
      // this.readFromLocal()
      this.id = this.$route.params.activityId
      this.menu = this.$route.query.menuItem ? this.$route.query.menuItem : "1-1"
      this.fetchData()
      $bus.$on('SIGNIN_SETTING_RELOAD', () => {
        this.fetchData()
      })
      console.log(this)
    },
    beforeRouteUpdate (to, from, next) {
      if(this.isSave === true){
        this.dataBack = { ...this.formData}
      }else{
        this.formData = { ...this.dataBack}
      }
      if (to.query.menuItem) {
        this.menu = to.query.menuItem
      }
      this.isSave = false
      next()
    }
  }
</script>
<style scoped>
  .gray {
    color: #757575;
  }
  .pl-20{
    padding-left: 20px;
  }
  .version {
    background-color: #d9e7ff;
    border-bottom: 5px solid #a8c8ff;
    padding: 36px 20px;
  }

  .version p {
    line-height: 30px;
    color: #757575;
  }

  .baseSet .version button {
    width: 100px;
    height: 30px;
    background-color: #cfa972;
    border-width: 0;
  }

  .baseSet .version span {
    font-size: 20px;
    color: #000;
    padding-right: 60px;
  }

  .submit {
    width: 150px;
    height: 44px;
    margin: 30px 0px;
    font-size: 16px;
  }

  .ivu-radio-group label {
    border-radius: 0 !important;
    margin-right: 35px;
    width: 100px;
    text-align: center;
  }

  .ivu-radio-wrapper-checked {
    background-color: #adc5ff;
    color: #fff;
  }

  .style li{
    list-style: none;
    width: 230px;
    margin:20px 100px 0 0;
  }
  .h-style li,.v-style li{
    float: left;
  }
  .h-style li{
    width: 394px;
  }
  .v-style li{
    width: 226px;
  }
  .style li .img{
    position: relative;
    width: 100%;
    height: auto;
    border: 5px solid #cccccc;
    border-radius: 5px;
  }
  .style .selected .img{
    border-color: #70a8ed;
  }

  .style .selected .img:before{
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 56px;
    height: 56px;
    background: url("../../../assets/set/selected.png") no-repeat top right /cover;
  }

  .style li p{
    width: 100%;
    text-align: center;
    color: #999;
    font-size: 14px;
    padding-top: 5px;
  }
  .style li p a{
    color: #2d8cf0;
    padding:0 5px;
  }
</style>
