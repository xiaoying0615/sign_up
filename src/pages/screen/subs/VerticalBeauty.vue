<template>
  <div>
    <div ref="scannerBox" class="scanner-box">
      <div class="scanner-body" :style="scannerRender">
        <Scanner :scannerStyle = "scannerStyle" @getBeautyInfo="getBeautyInfo"></Scanner>
      </div>
    </div>
    <div v-if="info.avatarShow" class="avatar-list">
      <span class="avatar-num"><i></i>{{info.signNum}}人</span>
      <div class="">
        <ul v-if="info.female !== []">
          <li v-for="(item, key) in info.female" :key="key">
            <img :src="item.avatar" alt="">
            <p>颜值:{{item.beauty}}</p>
          </li>
        </ul>
        <ul v-if="info.male !== []">
          <li v-for="(item, key) in info.male" :key="key">
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
    name: 'VerticalBeauty',
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
        scannerStyle:"yellowBorder"
      }
    },
    computed: {
      scannerRender () {
        let baseSize = 0
        let margin = 0

        if (this.scannerBoxWidth * 0.9 < this.scannerBoxHeight) {
          margin = this.scannerBoxWidth * 0.2
          baseSize = this.scannerBoxWidth - margin * 2
        } else {
          margin = this.scannerBoxHeight * 0.2
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
    height: 70vh;
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
    top: 50%;
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

  .avatar-list{
    position: fixed;
    left: 50%;
    bottom:30px;
    width:99%;
    height: auto;
    overflow: hidden;
    transform: translateX(-50%);
  }
  .avatar-list .avatar-num{
    display: inline-block;
    position: absolute;
    top: 0;
    right: 1px;
    background-color: rgba(255,255,255,0.3);
    border-radius: 2px;
    padding: 2px 8px;
  }
  .avatar-list .avatar-num i{
    display: inline-block;
    margin-right: 4px;
    height: 6px;
    width: 6px;
    border-radius: 50%;
    background-color: red;
  }
  .avatar-list >div{
    background-color: rgba(255,255,255,0.3);
    height:auto;
    height:100%;
  }
  .avatar-list ul{
    display: flex;
    height:28vw;
    flex-wrap:wrap;
    align-items: flex-start;
    overflow: hidden;
    background-color: rgba(255,255,255,0.3);
  }
  .avatar-list ul:first-child{
    margin-top: 30px;
    padding: 10px 10px 0;
    border-radius: 10px 10px 0 0;
  }
  .avatar-list ul:nth-child(2){
    padding: 0px 10px 10px;
    border-radius: 0 0 10px 10px;
  }
  .avatar-list ul li{
    position: relative;
    width:13%;
    height:auto;
    margin:1% 0.5% 0;
    list-style: none;
  }
  .avatar-list ul li p{
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
