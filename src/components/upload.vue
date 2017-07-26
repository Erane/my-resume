<template>
  <div class="upload">
    <div class="upload-wrap">
      <div class="upload-input">
        <div class="images-box" v-for="(image,index) in images" :key="''+image">
          <div @click="edit(index)">
            <img :src="image.src"/>
          </div>
          <i class="iconfont icon-guanbi" @click="del(index)"></i>
        </div>

        <label for="upload-button" v-show="overstep">
          <i class="iconfont icon-icon1460189731522"></i>
        </label>
        <input ref="file" multiple accept="image/png, image/jpeg,image/jpg" name="upload-images" type="file"
               id="upload-button" @change="change">
      </div>
    </div>
    <transition name="fade">
      <div class="loading-animate" v-show="loading">
        <div>
          <span></span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default{
    name: 'upload',
    data: function () {
      return {
        images: [],
        is_edit: {
          type: '',
          index: 0
        },
        imgType: '',
        overstep: 1,
        loading:false,
      }
    },
    methods: {
      change: function (e) {
        let target = e.target;
        let files = target.files;
        let self = this;
        let overstep = this.images.length + files.length;
        if (overstep > 9 && !self.is_edit.type) {
          alert('超出上传图片最大数量');
          return;
        }
        this.loading = true;
        if (self.is_edit.type) {
          this.readDataUrl(files[0], self.is_edit.index);
        }else {
          for (let i = 0; i < files.length; i++) {
            this.readDataUrl(files[i], i);
          }
        }
      },
      readDataUrl: function (file, index) {
        let self = this;
        if (!this.checkSize(file)) {
          alert('上传的图片过大');
          return;
        }
        if (!this.checkType(file)) {
          alert('请选择正确的图片类型(jpg,jpeg,png)');
          return;
        }
        let fr = new FileReader();

        fr.onload = function () {
          let img = new Image();
          img.src = this.result;
          if (self.is_edit.type) {
            self.images.splice(index, 1, {
              src: img.src,
              file:file
            })
          } else {
            self.images.push({
              src: img.src,
              file:file
            });
          }
          self.checkLength();
          setTimeout(function () {
            self.$refs.file.setAttribute('multiple', 'multiple');
            self.is_edit.type = 0;
            self.is_edit.index = 0;
            self.clearFile();
            self.loading = false;
          }, 0)
        };
        fr.readAsDataURL(file);
      },
      clearFile: function () {
        // this.$refs.file.value = '';
        if (this.$refs.file) {
          this.$refs.file.value = '';
        }
      },
      checkSize: function (file) {
        return file.size / 1024 / 1024 < 10;
      },
      checkType: function (file) {
        switch (file.type) {
          case 'image/jpeg':
            this.imgType = 'jpeg';
            break;
          case 'image/png':
            this.imgType = 'png';
            break;
          case 'image/jpg':
            this.imgType = 'jpg';
            break;
          default: {
            break;
          }
        }
        return this.imgType.length;
      },
      checkLength: function () {
        if (this.images.length >= 9) {
          this.overstep = 0;
        } else {
          this.overstep = 1;
        }
      },
      edit: function (index) {
        this.is_edit.type = 1;
        this.is_edit.index = index;
        this.$refs.file.removeAttribute('multiple');
        this.$refs.file.click();
      },
      del(index){
        if(confirm('确定删除图片吗?')){
          this.images.splice(index, 1);
          this.clearFile();
          this.checkLength();
        }
      }
    }
  }
</script>
<style lang="scss">
  .upload-wrap {
    background: #fff;
    width: 90%;
    margin: 0.6rem auto;
    padding: 0.6rem;
    position: relative;
    overflow: hidden;
    input[type=file] {
      position: absolute;
      opacity: 0;
      display: none;
    }
  }

  .upload-input {
    display: flex;
    flex-wrap: wrap;
    label, .images-box {
      margin-right: 0.6rem;
      margin-bottom: 0.6rem;
      min-width: 2rem;
      width: 2rem;
      height: 2.5rem;
      border: 1px solid #efefef;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        max-width: 100%;
        object-fit: contain;
      }
      > div {
        overflow: hidden;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .icon-guanbi {
        position: absolute;
        left: 100%;
        bottom: 100%;
        transform: translate(-50%, 50%);
        background: #fff;
        border-radius: 100%;
        overflow: hidden;
      }
      i.icon-icon1460189731522 {
        pointer-events: none;
        color: slategrey;
      }
    }
  }
  .loading-animate{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 45;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    div{
      background: rgba(0,0,0,0.7);
      padding: 0.4rem;
      border-radius: 4px;
      span{
        display: block;
        width: 1rem;
        height: 1rem;
        border-radius: 100%;
        border: 2px solid #fff;
        border-top-color: transparent;
        animation: loading 1s infinite linear;
      }
    }
  }
  @keyframes loading {
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
</style>
