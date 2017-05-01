/**
 * Created by Administrator on 2017/5/1 0001.
 */
export class myEvent {
    constructor() {
        this.events={}
    }

    on(attr,callback){
        if(this.events[attr]){
            this.events[attr].push(callback)
        }else{
            this.events[attr] = [callback];
        }
    }

    off(attr){
        if(this.events.hasOwnProperty(attr)){
            delete this.events(attr);
        }
    }

    emit(attr,...arg){
        this.events[attr] && this.events[attr].forEach((item)=>{
            item(...arg);
        })
    }
}