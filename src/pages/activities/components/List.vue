<template>
<div style="padding: 0 5px;">
  <Timeline class="timeline">
    <!-- status 1 red 测试版 -->
    <!-- status 2 green 正式版 -->
    <!-- status 3 orange 高级版 -->
    <Timeline-item v-for="(item, key) in list" :key="key" :class="{'gray-filter': !item.activity_status}">
      <!-- <Icon slot="dot"
            :type="item.status == 1 ? 'hammer' : ( item.status == 2 ? 'bowtie' : 'ribbon-b' )"></Icon> -->
      <ListItem :data="item"></ListItem>
    </Timeline-item>

  </Timeline>

  <Button type="primary" long
          :loading="loading"
          :disabled="disabled"
          @click="fetchData">{{loadingTip}}</Button>
</div>
</template>

<script>
import ListItem from './ListItem'

export default {
  name: 'List',
  components: { ListItem },
  props: ['type'], // normal vip
  data () {
    return {
      loading: false,
      disabled: false,
      page: 1,

      list: []
    }
  },
  computed: {
    loadingTip () {
      if (this.loading) return '正在加载，请稍候...'
      if (this.disabled) return '当前没有更多活动'
      return '点击加载更多活动'
    }
  },
  methods: {
    fetchData () {
      this.loading = true
      ajax.auto(apis.activity.list, {
        type: this.type === 'vip' ? 2 : 1,
        page: this.page
      }).then(res => {
        this.loading = false
        if (!res.data || !res.data.length) {
          this.disabled = true
        } else {
          this.page++
          this.list = this.list.concat(res.data)
        }
      })
    }
  },
  created () {
    $bus.$on('ACTIVITIES_RELOAD', (type) => {
      if (type !== this.type) return
      this.page = 1
      this.list = []
      this.fetchData()
    })
    this.fetchData()
  }
}
</script>

<style>
/*.ivu-timeline-item-head {
  background-color: #f9f9f9;
}*/
</style>