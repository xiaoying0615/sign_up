<template>
<Row>
  <Col span="18" style="padding: 0 20px;">
    <Tabs @on-click="tabsClicked">
      <Tab-pane name="signed" label="已签到" icon="checkmark-round">
        <SignInList type="signed" :nickname="searchName" @on-select="tableSelected"></SignInList>
      </Tab-pane>
      <Tab-pane name="unsigned" label="未签到" icon="close-round">
        <div style="margin-bottom: 15px;">
          <Button type="info"
                  @click="fetchData">手动添加</Button>
          <Button type="info"
                  @click="fetchData">批量导入</Button>
          <span>（批量导入前请先 <a href="#">下载模板</a>，并按照模板格式填写信息，模板内容请前往“表单设计”进行添加表单信息）</span>
        </div>
        <SignInList type="unsigned" :nickname="searchName" @on-select="tableSelected"></SignInList>
      </Tab-pane>
    </Tabs>
  </Col>

  <Col span="6">
    <div class="padding-10 margin-bottom-20 box-shadow bg-white">
      <p class="part-title">数据总览</p>
      <p style="margin-left: 20px;">总人数：{{signInfo.allNum}}</p><br>
      <p style="margin-left: 20px;">已签到：{{signInfo.signNum}}</p><br>
      <p style="margin-left: 20px;">未签到：{{signInfo.notSignNum}}</p><br>
    </div>

     <div class="padding-10 box-shadow bg-white">
       <p class="part-title">数据操作</p>
      <Input class="margin-bottom-10" v-model="searchName" placeholder="输入微信昵称搜索" icon="search"></Input>
      <Button class="green-button margin-bottom-10"
              type="ghost" icon="checkmark-round" long
              :disabled="signInButtonDisabled"
              :loading="signInButtonLoading"
              @click="batchSignIn">批量补签</Button>
      <!--<Button class="red-button margin-bottom-10" -->
              <!--type="ghost" icon="trash-b" long-->
              <!--:loading="deleteButtonLoading"-->
              <!--@click="batchDelete">批量删除</Button>-->
      <Button class="blue-button margin-bottom-10" type="ghost" icon="android-download"
              :loading="exportButtonLoading" long
              @click="exportRecords">导出数据</Button>
     </div>
  </Col>
</Row>
</template>

<script>
import SignInList from '../components/SignInList'

let onTab = 'signed'
let signedSelection = [] // 已签到的选中项
let unsignedSelection = [] // 未签到的选中项

export default {
  name: 'SignIn',
  components: { SignInList },
  data () {
    return {
      signInfo: {
        allNum: 0,
        signNum: 0,
        notSignNum: 0
      },

      searchName: '',

      signInButtonDisabled: true,
      signInButtonLoading: false,
      deleteButtonLoading: false,
      exportButtonLoading: false
    }
  },
  methods: {
    fetchData () {
      ajax.auto(apis.records.list, {
        id: this.$route.params.activityId,
        nick: this.nickname
      }).then(res => {
        const data = res.data
        this.signInfo.allNum = data.all_num
        this.signInfo.signNum = data.sign_num
        this.signInfo.notSignNum = data.not_sign_num
      }).catch(err => {
        this.$Message.error(err)
      })
    },

    tabsClicked (name) {
      onTab = name
      if (name === 'unsigned') this.signInButtonDisabled = false
      else this.signInButtonDisabled = true
    },

    tableSelected (info) {
      if (info.type === 'signed') {
        signedSelection = info.selection
      } else {
        unsignedSelection = info.selection
      }
    },

    confirm (title) {
      return new Promise((resolve, reject) => {
        this.$Modal.confirm({
          title: title,
          onOk: () => {
            resolve && resolve()
          }
        })
      })
    },

    // 批量补签
    batchSignIn () {
      if (!unsignedSelection.length) {
        this.$Message.warning('请先选择需要补签的人员')
        return
      }
      this.confirm('是否确定补签？')
          .then(() => {
            this.signInButtonLoading = true
            ajax.auto(apis.records.sign, {
              id: this.$route.params.activityId,
              sign_ids: unsignedSelection.join(',')
            }).then(res => {
              this.signInButtonLoading = false
              this.$Message.success('补签成功')
              $bus.$emit('SIGNIN_LIST_RELOAD', 'signed')
              $bus.$emit('SIGNIN_LIST_RELOAD', 'unsigned')
            }).catch(err => {
              this.signInButtonLoading = false
              this.$Message.error(err)
            })
          })
    },

    // 批量删除校验
    batchDelete () {
      if (onTab === 'signed') {
        if (!signedSelection.length) {
          this.$Message.warning('请先选择需要删除的人员')
          return
        }
        this.confirm('是否确定删除？')
          .then(() => {
            this.doBatchDelete(signedSelection)
          })

      } else {
        if (!unsignedSelection.length) {
          this.$Message.warning('请先选择需要删除的人员')
          return
        }
        this.confirm('是否确定删除？')
          .then(() => {
            this.doBatchDelete(unsignedSelection)
          })

      }
    },

    doBatchDelete (deleteArray) {
      this.deleteButtonLoading = true
      ajax.auto(apis.records.delete, {
        id: this.$route.params.activityId,
        sign_ids: deleteArray.join(',')
      }).then(res => {
        this.deleteButtonLoading = false
        this.$Message.success('删除成功')
        $bus.$emit('SIGNIN_LIST_RELOAD', onTab)
      }).catch(err => {
        this.deleteButtonLoading = false
        this.$Message.error(err)
      })
    },

    // 导出数据
    exportRecords () {
      window.location.href = `https://www2.kaowola.com/admin/sign_info/export?id=${this.$route.params.activityId}&type=${onTab === 'signed' ? 1 : 2}`
    }
  },

  created () {
    this.fetchData()
  }
}
</script>
