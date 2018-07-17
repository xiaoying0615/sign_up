<template>
<div class="container">
  <Row>
    <Col span="14" offset="5">
      <Tabs v-model="pannel">
        <Tab-pane label="普通活动" name="normal" icon="bookmark">
          <Row class="margin-top-20">
            <Col>
              <List type="normal"></List>
            </Col>
          </Row>
        </Tab-pane>

        <Tab-pane label="高级活动" name="vip" icon="flag">
          <Row class="margin-top-20">
            <Col>
              <List type="vip"></List>
            </Col>
          </Row>
        </Tab-pane>

        <Button slot="extra" type="primary" size="small" style="margin-top: 4px;"
                @click="releaseActivity">创建活动</Button>
      </Tabs>
    </Col>
  </Row>

  <Release></Release>

  <Address></Address>

  <Payment></Payment>
</div>
</template>

<script>
import List from './components/List'
import Release from './components/Release'
import Address from './components/Address'
import Payment from '@/components/Payment'

export default {
  name: 'Activities',
  components: { List, Release, Address, Payment },
  data () {
    return{
      pannel: 'normal'
    }
  },
  methods: {
    releaseActivity () {
      $bus.$emit('SHOW_RELEASE')
    }
  },
  created () {
    $bus.$on('REDIRECT_PANNEL', pannel => {
      this.pannel = pannel
    })
  }
}
</script>

<style scoped>
.list-box {
  margin: 20px 50px;
}

/*.ivu-tabs-tabpane {
  max-height: calc(100vh - 175px);
  overflow: scroll;
}*/
</style>