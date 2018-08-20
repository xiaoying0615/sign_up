<template>
<div>
  <p class="extra">{{data.start_time}} 至 {{data.end_time}}</p>

  <Row class="item-box box-shadow margin-top-20">
    <Col span="12" class="item-detail bg-blue padding-10 relative">
      <img src="@/assets/icon-activity-type-face.png" class="detail-type">
      <div class="detail-name clear">
        <p class="text-over fl">{{data.name}}</p>
        <span class="fr">{{data.status == 1 ? '测试版' : ( data.status == 2 ? '正式版' : '高级版' )}}</span>
      </div>

      <Row class="margin-top-20">
        <Col span="10" offset="1">
          <p>参与人数</p>
          <p class="detail-count">{{data.sign_num}} <span>人</span></p>
        </Col>
        <Col span="10" offset="2">
          <p>有效天数</p>
          <p class="detail-count">{{data.remaining_days}} <span>天</span></p>
        </Col>

        <Col span="22" offset="1" class="margin-top-20">
          <template v-if="!data.activity_status">
            <Button type="ghost" long class="upgrade-button">活动已失效</Button>
            <p class="margin-top-10 margin-bottom-10" v-if="data.status == 1">* 当前为测试版，最多支持10人参与，发布为正式版后可免费支持300人参与</p>
            <p class="margin-top-10 margin-bottom-10" v-if="data.status == 2">* 活动已发布，最多支持300人参与，升级为高级活动后参与人数无限制</p>
            <p class="margin-top-10 margin-bottom-10" v-if="data.status == 3">* 当前为付费活动，有效期3天，你可以付费延长活动天数</p>
          </template>

          <template v-if="data.activity_status && data.status == 1">
            <Button type="ghost" long class="upgrade-button"
                    :loading="loading"
                    @click="activityUpgrade">发布为正式活动，免费升级到300人</Button>
            <p class="margin-top-10 margin-bottom-10">* 当前为测试版，最多支持10人参与，发布为正式版后可免费支持300人参与</p>
          </template>

          <template v-if="data.activity_status && data.status == 2">
            <Button type="ghost" long class="upgrade-button"
                    @click="activityUpgradePay">升级为高级活动，参与人数无限制</Button>
            <p class="margin-top-10 margin-bottom-10">* 活动已发布，最多支持300人参与，升级为高级活动后参与人数无限制</p>
          </template>

          <template v-if="data.activity_status && data.status == 3">
            <Button type="ghost" long class="upgrade-button"
                    @click="activityDelay">付费延长活动天数</Button>
            <p class="margin-top-10 margin-bottom-10">* 当前为付费活动，有效期3天，你可以付费延长活动天数</p>
          </template>
        </Col>
      </Row>

    </Col>

    <Col span="12" class="item-operation clear">
      <div class="operation-item-box relative fl">
        <div class="operation-item absolute"
             @click="formDesign">
          <p><Icon type="paintbrush"></Icon></p>
          表单设计
        </div>
      </div>

      <div class="operation-item-box relative fl">
        <div class="operation-item absolute"
             @click="activitySetting">
          <p><Icon type="gear-a"></Icon></p>
          活动设置
        </div>
      </div>

      <div class="operation-item-box relative fl">
        <div class="operation-item absolute"
             @click="showArrdess">
          <p><Icon type="link"></Icon></p>
          参与地址
        </div>
      </div>

      <div class="operation-item-box relative fl">
        <div class="operation-item absolute"
             @click="activityRecords">
          <p><Icon type="stats-bars"></Icon></p>
          数据统计
        </div>
      </div>

      <a href="javascript:;" class="operation-delete red"
         @click="deleteActivity">
        <Icon type="trash-b"></Icon> 删除活动
      </a>
    </Col>
  </Row>
