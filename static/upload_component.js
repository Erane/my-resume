/**
 * Created by Administrator on 2017/04/28.
 */

//var path = '../../../';
if (typeof Object.assign != 'function') {
    Object.assign = function(target) {
        'use strict';
        if (target == null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        target = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source != null) {
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
        }
        return target;
    };
}
/*状态管理*/
var store = new Vuex.Store({
    state: {
        clickHide:1,
        showDialog: 0,
        waiting: 0,
        questions: {
            title: '',
            question: '',
            tips: '',
            cancelBtn: {
                text: '取消',
                cb: function () {

                }
            },
            confirmBtn: {
                text: '提交',
                cb: function () {

                }
            },
            show: 1,
            type: 1,
            selected: '',
            imgLists:[],
            codes: [
                {
                    value: ''
                }
            ],
            form: {
                files: []
            }
        }
    },
    mutations: {
        hide: function (state) {
            state.showDialog = state.questions.show = 0;
            store.commit('stopScroll', 0)
        },
        changeState: function (state, options) {
            state[options.key] = options.val;
        },
        formState: function (state, options) {
            state.questions.form[options.key] = options.files;
        },
        questions: function (state, options) {
            var _options = {
                title: '',
                waiting: 0,
                question: '',
                tips: '',
                cancelBtn: {
                    text: '取消',
                    cb: function () {

                    }
                },
                confirmBtn: {
                    text: '提交',
                    cb: function () {
                    }
                },
                show: 1,
                type: 1,
                selected: '',
                imgLists:[],
                codes: [
                    {
                        value: ''
                    }
                ],
                form: {
                    files: []
                }
            };
            var o = {};
            var obj = Object.assign(o, _options, options);
            store.commit('stopScroll', 1);
            state.showDialog = 1;
            state.questions = obj;
        },
        changeWait: function (state, val) {
            //state.waiting = val ? val : !store.state.waiting;
        },
        stopScroll: function (state, type) {
            if (type) {
                stopScroll();
            } else {
                openScroll();
            }
        },
        getForm: function (state, options) {
            return state.questions.form = {
                files: state.questions.form.files,
                selected: state.questions.selected
            };
        }
    }
});


function preHandler(e) {
    e.preventDefault(); // 出现弹框时 禁止滚动
}
var _body = document.querySelector('body');
function stopScroll(e) {
    _body.addEventListener('touchmove', preHandler, {passive: false});
}
function openScroll(e) {
    _body.removeEventListener('touchmove', preHandler, {passive: false});
}


var bus = new Vue();

