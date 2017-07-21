'use strict';

/**
 * Created by Administrator on 2017/04/01.
 */

var win_w = document.body.clientWidth;
var CANVAS = function CANVAS(options) {
    this.canvas = options.el ? document.querySelector(options.el) : document.createElement('canvas');
    //
    // let w_w = document.documentElement.clientWidth,
    //     w_h = document.documentElement.clientHeight;
    // this.canvas.style.width = w_w + 'px';
    // this.canvas.style.height = w_h + 'px';
    // this.canvas.width = w_w * 2;
    // this.canvas.height = w_h * 2;

    var canvas_w = document.body.clientWidth,
        canvas_h = 240 ;
    this.canvas.style.width = canvas_w + 'px';
    this.canvas.style.height = canvas_h + 'px';
    this.canvas.width = canvas_w * 2;
    this.canvas.height = canvas_h * 2;
    this.ctx = this.canvas.getContext('2d');
    // 获取中心值
    this.centerX = this.canvas.width / 2;
    // this.centerY = this.canvas.height / 2;
    this.centerY = this.canvas.height - (200);
    // 缓存一系列参数
    this.speed = 1;
    this.lineWidth = options.lineWidth ? options.lineWidth : 16;
    this.fontColor = options.fontColor ? options.fontColor : '#F47C7C';
    this.fontSize = options.fontSize;

    // if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))){
    //     if(document.cookie.indexOf("iphone_redirect=false") == -1){
    //         for(let i = 0,l = options.fontSize.length;i<l;i++){
    //             this.fontSize[i] = parseFloat(options.fontSize[i]) * parseFloat(getComputedStyle(document.querySelector('html'),0)['fontSize']) + 'px';
    //             console.log(this.fontSize)
    //         }
    //     }
    // }else {
    //     this.fontSize = options.fontSize;
    // }
    this.debug = options.debug ? options.debug : 0;
    this.last = '';
    this.Total = options.Total;
    this.to = 0;
    this.size = options.size ? options.size : 180;
    this.now = '';
    this.back = 0;
    this.offsetNum = 0;
    this.gooing = 0;
    this.lastChange = '';
    this.cb = '';
    this.queue = [];

    this.init_num = {
        current: options.current ? options.current : 0,
        coin: options.coin ? options.coin : 0,
        level: options.level ? options.level : 0
    };
    !options.el && document.body.appendChild(this.canvas);

    this.init_progress = options.init_progress ? options.init_progress : 0;
    // 初始化
    this.init({
        init_progress: this.init_progress
    });
};

