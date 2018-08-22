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
  <div  v-if="styleId === 2">
    <div class="card-avatar" :class="{horizontal:scannerStyle.indexOf('Horizontal') >0 }">
      <img class="card-terse-avatar margin-bottom-20" :src="data.avatar">
      <div class="card-content clear">
        <h1 class="card-terse-name text-over">{{data.name}}<Icon type="md-male" /></h1>
        <div class="card-terse-welcome margin-bottom-10">
          <p>欢迎光临</p>
        </div>
        <div class="line"></div>
        <ul v-if="data.form !== []" :style="fontRender">
          <li v-for="(item, key) in data.form" :key="key">{{item.name}}:{{item.value}}</li>
        </ul>
      </div>

    </div>
  </div>
  <div  v-if="styleId === 3">
    <div class="card-beauty" :class="{horizontal:scannerStyle.indexOf('Horizontal') >0 }">
      <img class="card-terse-avatar margin-bottom-20" :src="data.avatar">
      <img src="@/assets/beauty_bg.png" alt="" class="stylebg">
      <div class="card-content clear">
        <h1 class="card-terse-name text-over">{{data.name}}<Icon type="md-male" /></h1>
        <div class="card-terse-welcome margin-bottom-10">
          <p>欢迎光临</p>
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
  left: calc( 50% + 10px );
  top: 50%;
  transform: translateY(-50%);
  line-height: 1.5;
}

  .card-avatar{
    position: relative;
    width: 100%;
    max-width: 420px;
    min-width: 150px;
    text-align: center;
    color: #000;
  }
  .card-avatar img{
    width:100%;
    border-radius: 50%;
    border: 5px solid #cfa972;
  }
  .card-avatar .card-content {
    width:100%;
    height:auto;
    margin-top:-51%;
    padding:50% 0 15% 0%;
    border: 5px solid #cfa972;
    border-radius: 0 0 50% 50%;
    background-color: rgba(255,255,255,0.3);
  }
  .card-avatar .card-terse-welcome{
    background-color: rgba(255,255,255,0.3);
    padding: 4px;
    width: 60%;
    margin:auto;
  }
  .card-avatar .card-terse-welcome p{
    background-color: #ffd687;
  }
  .card-avatar .card-content ul{
    padding-left: 20%;
    text-align: left;
  }

  .card-avatar .card-content ul li{
    list-style: none ;
  }
  .card-avatar .card-content ul li:before{
    content: '';
    display: inline-block;
    height: 6px;
    width: 6px;
    margin-right: 5px;
    background-color: #d0a972;
  }
  .line{
    position: relative;
    width:60%;
    height: 1px;
    margin:3px auto 10px;
    background-color: #000000;
  }
  .line:before,.line:after{
    display: block;
    content: '';
    position: absolute;
    top: -2px;
    width: 5px;
    height: 5px;
    background-color: #000000;
    border-radius: 50%;
  }
  .line:before{
    left: -1px;
  }
  .line:after{
    right: -1px;
  }

/*horizontal screen*/
.card-avatar.horizontal{
  position: relative;
}

 .card-avatar.horizontal .card-content{
  position: absolute;
   top: 51%;
  right: 0%;
   z-index: -1;
   margin-right:50%;
  width:40vw;
  height:100%;
  padding:20% 50% 0% 10%;
  border: 5px solid #cfa972;
  border-radius: 50% 0 0 50%;
  background-color: rgba(255,255,255,0.3);
  }

.card-beauty .line{
  width: 95%;
}
.card-beauty{
  position: relative;
  width: 100%;
  max-width: 420px;
  min-width: 150px;
  text-align: center;
  color: #000;
}
.card-beauty img:not(.stylebg){
  width:100%;
  border-radius: 50%;
  border: 5px solid #cfa972;
}
.card-beauty .stylebg{
  position: absolute;
  top:56%;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  z-index:1;
}
.card-beauty .card-content {
  width:100%;
  height:auto;
  margin-top: 20px;
  padding:1% 5%;
  border-radius: 5px;
  background-color: rgba(255,255,255,0.3);
}
.card-beauty .card-terse-welcome{
  background-color: rgba(255,255,255,0.3);
  padding: 4px;
  width: 60%;
  margin:auto;
}
.card-beauty .card-terse-welcome p{
  background-color: #ffd687;
}
.card-beauty ul{
  display: flex;
  flex-wrap:nowrap;
  align-items: flex-start;
  overflow: hidden;
}
.card-beauty ul li{
  list-style: none;
  overflow: hidden;
  word-break: keep-all;
  padding: 0 5px;
  border-right:1px solid rgba(255,255,255,0.6);
}
.card-beauty ul li:last-child{
  border-right:0px;
}


</style>
