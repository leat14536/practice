/**
 * Created by Administrator on 2017/5/23 0023.
 */

    export default class Slide{
        constructor(prop){
            this.init(prop);
        }
        init(prop){
            if(! prop instanceof Object) return;
            let __option__ = {
                elems : [],             //轮播图片
                slideBtns: [],          //对应btn
                leftBtn: null,          //左切换btn      点击触发
                leftCallback:null,
                rightBtn: null,         //右切换btn
                rightCalback:null,
                time: 0,                //间隔时间单位毫秒
                enType: 'mouseenter',       //btn触发事件时切换相应图片 建议使用mouseenter,click
                enCallback:null,          //每次切换时运行
                outType: null, //建议使用mouseleave
                outCallback: null        //鼠标离开时运行
            }
            this.option = Object.assign(  __option__ , prop );
            this.option.elems = [...this.option.elems];              //兼容ie
            this.option.slideBtns = [...this.option.slideBtns];      //兼容ie
            this.num = 0;
            this.setAutoSlide();
            this.addEv();
        }
        setAutoSlide(){
            if(this.option.time){
                clearInterval(this.timer);
                this.timer = setInterval(()=>{
                    this.num++;
                    this.numJudge();
                    this.enCallback( this.num );
                },this.option.time);
            }
        }
        setEn(){
            if(this.option.enType){
                this.option.slideBtns.forEach((elem, index)=> {
                    (function (index, elem, self) {
                        elem.addEventListener(self.option.enType,
                            self.enCallback.bind(self, index), false);
                    })(index, elem, this);
                })
            }
        }
        setOut(){
            if(this.option.outType){
                this.option.elems.forEach((elem, index)=> {
                    (function (index, elem, self) {
                        elem.addEventListener(self.option.outType,
                            self.outCallback.bind(self, index), false);
                    })(index, elem, this)
                })
            }
        }
        setLeft(){
            if(this.option.leftBtn){
                this.option.leftBtn.onclick = ()=>{
                    if(this.option.leftCallback){
                        this.setAutoSlide();
                        this.option.leftCallback();
                    }else {
                        this.num--;
                        this.numJudge();
                        this.enCallback(this.num);
                    }
                }
            }
        }
        setRight(){
            if(this.option.rightBtn){
                this.option.rightBtn.onclick = ()=>{
                    if(this.option.rightCallback){
                        this.setAutoSlide();
                        this.option.rightCallback();
                    }else {
                        this.num++;
                        this.numJudge();
                        this.enCallback(this.num);
                    }
                }
            }
        }
        addEv(){
            this.setEn();
            this.setOut();
            this.setLeft();
            this.setRight();
        }
        enCallback(num){
            this.setAutoSlide();
            this.num = num;
            this.option.enCallback( num, this.option.elems, this.option.slideBtns )
        }
        outCallback(num){
            this.option.outCallback( num, this.option.elems, this.option.slideBtns )
        }
        numJudge(){
            let max = this.option.slideBtns.length,
                num = this.num;
            if(num>=max)num = num%max;
            if( num<0 )num = max+num;
            this.num = num;
        }
    }