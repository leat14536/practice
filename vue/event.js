/**
 * Created by Administrator on 2017/5/1 0001.
 */
export default class myEvent {
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
        console.log(attr)
        this.events[attr] && this.events[attr].forEach((item)=>{
            item(...arg);
        })
    }

    pop( keys , ...arg ){
        let key = keys.join('.');
        let index;
        do{
            this.emit(key,...arg);
            index = key.lastIndexOf('.');
            key = key.substring(0,index);
        }while( index != -1 )
    }
}