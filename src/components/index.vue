<template>
  <div class="index">
    <div class="top">
      <h1 class="name">何健星</h1>
      <p class="job">web前端开发</p>

      <div class="info">
        <p>
          男/1991.7
        </p>
        <p>
          广东松山职业技术学院·电子商务
        </p>
        <p>
          大专/2013年毕业
        </p>
      </div>
      <a href="https://github.com/Erane" class="icon-github-wrap">
        <i class="iconfont icon-github"></i>
      </a>
    </div>
    <section>
      <div class="sub-title">
        工作经历
      </div>
      <div class="con">
        <ul>
          <li>
            <p class="company-name">广州合谐医疗科技有限公司</p>
            <span class="time">2015.9 - 2017.7 (2年)</span>
            <div class="work">
              <p>
                1.负责公司日常销售推广H5制作(微信端);
              </p>
              <p>
                2.配合产品部负责公司PC端及移动端页面制作(后台管理页面,用户端页面)
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section class="project">
      <div class="sub-title">
        项目经历
      </div>
      <div class="con">
        <ul>
          <li v-for="(item,index) in projects" :key="+item">
            <p class="project-name">{{item.name}}</p>
            <p v-html="item.con">

            </p>

            <router-link v-if="item.url" :to="item.url?item.url:'/'" tag="a">去看看</router-link>
          </li>
        </ul>
      </div>
    </section>
    <section>
      <div class="sub-title">
        技能树
      </div>
      <div class="skills con">
        <p>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-PS"></use>
          </svg>
          <span>PS</span>
        </p>
        <p>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gulp"></use>
          </svg>
          <span>gulp</span>
        </p>
        <p>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-HTML"></use>
          </svg>
          <span>HTML5</span>
        </p>
        <p>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-CSS"></use>
          </svg>
          <span>CSS3</span>
        </p>
        <p>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jquery"></use>
          </svg>
          <span>jQuery</span>
        </p>
        <p>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-vuejs"></use>
          </svg>
          <span>vue.js</span>
        </p>
        <p>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-nodejs1"></use>
          </svg>
          <span>express</span>
        </p>
        <p>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-mongo-db"></use>
          </svg>
          <span>mongodb</span>
        </p>
      </div>
    </section>
    <section>
      <div class="sub-title">
        关于我
      </div>
      <div class="my-info con">
        1.个人性格还是比较害羞的,但熟悉了会好很多;<br>
        2.喜欢钻研技术,前面的技能树大部分是自己学的,上一任公司给予我的指导并不多,更多的是提供一个入门的环境;<br>
        3.之前的工作比较偏向页面UI，希望接下来的工作能更多关注数据交互;
      </div>
    </section>
  </div>
</template>
<style lang="scss">


  .index {
    padding-bottom: 2rem;
  }

  .top {
    text-align: center;
    padding-top: 4rem;
    height: 100vh;
    padding-bottom: 4rem;
    position: relative;
    h1 {
      font-size: 0.8rem;
    }
    .job {
      font-size: 0.65rem;
      margin-top: 0.2rem;
    }
    .info {
      margin-top: 2rem;
      color: rgb(31, 66, 66);
      font-size: 0.5rem;
      line-height: 2;
    }
  }

  section {
    margin-bottom: 0.4rem;
    .sub-title {
      background: rgb(119, 217, 204);
      color: #fff;
      padding: 0.4rem 0.4rem;
      font-size: 0.48rem;
    }
    color: rgb(47, 128, 134);
    .con {
      padding: 0.6rem 0.4rem;
    }
    .company-name {
      font-size: 0.44rem;
    }
    .time {
      color: silver;
      display: block;
      margin: 0.2rem 0;
      font-size: 0.36rem;
    }
    .work {
      color: #333;
      font-size: 0.36rem;
      p {
        line-height: 2;
      }
    }
  }

  .project {
    font-size: 0.44rem;
    p:nth-of-type(2) {
      color: #333;
      margin-top: 0.4rem;
      font-size: 0.36rem;
      line-height: 2;
    }
    a {
      display: block;
      text-align: center;
      width: 2rem;
      padding: 0.2rem 0;
      color: rgb(143, 182, 181);
      border: 1px solid rgb(143, 182, 181);
      margin-top: 0.4rem;
      font-size: 0.36rem;
      border-radius: 4px;
    }
    li {
      padding-bottom: 0.6rem;
      border-bottom: 1px solid silver;
      &:not(:first-of-type) {
        margin-top: 0.6rem;
      }
    }
  }

  .icon-github-wrap {
    position: absolute;
    left: 50%;
    bottom: 1rem;
    transform: translateX(-50%);
    i {
      font-size: 0.8rem;
      color: #333;
    }
  }

  .icon {
    width: 1rem;
    height: 1rem;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    font-size: 30px;
    display: inline-block;
    flex: auto;
    min-width: 2rem;
  }

  .skills {
    font-size: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.6rem 0;
    flex-wrap: wrap;
    text-align: center;
    p {
      margin-bottom: 0.6rem;
    }
    span {
      font-size: 0.4rem;
      display: block;
      margin-top: 0.2rem;
      color: #333;
    }
  }

  .my-info {
    color: #333;
    font-size: 0.4rem;
    line-height: 1.8;
  }
</style>

<script>

  export default{
    name: 'index',
    data: function () {
      return {
        projects: [
          {
            name: '日常H5制作',
            con: '1.基于rem单位适配绝大部分机型;<br>2.使用css3完成动画效果;<br>3.使用css预处理器-scss;',
            url:''
          },
          {
            name: '优客私人定制-为患者提供医疗服务定制',
            con: '1.使用vue框架进行页面渲染<br>2.使用饿了么基于vue的移动端组件库--Mint UI;',
            url:''
          },
          {
            name: '图片/音频预加载',
            con: '1.H5页面通常都会有大量的图片资源,以及有时需要进入第一屏的时候播放背景音乐;<br>2.这时就需要对图片和音频进行预加载,保证进入页面后需要的资源都处于待命状态',
            url:'/loading'
          },
          {
            name: '弧形进度条',
            con: '1.这是我个人首次使用canvas实现的效果;<br>2.里面比较难的一点是将任意的数值转换为相应的弧度值;<br>3.还需要对各种极限值进行判断,比如传进去一个0.01或者负数的时候;<br>4.里面还涉及js数字精度丢失,毕竟数字转换弧度值肯定会出现小数点的;',
            url:'/process'
          },
          {
            name: '九宫格抽奖',
            con: '实现思路:<br>1.用户点击后询问后台,动画进入假流程;<br>2.等待后台返回的信息;<br>3.获取后台返回信息后,当动画进入到第一个的时候开始进入真实抽奖流程;<br>4.弹出抽中奖项;<br>',
            url:'/luck_draw'
          },
          {
            name: '移动端图片上传预览',
            con: '  实现思路:<br>1.将上传的图片交由FileReader API进行处理;<br>2.然后再将FileReader返回的值取出到img标签,即可实现本地图片预览效果<br>',
            url:'/upload'
          }
        ]
      }
    }
  }
</script>
