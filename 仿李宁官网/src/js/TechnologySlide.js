/**
 * Created by Administrator on 2017/5/24 0024.
 */
//特殊轮播
export default class TechnologySlide {
    constructor(option) {
        this.init(option)
    }
    init(option){
        this.el = document.querySelector('[data-tech-slide]');
        this.childWidth = this.el.firstElementChild.offsetWidth;
        this.leftBtn = option.leftBtn;
        this.rightBtn = option.rightBtn;
        this.distance = option.distance;
        this.timer = null;
        this.autoTimer = null;
        this.framerate = option.framerate||10;
        this.speed =  this.childWidth* this.distance/50;
        this.el.style['marginLeft'] = -this.childWidth*3+'px';
        this.time = option.time||5000;
        this.addEv();
        this.autoSlide();
    }
    addEv(){
        this.leftBtn.addEventListener('click',()=>{
            this.left();
        },false)
        this.rightBtn.addEventListener('click',()=>{
            this.right();
        },false)
    }
    left(){
        if(this.timer) return;
        this.autoSlide();
        let el = this.el,
            start = 0,
            end = -this.childWidth*this.distance;

        el.appendChild(this.fetchNode('firstElementChild'))
        el.style.marginLeft = start+'px';

        this.run(start,end,el,'marginLeft',-this.speed)
    }
    run(start,end,el,styles,speed){
        let cnt = 0,
            len;
        el.style[styles] = start+'px';

        this.timer = setInterval(()=>{
            len = speed * cnt + start;
            el.style[styles] =  parseInt(len) + 'px';
            cnt++;

            if( cnt>=50 ){
                this.el.style[styles] = end+'px';
                clearInterval(this.timer);
                this.timer = null;
            }
        },this.framerate)

    }
    right(){
        if(this.timer) return;
        this.autoSlide();
        let el = this.el,
            start =  -this.childWidth * this.distance*2,
            end =  -this.childWidth * this.distance;

        el.insertBefore(this.fetchNode('lastElementChild'),el.firstChild);

        this.run(start,end,el,'marginLeft',this.speed);
    }

    fetchNode(childType){
        let wrap = document.createDocumentFragment(),
            i = 0,
            child,
            el = this.el;

        while(i<this.distance){
            child = el[childType];
            if(childType==='lastElementChild'){
                wrap.insertBefore(child,wrap.firstChild);
            }else {
                wrap.appendChild(child);
            }
            i++;
        }
        return wrap;
    }

    autoSlide(){
        clearInterval(this.autoTimer);
        this.autoTimer = setInterval(()=>{
            this.left();
        },this.time)
    }
}