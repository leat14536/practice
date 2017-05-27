/**
 * Created by Administrator on 2017/5/26 0026.
 */
import ScrollTo from "./ScrollTo.js";
import Vender from './Vender.js';

export default function(){
    let els = document.querySelectorAll('[data-btn-type="ghost"]')
    for( let i=0,el; el=els[i++]; ){
        new Slide(el);
    }
}

class Slide extends Vender{
    constructor(el) {
        super();
        this.init(el);
        this.bindEvent();
    }
    init(el){
        this.el = el;
        this.btns = this.check( el, 'data-ghost-btn' );

        this.defaultBtn = el.querySelector('[data-ghost-default]');

        this.btnMessage = el.getAttribute('data-ghost-btnMessage');
        this.ev = el.getAttribute('data-ghost-event')||'mouseover';
        this.closeEv = el.getAttribute('data-ghost-endEvent')||'mouseleave';
    }
    bindEvent(){
        let el = this.el,
            btns = this.btns;
        this.addEntryEvent( el, btns );
        this.addCloseEvent( el, btns );
        this.addClickScroll( el, btns );
    }
    addCloseEvent( el, btns ){
        el.addEventListener( this.closeEv, ()=>{
            this.removeMsg( btns, this.btnMessage );
            this.defaultBtn.setAttribute( this.btnMessage, '' );
        })
    }
    addEntryEvent( el, btns ){
        el.addEventListener( this.ev, (e)=>{
            let target = e.target,
                num = target.getAttribute('data-ghost-btn');
            while( !num && target!=el ){
                target = target.parentNode;
                num = target.getAttribute('data-ghost-btn');
            }
            if(num){
                this.removeMsg( btns, this.btnMessage );
                target.setAttribute( this.btnMessage, '' );
            }
        })
    }
    addClickScroll( el, btns ){
        el.addEventListener( 'click', (e)=>{
            let target = e.target,
                num = target.getAttribute('data-ghost-btn');
            while( !num && target!=el ){
                target = target.parentNode;
                num = target.getAttribute('data-ghost-btn');
            }
            if(num){
                ScrollTo(num,80);
            }
        })
    }
}