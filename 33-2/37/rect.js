/**
 * Created by Administrator on 2017/4/4 0004.
 */
/*
*    记录方块的数据
*    绘制方块
*    控制方块运动
* */

(function(window){
    'use strict'
    function rect(rectCtx,bckCtx){  // 方块画布 背景画布
        this.x = 6;
        this.y = 6;
        this.xDis = this.x*50;
        this.yDis = this.y*50;
        this.ctx = rectCtx;
        this.bck = new window.bck(bckCtx);
        this.dir = 3;  //方向  0 1 2 3:右 下 左 上
        this.timer = 0; //动画状态 1表示正在运动
        this.arr = [];  //存放指令队列
        this.rectData = null; //存储rect的 imageData
        this.wall = new window.wall(this.bck);
        this.wall.clear();
        this.buildTimer = null;//随机造墙计时器
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
        command: function(aStr){   //解析指令
            switch (aStr[0]){
                case('GO'):this.arr.push([this.run]);
                    if(aStr[1]>1){
                        for( var i=2; i<=aStr[1]; i++ ){
                            this.arr.push([this.run])
                        }
                    }
                    break;
                case('TUN'):
                    switch(aStr[1]){
                        case('LEF'):this.arr.push([this.turnRight,[-1]]);
                            break;
                        case('RIG'):this.arr.push([this.turnRight,[1]]);
                            break;
                        case('BAC'):this.arr.push([this.turnRight,[2]]);
                            break;
                        default:console.log(aStr[0]+' '+aStr[1]+'不存在');
                    }
                    break;
                case('TRA'):
                    switch(aStr[1]) {
                        case('LEF'):this.arr.push([this.run, [2]]);       //重复点太多
                            if(aStr[2]>1){
                                for( var i=2; i<=aStr[2]; i++ ){
                                    this.arr.push([this.run, [2]])
                                }
                            }
                            break;
                        case('RIG'):this.arr.push([this.run, [0]]);
                            if(aStr[2]>1){
                                for( var i=2; i<=aStr[2]; i++ ){
                                    this.arr.push([this.run, [0]])
                                }
                            }
                            break;
                        case('TOP'):this.arr.push([this.run, [3]]);
                            if(aStr[2]>1){
                                for( var i=2; i<=aStr[2]; i++ ){
                                    this.arr.push([this.run, [3]])
                                }
                            }
                            break;
                        case('BOT'):this.arr.push([this.run, [1]]);
                            if(aStr[2]>1){
                                for( var i=2; i<=aStr[2]; i++ ){
                                    this.arr.push([this.run, [1]])
                                }
                            }
                            break;
                        default:
                            console.log(aStr[0] + ' ' + aStr[1] + '不存在');
                            return 1;
                    }
                    break;
                case('MOV'):
                    switch(aStr[1]) {
                        case('LEF'):this.arr.push([this.turn, [2]],[this.run]);
                            if(aStr[2]>1){
                                for( var i=2; i<=aStr[2]; i++ ){
                                    this.arr.push([this.turn, [2]],[this.run])
                                }
                            }
                            break;
                        case('RIG'):this.arr.push([this.turn, [0]],[this.run]);
                            if(aStr[2]>1){
                                for( var i=2; i<=aStr[2]; i++ ){
                                    this.arr.push([this.turn, [0]],[this.run])
                                }
                            }
                            break;
                        case('TOP'):this.arr.push([this.turn, [3]],[this.run]);
                            if(aStr[2]>1){
                                for( var i=2; i<=aStr[2]; i++ ){
                                    this.arr.push([this.turn, [3]],[this.run])
                                }
                            }
                            break;
                        case('BOT'):this.arr.push([this.turn, [1]],[this.run]);
                            if(aStr[2]>1){
                                for( var i=2; i<=aStr[2]; i++ ){
                                    this.arr.push([this.turn, [1]],[this.run])
                                }
                            }
                            break;
                        case('TO'):
                            var mx = parseInt(aStr[2]);
                            var my = aStr[3]-0;
                            if(typeof mx=='number'&&typeof my=='number'){
                                if(this.wall.jug(mx,my)) {
                                    this.arr.push([this.find, [mx, my]]);
                                }else{
                                    console.log('这里有墙或者不在数组内')
                                    return 1;
                                }
                            }else{
                                return 1;
                            }
                            break;
                        default:
                            console.log(aStr[0] + ' ' + aStr[1] + '不存在');
                            return 1;
                    }
                    break;
                case('BUILD'):
                    this.arr.push([this.build]);
                    break;
                case('BRU'):
                    if(aStr[1]){
                        this.arr.push([this.changeColor,[aStr[1]]]);
                    }else{
                        return 1;
                    }
                    break;
                default:
                    console.log(aStr[0]+'指令不存在');
                    return 1;
            }
        },
        run: function(num){
            var me = this;
            var ctx = this.ctx;
            var x = 0, y = 0;
            var dir = typeof(num)==='number'?num:this.dir;
            switch (dir) {
                case(0):x = 50;break;
                case(1):y = 50;break;
                case(2):x = -50;break;
                case(3):y = -50;break;
            }
            if(this.wall.jug(this.x+x/50,this.y+y/50)){
                var i = 1;
                this.timer = 1;
                //提前
                me.x += x / 50;
                me.y += y / 50;
                var timer = setInterval(function () {
                    ctx.clearRect(me.xDis, me.yDis, 50, 50);
                    me.xDis += x / 10;
                    me.yDis += y / 10;
                    ctx.putImageData(me.rectData,me.xDis, me.yDis);
                    if (i == 10) {
                        me.timer = 0;
                        me.move();
                        clearInterval(timer);
                    }
                    i++;
                }, 15);
            }else{
                this.move();
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
            }
            ctx.translate(-25,-25);
            me.drawRect(1,1);
            this.timer = 1;
            var i=1;
                var timer = setInterval(function () {
                    ctx.clearRect(0, 0, 50, 50);
                    ctx.translate(25, 25);
                    ctx.rotate(i * num * Math.PI / 90);
                    ctx.translate(-25, -25);
                    me.drawRect(1, 1);
                    if (i == 9) {
                        ctx.restore();
                        me.getImageData();
                        me.dir += num;
                        me.judgeDir();
                        clearInterval(timer);
                        me.timer = 0;
                        me.move();
                    }
                    i++;
                 }, 15);
        },
        turn: function(num){
            //计算旋转方向num代表目标方向,dir代表当前方向
            var dir = this.dir-num;
            this.time = 1;
            if(dir==3||dir==-1){
                this.turnRight(1);
            }else if(dir==1||dir==-3){
                this.turnRight(-1);
            }else if(dir==2||dir==-2){
                this.turnRight(2);
            }else{
                this.time = 0;
                this.move();
            }
        },
        build: function(){
            this.time = 1;
            this.wall.build(this.dir,this.x,this.y);
            this.time = 0
            this.move();
        },
        changeColor: function(col){
            this.time = 1;
            this.wall.changeColor(this.dir,this.x,this.y,col);
            this.time = 0;
            this.move();
        },
        move: function(){
            //console.log(this.arr);
            if(this.arr.length&&!this.timer){
                var obj = this.arr[0];
                this.arr.splice(0,1);
                //使用apply修正this的指向
                if(obj.length>1){
                    obj[0].apply(this,obj[1]);
                }else{
                    obj[0].apply(this);
                }
                // 调用自身
                // this.move();
            }
        },
        judgeDir: function(){
            if(this.dir<0){
                this.dir = 3;
            }else{
                this.dir %= 4;
            }
        },
        randomBuild: function(){
            var me = this;
            this.buildTimer = setInterval(function(){
                var x = Math.ceil(Math.random()*1000)%10+1;
                var y = Math.ceil(Math.random()*1000)%10+1;
                if(x!=me.x||y!=me.y //不在方块的位置
                    &&me.wall.arr[x][y].wall!=1){    //不是墙
                    me.bck.drawWall(x,y);
                    me.wall.arr[x][y].wall = 1;
                }
            },300)
        },
        stopBuild: function(){
            clearInterval(this.buildTimer);
        },
        /*
        *   寻路
        *   arr[x][y] = {
        *       wall = 1;   是墙
        *       pardir = number 父节点方向0123: 右下左上 -1初始坐标
        *       f = g+h f:总权重
        *       g = number 与初始点的距离
        *       f = number 与目标点的距离
        *       每次把基准点周围4个点的权值(f,g,h)记录下来压入data数组,然后从data中取出f最小的作为基准,直到找到目标点
        * */
        find: function(x,y){  //从x,y找mx,my
            var tx=x,ty=y;
            this.timer = 1;
            var mx = this.x;
            var my = this.y;
            if(x==mx&&y==my){this.timer=0;this.move();return;} //初始坐标与目标坐标一致
            this.wall.init();
            var arr = this.wall.arr;
            arr[x][y].pardir = -1;
            arr[x][y].h = 0;
            var wall = this.wall;
            var data = []; //存储结构
            while(1){
                if(jug(x+1,y,2)){x++; break;}
                if(jug(x,y+1,3)){y++; break;}
                if(jug(x-1,y,0)){x--; break;}
                if(jug(x,y-1,1)){y--; break;}
                var ret = dataPop();
                if(ret==-1){break;}
                else{
                    x = ret.x;
                    y = ret.y;
                }
            }
            if(ret==-1){
                console.log('找不到: '+tx+','+ty);
            }else{
                data = []
                do{
                    data.push([this.turn, [arr[x][y].pardir]],[this.run]);
                    switch(arr[x][y].pardir){
                        case(0): x++;break;
                        case(1): y++;break;
                        case(2): x--;break;
                        case(3): y--;break;
                    }
                }while(arr[x][y].pardir!=-1);
                for( var i=data.length-1; i>=0; i-- ) {
                    this.arr.unshift(data[i]);
                }
            }

            this.timer = 0;
            this.move();


            function jug(x1,y1,dir){
                if(wall.jug(x1,y1)               //不是墙
                    &&typeof arr[x1][y1].pardir!='number'               //无父节点
                ){
                    arr[x1][y1].x = x1;
                    arr[x1][y1].y = y1;
                    arr[x1][y1].pardir = dir;
                    arr[x1][y1].h = arr[x][y].h+1;
                    arr[x1][y1].g = Math.abs(mx-x1)+Math.abs(my-y1);
                    arr[x1][y1].f = arr[x1][y1].h+arr[x1][y1].g;
                    data.push(arr[x1][y1]);
                }
                //找到目标了
                if(x1==mx&&y1==my){
                    return 1;
                }
            }
            function dataPop(){
                if(data.length){
                    var f,n;
                    data.forEach(function(dat,i){
                        if(typeof n=='undefined'){f = dat.f; n = i;}
                        else if(dat.f<f){f = dat.f; n = i;}
                    })
                    var ret = data[n];
                    data.splice(n,1);
                    return ret;
                }else{
                    return -1;
                }
            }
        },
        init: function(){
            this.bck.init();
            this.wall.clear();
        }
    }


    window.rect = rect;
})(window)