CANVAS.prototype = {
    init: function init(options) {
        this.wrapCircle(options.init_progress);
        this.d = this.draw();
        this.d.text();
        this.d.current(this.init_num.current);
        this.d.coin(this.init_num.coin);
        this.d.level(this.init_num.level);
    },
    changeNum: function changeNum(obj, val) {
        // this.init_num = obj;
        Object.assign(this.init_num, obj);
        this.ctx.clearRect(130, 90, 180, 200);
        // this.d.text();
        this.d.current(this.init_num.current);
        this.d.coin(this.init_num.coin);
        this.d.level(this.init_num.level);
        return this;
    },
    // 内环
    innerCircle: function innerCircle(n) {

        // var  canvasGradient = this.ctx.createLinearGradient((this.size/2 * Math.cos((-this.init_progress-180) * (Math.PI) / (180))),(this.size/2 * Math.cos((-this.init_progress-180) * (Math.PI) / (180))),(this.size/2 * Math.cos((n - this.init_progress) * (Math.PI) / (180))), (this.size/2 * Math.sin((n - this.init_progress) * (Math.PI) / (180))));
        var canvasGradient = this.ctx.createLinearGradient(180 - this.init_progress, - this.init_progress, this.init_progress,this.init_progress);

        // canvasGradient.addColorStop(0.5, "#cbb472");
        canvasGradient.addColorStop(0, "#d5c182");
        canvasGradient.addColorStop(1, "#bea15a");
        this.ctx.save();
        this.ctx.lineCap = 'round';
        this.ctx.beginPath();
        this.ctx.strokeStyle = canvasGradient;
        this.ctx.lineWidth = this.lineWidth;
        this.back ?
            this.ctx.arc(this.centerX, this.centerY, this.size, -(this.Forward_angle - n) * Math.PI / 180, (180 - this.init_progress) * Math.PI / 180, true) :
            this.ctx.arc(this.centerX, this.centerY, this.size, (180 - this.init_progress) * Math.PI / 180, (n - this.init_progress) * Math.PI / 180, false);
        this.ctx.stroke();
        this.ctx.restore();
        if (!this.back) {
            // 缓存内环向前走了多少角度  用于回退
            this.Forward_angle = -(this.init_progress - n);
            //                    this.inner = this.Forward_angle + this.init_progress + 180;
        } else {
            // 缓存内环回退走了多少角度  用于向前
            this.Backward_angle = -(this.init_progress - n);
        }
    },
    // 外环
    wrapCircle: function wrapCircle(n) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = '#dedede';
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.arc(this.centerX, this.centerY, this.size, n * Math.PI / 180, -(180 + n) * Math.PI / 180, 1);
        this.ctx.stroke();
        // this.ctx.fillText('round', 430, 110);
        this.ctx.closePath();
        this.ctx.restore();
    },
    // 绘图
    draw: function draw() {
        var v = 0;
        var _v = 0;
        var ctx = this.ctx;
        var self = this;
        return {
            go: function go(target, speed) {
                if (self.back) {
                    // 如果回退
                    v -= speed;
                    v = +v.toFixed(1);
                    if ((180 + (v + (self.init_progress - self.Forward_angle))) / (180 + self.init_progress * 2) < self.to / self.Total) {
                        _v = v;
                        v = target;
                        self.last = self.Backward_angle + self.init_progress - self.Forward_angle + self.init_progress / 2; // 缓存本次角度值 用于向前
                        self.debug && console.log('回退结束', 'last:' + self.last, "target:" + target, 'Backward_angle:' + self.Backward_angle);
                        self.Forward_angle = self.Backward_angle + self.init_progress - self.Forward_angle; // 缓存本次角度值  用于回退
                        self.gooing = 0;
                      ctx.clearRect(self.centerX/2+(win_w/4), self.centerY/2+15, (win_w/6),100);
                      self.d.current(+self.current);
                        self.lastChange = 'back';
                        self.cb && self.cb(); // 回调函数
                        if (self.queue.length > 1) {
                            // 如果有队列
                            self.handle(self.queue[0]);
                            self.queue.splice(0, 1);
                        }
                        return;
                    }
                } else {
                    v += speed;
                    v = +v.toFixed(1);
                    if ((180 + v) / (180 + self.init_progress * 2) > self.to / self.Total) {
                        self.text = ((180 + v) / (180 + self.init_progress * 2) * 100).toFixed(0);
                        _v = v;
                        v = target;
                        self.last = +v.toFixed(2);
                        self.debug && console.log('前进结束', 'last:' + self.last, "target:" + target, '_v:' + _v);
                        self.gooing = 0;
                        ctx.clearRect(self.centerX/2+(win_w/4), self.centerY/2+15, (win_w/6),100);
                        self.d.current(+self.current);

                        self.lastChange = 'forward';
                        self.cb && self.cb();
                        if (self.queue.length > 1) {
                            // 如果有队列
                            self.handle(self.queue[0]);
                            self.queue.splice(0, 1);
                        }
                        return;
                    }
                }
                requestAnimationFrame(this.go.bind(this, target, speed), self.canvas);
                ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
                self.wrapCircle(self.init_progress);
                self.innerCircle(v);
                self.d.text();
                // self.d.current(v);

                self.back ? this.current((180 + (v + (self.init_progress - self.Forward_angle))) / (180 + self.init_progress * 2) * self.Total) : this.current((180 + v) / (180 + self.init_progress * 2) * self.Total);
                self.d.coin(self.coin);
                self.d.level(self.level);
                // self.back ? this.text(((((180) + (v + (self.init_progress - self.Forward_angle))) / ((180 + (self.init_progress * 2))))) * 100) : this.text((((180) + (v)) / ((180 + (self.init_progress * 2)))) * 100);
            },
            // 文字相关
            text: function text(n) {
                ctx.save();
                ctx.fillStyle = '#888888';
                ctx.font = '26px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                // ctx.fillText('今日金币', self.centerX, 65);
                ctx.restore();
            },
            // current: function text(val) {
            //     ctx.save();
            //     ctx.fillStyle = '#F47C7C';
            //     ctx.font = '72px Arial';
            //     ctx.textAlign = 'center';
            //     ctx.textBaseline = 'middle';
            //     ctx.fillText(val?val:'30', self.centerX, 90);
            //     ctx.restore();
            // },
            current: function text(val) {
                ctx.save();
                ctx.fillStyle = '#ae8330';
                ctx.font = '60px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(val ? val.toFixed(0) : self.init_num.current, self.centerX, self.centerY);
                ctx.restore();
            },
            coin: function text(val) {
                ctx.save();
                ctx.fillStyle = '#888888';
                ctx.font = '26px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                // ctx.fillText(val ? '我的金币:' + val : '我的金币:' + self.init_num.coin, self.centerX, 200);
                ctx.restore();
            },
            level: function text(val) {
                ctx.save();
                ctx.fillStyle = '#ae8330';
                ctx.font = '26.4px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                // ctx.fillText(val ? '等级:' + val : '等级:' + self.init_num.level, self.centerX, 240);
                ctx.restore();
            },
            // 每次绘图前进行一系列初始化
            init: function init(n) {
                //                        v = typeof n === 'number' ? -(180 + n) : -180;
                v = -180; // v 为本次绘图内环的起始位置
                if (typeof self.last === 'number') {
                    if (self.Advance && !self.back) {
                        if (self.lastChange === 'back') {
                            v = self.last + self.init_progress / 2;
                        } else {
                            v = self.last + (-self.last + _v);
                        }
                        self.debug && console.log('前进开始', '起始v:' + v);
                    }
                    if (self.back && !self.Advance) {
                        v = self.Forward_angle * 2;
                        self.debug && console.log('回退开始', '起始v:' + v, "Forward_angle:" + self.Forward_angle);
                    }
                }
                ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
                return this;
            }
        };
    },
    // 外部调用入口
    handle: function handle(options) {
        if (this.gooing) {
            this.queue.push(options); // 如果在动画未结束前有新值添加,会暂时把新值添加到队列当中,本次动画结束后,依次执行
            return;
        }
        switch (true){
            case !options.target && options.target !== 0:
                console.error('没有填写目标值');
                return;
            // case !options.coin && options.coin !== 0:
            //     console.error('没有填写当前金币');
            //     return;
            // case !options.level && options.level !== 0:
            //     console.error('没有填写当前等级');
            //     return;
        }
        var d = this.d;
        var target = +options.target;
        if (target / this.Total < 0.01 && target !== 0) {
            console.error('你传入的目标值过小,未能达到1%,不响应本次操作');
            return;
        }
        switch (true) {
            case target <= 0:
                this.debug && console.error('目标值小于等于0');
                target = 0;

                this.last = '';
                this.now = '';
                this.back = 0;
                this.Advance = 0;
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.d.text(0);
                this.d.current(0);
                this.d.coin(options.coin);
                this.d.level(options.level);
                this.wrapCircle(this.init_progress);

                return;
                break;
            case typeof this.now === 'number' && target < this.now:
                //                        if(target - this.now > -5){return}
                this.debug && console.log('目标值小于当前值');
                this.back = 1;
                this.Advance = 0;
                break;
            case typeof this.now === 'number' && target > this.now:
                this.debug && console.log('目标值比当前值大');
                this.Advance = 1;
                this.back = 0;
                break;
            case typeof this.now === 'number' && target === this.now:
                this.debug && console.log('目标值等于当前值,对本次操作不响应');
                return;
                break;
            default:
                break;
        }
        this.gooing = 1;
        this.now = target;
        this.current = options.target ? options.target : 0;
        this.coin = options.coin ? options.coin : 0;
        this.level = options.level ? options.level : 0;
        this.angle = this.turn_angle(target);
        this.cb = options.cb ? options.cb : '';
        d.init().go(this.angle, options.speed ? options.speed : this.speed);
    },
    // 重置
    reset: function reset() {
        this.last = '';
        this.now = '';
        this.back = 0;
        this.Advance = 0;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.d.current(0);
        this.wrapCircle(this.init_progress);
    },
    // 将目标值转为对应函数角度
    turn_angle: function turn_angle(n) {
        this.to = n;
        return (180 * n + n * this.init_progress - 180 * this.Total) / this.Total;
    }
};
export default CANVAS;
//# sourceMappingURL=progress.js.map
