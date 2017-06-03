/**
 * Created by Administrator on 2017/6/3 0003.
 */
(function(window){
    class Observer{
        constructor(obj){
            this.init(obj);
        }

        init(obj){
            this.obj = obj;
            Object.defineProperty(obj,'$observer',{
                value:this,
                enumerable: false,
                configurable: true,
                writable: true
            })
            this.walk(obj);
        }

        walk(obj){
            for( var key in obj ){
                var val = obj[key];
                this.convert(key,val);
                this.observer(key,val);
            }
        }

        convert(key,val){
            var ob = Watcher(val);
            if(ob){
                ob.parent = {
                    ob:this,
                    key
                }
            }
        }

        observer(key,val){
            var self = this;
            Object.defineProperty(this.obj,key,{
                enumerable: true,
                configurable: true,
                get(){
                    //console.log(key+'访问了');
                    return val;
                },
                set(nvl){
                    //console.log(key+'改变了');
                    val = nvl;
                    self.notify(key,val);
                }
            })
        }

        $watch(key,cbs){
            var path = key.split('.');
            var last = path.pop();
            var temp = this.obj;
            path.forEach((path)=>{
                temp = temp[path]
            })
            temp.$observer.on(last,cbs);
        }

        on(path,fn){
            this._cbs = this._cbs||{}
            if(!this._cbs[path])this._cbs[path] = [];
            this._cbs[path].push(fn);
        }

        emit(path,val){
            this._cbs = this._cbs||{};
            if(!this._cbs[path]) return;
            this._cbs[path].forEach((fn)=>{
                fn(val);
            })
        }

        notify(key,val){
            this.emit(key,val);
            var parent;
            parent = this.parent;
            if(parent) {
                var ob = parent.ob;
                ob.notify(parent.key,this.obj);
            }else{
                this.emit('$root', this.obj);
            }
        }
    }

    function Watcher(obj){
        if(typeof obj==='object') {
            return new Observer(obj);
        }
    }

    window.Watcher = Watcher;
})(window)