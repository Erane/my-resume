<template>
  <div class="canvas">

    <p>
      <span>0</span>
      <input type="range" min="0" max="150" step="1" class="range" :value="current" @input="changeValue"/>
      <span>150</span>
    </p>
    <div class="value">{{current}}</div>
    <button class="reset" @click="reset">重置</button>
    <div class="canvas-wrap">
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>
<script>
  import CANVAS from  './../../static/canvas/mycanvas';

  let vm = {
    name: 'process',
    data: function () {
      return {
        current: 0,
        can: null,
        timer :null
      }
    },
    methods: {
      changeValue: function (e) {
        let self = this;
        self.current = e.target.value;
        clearTimeout(this.timer);
        this.timer=setTimeout(function () {
          self.can.handle({
            target: self.current, // 当前积分
          })
        },200);
      },
      reset:function () {
        this.can.reset();
      }
    },
    mounted(){
      let init_progress = 45;
      let Total = 150;
      let to = 88;
      this.can = new CANVAS({
        el: '#canvas',
        init_progress: init_progress, // 环形形状,角度单位,0-89度之间,默认为0度(半圆)
        Total: Total, // 积分总值
        size: 200, // 环形大小,默认120
        lineWidth: 12,// 线宽,默认为6
        debug: 0 // 调试模式,会打印出所有过程,默认为false
      });
    }
  };
  export default vm;
</script>
<style lang="scss">
  .value {
    margin: 0.6rem 0;
  }

  .canvas {
    text-align: center;
    p {
      margin-top: 0.6rem;
      position: relative;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        padding: 0 0.4rem;
      }
    }
  }
</style>
