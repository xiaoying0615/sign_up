<template>
  <div class="user-card-box">
    <div v-if="styleId === 1">
      <div v-if="!complex"
           class="user-card card-terse position-center bg-white"
           :style="raduisRender">
        <img class="card-terse-avatar margin-bottom-20" :src="data.avatar">
        <h1 class="card-terse-name text-over">{{data.name}}</h1>
        <p class="card-terse-welcome margin-bottom-10">欢迎光临</p>
        <p class="red">颜值: {{data.score}}分</p>
      </div>

      <div ref="cardComplex"
           v-else
           class="user-card card-complex position-center bg-white clear"
           :style="raduisRender">
        <img class="card-complex-avatar fl" :src="data.avatar">
        <div class="card-complex-content" :style="fontRender">
          <p v-for="(item, key) in data.form" :key="key">{{item.value}}</p>
        </div>
      </div>
    </div>
    <div v-if="styleId === 2">
      <div class="card-avatar" :class="{vertical:scannerStyle.indexOf('Vertical') >= 0 ,horizontal:scannerStyle.indexOf('Horizontal') >= 0 }">
        <img class="card-terse-avatar margin-bottom-20" :src="data.avatar">
        <div class="card-content">
          <div>
            <h1 class="card-terse-name text-over">{{data.name}}
              <Icon v-if="data.gender === 1" type="male"/>
              <Icon v-else type="female"/>
            </h1>
            <div class="card-terse-welcome margin-bottom-10">
              <p>欢迎光临</p>
              <i class="welcome-corner corner-top-left"></i>
              <i class="welcome-corner corner-top-right"></i>
              <i class="welcome-corner corner-bottom-left"></i>
              <i class="welcome-corner corner-bottom-right"></i>
            </div>
            <div class="line"></div>
            <ul v-if="data.form !== []" :style="fontRender">
              <li v-for="(item, key) in data.form" :key="key">{{item.name}}:{{item.value}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-if="styleId === 3">
      <div class="card-beauty" :class="{horizontal:scannerStyle.indexOf('Horizontal') >= 0 }">
        <img class="card-terse-avatar margin-bottom-20" :src="data.avatar">
        <img src="@/assets/beauty_bg.png" alt="" class="stylebg">
        <div class="card-content">
          <h1 class="card-terse-name text-over">{{data.name}}
            <Icon v-if="data.gender === 1" type="male"/>
            <Icon v-else type="female"/>
          </h1>
          <div class="card-terse-welcome margin-bottom-10">
            <p>欢迎光临</p>
            <i class="welcome-corner corner-top-left"></i>
            <i class="welcome-corner corner-top-right"></i>
            <i class="welcome-corner corner-bottom-left"></i>
            <i class="welcome-corner corner-bottom-right"></i>
          </div>
          <div class="line"></div>
          <ul v-if="data.form !== []" :style="fontRender">
            <li v-for="(item, key) in data.form" :key="key">{{item.value}}<br/>{{item.name}}</li>
          </ul>
        </div>

      </div>
    </div>

  </div>

</template>

<script>

  export default {
    name: 'UserCard',
    model: {
      prop: 'data'
    },
    props: {
      complex: {
        type: Boolean,
        default: false
      },
      styleId: {
        type: Number,
        default: 1
      },
      scannerStyle: {
        type: String,
        default: ""
      },
      data: {
        type: Object
      }
    },
    data () {
      return {
        baseFontSize: 14
      }
    },
    computed: {
      fontRender () {
        return {
          fontSize: this.baseFontSize + 'px'
        }
      },
      raduisRender () {
        return {
          borderRadius: this.baseFontSize / 2 + 'px'
        }
      }
    },
    mounted () {
      if (this.$refs.cardComplex &&
        this.$refs.cardComplex.clientHeight / 12 > this.baseFontSize) {
        this.baseFontSize = this.$refs.cardComplex.clientHeight / 12
      }
    },
    created (){
    }
  }
</script>

<style>
  .user-card-box {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    font-size: 14px;
    z-index: 11;
  }

  .user-card {
    overflow: hidden;
    color: #000;
    background: #fff;
  }

  .card-terse {
    width: 50%;
    max-width: 420px;
    min-width: 150px;
    padding: 10px;
    text-align: center;
  }

  .card-terse-avatar {
    max-width: 400px;
  }

  .card-terse-name {
    font-size: 26px;
  }

  .card-terse-name i {
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 26px;
    font-size: 14px;
    border: 2px solid #9fa0a9;
    color: #9fa0a9;
    background-color: #fa8cec;
    border-radius: 50%;
    margin-left: 10px;
  }

  .card-terse-name i.ivu-icon-male {
    background-color: #61e5f8;
  }

  .card-terse-welcome {
    font-size: 16px;
  }

  .card-complex {
    width: 80%;
  }

  .card-complex-avatar {
    width: 50%;
  }

  .card-complex-content {
    position: absolute;
    left: calc(50% + 10px);
    top: 50%;
    transform: translateY(-50%);
    line-height: 1.5;
  }

  /*theme style*/
  .card-avatar .card-terse-welcome, .card-beauty .card-terse-welcome {
    position: relative;
    display: inline-block;
    width: auto;
    padding: 4px;
    background-color: rgba(255, 255, 255, 0.3);
  }

  .card-avatar .card-terse-welcome p, .card-beauty .card-terse-welcome p {
    padding: 10px;
    min-width: 160px;
    background-color: #d5bd78;
    background: linear-gradient(left, #f5e99d, #d5bd78);
  }

  .card-avatar .card-terse-welcome .welcome-corner, .card-beauty .card-terse-welcome .welcome-corner {
    position: absolute;
    z-index: 2;
    width: 4px;
    height: 4px;
    background-color: transparent;
  }

  .card-avatar .card-terse-welcome .corner-top-left, .card-beauty .card-terse-welcome .corner-top-left {
    left: -1px;
    top: -1px;
    border-top: 2px solid #fff;
    border-left: 2px solid #fff;
  }

  .card-avatar .card-terse-welcome .corner-top-right, .card-beauty .card-terse-welcome .corner-top-right {
    right: -1px;
    top: -1px;
    border-top: 2px solid #fff;
    border-right: 2px solid #fff;
  }

  .card-avatar .card-terse-welcome .corner-bottom-left, .card-beauty .card-terse-welcome .corner-bottom-left {
    left: -1px;
    bottom: -1px;
    border-bottom: 2px solid #fff;
    border-left: 2px solid #fff;
  }

  .card-avatar .card-terse-welcome .corner-bottom-right, .card-beauty .card-terse-welcome .corner-bottom-right {
    right: -1px;
    bottom: -1px;
    border-bottom: 2px solid #fff;
    border-right: 2px solid #fff;
  }

  .card-avatar {
    position: relative;
    width: 100%;
    text-align: center;
    color: #000;
  }

  .card-avatar img {
    width: 100%;
    max-width: 100%;
    border-radius: 50%;
    border: 5px solid #d5bc77;
  }

  .card-avatar .card-content {
    width: 100%;
    height: auto;
    margin-top: -51%;
    padding: 50% 0 15% 0%;
    border: 5px solid #d5bc77;
    border-radius: 0 0 50% 50%;
    background-color: rgba(255, 255, 255, 0.3);
  }

  .card-avatar .card-content .card-terse-name {
    padding-top: 20px;
    font-size: 40px;
  }

  .card-avatar .card-content .card-terse-name i {
    width: 30px;
    height: 30px;
    line-height: 26px;
    font-size: 14px;
    border: 2px solid #9fa0a9;
  }

  .card-avatar .card-content .card-terse-name i.ivu-icon-male {
    background-color: #61e5f8;
  }

  .card-avatar .card-content .card-terse-welcome {
    padding: 8px;
    font-size: 24px;
  }

  .card-avatar .card-content .card-terse-welcome p {
    min-width: 200px;
  }

  .card-avatar .card-content .card-terse-welcome .welcome-corner {
    width: 8px;
    height: 8px;
  }
  .card-avatar  .card-content .card-terse-welcome .corner-top-left{
    left: -2px;
    top: -2px;
    border-top: 4px solid #fff;
    border-left: 4px solid #fff;
  }

  .card-avatar  .card-content .card-terse-welcome .corner-top-right{
    right: -2px;
    top: -2px;
    border-top: 4px solid #fff;
    border-right: 4px solid #fff;
  }

  .card-avatar  .card-content .card-terse-welcome .corner-bottom-left{
    left: -2px;
    bottom: -2px;
    border-bottom: 4px solid #fff;
    border-left: 4px solid #fff;
  }

  .card-avatar  .card-content .card-terse-welcome .corner-bottom-right{
    right: -2px;
    bottom: -2px;
    border-bottom: 4px solid #fff;
    border-right: 4px solid #fff;
  }

  .card-avatar .card-content ul {
    padding-left: 20%;
    text-align: left;
  }

  .card-avatar .card-content ul li {
    list-style: none;
    font-size: 24px;
    padding: 10px 0;
  }

  .card-avatar .card-content ul li:before {
    content: '';
    display: inline-block;
    height: 12px;
    width: 12px;
    margin-right: 10px;
    background-color: #d0a972;
  }

  .line {
    position: relative;
    width: 60%;
    height: 1px;
    margin: 3px auto 10px;
    background-color: #000000;
  }

  .line:before, .line:after {
    display: block;
    content: '';
    position: absolute;
    top: -2px;
    width: 5px;
    height: 5px;
    background-color: #000000;
    border-radius: 50%;
  }

  .line:before {
    left: -1px;
  }

  .line:after {
    right: -1px;
  }

  .card-avatar.vertical .card-content {
    height: 0;
    padding-top: 120%;
    border-radius: 0 0 60% 60% /0 0 50% 50%;
  }
  .card-avatar.vertical .card-content > div{
    height: auto;
    margin-top:-68%;
  }

  /*horizontal screen*/
  .card-avatar.horizontal {
    position: relative;
  }

  .card-avatar.horizontal .card-content {
    position: absolute;
    top: 51%;
    right: 0%;
    z-index: -1;
    margin-right: 50%;
    width: 150%;
    height: 100%;
    padding: 10% 40% 0% 0%;
    border: 5px solid #d5bc77;
    border-radius: 50% 0 0 50%/75% 0 0 75%;
    background-color: rgba(255, 255, 255, 0.3);
  }

  .card-avatar.horizontal .card-content .card-terse-name {
    padding-top: 0px;
  }

  /*beauty theme*/
  .card-beauty .line {
    width: 100%;
  }

  .card-beauty {
    position: relative;
    width: 100%;
    text-align: center;
    color: #000;
  }

  .card-beauty .card-terse-avatar {
    width: 100%;
    border-radius: 50%;
    border: 5px solid #d5bc77;
    max-width: 100%;
  }

  .card-beauty .stylebg {
    position: absolute;
    top: 0;
    left: 50%;
    width: 100%;
    padding-top: 86%;
    transform: translateX(-50%);
    z-index: 1;
  }

  .card-beauty .card-terse-name {
    font-size: 30px;
  }

  .card-beauty .card-content {
    width: 100%;
    height: auto;
    margin-top: 9%;
    padding: 2% 3%;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.3);
  }

  .card-beauty ul {
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
    overflow: hidden;
  }

  .card-beauty ul li {
    flex-grow: 1;
    list-style: none;
    overflow: hidden;
    word-break: keep-all;
    padding: 0 5px;
    border-right: 1px solid rgba(255, 255, 255, 0.6);
  }

  .card-beauty ul li:last-child {
    border-right: 0px;
  }


</style>
