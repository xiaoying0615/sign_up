<template>
<Modal :title="title"
       :width="1000"
       v-model="show"
       @on-cancel="resetModal">
  <Loading v-if="loading">正在生成订单，请稍候...</Loading>

  <div v-if="!loading && !inPay">
    
    <!-- 付费说明 -->
    <div class="margin-bottom-20">
      <p class="margin-bottom-10">高级活动专享服务</p>
      <p class="margin-bottom-10">1. 参与人数不限制</p>
      <p class="margin-bottom-10">2. 独立专享服务器</p>
    </div>

    <!-- 支付信息 -->
    <!-- 升级高级版 -->
    <div class="table margin-bottom-20" v-if="type === 'upgradePay'">
      <Row class="table-header">
        <Col span="8" class="table-header-item table-item bolder">活动生效时间</Col>
        <Col span="8" class="table-header-item table-item bolder">活动时长（天）</Col>
        <Col span="8" class="table-header-item table-item bolder">升级费用（元）</Col>
      </Row>
      <Row class="table-content">
        <Col span="8" class="table-item">
          {{serverTime}}
          <i class="text-indent"></i>-<i class="text-indent"></i>
          {{upgradeEffectiveTime}}
        </Col>
        <Col span="8" class="table-item">3</Col>
        <Col span="8" class="table-item">{{orderInfo.pay_amount}}</Col>
      </Row>
    </div>
    
    <!-- 延长天数 -->
    <div class="table margin-bottom-10" v-if="type === 'delay'">
      <Row class="table-header">
        <Col span="8" class="table-header-item table-item bolder">活动生效时间</Col>
        <Col span="8" class="table-header-item table-item bolder">延长时间（天）</Col>
        <Col span="8" class="table-header-item table-item bolder">升级费用（元）</Col>
      </Row>
      <Row class="table-content">
        <Col span="8" class="table-item">
          {{endTime.split(' ')[0]}}
          <i class="text-indent"></i>-<i class="text-indent"></i>
          <Date-picker v-model="delayTime" type="date" :clearable="false" :options="endDateLimit"></Date-picker>
        </Col>
        <Col span="8" class="table-item">{{delayDays}}</Col>
        <Col span="8" class="table-item">{{299 * delayDays}}</Col>
      </Row>
    </div>

    <!-- 去除版权 -->
    <div class="table margin-bottom-10" v-if="type === 'removeVersion'">
      <Row class="table-header">
        <Col span="12" class="table-header-item table-item bolder">购买内容：</Col>
        <Col span="12" class="table-header-item table-item bolder">升级费用（元）</Col>
      </Row>
      <Row class="table-content">
        <Col span="12" class="table-item">{{orderInfo.product_name}}</Col>
        <Col span="12" class="table-item">{{orderInfo.pay_amount}}</Col>
      </Row>
    </div>

    <!-- 付费详情 -->
    <!-- <p class="margin-bottom-10"><i class="text-indent"></i><span class="bolder">订单编号：</span>{{orderInfo.order_no}}</p>
    <p class="margin-bottom-10"><i class="text-indent"></i><span class="bolder">购买内容：</span>{{orderInfo.product_name}}</p>
    <p class="margin-bottom-10" v-if="type === 'delay'"><i class="text-indent"></i><span class="bolder">生效时间：</span>{{effectiveTime}}</p>
    <p class="margin-bottom-10"><i class="text-indent"></i><span class="bolder">活动名称：</span>{{orderInfo.activity_name}}</p>
    <p class="margin-bottom-10"><i class="text-indent"></i><span class="bolder">支付金额：</span>{{orderInfo.pay_amount}}</p> -->

    <p class="margin-bottom-10"><span class="bolder">支付方式：</span>
      <Radio-group v-model="payType">
        <Radio label="1">
          <span class="inline-block" style="vertical-align: bottom;"><img src="@/assets/logo-pay-wechat.png"></span>
        </Radio>
        <Radio label="2">
          <span class="inline-block" style="vertical-align: bottom;"><img src="@/assets/logo-pay-alipay.png"></span>
        </Radio>
      </Radio-group>
    </p>
  </div>

  <div v-if="inPay">
    <img :src="payQrcode" class="pay-qrcode margin-bottom-10" v-if="payQrcode">
    <Alert class="margin-bottom-10"><p class="bolder">{{payType === '1' ? '请使用微信扫描上方二维码进行支付' : '正在等待您的支付...'}}</p></Alert>
    <p>如您已完成支付，点击下方【支付已完成】按钮刷新当前页面</p>
    <p>如支付失败，请点击【取消】按钮关闭此对话框重新操作</p>
  </div>


  <template slot="footer" v-if="!loading && !inPay">
    <Button type="text" @click="resetModal">取消</Button>
    <Button type="primary" :loading="payLoading" @click="gotoPay">去支付</Button>
  </template>
  <template slot="footer" v-if="inPay">
    <Button type="text" @click="resetModal">取消</Button>
    <Button type="success" @click="payCheck">支付已完成</Button>
  </template>
