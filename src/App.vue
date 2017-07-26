<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import './public/rem/rem';
import './../static/icon/iconfont';
export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import "./../static/icon/iconfont.css";
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  a{
    text-decoration: none;
  }
  ul,li{
    list-style: none;
  }
  html,body{
    width: 100%;
    overflow-x: hidden;
  }
  html{
    background: rgb(244,239,235);
    color: rgb(47,128,134);
  }
  @media screen and (min-width: 600px) {
    html {
      font-size: 40px !important;
      background: #333;
    }
    body {
      max-width: 600px;
      margin: 0 auto;
      background: rgb(244,239,235);
      color: rgb(47,128,134);
    }
  }
</style>
