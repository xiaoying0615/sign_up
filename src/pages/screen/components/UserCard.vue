<template>
<div class="user-card-box">
  <div v-if="!complex"
       class="user-card card-terse position-center bg-white"
       :style="raduisRender">
    <img class="card-terse-avatar margin-bottom-20" :src="data.avatar">
    <h1 class="card-terse-name text-over">{{data.name}}</h1>
    <p class="card-terse-welcome margin-bottom-10">欢迎您的到来！</p>
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
  width: 30%;
  max-width: 420px;
  min-width: 220px;
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
  width: 70%;
  min-width: 400px;
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
</style>