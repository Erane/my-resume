<template>
  <div class="luck_draw">
    <ul>
      <li v-for="(list,index) in lists" :id="'price'+list.id" :style="{'background':list.bgColor,'color':list.color}"
          @click="roll(index)">
        {{list.text}}
        <span></span>
      </li>
    </ul>
  </div>
</template>
<script>
  export default{
    name: 'luck_draw',
    data: function () {
      return {
        lists: [
          {
            text: '5元Q币',
            id: 1
          },
          {
            text: '3天F码',
            id: 2
          },
          {
            text: '谢谢参与',
            id: 3
          },
          {
            text: '10粒豆芽',
            id: 8
          },
          {
            text: '开始抽奖',
          },
          {
            text: '免邮劵',
            id: 4
          },
          {
            text: '5元Q币',
            id: 7
          },
          {
            text: '惊喜礼包',
            id: 6
          },
          {
            text: '5粒豆芽',
            id: 5
          }
        ],
        timer: null,
        current: 0,
        circle_num: 24,
        speed: 400,
        gifts: [
          {
            "name": "5元Q币",
            "prop": 5,
          }
          ,
          {
            "name": "3天F码",
            "prop": 20,
          },
          {
            "name": "谢谢参与",
            "prop": 40,
          },
          {
            "name": "免邮劵",
            "prop": 10,
          },
          {
            "name": "惊喜礼包",
            "prop": 8,
          },
          {
            "name": "5粒豆芽",
            "prop": 16,
          },
          {
            "name": "10粒豆芽",
            "prop": 7,
          }
        ],
        played:false,
        price:''
      }
    },
    methods: {
      roll(index){
        if (index !== 4 || this.played) {
          return
        }
        this.played = true;
        let self = this;
        let gArr = [];
        for (let i = 0; i < this.gifts.length; i++) {
          gArr.push(this.gifts[i]['prop'])
        }
        self.price=self.gifts[self.getResult(gArr)]['name'];
        this.timer = setTimeout(function () {
          self.play();
        }, self.speed)
      },
      play(){
        let old = this.current;
        let self = this;
        this.current++;
        if (this.current > 8) {
          this.current = 1
        }
        this.circle_num--;
        let oldEl = document.querySelector('#price' + old) ;
        let newEl =  document.querySelector('#price' + this.current) ;
        oldEl && document.querySelector('#price' + old).classList.remove('hide');
        newEl && document.querySelector('#price' + this.current).classList.add('hide');
        if (this.circle_num > 18) {
          self.speed = 300;
        } else if (this.circle_num > 10 && this.circle_num < 18) {
          self.speed = 200;
        }
        else {
          self.speed = 160;
        }
        if( this.circle_num<=0 && newEl.textContent.trim() === self.price ){
            clearTimeout(this.timer);
            setTimeout(function () {
              alert('恭喜您抽中了:'+self.price);
            },0)
        }else {
          this.timer = setTimeout(function () {
            self.play();
          }, self.speed)
        }
      },
      getResult(arr){
        let leng = 0;
        for (let i = 0; i < arr.length; i++) {
          leng += arr[i]
        }
        for (let i = 0; i < arr.length; i++) {
          let random = parseInt(Math.random() * leng);
          if (random < arr[i]) {
            return i
          }
          else {
            leng -= arr[i]
          }
        }
      }
    }
  }
</script>
<style lang="scss">
  .luck_draw {
    position: fixed;
    left: 50%;
    top: 50%;
    max-width: 600px;
    transform: translate(-50%,-50%);
    width: 100%;
    height: 100%;
    z-index: 22;
    background: rgb(244, 239, 235);
    ul {
      display: flex;
      flex-wrap: wrap;
      margin-left: -0.2rem;
      margin-top: 2rem;
      padding: 0 0.4rem;
    }
    li {
      flex: 30%;
      text-align: center;
      background: salmon;
      height: 2rem;
      line-height: 2rem;
      margin-left: 0.2rem;
      margin-top: 0.2rem;
      position: relative;
      &.hide {
        span {
          display: none;
        }
      }
      span {
        background: black;
        pointer-events: none;
        opacity: .5;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
      }
      &:nth-of-type(1) {
        background: rgb(107, 223, 239);
        color: #238997;
      }
      &:nth-of-type(2) {
        background: rgb(148, 235, 107);
        color: #179529;
      }
      &:nth-of-type(3) {
        background: rgb(239, 203, 107);
        color: #826311;
      }
      &:nth-of-type(4) {
        background: rgb(239, 105, 107);
        color: #a50406;
      }
      &:nth-of-type(5) {
        background: #f73232;
        color: white;
        cursor: pointer;
        span {
          display: none;
        }
      }
      &:nth-of-type(6) {
        background: rgb(239, 105, 181);
        color: #a2065f;
      }
      &:nth-of-type(7) {
        background: rgb(173, 105, 239);
        color: #680c73;
      }
      &:nth-of-type(8) {
        background: rgb(84, 224, 104);
        color: #047814;
      }
      &:nth-of-type(9) {
        background: rgb(239, 105, 107);
        color: #a50406;
      }
    }
  }
</style>