</Modal>
</template>

<script>
import qrCode from 'qrcode'

export default {
  name: 'Payment',
  data () {
    return {
      show: false,
      loading: false,
      inPay: false,
      payLoading: false,
      title: '',

      type: '', // removeVersion-除版权 upgradePay-发布正式版 delay-延长时间
      activityId: '',
      serverTime: '',

      endTime: '', // 活动结束日期
      delayTime: '', // 活动延长日期

      payType: '1', // 支付方式
      payQrcode: '', // 微信支付二维码

      orderInfo: {}, // 订单信息

      endDateLimit: {}
    }
  },
  computed: {
    // 升级高级版活动有效期
    upgradeEffectiveTime () {
      return util.dateFormat(new Date((new Date(this.serverTime)).getTime() + 60 * 60 * 24 * 2 * 1000))
    },
    // 延长天数
    delayDays () {
      console.log(this.delayTime, this.endTime)
      console.log(new Date(this.delayTime), new Date(this.endTime))
      return ((new Date(this.delayTime).getTime()) - (new Date(this.endTime).getTime())) / (60 * 60 * 24 * 1000)
    }
  },
  methods: {
    gotoPay () {
      this.type === 'delay' ? this.createOrder() : this.payNow()
    },

    createOrder () {
      this.loading = true
      let params = { id: this.activityId }
      if (this.type === 'delay') params.day = this.delayDays

      ajax.auto(apis.pay[this.type], params)
          .then(res => {
            this.loading = false
            this.orderInfo = res.data
            if (this.type === 'delay') this.payNow()
          })
          .catch(err => {
            this.loading = this.show = false
            this.$Message.error(err)
          })
    },

    getServerTime () {
      util.getServerTime()
          .then(res => {
            this.serverTime = res
          })
          .catch(err => {
            this.getServerTime()
          })
    },

    setPayQrcode (data) {
      qrCode.toDataURL(data, {
        scale: 10
      }, (err, url) => {
        if (err) console.error('qrcode', err)
        this.payQrcode = url
      })
    },

    payNow () {
      this.payLoading = true
      ajax.auto(apis.pay.pay, {
        id: this.orderInfo.order_id,
        type: this.payType
      }).then(res => {
        this.payLoading = false
        this.inPay = true
        if (this.payType === '1') {
          this.setPayQrcode(res.data.code_url)  
        } else {
          window.location.href = res.data.location_url
        }
      }).catch(err => {
        this.payLoading = false
        this.$Message.error(err)
      })
    },

    payCheck () {
      this.show = false
      this.inPay = false
      if (this.type === 'upgradePay') {
            $bus.$emit('ACTIVITIES_RELOAD', 'normal')
            $bus.$emit('ACTIVITIES_RELOAD', 'vip')
            $bus.$emit('REDIRECT_PANNEL', 'vip')
      } else if (this.type === 'delay') {
        $bus.$emit('ACTIVITIES_RELOAD', 'vip')
      } else {
        $bus.$emit('SIGNIN_SETTING_RELOAD')
      }
    },

    resetModal () {
      this.show =
      this.loading =
      this.payLoading =
      this.inPay = false
      this.payType = '1'
      this.payQrcode = ''
    }
  },
  created () {
    $bus.$on('ACTIVITY-PAYMENT', ({ type, activityId, endTime }) => {
      this.show = true
      this.type = type
      this.activityId = activityId
      this.getServerTime()
      
      if (type === 'upgradePay') {
        this.title = '活动升级'
        this.createOrder()
      }
      if (type === 'removeVersion') {
        this.title = '去除版权'
        this.createOrder()
      }
      if (type === 'delay') {
        this.title = '延长天数'
        this.endTime = endTime + ' 23:59:59'
        this.delayTime = util.dateFormat(new Date(new Date(endTime).getTime() + 60 * 60 * 24 * 1000))
        this.endDateLimit = {
          disabledDate (date) {
            return date && date.valueOf() < new Date(endTime).getTime()
          }
        }
      }
    })
  }
}
</script>

<style>
.pay-qrcode {
  width: 50%;
  margin: 0 auto;
}

.table {
  border: 1px solid #e9eaec;
}

.table-item {
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
}

.table-header {
  border-bottom: 1px solid #e9eaec;
  background: #f8f8f9;
}
</style>