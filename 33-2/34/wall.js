/**
 * Created by Administrator on 2017/4/4 0004.
 */
/*
*   墙的数据
*   判断是否可以走
* */
(function(window){
    arr = [];
    function wall(){
        this.arr = arr;
        this.minx = 1;
        this.maxx = 10;
        this.miny = 1;
        this.maxy = 10;
    }

    wall.prototype = {
        init: function(){
          for(var i=this.minx; i<=this.maxx; i++ ){
              arr[i] = [];
              for( var j=this.miny; j<=this.maxy; j++ ){
                  arr[i][j] = [];
              }
          }
        },
        jug: function(x,y){
            if(x>=this.minx&&x<=this.maxx&&y>=this.miny&&y<=this.maxy){
                return true;
            }else{
                return false;
            }
        }
    }
    window.wall = wall;
})(window);