// 问题类 组件
Vue.component('questions', {
    template: '<div  class="questions" @click="hide($event)" v-show="store.state.showDialog"><transition   v-on:after-leave="afterLeave" name="scale"><div   class="questions-wrap" v-if="store.state.questions.show">' +
    '              <div class="questions-header">' +
    '                   <div class="questions-title">{{store.state.questions.title}}</div>' +
    '               </div>' +
    '               <div class="questions-con biochemistry" v-if="store.state.questions.type == 5">' +
    '                   ' +
    '                   <upload ></upload><p class="upload-tips">最多可上传9张图片</p>' +
    '                   ' +
    '                   <component_tips></component_tips>' +
    '               </div>' +
    '               <div class="questions-btns">' +
    '                   <button @click.prevent="cancel($event,store.state.questions.cancelBtn)" v-if="!store.state.questions.showCancelButton">{{store.state.questions.cancelBtn.text}}</button>' +
    '                   <button @click.prevent="_confirm($event,store.state.questions.confirmBtn)">{{store.state.questions.confirmBtn.text}}</button></div>' +
    '           </div></transition></div>',
    data: function () {
        return {}
    },
    methods: {
        hide: function (e) {
            var _con = $('.questions-wrap');   // 设置目标区域
            if (!_con.is(e.target) && _con.has(e.target).length === 0 && !$(e.target).hasClass('del')) { // Mark 1
                this.hide_questions();
                store.commit('changeWait', 0);
            }
        },
        cancel: function (e, options) {
            options.cb && options.cb(e, this.hide_questions);
            store.commit('changeWait', 0);
        },
        _confirm: function (e, options) {
            if (store.state.waiting) {
                return;
            }
            store.commit('changeWait', 1);
            options.cb && options.cb(e, this.hide_questions, function () {
                store.commit('getForm');
                return store.state.questions.form;
            }, function () {
                store.commit('changeWait', 0);
            });
        },
        hide_questions: function () {
            store.commit('hide');
        },
        afterLeave: function () {
            store.commit('changeState', 'showDialog', 0);
        }
    },
    components: {
        'component_tips': {
            template: '<p class="questions-tips" v-html="store.state.questions.tips"></p>'
        },
        'component_select': {
            props: ['item'],
            template: '<div class="select-wrap"><span>产品盒条码号 : </span> <div><span>{{store.state.questions.selected}}</span></div></div>',
            methods: {
                changeSelect: function () {
                    bus.$emit('selected', store.state.questions.selected)
                }
            }
        },
        'upload': {
            template: '<div class="upload-wrap">' +
            '             <warn class="warn"   v-show="showWarn"></warn>' +
            '               <div class="upload images-box " v-for="(list,index) of lists" :key="list" :ref="index === 0 ? \'one\':\'\'"   :style="{paddingTop:this_w,maxWidth:this_w}">' +
            '              ' +
            '               <div @click="edit(index)" class="img" ><img :data-oldsrc="list.oldsrc" :src="list.img"></div>' +
            '               ' +
            '               <i @click="del(index)" class="del">' +
            '               <img  src="' + path + '/images/wapapp/youke/home/miss_icon.png"></i>' +
            '            </div>' +
            '           <div v-show="overstep" class="upload " ref="div"  :style="{paddingTop:this_w,maxWidth:this_w}">' +
            '               <input multiple accept="image/png, image/jpeg,  image/jpg" name="upload-images" ref="file"  type="file" id="\'upload\'" @change="change($event)">' +
            '               ' +
            '               <label for="\'upload\'"></label>' +
            '               ' +
            '               ' +
            '           </div>' +
            '           </div>',
            methods: {
                change: function (e, index) {
                    var target = e.target;
                    var $target = $(target);
                    var self = this;
                    var len = store.state.questions.form.files.length;
                    $target.siblings('.img').html('');
                    var files = target.files;
                    if (files.length > 0) {
                        var overstep = this.lists.length + files.length;
                        if (overstep > 9 && !self.is_edit.type) {
                            alert('超出上传图片最大数量');
                            return;
                        }
                        MINT.Indicator.open({
                            text: '加载中...', // 可选
                            spinnerType: 'snake'
                        });
                        if (self.is_edit.type) {
                            this.readDataUrl(files[0], self.is_edit.index);
                        } else {
                            for (var i = 0, l = files.length; i < l; i++) {
                                this.readDataUrl(files[i], i);
                            }
                        }
                    }
                },
                edit: function (index) {
                    this.is_edit.type = 1;
                    this.is_edit.index = index;
                    this.$refs.file.removeAttribute('multiple');
                    this.$refs.file.click();
                },
                clearFile:function () {
                    // this.$refs.file.value = '';
                      if(this.$refs.file){
                        this.$refs.file.value = '';
                    }
                },
                readDataUrl: function (file, index) {
                    var fr = new FileReader();
                    var self = this;
                    if (!this.checkSize(file)) {
                        alert('上传的图片过大');
                        return;
                    }
                    if (!this.checkType(file)) {
                        alert('请选择正确的图片类型(jpg,jpeg,png)');
                        return;
                    }
                    fr.onload = function () {
                        var _img = new Image();
                        _img.src = this.result;
                        if (self.is_edit.type) {
                            self.lists.splice(index, 1, {
                                img: this.result,
                                file: file
                            });
                        } else {
                            self.lists.push({
                                img: this.result,
                                file: file
                            });
                        }
                        self.checkLength();
                        setTimeout(function () {
                            self.getWidth();
                            self.$refs.file.setAttribute('multiple', 'multiple');
                            self.is_edit.type = 0;
                            self.is_edit.index = 0;
                            MINT.Indicator.close();
                            store.commit('formState', {
                                key: "files",
                                files: self.lists
                            });
                            self.clearFile();
                        }, 0)
                    };
                    fr.readAsDataURL(file);
                },
                getWidth: function () {
                    // this.this_w = this.$refs.one ? getComputedStyle(this.$refs.one[0], null)['width'] : getComputedStyle(this.$refs.div, null)['width'];
                     if(this.$refs.one && typeof this.$refs.one[0] === 'object'){
                        this.this_w = this.$refs.one ? getComputedStyle(this.$refs.one[0], null)['width'] : getComputedStyle(this.$refs.div, null)['width'];
                    }else {
                        this.$refs.div = document.querySelector('.upload');
                        this.this_w = getComputedStyle(this.$refs.div, null)['width'];
                    }
                },
                del: function (index) {
                    this.showWarn = 1;
                    this.index = index;
                },
                getFontSize: function () {
                    return getComputedStyle(this.el_html, null)['fontSize']
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
                checkLength:function () {
                    if (this.lists.length >= 9) {
                        this.overstep = 0;
                    } else {
                        this.overstep = 1;
                    }
                }
            },
            data: function () {
                return {
                    this_w: '',
                    lists: store.state.questions.imgLists,
                    el_html: document.querySelector('html'),
                    minW: '2rem',
                    files: [],
                    overstep: 1,
                    is_edit: {
                        type: 0,
                        index: 0
                    },
                    imgType: '',
                    index:0,
                    showWarn:0,
                }
            },
            components:{
                warn:{
                    template: '<div class="questions z" >' +
                    '              <div class="questions-wrap">' +
                    '                   <div class="questions-con ">确定删除该图片吗?</div>' +
                    '                   <div class="questions-btns">' +
                    '                       <button @click.prevent="cancel($event)">取消</button>' +
                    '                       <button @click.prevent="_confirm($event)">确定</button></div> ' +
                    '                   </div>' +
                    '           </div>',
                    methods:{
                        cancel: function (e, options) {
                            bus.$emit('hideDelImage');
                        },
                        _confirm: function (e, options) {
                            bus.$emit('delImage',1);
                        }
                    },
                    mounted:function () {

                    }
                }

            },
            mounted: function () {
                this.getWidth();
                var self = this;
                bus.$on('id-selected', function (selected) {
                    self.lists.splice(0, self.lists.length)
                });
                bus.$on('hideDelImage', function (val) {
                    self.showWarn = 0;
                });
                bus.$on('delImage', function () {
                    self.lists.splice(self.index, 1);
                    self.getWidth();
                    self.showWarn = 0;
                    self.clearFile();
                    self.checkLength();
                });
                self.checkLength();
            }
        }
    }
});


function show_task_Biochemical(options) {
    store.commit('questions', {
        type: 5, // 必须
        title: options.title,
        tips: '温馨提示：<br>1.生化报告单为生化八项以上，或者生化全套，涵盖基本的血常规。<br>2.请确保每张生化单的照片中涵盖患者姓名，年龄，医院名称，检测时间，检测者和审核者', // 灰字提醒
        imgLists:options.imgLists,
        cancelBtn: {
            text: '不上传', // 取消按钮 文字
            cb: function (e, close) { //点击取消按钮回调
                // 如要弹框点击 取消/确定 后隐藏,必须手动调用 close()
                close();
            }
        },
        confirmBtn: {
            text: '上传',
            cb: function (e, close, form, ok) { //点击左侧按钮回调 form() 参数返回所有表单内当前填写/选择的值
                options.confirmBtn.cb && options.confirmBtn.cb(e, close, form, ok);
            }
        }
    });
}