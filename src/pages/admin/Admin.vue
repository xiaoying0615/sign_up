<template>
  <div class="container">
    <Table class="margin-bottom-20" :columns="header" :data="table"></Table>

    <Button type="primary" long :loading="loading" :disabled="disabled"
            @click="fetchData">{{loadingTip}}</Button>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data () {
    return {
      loading: false,
      disabled: false,
      page: 1,

      header: [{
        title: '手机号',
        key: 'account'
      }, {
        title: '权限',
        key: 'role_name'
      }, {
        title: '注册时间',
        key: 'register_time'
      }, {
        title: '上次登录',
        key: 'last_login_time'
      }, {
        title: '操作',
        key: 'action',
        width: 100,
        align: 'center',
        render: (h, params) => {
          return h('Button', {
            props: {
              type: 'error',
              size: 'small'
            },
            on: {
              click: () => {
                this.userDelete(params.index, params.row.id)
              }
            }
          }, '删除')
        }
      }],

      table: []
    }
  },

  computed: {
    loadingTip () {
      if (this.loading) return '正在加载，请稍候...'
      if (this.disabled) return '已加载全部'
      return '点击加载更多'
    }
  },

  methods: {
    userDelete (index, id) {
      ajax.auto(apis.admin.userDelete, { id })
          .then(res => {
            this.$Message.success('删除成功')
            this.table.splice(index, 1)
          })
          .catch(err => {
            this.$Message.error(err)
          })
    },

    fetchData () {
      this.loading = true
      ajax.auto(apis.admin.userList, { page: this.page })
          .then(res => {
            this.loading = false
            if (!res.data || !res.data.length) {
              this.disabled = true
            } else {
              this.page++
              this.table = this.table.concat(res.data)
            }
          })
          .catch(err => {
            this.loading = false
            this.$Message.error(err)
          })
    }
  },

  created () {
    this.fetchData()
  }

}
</script>