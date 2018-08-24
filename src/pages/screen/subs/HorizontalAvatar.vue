<template>
  <div>
    <div ref="scannerBox" class="scanner-box">
      <div class="scanner-body" :style="scannerRender">
        <Scanner :scannerStyle = "scannerStyle" @getAvatarInfo="getAvatarInfo"></Scanner>
      </div>
    </div>
    <div v-if="info.avatarShow & info.sign !== []" class="avatar-list">
      <span class="avatar-num"><i></i>{{info.signNum}}人</span>
      <ul >
        <li v-for="(item, key) in info.sign" :key="key">
          <img :src="item.avatar" alt="">
          <p>{{item.nick}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Scanner from '../components/Scanner'

  export default {
    name: 'HorizontalAvatar',
    components: {Scanner},
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
          margin = this.scannerBoxWidth * 0.25
          baseSize = this.scannerBoxWidth - margin * 2
        } else {
          margin = this.scannerBoxHeight * 0.25
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
      getAvatarInfo(avatarInfo){
        if(avatarInfo.avatar !== ""){
          this.info.sign.unshift({avatar:avatarInfo.avatar,nick:avatarInfo.nick})
          this.info.signNum = avatarInfo.num
        }
      }
    },
    created () {
      this.styleId = this.info.styleId
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
    right: 25%;
    top:50%;
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
    margin-left: calc(4vw + 20px);
  }

  .scan-info-avatar {
    width: 20%;
  }

  .avatar-list{
    position: fixed;
    top:20vh;
    right:5px;
    width:35vw;
    height:calc(80vh - 5px);
    overflow: hidden;
    margin:auto;
  }
  .avatar-list .avatar-num{
    display: inline-block;
    position: absolute;
    top: 0;
    right: 5px;
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
  .avatar-list ul{
    display: flex;
    width: 100%;
    height: 100%;
    flex-wrap:wrap;
    align-items: flex-start;
    justify-content: flex-start;
    align-content: flex-start;
    padding: 5px;
    margin-top: 30px;
    overflow: hidden;
    border-radius: 5px;
    background-color: rgba(255,255,255,0.3);
  }
  .avatar-list ul li{
    position: relative;
    width:24%;
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
</style>
