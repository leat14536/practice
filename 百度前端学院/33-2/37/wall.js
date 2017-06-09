/**
 * Created by Administrator on 2017/4/4 0004.
 */
/*
*   墙的数据
*   判断是否可以走
* */
(function(window){
    'use strict'
    function wall(bck){//背景的画布
        this.minx = 1;
        this.maxx = 10;
        this.miny = 1;
        this.maxy = 10;
        this.bck = bck;
        this.arr = [];
        this.timer = null;//随机建墙计时器
    }

    wall.prototype = {
        init: function(){
            for(var i=this.minx; i<=this.maxx; i++ ){
                for( var j=this.miny; j<=this.maxy; j++ ){
                    if(this.arr[i][j].wall==1){
                        this.arr[i][j] = {wall:1}
                    }else{
                        this.arr[i][j] = {};
                    }
                }
            }
        },
        clear: function(){
          for(var i=this.minx; i<=this.maxx; i++ ){
              this.arr[i] = [];
              for( var j=this.miny; j<=this.maxy; j++ ){
                  this.arr[i][j] = {};
              }
          }
        },
        jug: function(x,y){
            if(x>=this.minx&&x<=this.maxx&&y>=this.miny&&y<=this.maxy
                &&this.arr[x][y].wall!=1){//在数组内
                return true;
            }else{
                return false;
            }
        },
        build: function(dir,x,y){ //dir 方向 mx,my 原坐标
            var obj = changeDir(dir);
            x += obj.x;
            y += obj.y;
            if(x>=this.minx&&x<=this.maxx&&y>=this.miny&&y<=this.maxy//在数组内
                &&this.arr[x][y].wall!=1){ //不是墙
                this.arr[x][y].wall = 1;
                this.bck.drawWall(x,y);
            }else{
                console.log(x+','+y+'不能建墙');
            }
        },
        changeColor: function(dir,x,y,col){
            var obj = changeDir(dir);
            x += obj.x;
            y += obj.y;
            if(x>=this.minx&&x<=this.maxx&&y>=this.miny&&y<=this.maxy//在数组内
                &&this.arr[x][y].wall==1){ //是墙
                this.bck.drawWall(x,y,col);
            }else{
                console.log(x+','+y+'不能修改颜色');
            }
        }
    }
    function changeDir(dir){
        var x = 0, y = 0;
        switch (dir) {
            case(0):x += 1;break;
            case(1):y += 1;break;
            case(2):x += -1;break;
            case(3):y += -1;break;
        }
        return{
            x: x,
            y: y
        }
    }
    window.wall = wall;
})(window);
