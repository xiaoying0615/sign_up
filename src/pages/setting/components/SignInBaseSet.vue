<template>
  <Loading v-if="loading">加载中，请稍候...</Loading>
      <div class="margin-10 padding-10 bg-white box-shadow">
      <p class="part-title">基础设置</p>

      <Form class="padding-right-10" :label-width="80" :model="formData">
        <Form-item label="活动名称" prop="name">
          <Input placeholder="请输入活动名称" v-model="formData.name"></Input>
        </Form-item>

        <Row>
          <Col span="12">
          <Form-item label="开始时间">
            <Date-picker type="date" v-model="formData.startTime" readonly></Date-picker>
          </Form-item>
          </Col>

          <Col span="12">
          <Form-item label="结束时间" prop="endTime">
            <Date-picker v-model="formData.endTime" type="date" :clearable="false" :options="endDateLimit" :readonly="status === 3"></Date-picker>
            <p v-if="status === 3">* 高级活动不支持修改结束时间</p>
          </Form-item>
          </Col>
        </Row>
      </Form>
      </Col>

      <Col class="margin-10 padding-10 bg-white box-shadow">
      <p class="part-title">版权信息</p>

      <Alert show-icon v-if="showVersion">
        免费版带有【靠我啦提供技术支持】字样，如需去除版权信息，请点击下方按钮付费99元去除。请注意，购买后不可进行退款操作。

        <Button slot="desc" class="blue-button margin-top-20" type="ghost" long @click="removeVersion">我要去除版权信息</Button>
      </Alert>

      <Alert type="success" show-icon v-else>您已去除版权信息</Alert>

      </Col>
    </Row>

    </Col>

    <Col span="12">

    <Row>
      <Col class="margin-10 padding-10 bg-white box-shadow">
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
      </Col>

    </Row>

    </Col>

    <Col span="24" class="padding-10">
    <Button type="ghost" class="blue-button" long
            :loading="submitLoading"
            @click="submit">提交设置</Button>
    </Col>

    <Payment></Payment>
  </Row>
</template>

<script>
  import Uploader from '@/components/Uploader'
  import Payment from '@/components/Payment'

  let startTime

  export default {
    name: 'SignIn',
    components: { Uploader, Payment },
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
        ajax.auto(apis.activity.fetchInfo, { id: this.id })
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
          name:this.formData.name,
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
      this.fetchData()
      $bus.$on('SIGNIN_SETTING_RELOAD', () => {
        this.fetchData()
      })
    }
  }
</script>
