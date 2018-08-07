<template>
  <Loading v-if="loading">加载中，请稍候...</Loading>
  <div v-else>
    <div v-if="menu === '1'" class="baseSet padding-10 bg-white margin-top-10 margin-right-10 box-shadow">
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
                @click="submit">保存
        </Button>
      </div>
    </div>
    <div v-if="menu === '2'"class="padding-10 bg-white margin-top-10 margin-right-10 box-shadow">
      <p class="part-title">屏幕规格</p>
      <Form class="padding-right-10" :label-width="80">
        <Form-item label="屏幕方向">
          <Radio-group v-model="formData.screenType">
            <Radio :label="1">横向</Radio>
            <Radio :label="2">竖向</Radio>
          </Radio-group>
        </Form-item>

        <Form-item label="显示样式">
          <Radio-group v-model="formData.contentType">
            <Radio :label="1">人脸属性</Radio>
            <Radio :label="2">个人信息</Radio>
          </Radio-group>
        </Form-item>
      </Form>
      <div class="clear">
        <Button type="primary" class="fr submit"
                :loading="submitLoading"
                @click="submit">保存
        </Button>
      </div>
    </div>
    <div v-if="menu === '3'"class="padding-10 bg-white margin-top-10 margin-right-10 box-shadow">
      <p class="part-title">背景图片</p>
      <Uploader :url="url"
                :data="extraData"
                :previewImage="backgroundImage"
                @on-change="uploadChanged"></Uploader>

      <p class="margin-top-20">请上传 2Mb 以内的图片，建议图片宽高比：竖屏9:16，横屏16:9</p>

      <div class="clear">
        <Button type="primary" class="fr submit"
                :loading="submitLoading"
                @click="submit">保存
        </Button>
      </div>
    </div>
    <div v-if="menu === '4'"class="padding-10 bg-white margin-top-10 margin-right-10 box-shadow">
      <p class="part-title">头像上墙</p>
      <Radio-group v-model="formData.onWallType">
        <Radio :label="1">默认</Radio>
        <Radio :label="2">3D签到</Radio>
      </Radio-group>

      <div class="clear">
        <Button type="primary" class="fr submit"
                :loading="submitLoading"
                @click="submit">保存
        </Button>
      </div>
    </div>
    <Payment></Payment>
  </div>
</template>
<script>
  import Uploader from '@/components/Uploader'
  import Payment from '@/components/Payment'

  let startTime

  export default {
    name: 'SignIn',
    components: {Uploader, Payment},
    data () {
      return {
        loading: true,
        id: '',
        type: 'normal',
        url: apis.activity.uploadImage,
        backgroundImage: '',
        extraData: [{
          key: 'id',
          value: 1
        }],
        submitLoading: false,
        formData: {
          name: '活动名称',
          startTime: '',
          endTime: '',
          screenType: 1, // horizontal-1 vertical-2
          contentType: 1, // terse-1 complex-2
          onWallType: 1 // default-1 3D-2
        },
        status: 0,
        menu:"1",
        showVersion: true,
        endDateLimit: {}
      }
    },
    methods: {
      uploadChanged (info) {
        if (info.type === 'success') this.backgroundImage = info.data.background
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
            this.formData.onWallType = data.avatar_type
            this.backgroundImage = data.background
            this.showVersion = !!Number(data.version_show)
            this.status = data.status

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
        // if (!this.backgroundImage) {
        //   this.$Message.warning('请上传背景图片')
        //   return false
        // }
        return true
      },

      submit () {
        if (!this.formValidate()) return
        this.submitLoading = true
        setTimeout(() => {
          this.submitLoading = false
        }, 500)
        ajax.auto(apis.activity.editInfo, {
          id: this.id,
          name: this.formData.name,
          end_time: util.dateFormat(this.formData.endTime)
//        screen_type: this.formData.screenType,
//        content_type: this.formData.contentType,
//        avatar_type: this.formData.onWallType,
//        background: this.backgroundImage
        }).then(res => {
          this.$Message.success('修改成功')
          // this.$router.go(-1)
          // $bus.$emit('REDIRECT_PANNEL', this.type)
        }).catch(err => {
          this.$Message.error(err)
        })
      }
    },
    created () {
      // this.readFromLocal()
      this.id = this.$route.params.activityId
      this.menu = this.$route.query.menuItem ? this.$route.query.menuItem : "1"
      this.fetchData()
      $bus.$on('SIGNIN_SETTING_RELOAD', () => {
        this.fetchData()
      })
    },
    beforeRouteUpdate (to, from, next) {
      if(to.query.menuItem){
        this.menu = to.query.menuItem
      }
      next()
    }

  }
</script>
<style scoped>
  .gray {
    color: #757575;
  }

  .baseSet .version {
    background-color: #d9e7ff;
    border-bottom: 5px solid #a8c8ff;
    padding: 36px 20px;
  }

  .baseSet .version p {
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
  .submit{
    width: 150px;
    height: 44px;
    margin: 30px 0px;
    font-size: 16px;
  }
</style>
