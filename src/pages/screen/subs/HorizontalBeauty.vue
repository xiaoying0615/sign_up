<template>
  <div>
    <div v-if="info.avatarShow" class="beauty-list beauty-left">
      <ul v-if="info.male !== []">
        <li v-for="(item, key) in info.male" :key="key">
          <img :src="item.avatar" alt="">
          <p>颜值:{{item.beauty}}</p>
        </li>
      </ul>
    </div>
    <div ref="scannerBox" class="scanner-box">
      <div class="scanner-body" :style="scannerRender">
        <Scanner :scannerStyle = "scannerStyle" @getBeautyInfo="getBeautyInfo"></Scanner>
      </div>
    </div>
    <div v-if="info.avatarShow" class="beauty-list beauty-right">
      <span class="avatar-num"><i></i>{{info.signNum}}人</span>
        <ul v-if="info.female !== []">
          <li v-for="(item, key) in info.female" :key="key">
            <img :src="item.avatar" alt="">
            <p>颜值:{{item.beauty}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Scanner from '../components/Scanner'

  export default {
    name: 'HorizontalBeauty',
    components: { Scanner},
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        scannerBoxWidth: 0,
        scannerBoxHeight: 0,
        scannerStyle:"yellowHorizontal"
      }
    },
    computed: {
      scannerRender () {
        let baseSize = 0
        let margin = 0

        if (this.scannerBoxWidth * 0.9 < this.scannerBoxHeight) {
          margin = this.scannerBoxWidth * 0.3
          baseSize = this.scannerBoxWidth - margin * 2
        } else {
          margin = this.scannerBoxHeight * 0.3
          baseSize = this.scannerBoxHeight - margin * 2
        }

        return {
          width: baseSize + 'px',
          height: baseSize + 'px'
//          bottom: margin * 2 + 'px'
        }
      }
    },
    mounted () {
      this.scannerBoxWidth = this.$refs.scannerBox.clientWidth
      this.scannerBoxHeight = this.$refs.scannerBox.clientHeight
    },
    methods:{
      getBeautyInfo(beautyInfo){
        this.info.male = beautyInfo.male
        this.info.female = beautyInfo.female
        this.info.signNum = beautyInfo.num
      }
    },
    created () {
    }
  }
</script>

<style scoped>
  .scanner-box {
    position: relative;
    height: 100vh;
  }

  .scan-info {
    position: relative;
    height: 11vh;
    color: #fff;
    margin-top: 1vh;
    background: rgba(255, 255, 255, .2);
  }

  .scanner-body {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%,-50%);
  }

  .scan-info-title {
    position: absolute;
    width: 4vw;
    top: 50%;
    transform: translateY(-50%);
    padding: 0 10px;
    text-align: center;
    font-size: 4vw;
    line-height: 1.2;
  }

  .scan-info-body {
    height: 100%;
    margin-left: calc( 4vw + 20px );
  }

  .scan-info-avatar {
    width: 20%;
  }


  .beauty-list{
    position: fixed;
    top:20vh;
    width:18vw;
    height:calc(80vh - 5px);
    overflow: hidden;
    margin:auto;
  }
  .beauty-left{
    left: 5px;
  }
  .beauty-right{
    right:5px;
  }
  .beauty-list .avatar-num{
    display: inline-block;
    position: absolute;
    top: 0;
    right: 5px;
    background-color: rgba(255,255,255,0.3);
    border-radius: 2px;
    padding: 2px 8px;
  }
  .beauty-list .avatar-num i{
    display: inline-block;
    margin-right: 4px;
    height: 6px;
    width: 6px;
    border-radius: 50%;
    background-color: red;
  }
  .beauty-list ul{
    margin-top: 30px;
    display: flex;
    background-color: rgba(255,255,255,0.3);
    border-radius: 5px;
    padding: 5px;
    flex-wrap:wrap;
    align-items: start;
    align-content: flex-start;
    width:100%;
    height: 100%;
  }
  .beauty-list ul li{
    position: relative;
    width:48%;
    height:auto;
    margin:2% 1% 0;
    list-style: none;
  }
  .beauty-list ul li p{
    position: absolute;
    width: 100%;
    bottom: 0;
    text-align: center;
    color: #ffffff;
    background-color: rgba(0,0,0,0.6);
  }

  /*@media screen and (min-width: 600px) {*/
  /*.avatar-list ul{*/
  /**/
  /*}*/
  /*}*/
</style>