</div>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    // 验证是否失效
    validEffective () {
      if (!this.data.activity_status) {
        this.$Message.warning('该活动已失效')
        return false
      }
      return true
    },

    triggerUpdate () {
      $bus.$emit('ACTIVITIES_RELOAD', this.data.status == 1 || this.data.status == 2 ? 'normal' : 'vip')
    },

    // 测试升级正式
    activityUpgrade () {
      this.$Modal.confirm({
        title: '是否确认发布为正式版？',
        content: '<p>当前为测试版，最多支持10人参与，发布为正式版后可免费支持300人参与且测试版数据将会被清除。</p>',
        onOk: () => {
          this.loading = true
          ajax.auto(apis.activity.upgrade, { id: this.data.id })
              .then(res => {
                this.loading = false
                this.$Message.success('升级成功')
                this.triggerUpdate()
              })
              .catch(err => {
                this.loading = false
                this.$Message.error(err)
              })
        }
      })
    },

    activityUpgradePay () {
      $bus.$emit('ACTIVITY-PAYMENT', {
        type: 'upgradePay',
        activityId: this.data.id
      })
    },

    // 延长活动
    activityDelay () {
      $bus.$emit('ACTIVITY-PAYMENT', {
        type: 'delay',
        activityId: this.data.id,
        endTime: this.data.end_time
      })
    },

    deleteActivity () {
      this.$Modal.confirm({
        title: '是否确定删除？',
        content: `
          <p class="margin-bottom-10">删除后该活动将无法恢复，已付费功能将无法退款或返还</p>
          <p>如需在新的活动中使用付费功能，请重新购买</p>
        `,
        loading: true,
        onOk: () => {
          ajax.auto(apis.activity.delete, { id: this.data.id })
              .then(res => {
                this.$Modal.remove()
                this.$Message.success('删除成功')
                this.triggerUpdate()
              })
              .catch(err => {
                this.$Modal.remove()
                this.$Message.error(err)
              })
        }
      })
    },

    showArrdess () {
      $bus.$emit('SHOW_ADDRESS', {
        faceLink: this.data.screen_url,
        signLink: this.data.sign_url,
        signQuickLink: this.data.quick_sign_url,
        threedLink: this.data['3D_url']
      })
    },

    saveToLocal () {
      window.localStorage.setItem('activityInfo', JSON.stringify(this.data))
    },

    formDesign () {
      if (!this.validEffective()) return
      this.$router.push({ name: 'design', params: { activityId: this.data.id } })
    },

    activitySetting () {
      // this.saveToLocal()
      if (!this.validEffective()) return
      this.$router.push({ name: 'settingSignIn', params: { activityId: this.data.id } })
    },

    activityRecords () {
      this.$router.push({ name: 'recordsSignIn', params: { activityId: this.data.id } })
    }
  }
}
</script>

<style scoped>
.item-box {
  border-radius: 4px;
  background: #fff;
  overflow: hidden;
}

.item-detail {
  color: #fff;
}

.detail-type {
  position: absolute;
  width: 50px;
  height: 50px;
  left: 0;
  top: 0;
}

.detail-name {
  font-size: 14px;
  font-weight: bold;
  padding: 0 5px 0 30px;
  margin-top: 10px;
}

.detail-name p {
  width: 80%;
}

.detail-name span {
  margin-top: 2px;
  padding: 0 2px;
  border-radius: 2px;
  font-size: 10px;
  background: rgba(255, 255, 255, .3);
}

.detail-count {
  font-size: 30px;
  font-weight: bold;
}

.detail-count span {
  font-size: 10px;
  font-weight: normal;
}

.item-operation {
  position: absolute;
  right: 0;
  height: 100%;
  padding: 30px;
}

.operation-item-box {
  width: 50%;
  height: 50%;
  text-align: center;
}

.operation-item {
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  border-radius: 4px;
  transition: border .3s;
}

.operation-item:hover {
  color: #2d8cf0;
  border: 1px solid #2d8cf0;
  cursor: pointer;
}

.operation-item p {
  font-size: 20px;
}

.operation-delete {
  display: none;
  position: absolute;
  right: 10px;
  bottom: 5px;
}

.item-box:hover .operation-delete {
  display: block;
}

.upgrade-button {
  color: #fff !important;
  border-color: #fff !important;
}
</style>

