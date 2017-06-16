/**
 * Created by Administrator on 2017/6/9 0009.
 */
//通过以下方法绘制多边形
// var polygn = new Polygn(startX,startY,radius,side,startAngle,strokeStyle,fillStyle);
// polygn.fill(ctx)             填充
// polygn.stroke(ctx)           描边
// polygn.strokeAndFill(ctx)    填充和描边

(function(){
    var uid=0;
    var Point = function(x,y){
        this.x = x;
        this.y = y;
    }

    var Polygn = function(startX,startY,radius,side,startAngle,strokeStyle,fillStyle){
        this.id = ++uid;
        this.x = startX;
        this.y = startY;
        this.radius = radius;
        this.side = side;
        this.starAngle = startAngle;
        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;
    }

    Polygn.prototype = {
        getPoints(){
            var points = [],
                radius = this.radius,
                angel = this.starAngle,
                side = this.side;
            for( var i=0; i<side; i++　){
                points.push(new Point(this.x+(radius*Math.sin(angel)),
                    this.y+(radius*Math.cos(angel))));
                angel += 2*Math.PI/this.side;
            }
            return points;
        },
        createPath(ctx){
            var points = this.getPoints();

            ctx.beginPath();
            ctx.moveTo(points[0].x,points[0].y);
            for( var i=1,len=points.length; i<len; i++ ){
                ctx.lineTo(points[i].x,points[i].y);
            }
            ctx.closePath();
        },
        stroke(ctx){
            ctx.save();
            this.createPath(ctx);
            ctx.strokeStyle = this.strokeStyle;
            ctx.stroke();
            ctx.restore();
        },
        fill(ctx){
            ctx.save();
            this.createPath(ctx);
            ctx.fillStyle = this.fillStyle;
            ctx.fill();
            ctx.restore();
        },
        strokeAndFill(){
            ctx.save();
            this.createPath(ctx);
            ctx.fillStyle = this.fillStyle;
            ctx.strokeStyle = this.strokeStyle;
            ctx.stroke();
            ctx.fill();
            ctx.restore();
        },
        move(x,y){
            this.x = x;
            this.y = y;
        }
    };

    window.Polygn = Polygn;
})(window);