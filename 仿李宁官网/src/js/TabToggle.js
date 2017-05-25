/**
 * Created by Administrator on 2017/5/25 0025.
 */
export default function(){
    let els = document.querySelectorAll('[data-menu-type="default"]'),
        ret = [];
    for( let i=0,el; el=els[i++]; ){
        ret.push( new TabToggle(el) );
    }
}

class TabToggle{
    constructor(el){
        this.init(el)
        this.bindEvent();
    }
    init(el){
        console.log(el)
        this.el = el;
        this.btns = this.check('data-menu-btn');
        this.views = this.check('data-menu-view');
        this.viewMessage = el.getAttribute('data-menu-viewMessage');
        this.btnMessage = el.getAttribute('data-menu-btnMessage');
        this.removeMessage = el.getAttribute('data-menu-removeMessage');
        this.ev = el.getAttribute('data-menu-event')||'mouseover'
    }
    bindEvent(){
        this.btnAddEvent()
    }
    check(str){
        let pics = this.el.querySelectorAll('['+str+']'),
            ret = {},
            attr,
            i=0,
            el;
        for( ; el=pics[i++]; ){
            attr = el.getAttribute(str);
            ret[attr] = el;
        }
        return ret;
    }
    btnAddEvent(){
        let i,
            el = this.el,
            views = this.views;
        el.addEventListener(this.ev,(e)=>{
            let target = el.target;
            console.log(el)
            let num = target.getAttribute('data-menu-btn');
            if(num){
                this.removeMessage(views,this.viewMessage);
                views[num].setAttribute(this.viewMessage);
                this.removeMessage(btns,this.btnMessage);
                btns[num].setAttribute(this.btnMessage);
            }
        },false)
    }
    removeMessage(elems,attr){
        if(elems) {
            for (let el in elems){
                 el.removeAttribute(attr);
            }
        }
    }
}



















