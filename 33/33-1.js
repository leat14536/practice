/**
 * Created by Administrator on 2017/4/3 0003.
 */
//画布
(function(window){
    function cav(dom){
        if(!dom.getContext){
            alert('该浏览器不支持canvas请更换浏览器尝试');
        }
        this.ctx = dom.getContext('2d');
        this.cav = dom;
    }

    cav.prototype = {
        init: function(){
            var ctx = this.ctx;
            ctx.font = "Bold 20px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "#333"
            for( var i=1; i<=11; i++ ){
                ctx.fillText(i, i*50+20, 40 );
                ctx.fillText(i, 30, i*50+30 );
                ctx.beginPath();
                ctx.moveTo( i*50, 50);
                ctx.lineTo( i*50, 550);
                ctx.stroke();
                ctx.moveTo( 50, i*50);
                ctx.lineTo( 550, i*50);
                ctx.stroke();
            }
            ctx.closePath();
            return imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            // ctx.putImageData(this.imageData, 0, 0);
        },
        drawRect: function(x,y){
            var ctx = this.ctx;
            ctx.fillStyle = 'red';
            ctx.fillRect(x*50+1, y*50+1, 48, 14);
            ctx.fillStyle = 'blue';
            ctx.fillRect(x*50+1, y*50+15, 48, 34);
            return rectData = ctx.getImageData(x*50+1, y*50+1, 48, 48);
        },
        clearl: function(beginX,beginY){
            this.ctx.clearRect(beginX,beginY,48,48);
        }
    }

    window.cavK = cav;
})(window);