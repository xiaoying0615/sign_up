<template>
  <div id="app">
    <router-view name="nav"></router-view>
    <div class="margin-10">
      <router-view></router-view>
    </div>
    <router-view name="company"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  background: #f9f9f9;
  min-width: 900px;
}

img {
  display: block;
  width: 100%;
}

/*::-webkit-scrollbar {
  width: 0;
  height: 0;
}*/

.fl {float: left !important;}
.fr {float: right !important;}
.clear:before, .clear:after {
  content: '';
  display: table;
  clear: both;
}

.block {display: block !important;}
.inline-block {display: inline-block !important;}
.full-width {width: 100% !important;}

.margin-top-10 {margin-top: 10px !important;}
.margin-bottom-10 {margin-bottom: 10px !important;}
.margin-left-10 {margin-left: 10px !important;}
.margin-right-10 {margin-right: 10px !important;}
.margin-top-20 {margin-top: 20px !important;}
.margin-bottom-20 {margin-bottom: 20px !important;}
.margin-10 {margin: 10px !important;}
.padding-horizontal-5 {padding: 0 5px !important;}
.padding-10 {padding: 10px !important;}
.padding-right-10 {padding-right: 10px !important;}

.text-align-right {text-align: right;}
.text-align-center {text-align: center;}
.text-over {
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

.relative {position: relative;}
.absolute {position: absolute;}
.fixed {position: fixed;}
.full-screen {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.white {color: #ffffff !important;}
.blue {color: #3399ff !important;}
.green {color: #00cc66 !important;}
.orange {color: #ff9900 !important;}
.red {color: #ff3300 !important;}
.bg-white {background: #ffffff !important;}
.bg-blue {background: #3399ff !important;}
.bg-green {background: #00cc66 !important;}
.bg-orange {background: #ff9900 !important;}
.bg-red {background: #ff3300 !important;}

.gray-filter {
  filter: grayscale(1);
}

.container {
  padding-top: 60px;
}
.content {
  font-size: 14px;
  color: #333;
}
.extra {
  font-size: 10px;
  color: #999;
}
.bolder {
  font-weight: bolder;
}
.text-indent {
  display: inline-block;
  width: 2em;
}
.text-indent-half {
  display: inline-block;
  width: 1em;
}
.text-over{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.text-center {
  text-align: center;
}

.box-shadow {
  border-radius: 4px;
  transition: box-shadow .3s;
}
.box-shadow:hover {
  box-shadow: 0 1px 6px rgba(0,0,0,.5);
}

.part-title {
  height: 20px;
  line-height: 20px;
  margin: 20px 0;
  font-size: 14px;
  font-weight: bolder;
}

.part-title:before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 20px;
  border-radius: 2px;
  margin-right: 10px;
  vertical-align: bottom;
  background: #3399ff;
}

.canvas {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
}

.blue-button {
  color: #3399ff;
  border-color: #3399ff;
}
.green-button,
.green-button:hover,
.green-button:active,
.green-button:focus {
  color: #19be6b;
  border-color: #19be6b;
}
.red-button,
.red-button:hover,
.red-button:active,
.red-button:focus {
  color: #ed3f14;
  border-color: #ed3f14;
}
.white-button,
.white-button:hover,
.white-button:active,
.white-button:focus {
  color: #fff;
  border-color: #fff;
}

.subview {
  margin-left: 210px !important;
}
</style>
