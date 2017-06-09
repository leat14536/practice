/**
 * Created by Administrator on 2017/4/4 0004.
 */
/*
*    记录方块的数据
*    绘制方块
*    控制方块运动
* */

(function(window){
    function rect(ctx){
        this.x = 6;
        this.y = 6;
        this.xDis = this.x*50;
        this.yDis = this.y*50;
        this.ctx = ctx;
        this.dir = 3;  //方向  0 1 2 3:右 下 左 上
        this.timer = 0; //动画状态 1表示正在运动
        this.arr = [];  //存放指令队列
        this.rectData = null; //存储rect的 imageData
        this.wall = new (window.wall);
        this.drawRect(this.xDis+1,this.yDis+1);
        this.getImageData();
    }

    rect.prototype = {
        //绘制初始方块
        drawRect:function(x,y){
            var ctx = this.ctx;
            ctx.fillStyle = 'red';
            ctx.fillRect(x, y, 48, 14);
            ctx.fillStyle = 'blue';
            ctx.fillRect(x, y+14, 48, 34);
        },
        getImageData: function(){
            this.rectData = this.ctx.getImageData(this.xDis,this.yDis,50,50);
        },
        command: function(aStr){
            switch (aStr[0]){
                case('GO'):this.arr.push([this.run]);
                    break;
                case('TUN'):
                    switch(aStr[1]){
                        case('LEF'):this.arr.push([this.turnRight,-1]);
                            break;
                        case('RIG'):this.arr.push([this.turnRight,1]);
                            break;
                        case('BAC'):this.arr.push([this.turnRight,2]);
                            break;
                        default:console.log(aStr[0]+' '+aStr[1]+'不存在');
                    }
                    break;
                default:
                    console.log(aStr[0]+'指令不存在');
            }
        },
        run: function(){
            var me = this;
            var ctx = this.ctx;
            var x = 0, y = 0;
            switch (this.dir) {
                case(0):x = 50;break;
                case(1):y = 50;break;
                case(2):x = -50;break;
                case(3):y = -50;break;
            }
            if(this.wall.jug(this.x+x/50,this.y+y/50)){
                var i = 1;
                this.timer = 1;
                var timer = setInterval(function () {
                    ctx.clearRect(me.xDis, me.yDis, 50, 50);
                    me.xDis += x / 10;
                    me.yDis += y / 10;
                    ctx.putImageData(me.rectData,me.xDis, me.yDis);
                    if (i == 10) {
                        me.x += x / 50;
                        me.y += y / 50;
                        me.timer = 0;
                        me.move();
                        clearInterval(timer);
                    }
                    i++;
                }, 50);
            }
        },
        turnRight: function(num){ // -1左转90度 1右转90度 2右转180度
            var me = this;
            var ctx = this.ctx;
            ctx.clearRect(me.xDis,me.yDis,50,50);
            ctx.save(); //保存状态
            ctx.translate(me.xDis+25,me.yDis+25);

            switch(this.dir){
                case(0): ctx.rotate(Math.PI/2);break;
                case(1): ctx.rotate(Math.PI);break;
                case(2): ctx.rotate(Math.PI*1.5);break;
                case(3):break;
                default:console.log('dir出错');
            }
            ctx.translate(-25,-25);
            me.drawRect(1,1);
            this.timer = 1;
            i=1;
            var timer = setInterval(function() {
                ctx.clearRect(0,0,50,50);
                ctx.translate(25,25);
                ctx.rotate(i*num*Math.PI/90);
                ctx.translate(-25,-25);
                me.drawRect(1,1);
                if(i==9){
                    ctx.restore();
                    me.getImageData();
                    me.dir+=num;
                    me.judgeDir();
                    me.timer = 0;
                    me.move();
                    clearInterval(timer);
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
        judgeDir: function(){
            if(this.dir<0){
                this.dir = 3;
            }else{
                this.dir %= 4;
            }
        }
    }


    window.rect = rect;
})(window)