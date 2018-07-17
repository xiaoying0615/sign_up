<template>
<Loading v-if="loading">加载中，请稍候...</Loading>
<Row v-else>
  <Col span="23" offset="1" class="editor-part box-shadow margin-bottom-20">
    <p class="part-title">上传背景图片</p>

    <Uploader :url="url"
              :preview="false"
              @on-change="uploadChanged"></Uploader>

    <p class="margin-top-20">请上传 2Mb 以内的图片，建议图片宽高比 9:16</p>
  </Col>

  <Col span="14" offset="1" class="editor-part box-shadow">
    <p class="part-title">编辑签到项</p>

    <p class="extra" v-if="!form.length">当前暂无签到项</p>

    <div class="margin-bottom-20">
      <Row class="margin-bottom-10" v-for="(item, key) in form" :key="key">
        <!-- <Col :span="item.type === 'telephone' ? 12 : 16" class="input-item">
          <Input v-model="item.placeholder" :readonly="item.readonly"
                 @on-change="triggerChanged"></Input>
        </Col> -->


        <!-- <Col span="4" class="input-item text-align-right" v-if="item.type === 'telephone'">
          <Checkbox v-model="item.needValid" @on-change="validChanged(key)">验证码</Checkbox>
        </Col> -->
        <!-- <Col span="4" class="input-item text-align-right">
          <Checkbox v-model="item.required" @on-change="triggerChanged">必填</Checkbox>
        </Col> -->

        <!-- <Col span="4" class="input-item text-align-right">
          <a href="javascript:;" class="red" @click="deleteInputItem(key)">
            <Icon type="trash-b"></Icon> 删除
          </a>
        </Col> -->

        <Col span="18" class="input-item">
          <Input v-model="item.placeholder" :readonly="item.readonly"
                 @on-change="triggerChanged"></Input>
        </Col>

        <Col span="6" class="input-item text-align-right">
          <a href="javascript:;" class="red" @click="deleteInputItem(key)">
            <Icon type="trash-b"></Icon> 删除
          </a>
        </Col>

        <!-- <Col class="margin-top-10" span="14" offset="2" v-if="item.type === 'select'">
          <Row>
            <template v-for="(option, optKey) in item.options">
              <Col span="18" class="margin-bottom-10">
                <Input v-model="option.name" @on-change="triggerChanged"></Input>
              </Col>
              <Col span="6" class="input-item text-align-right">
                <a href="javascript:;" class="red" @click="deleteOptionItem(key, optKey)">
                  <Icon type="trash-b"></Icon> 删除
                </a>
              </Col>
            </template>

            <Col span="24">
              <Button type="ghost" icon="plus-round" long
                      @click="addOption(key)">添加选项</Button>
            </Col>
          </Row>
        </Col> -->

        <Col class="margin-top-10" span="16" offset="2" v-if="item.type === 'select'">
          <Row>
            <template v-for="(option, optKey) in item.options">
              <Col span="18" class="margin-bottom-10">
                <Input v-model="option.value" @on-change="triggerChanged"></Input>
              </Col>
              <Col span="6" class="input-item text-align-right">
                <a href="javascript:;" class="red" @click="deleteOptionItem(key, optKey)">
                  <Icon type="trash-b"></Icon> 删除
                </a>
              </Col>
            </template>

            <Col span="24">
              <Button type="ghost" icon="plus-round" long
                      @click="addOption(key)">添加选项</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  </Col>

  <Col span="8" offset="1" class="editor-part box-shadow">
    <p class="part-title">添加签到项</p>
    
    <div class="margin-bottom-20" style="padding-left: 40px;">
      <Button class="button" type="ghost" icon="plus-round" @click="addItem('name', '姓名')">姓名</Button>
      <br><br>
      <Button class="button" type="ghost" icon="plus-round" @click="addItem('telephone', '手机')">手机</Button>
      <br><br>
      <Button class="button" type="ghost" icon="plus-round" @click="addItem('email', '邮箱')">邮箱</Button>
      <br><br>
      <Button class="button" type="ghost" icon="plus-round" @click="addItem('number', '数字')">数字</Button>
      <br><br>
      <Button class="button" type="ghost" icon="plus-round" @click="addItem('text', '文本')">文本</Button>
      <br><br>
      <Button class="button" type="ghost" icon="plus-round" @click="addItem('select', '选项')">选项</Button>
    </div>
  </Col>

  <Col span="23" offset="1" class="margin-top-20">
    <Button type="ghost" long :loading="submitLoading"
            @click="releaseForm">发布表单</Button>
  </Col>
</Row>
</template>

<script>
import Uploader from '@/components/Uploader'

let uploadedBackground = ''
const limitItem = {
  name: {
    type: '姓名',
    has: false
  },
  telephone: {
    type: '手机号',
    has: false
  },
  email: {
    type: '邮箱',
    has: false
  }
}

