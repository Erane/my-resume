<template>
  <div class="loading">
    <div class="loading-tips" v-show="showLoading">
      <div class="loading-icon">
        <i class="iconfont icon-loading"></i>
        <i class="iconfont icon-loading icon-loading2 " :style="{height:loading_state+'%'}"></i>
      </div>
      <p>{{loading_state}}%</p>
    </div>
    <div v-show="!showLoading">
      <span @click="play_music" class="music " :class="{play:play_audio}">
      <i class="iconfont icon-yinle"></i>
    </span>
        <transition-group tag="div" class="wrap" name="fade">
          <div class="item" v-for="(image,index) in images" :key="image.src"
               :style="{width:image.width*200/image.height+'px','flex-grow':image.width*200/image.height,'transition-delay':(index*0.2)+'s'}">
            <img :src="image.src"/>
            <i :style="{'padding-bottom':image.height/image.width*100+'%'}"></i>
          </div>
        </transition-group>

    </div>
  </div>
</template>
<style lang="scss">
  @keyframes play {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }

  .loading-tips {
    position: fixed;
    z-index: 100;
    left: 50%;
    top: 50%;
    max-width: 600px;
    transform: translate(-50%,-50%);
    background: #f4efeb;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .loading-icon {
      position: relative;
      overflow: hidden;
    }
    i {
      display: block;
      font-size: 2rem;
      color: #666666;
    }
    .icon-loading2 {
      position: absolute;
      left: 0;
      z-index: 40;
      top: 0;
      color: #2f8086;
      height: 0%;
      overflow: hidden;
      transition: height 0.5s;
    }
    p {
      font-size: 0.4rem;
      margin-top: 0.4rem;
    }
  }

  .loading {
    position: relative;
    .music {
      font-size: 0;
      position: fixed;
      z-index: 99;
      right: 0.4rem;
      top: 0.4rem;
      .icon-yinle {
        font-size: 0.8rem;
        color: #333;
      }
      &.play {
        animation: play 2s infinite linear;
      }
    }
    .wrap {
      display: flex;
      flex-wrap: wrap;
      &:after {
        content: "";
        flex-grow: 9999999999;
      }
      .item {
        position: relative;

      }
      img {
        position: absolute;
        vertical-align: bottom;
        top: 0;
        width: 100%;
      }
      i {
        display: block;

      }
    }
  }
</style>
<script>
  import ImageLoading from  './../../static/loading/loading';
  let path = 'static/loading/images/';
  export default{
    name: 'loading',
    data: function () {
      return {
        urls: [],
        showLoading: true,
        play_audio: false,
        audio: null,
        loading_state: 0,
        images: [
//            path+'1.jpg'
        ],
        audios: []
      }
    },
    created: function () {
      let arr = [];
      if(this.urls.length>0){
          this.showLoading = false;
          return;
      }
      for (let i = 1; i < 20; i++) {
        arr.push(path + i + '.jpg');
      }
      this.audios.push({
        'src': path + 'music.mp3'
      });
      this.urls = arr;
    },
    mounted: function () {
      let self = this;
      let ua = window.navigator.userAgent.toLowerCase();
      loading(self);
    },
    methods: {
      play_music(){
        if (window.HTMLAudioElement) {
          if (this.audio.paused) {
            this.audio.play();
            this.play_audio = true;
          } else {
            this.audio.pause();
            this.play_audio = false;
          }
        }
      }
    },
    destroyed:function () {
      this.play_music();
    }
  }
  function loading(self) {
    ImageLoading(
      self.urls,
      self.audios
      , {
        loading: function (count, total) {
          // 加载中
          /*
           * count : 已加载完成的图片/音频数量
           * total : 音频/图片总数
           * */
          self.loading_state = Math.floor((count / total) * 100)
        },
        complete: function (time, audios, images) {
          // 加载完毕
          self.audio = audios[0].obj;
          setTimeout(function () {
            self.showLoading = false;
            setTimeout(function () {
              self.images = images;
              self.play_music();
            },500)
          },860);
//
        }
      })
  }
</script>
