<template>
  <div>
    <Table :columns="header" :data="data"
           @on-selection-change="selectChanged"
           @on-row-click='rowClick'></Table>
    <Button class="blue-button margin-top-10" type="ghost" long
            :loading="loading" :disabled="disabled"
            @click="fetchData">{{loadingTip}}
    </Button>
  </div>
</template>

<script>
  export default {
    name: 'SignInList',
    props: {
      type: {
        type: String, // 1-signed 2-unsigned
        required: true
      },
      nickname: {
        type: String
      }
    },
    data () {
      return {
        page: 1,

        disabled: false,
        loading: false,

        header: [],
        clickId:"",
        data: []
      }
    },

    computed: {
      loadingTip () {
        if (this.loading) {
          return '加载中，请稍候...'
        }
        if (this.disabled) {
          return '没有更多数据'
        }
        return '加载更多数据'
      }
    },
    methods: {
      tableInit () {
        let signedHeader = [{
          title: '微信昵称',
          key: 'wxName',
          align: 'center'
          // width: 120
        }, {
          title: '签到头像',
          key: 'signAvatar',
          align: 'center',
          width: 100,
          render: (h, p) => {
            return h('img', {
              attrs: {
                src: p.row.signAvatar
              },
              style: {
                padding: '5px 0'
              }
            })
          }
        },{
            title: this.type === 'signed' ? '签到时间' : '报名时间',
            key: 'time',
            align: 'center'
            // width: 150,
          },{
            title: '表单信息',
            key: 'formData',
            width: 300,
            render: (h, p) => {
              return h('div',
                p.row.formData.map(
                  item => h(
                    'p',
                    {
                      style: {
                        margin: '2px 0'
                      }
                    }, item)
                )
              )
            }
          },{
            type:'action',
            title: '操作',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                  h('Button', {
                    props: {
                      type: 'text',
                      size: 'small',
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: '是否确定删除？',
                          onOk: () => {
                            this.deleteSignInfo()
                          }
                        })
                      }
                    },
                  }, '删除')
                ]);
            }
          }]
        let unsignedHeader = [{
          type: 'selection',
          width: 60,
          align: 'center',
        },{
            title: '微信昵称',
            key: 'wxName',
            align: 'center'
            // width: 120
          },{
            title: '签到头像',
            key: 'signAvatar',
            align: 'center',
            width: 100,
            render: (h, p) => {
              return h('img', {
                attrs: {
                  src: p.row.signAvatar
                },
                style: {
                  padding: '5px 0'
                }
              })
            }
          },{
            title: this.type === 'signed' ? '签到时间' : '报名时间',
            key: 'time',
            align: 'center'
            // width: 150,
          },{
            title: '表单信息',
            key: 'formData',
            width: 300,
            render: (h, p) => {
              return h('div',
                p.row.formData.map(
                  item => h(
                  'p',
                  {
                    style: {
                      margin: '2px 0'
                    }
                  }, item)
              )
              )
            }
          }]
        this.header = this.type === 'signed' ? signedHeader : unsignedHeader
      },

      fetchData () {
        this.loading = true
        this.disabled = false

        ajax.auto(apis.records.list, {
          id: this.$route.params.activityId,
          nick: this.nickname,
          type: this.type === 'signed' ? 1 : 2,
          page: this.page
        }).then(res => {
            const list = this.formatData(res.data.list)
            this.loading = false
            this.data = this.page === 1 ? list : this.data.concat(list)
            if (!list.length) this.disabled = true
            else this.page++
          }
        ).catch(err => {
            this.loading = false
            this.$Message.error(err)
          }
        )
      },

      formatData (list) {
        return list.map(item => {
            return {
              id: item.id,
              wxName: item.nick,
              signAvatar: item.avatar,
              time: this.type === 'signed' ? item.sign_time : item.clock_time,
              formData: item.form ? item.form.map(data =>
                  `${data.name}：${data.value}`
                ) :
                ['无']
            }
          }
        )
      },

      selectChanged (selection) {
        this.$emit('on-select', {
          type: this.type,
          selection: selection.map(item => item.id)
      })
      },

      rowClick(data) {
        this.clickId = data.id
      },
      deleteSignInfo (){
        ajax.auto(apis.records.delete, {
          id: this.$route.params.activityId,
          sign_ids: this.clickId
        }).then(res => {
          this.$Message.success('删除成功')
          this.type = "signed"
          this.page = 1
          this.fetchData()
        })
      }
    },
    watch: {
      nickname () {
        this.page = 1
        this.fetchData()
      }
    },
    created () {
      this.tableInit()
      this.fetchData()
      $bus.$on('SIGNIN_LIST_RELOAD', type => {
          if (type === this.type) {
            this.page = 1
            this.fetchData()
          }
        }
      )
    }
  }
</script>
