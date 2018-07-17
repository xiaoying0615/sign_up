<template>
<Modal title="交易记录"
       width="1000"
       v-model="show">
  <Table :columns="columns" :data="data"
         no-data-text="暂无交易记录"></Table>

  <Button slot="footer" type="primary" long :disabled="disabled" @click="fetchData">{{loadingTip}}</Button>
</Modal>
</template>

<script>
export default {
  name: 'OrderHistory',
  data () {
    return {
      show: false,
      loading: false,
      disabled: false,
      page: 1,

      columns: [{
        title: '订单号',
        key: 'order_no'
      }, {
        title: '购买内容',
        key: 'product_name'
      }, {
        title: '活动名称',
        key: 'activity_name'
      }, {
        title: '支付金额',
        key: 'pay_amount'
      }, {
        title: '支付方式',
        key: 'pay_name'
      }, {
        title: '付款时间',
        key: 'pay_time'
      }],

      data: []
    }
  },
  computed: {
    loadingTip () {
      if (this.disabled) return '没有更多记录'
      else if (this.loading) return '加载中，请稍候...'
      else return '查看更多记录'
    }
  },
  methods: {
    fetchData () {
      this.loading = true
      ajax.auto(apis.pay.history, { page: this.page })
          .then(res => {
            this.loading = false
            this.data = this.page === 1 ? res.data : this.data.concat(res.data)
            if (!res.data.length) this.disabled = true
            else this.page++
          })
          .catch(err => {
            this.loading = false
            this.$Message.error(err)
          })
    }
  },
  created () {
    $bus.$on('ORDER_HISTORY', () => {
      this.show = true
      this.fetchData()
    })
  }
}
</script>