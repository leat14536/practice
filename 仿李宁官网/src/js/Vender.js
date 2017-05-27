/**
 * Created by Administrator on 2017/5/26 0026.
 */
export default class Vender{
    constructor(){}
    removeMsg( elems, attr ){
        if(elems) {
            let prop;
            for ( prop in elems){
                elems[prop].removeAttribute(attr);
            }
        }
    }
    check( el, str ){
        let pics = el.querySelectorAll('['+str+']'),
            ret = {},
            attr,
            i=0;
        for( ; el=pics[i++]; ){
            attr = el.getAttribute(str);
            ret[attr] = el;
        }
        return ret;
    }
}