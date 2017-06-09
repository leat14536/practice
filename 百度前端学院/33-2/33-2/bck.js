/**
 * Created by Administrator on 2017/4/4 0004.
 */
/*
*   负责背景和墙体的绘制
* */

(function(window){
    function bck(ctx){
        this.ctx = ctx
        this.init();
    }

    bck.prototype = {
        //绘制背景
        init: function() {
            var ctx = this.ctx;
            ctx.font = "Bold 20px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "#333"
            for (var i = 1; i <= 11; i++) {
                ctx.fillText(i, i * 50 + 20, 40);
                ctx.fillText(i, 30, i * 50 + 30);
                ctx.beginPath();
                ctx.moveTo(i * 50, 50);
                ctx.lineTo(i * 50, 550);
                ctx.stroke();
                ctx.moveTo(50, i * 50);
                ctx.lineTo(550, i * 50);
                ctx.stroke();
            }
            ctx.closePath();
        }
    }
    window.bck = bck;
})(window);