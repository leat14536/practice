/**
 * Created by Administrator on 2017/5/27 0027.
 */
/*
 *   标签上定义 [data-scroll-display = num](必填) [data-sd-mainmessage = str];(必填)
 *   当页面的scroll大于 num时为主标签添加setAttribute(str,'');
 *
 *   import scrollDisplay from 'xx/scrollDisplay.js'
 *   ...
 *   scrollDisplay()
 * */
export default function() {
    let elems = document.querySelectorAll('[data-scroll-display]');
    for (let i = 0, el; el = elems[i++];) {
        new ScrollDisplay(el);
    }
}
    class ScrollDisplay{
        constructor(el){
            this.init(el);
            this.bindEvent();
        }

        init(el){
            this.el = el;

            this.boundary = el.getAttribute('data-scroll-display');
            this.mainMessage = el.getAttribute('data-sd-mainmessage');
            this.state = 0;             //状态,1表示目前高于boundary 0表示目前低于boundary;

            let top = document.body.scrollTop||document.documentElement.scrollTop;
            if(this.boundary<=top){
                this.setMsg()
            }
        }

        setMsg(){
            if( this.mainMessage && this.state==0 ){
                this.el.setAttribute(this.mainMessage,'');
                this.state = 1;
            }
        }

        removeMsg(){
            if(this.mainMessage &&this.state==1 ){
                this.el.removeAttribute(this.mainMessage,'');
                this.state = 0;
            }
        }

        bindEvent(){
            window.addEventListener('scroll', ()=>{
                let top = document.body.scrollTop||document.documentElement.scrollTop,
                    boundary = this.boundary;
                if( top>boundary ){
                    this.setMsg();
                }else if( top<boundary ){
                    this.removeMsg();
                }
            },false);
        }
    }

