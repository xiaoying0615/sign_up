<template>
<Modal v-model="show"
       title="创建活动"
       width="700"
       :loading="true"
       @on-cancel="reset">
  
  <div class="margin-bottom-20">
    <!-- <p class="part-title margin-bottom-10">活动流程指引</p> -->
    
    <img src="@/assets/img-activity-progress.jpg">
  </div>

  <div>
    <p class="part-title" style="margin-top: 30px;">活动基本信息</p>

    <Form ref="form"
          :model="formData"
          :rules="formValidate"
          :label-width="80"
          style="padding-right: 20px;">

      <Form-item label="活动名称" prop="name">
        <Input v-model="formData.name"></Input>
      </Form-item>

      <Row>
        <Col span="12">
          <Form-item label="开始时间">
            <Date-picker v-model="formData.startDate" type="date" readonly></Date-picker>
          </Form-item>
        </Col>
      
        <Col span="12">
          <Form-item label="结束时间" prop="endDate">
            <Date-picker v-model="formData.endDate" type="date" :clearable="false" :options="endDateLimit"></Date-picker>
          </Form-item>
        </Col>
      </Row>

      <Form-item label="活动类型" prop="type">
        <Radio-group v-model="formData.type">
          <Radio label="1">人脸识别</Radio>
        </Radio-group>
      </Form-item>

    </Form>
  </div>

  <Button slot="footer" type="primary"
          :loading="loading"
          @click="submit">确定</Button>
  

</Modal>
</template>

<script>
export default {
  name: 'Release',
  data () {
    return {
      show: false,
      loading: false,

      endDateLimit: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now()
        }
      },

      formData: {
        name: '',
        startDate: new Date(),
        endDate: '',
        type: '1'
      },

      formValidate: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择活动类型', trigger: 'change' }],
      }
    }
  },
  methods: {
    reset () {
      this.$refs.form.resetFields()
    },

    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (!this.formData.endDate) {
            this.$Message.warning('请选择活动结束时间')
            return
          }

          this.loading = true
          this.createdActivity()
        } else {
          this.$Message.error('表单验证失败，请修改')
        }
      })
    },

    createdActivity () {
        ajax.auto(apis.activity.create, {
          name: this.formData.name,
          end_time: util.dateFormat(this.formData.endDate),
          type: this.formData.type
        }).then(res => {
          this.show = false
          this.loading = false
          this.$Message.success('活动创建成功')
          this.reset()
          $bus.$emit('REDIRECT_PANNEL', 'normal')
          $bus.$emit('ACTIVITIES_RELOAD', 'normal')
        }).catch(err => {
          this.$Message.error(err)
        })
      }
  },
  mounted () {
    $bus.$on('SHOW_RELEASE', () => {
      this.show = true
    })
  }
}
</script>

<style scoped>
.ivu-date-picker {
  display: block;
}
</style>