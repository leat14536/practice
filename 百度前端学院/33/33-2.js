/**
 * Created by Administrator on 2017/4/3 0003.
 */
//存储方块状态 指挥中心
(function(window){
    function center(dom){
        this.x = 6;
        this.y = 6;
        this.dir = 3;//方向  0123 右下左上
        this.arr = [];//存储运动队列
        this.timer;
        this.init(dom);
    }

    center.prototype = {
        init: function(dom){
            this.cav = new cavK(dom);
            this.ctx = this.cav.ctx;
            this.bck = this.cav.init();
            this.rect = this.cav.drawRect(this.x,this.y);
        },
        command :function(aStr){
            switch (aStr[0]){
                case('GO'):
                    this.arr.push([this.run]);
                    break;
                case('TUN'):
                    switch(aStr[1]){
                        case('LEF'):
                            this.arr.push([this.turnRight,-1]);
                            break;
                        case('RIG'):
                            this.arr.push([this.turnRight,1]);
                            break;
                        case('BAC'):
                            this.arr.push([this.turnRight,2]);
                            break;
                        default:
                            console.log(aStr[0]+' '+aStr[1]+'不存在');
                    }
                    break;
                default:
                    console.log(aStr[0]+'指令不存在');
            }
        },
        run: function(){
            var me = this;
            var ctx = this.ctx;
            var x=0,y=0;
            switch (this.dir){
                case(0): x=50;break;
                case(1): y=50;break;
                case(2): x=-50;break;
                case(3): y=-50;break;
            }
            var i=1;
            this.timer = 1;
            var timer = setInterval(function(){
                if(i==10){
                    me.x+=x/50;
                    me.y+=y/50;
                    console.log(me.x+' '+me.y);
                    ctx.putImageData(me.bck, 0, 0);
                    ctx.putImageData(me.rect, me.x*50+1, me.y*50+1);
                    me.timer = 0;
                    me.move();
                    clearInterval(timer);
                }else{
                    ctx.putImageData(me.bck,0,0);
                    ctx.putImageData(me.rect, me.x*50+1+(x/10)*i, me.y*50+1+i*(y/10));
                }
                i++;
            },50)
        },
        turnRight: function(bool){
            console.log(this.x,this.y);
            var me = this;
            var ctx = this.ctx;
            i=1;
            ctx.clearRect(this.x*50+1,this.y*50+1,48,48);
            ctx.save();
            ctx.putImageData(this.rect,this.x*50+1,this.y*50+1);
            ctx.translate(me.x*50,me.y*50);
            this.timer = 1;
            var timer = setInterval(function(){
                if(i==10){
                    me.rect = ctx.getImageData(me.x*50+1,me.y*50+1,48,48);
                    me.timer = 0;
                    me.dir+=bool;
                    me.judgedir();//还有错
                    console.log(me.dir)
                    ctx.restore();
                    me.move();
                    clearInterval(timer);
                }else{
                    ctx.putImageData(me.bck,0,0);
                    ctx.translate(25,25);
                    ctx.rotate(bool*i*Math.PI/90);
                    ctx.translate(-25,-25);
                    me.cav.drawRect(0,0);
                }
                i++;
            },50);
        },
        move: function(){
            if(this.arr.length&&!this.timer){
                obj = this.arr[0];
                this.arr.splice(0,1);
                if(obj.length>1){
                    obj[0].call(this,obj[1]);
                }else{
                    obj[0].call(this);
                }
            }
        },
        judgedir: function(){
            if(this.dir==-1){
                this.dir = 3;
            }else{
                this.dir = this.dir%4;
            }
        }


    }
    window.center = center;
})(window)