export default {
  name: 'Editor',
  components: { Uploader },
  props: ['id'],
  data () {
    return {
      loading: true,

      url: apis.activity.uploadImage,

      form: [],
      background: '',

      submitLoading: false
    }
  },
  methods: {
    uploadChanged (info) {
      // info = { type, data }
      if (info.type === 'start') this.background = info.data
      else uploadedBackground = info.data.background
    },

    // 校验限制数量的控件是否已存在
    // type 表单空间类似
    // isDeleted 是否被删除 如果被删除需要改变存在状态
    itemNumberValidate (type, isDeleted) {
      // 不存在指定类型时遍历整体表单
      if (!type) {
        this.form.map(item => {
          if (item.placeholder === '姓名') {
            limitItem.name.has = true
            return
          }
          
          for (let key in limitItem) {
            if (item.type === key) {
              limitItem[key].has = true
              return
            }
          }
        })
      } else {
        if (!limitItem[type]) return true // 该控件不受限制，可以添加
        else if (!limitItem[type].has && !isDeleted) {
          limitItem[type].has = true
          return true
        } // 该控件受限制但未存在，可以添加
        else if (limitItem[type].has && !isDeleted) {
          this.$Message.warning(limitItem[type].type + '项已存在')
          return false
        } // 该控件受限制且存在且不是被删除，不可以添加
        else if (limitItem[type].has && isDeleted) {
          limitItem[type].has = false
          return true
        } // 该控件受限制且存在但是被删除，可以添加
        else return true
      }
    },

    // 表单操作
    addItem (type, name) {
      if (this.form.length >= 5) {
        this.$Message.warning('最多只可添加5个签到项')
        return
      }
      if (!this.itemNumberValidate(type)) return
      // if (this.type === 'telephone' && hasMobile) {
      //   this.$Message.warning('只能有一个手机号输入项')
      //   return
      // }
      let item = {
        type: type,
        placeholder: name,
        readonly: false,
        // required: false,
        value: ''
      }

      switch (type) {
        case 'name': // 兼容姓名控件
          item.type = 'text'
          item.readonly = true
          break
        case 'telephone':
          item.readonly = true
          // item.needValid = false
          break
        case 'email':
          item.readonly = true
          break
        case 'select':
          item.options = [{ value: '选项1' }]
          item.value = 'unselectedOption'
          break 
      }

      this.form.push(item)
    },

    addOption (index) {
      this.form[index].options.push({ value: '' })
    },

    deleteInputItem (index) {
      let item = this.form[index]
      let type = item.type
      if (item.placeholder === '姓名') type = 'name'
      this.itemNumberValidate(type, true)
      this.form.splice(index, 1)
    },

    deleteOptionItem (index, optIndex) {
      this.form[index].options.splice(optIndex, 1)
    },

    formValidate () {
      for (let i = 0; i < this.form.length; i++) {
        const item = this.form[i]
        if (!item.placeholder) {
          this.$Message.warning('你的签到项编辑未完成，请删除不需要的签到项后提交')
          return false
        }
        if (item.type === 'select') {
          for (let j = 0; j < item.options.length; j++) {
            if (!item.options[j].value.length) {
              this.$Message.warning('你的签到项编辑未完成，请删除不需要的签到项后提交')
              return false
            }
          }
        }
      }
      return true
    },

    releaseForm () {
      if (!this.formValidate()) return
      this.submitLoading = true
      console.log(uploadedBackground)
      ajax.auto(apis.activity.editFormInfo, {
        id: this.id,
        sign_background: uploadedBackground,
        form: util.registerDataStringify(this.form)
      }).then(res => {
        this.submitLoading = false
        this.$Message.success('提交成功')
      }).catch(err => {
        this.$Message.error(err)
      })
    },

    // 获取数据
    fetchData () {
      ajax.auto(apis.activity.fetchInfo, { id: this.id })
          .then(res => {
            const data = res.data
            this.loading = false
            this.background = data.sign_background
            this.form = data.form ? util.registerDataFormat(data.form) : []
            this.itemNumberValidate()
            $bus.$emit('DESIGN_VERSION_SHOW', !!Number(data.version_show))
          })
          .catch(err => {
            this.$Message.error(err)
          })
    },

    validChanged (index) {
      this.form.forEach((item, i) => {
        if (index === i) return
        // if (item.type === 'telephone') item.needValid = false
      })
      this.triggerChanged()
    },

    triggerChanged () {
      this.$emit('on-change', {
        background: this.background,
        form: this.form
      })
    }
  },
  watch: {
    form () {
      this.triggerChanged()
    },
    background () {
      this.triggerChanged()
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style scoped>
.editor-part {
  padding: 10px 20px;
  border-radius: 4px;
  background: #fff;
}

.input-item {
  height: 32px;
  line-height: 32px;
}

button {
  color: #3399ff;
  border-color: #3399ff;
}

.button {
  width: 100px;
}
</style>