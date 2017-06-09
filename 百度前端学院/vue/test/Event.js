/**
 * Created by Administrator on 2017/5/3 0003.
 */
export default class myEvent {
    constructor(data) {
        this.events = {}
        this.data = data
    }

    //注册事件
    on(attr,callback){
        if(this.events[attr]){
            this.events[attr].push(callback)
        }else{
            this.events[attr] = [callback];
        }
    }

    //删除事件
    off(attr){
        if(this.events.hasOwnProperty(attr)){
            delete this.events(attr);
        }
    }

    //触发事件
    emit(attr,...arg){
        this.events[attr] && this.events[attr].forEach((item)=>{
            item(...arg);
        })
    }
}