/**
 * Created by Administrator on 2017/6/6 0006.
 */
(function(window,factory){
    window.MyPromise = factory();
})(window,function(){
    class MyPromise{
        constructor(fn){
            let state = 'p',        // p未改变,s成功,f失败
                val,                //暂存值
                defferend = [];     //then队列

            function res(newVal){
                if (newVal &&
                    (typeof newVal === 'object' ||
                    typeof newVal === 'function')) {
                    var then = newVal.then;
                    if (typeof then === 'function') {
                        then.call(newVal, resolve, reject);
                        return;
                    }
                }
                state = 's';
                val = newVal;
                final();
            }

            function rej( reason ){
                state = 'f';
                value = reason;
                final();
            }

            this.then = function(onres,onrej){
                return new MyPromise((res,rej)=>{
                    handle({
                        res,
                        rej,
                        onres,
                        onrej
                    })
                })
            }

            function handle(option){
                if(state==='p'){
                    defferend.push(option);
                }else{
                    var cb = state === 's' ? option.onres : option.onrej,
                        ret;
                    if (cb === null) {
                        cb = state === 's' ? option.res : option.rej;
                        cb(val);
                        return;
                    }
                    ret = cb(val);
                    option.res(ret);
                }
            }

            function final(){
                /*var def;
                if(state==='p') return;
                def = state === 's' ?'res':'rej';*/
                setTimeout(()=>{
                    defferend.forEach((option)=>{
                        handle(option);
                    })
                })
            }



            fn(res,rej);
        }
    }


    return MyPromise
})