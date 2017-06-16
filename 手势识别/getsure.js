/**
 * Created by Administrator on 2017/6/1 0001.
 */
/*
*
    new Getsure({
         el: '.box',                        //canvas的容器,决定canvas的位置大小
         callback(res){},                   //画笔离屏以后触发该回调 参数是一个对象包含匹配到的名称和分数
         fontColor: '#000',                 //初始化画笔颜色 默认 #000;
         lineWidth: 5,                      //初始化画笔粗细 默认 5;
         getsurtType: false                 //评分规则,默认fasle:黄金比例分割(更准) true:量角器(更快)
     })
*    addGetsure(name)           传入名称存储当前图案
*    importSettings(settings)   导入配置
*    exportSettings()           导出配置
*    getList()                  获取名称列表
*    removeGetsure(num)         删除第num个手势
*    setColor(color)            改变画笔颜色
*    setLineWidth(size)         修改画笔粗细
*    resize()                   重置画布大小
* */


(function(window, factory,options){
    window.Getsure = factory();
})(window,function(options){

//
// Point class
//
    function Point(x, y) // constructor
    {
        this.X = x;
        this.Y = y;
    }
//
// Rectangle class
//
    function Rectangle(x, y, width, height) // constructor
    {
        this.X = x;
        this.Y = y;
        this.Width = width;
        this.Height = height;
    }
//
// Unistroke class: a unistroke template
//
    function Unistroke(name, points) // constructor
    {
        this.Name = name;
        this.Points = Resample(points, NumPoints);
        var radians = IndicativeAngle(this.Points);
        this.Points = RotateBy(this.Points, -radians);
        this.Points = ScaleTo(this.Points, SquareSize);
        this.Points = TranslateTo(this.Points, Origin);
        this.Vector = Vectorize(this.Points); // for Protractor
    }
//
// Result class
//
    function Result(name, score) // constructor
    {
        this.Name = name;
        this.Score = score;
    }
//
// DollarRecognizer class constants
//
    var NumUnistrokes = 7;
    var NumPoints = 64;
    var SquareSize = 250.0;
    var Origin = new Point(0,0);
    var Diagonal = Math.sqrt(SquareSize * SquareSize + SquareSize * SquareSize);
    var HalfDiagonal = 0.5 * Diagonal;
    var AngleRange = Deg2Rad(45.0);
    var AnglePrecision = Deg2Rad(2.0);
    var Phi = 0.5 * (-1.0 + Math.sqrt(5.0)); // Golden Ratio
//
// DollarRecognizer class
//
    function DollarRecognizer() // constructor
    {
        //
        // one built-in unistroke per gesture type
        //
        this.Unistrokes = new Array(NumUnistrokes);
        this.Unistrokes[0] = new Unistroke("三角形", new Array(new Point(137,139),new Point(135,141),new Point(133,144),new Point(132,146),new Point(130,149),new Point(128,151),new Point(126,155),new Point(123,160),new Point(120,166),new Point(116,171),new Point(112,177),new Point(107,183),new Point(102,188),new Point(100,191),new Point(95,195),new Point(90,199),new Point(86,203),new Point(82,206),new Point(80,209),new Point(75,213),new Point(73,213),new Point(70,216),new Point(67,219),new Point(64,221),new Point(61,223),new Point(60,225),new Point(62,226),new Point(65,225),new Point(67,226),new Point(74,226),new Point(77,227),new Point(85,229),new Point(91,230),new Point(99,231),new Point(108,232),new Point(116,233),new Point(125,233),new Point(134,234),new Point(145,233),new Point(153,232),new Point(160,233),new Point(170,234),new Point(177,235),new Point(179,236),new Point(186,237),new Point(193,238),new Point(198,239),new Point(200,237),new Point(202,239),new Point(204,238),new Point(206,234),new Point(205,230),new Point(202,222),new Point(197,216),new Point(192,207),new Point(186,198),new Point(179,189),new Point(174,183),new Point(170,178),new Point(164,171),new Point(161,168),new Point(154,160),new Point(148,155),new Point(143,150),new Point(138,148),new Point(136,148)));
        this.Unistrokes[1] = new Unistroke("矩形", new Array(new Point(78,149),new Point(78,153),new Point(78,157),new Point(78,160),new Point(79,162),new Point(79,164),new Point(79,167),new Point(79,169),new Point(79,173),new Point(79,178),new Point(79,183),new Point(80,189),new Point(80,193),new Point(80,198),new Point(80,202),new Point(81,208),new Point(81,210),new Point(81,216),new Point(82,222),new Point(82,224),new Point(82,227),new Point(83,229),new Point(83,231),new Point(85,230),new Point(88,232),new Point(90,233),new Point(92,232),new Point(94,233),new Point(99,232),new Point(102,233),new Point(106,233),new Point(109,234),new Point(117,235),new Point(123,236),new Point(126,236),new Point(135,237),new Point(142,238),new Point(145,238),new Point(152,238),new Point(154,239),new Point(165,238),new Point(174,237),new Point(179,236),new Point(186,235),new Point(191,235),new Point(195,233),new Point(197,233),new Point(200,233),new Point(201,235),new Point(201,233),new Point(199,231),new Point(198,226),new Point(198,220),new Point(196,207),new Point(195,195),new Point(195,181),new Point(195,173),new Point(195,163),new Point(194,155),new Point(192,145),new Point(192,143),new Point(192,138),new Point(191,135),new Point(191,133),new Point(191,130),new Point(190,128),new Point(188,129),new Point(186,129),new Point(181,132),new Point(173,131),new Point(162,131),new Point(151,132),new Point(149,132),new Point(138,132),new Point(136,132),new Point(122,131),new Point(120,131),new Point(109,130),new Point(107,130),new Point(90,132),new Point(81,133),new Point(76,133)));
        this.Unistrokes[2] = new Unistroke("圆形", new Array(new Point(127,141),new Point(124,140),new Point(120,139),new Point(118,139),new Point(116,139),new Point(111,140),new Point(109,141),new Point(104,144),new Point(100,147),new Point(96,152),new Point(93,157),new Point(90,163),new Point(87,169),new Point(85,175),new Point(83,181),new Point(82,190),new Point(82,195),new Point(83,200),new Point(84,205),new Point(88,213),new Point(91,216),new Point(96,219),new Point(103,222),new Point(108,224),new Point(111,224),new Point(120,224),new Point(133,223),new Point(142,222),new Point(152,218),new Point(160,214),new Point(167,210),new Point(173,204),new Point(178,198),new Point(179,196),new Point(182,188),new Point(182,177),new Point(178,167),new Point(170,150),new Point(163,138),new Point(152,130),new Point(143,129),new Point(140,131),new Point(129,136),new Point(126,139)));
        this.Unistrokes[3] = new Unistroke("对勾", new Array(new Point(91,185),new Point(93,185),new Point(95,185),new Point(97,185),new Point(100,188),new Point(102,189),new Point(104,190),new Point(106,193),new Point(108,195),new Point(110,198),new Point(112,201),new Point(114,204),new Point(115,207),new Point(117,210),new Point(118,212),new Point(120,214),new Point(121,217),new Point(122,219),new Point(123,222),new Point(124,224),new Point(126,226),new Point(127,229),new Point(129,231),new Point(130,233),new Point(129,231),new Point(129,228),new Point(129,226),new Point(129,224),new Point(129,221),new Point(129,218),new Point(129,212),new Point(129,208),new Point(130,198),new Point(132,189),new Point(134,182),new Point(137,173),new Point(143,164),new Point(147,157),new Point(151,151),new Point(155,144),new Point(161,137),new Point(165,131),new Point(171,122),new Point(174,118),new Point(176,114),new Point(177,112),new Point(177,114),new Point(175,116),new Point(173,118)));
        this.Unistrokes[4] = new Unistroke(" ^ ", new Array(new Point(79,245),new Point(79,242),new Point(79,239),new Point(80,237),new Point(80,234),new Point(81,232),new Point(82,230),new Point(84,224),new Point(86,220),new Point(86,218),new Point(87,216),new Point(88,213),new Point(90,207),new Point(91,202),new Point(92,200),new Point(93,194),new Point(94,192),new Point(96,189),new Point(97,186),new Point(100,179),new Point(102,173),new Point(105,165),new Point(107,160),new Point(109,158),new Point(112,151),new Point(115,144),new Point(117,139),new Point(119,136),new Point(119,134),new Point(120,132),new Point(121,129),new Point(122,127),new Point(124,125),new Point(126,124),new Point(129,125),new Point(131,127),new Point(132,130),new Point(136,139),new Point(141,154),new Point(145,166),new Point(151,182),new Point(156,193),new Point(157,196),new Point(161,209),new Point(162,211),new Point(167,223),new Point(169,229),new Point(170,231),new Point(173,237),new Point(176,242),new Point(177,244),new Point(179,250),new Point(181,255),new Point(182,257)));
        this.Unistrokes[5] = new Unistroke(" v ", new Array(new Point(89,164),new Point(90,162),new Point(92,162),new Point(94,164),new Point(95,166),new Point(96,169),new Point(97,171),new Point(99,175),new Point(101,178),new Point(103,182),new Point(106,189),new Point(108,194),new Point(111,199),new Point(114,204),new Point(117,209),new Point(119,214),new Point(122,218),new Point(124,222),new Point(126,225),new Point(128,228),new Point(130,229),new Point(133,233),new Point(134,236),new Point(136,239),new Point(138,240),new Point(139,242),new Point(140,244),new Point(142,242),new Point(142,240),new Point(142,237),new Point(143,235),new Point(143,233),new Point(145,229),new Point(146,226),new Point(148,217),new Point(149,208),new Point(149,205),new Point(151,196),new Point(151,193),new Point(153,182),new Point(155,172),new Point(157,165),new Point(159,160),new Point(162,155),new Point(164,150),new Point(165,148),new Point(166,146)));
        this.Unistrokes[6] = new Unistroke("五角星", new Array(new Point(75,250),new Point(75,247),new Point(77,244),new Point(78,242),new Point(79,239),new Point(80,237),new Point(82,234),new Point(82,232),new Point(84,229),new Point(85,225),new Point(87,222),new Point(88,219),new Point(89,216),new Point(91,212),new Point(92,208),new Point(94,204),new Point(95,201),new Point(96,196),new Point(97,194),new Point(98,191),new Point(100,185),new Point(102,178),new Point(104,173),new Point(104,171),new Point(105,164),new Point(106,158),new Point(107,156),new Point(107,152),new Point(108,145),new Point(109,141),new Point(110,139),new Point(112,133),new Point(113,131),new Point(116,127),new Point(117,125),new Point(119,122),new Point(121,121),new Point(123,120),new Point(125,122),new Point(125,125),new Point(127,130),new Point(128,133),new Point(131,143),new Point(136,153),new Point(140,163),new Point(144,172),new Point(145,175),new Point(151,189),new Point(156,201),new Point(161,213),new Point(166,225),new Point(169,233),new Point(171,236),new Point(174,243),new Point(177,247),new Point(178,249),new Point(179,251),new Point(180,253),new Point(180,255),new Point(179,257),new Point(177,257),new Point(174,255),new Point(169,250),new Point(164,247),new Point(160,245),new Point(149,238),new Point(138,230),new Point(127,221),new Point(124,220),new Point(112,212),new Point(110,210),new Point(96,201),new Point(84,195),new Point(74,190),new Point(64,182),new Point(55,175),new Point(51,172),new Point(49,170),new Point(51,169),new Point(56,169),new Point(66,169),new Point(78,168),new Point(92,166),new Point(107,164),new Point(123,161),new Point(140,162),new Point(156,162),new Point(171,160),new Point(173,160),new Point(186,160),new Point(195,160),new Point(198,161),new Point(203,163),new Point(208,163),new Point(206,164),new Point(200,167),new Point(187,172),new Point(174,179),new Point(172,181),new Point(153,192),new Point(137,201),new Point(123,211),new Point(112,220),new Point(99,229),new Point(90,237),new Point(80,244),new Point(73,250),new Point(69,254),new Point(69,252)));
        //
        // The $1 Gesture Recognizer API begins here -- 3 methods: Recognize(), AddGesture(), and DeleteUserGestures()
        //
        this.Recognize = function(points, useProtractor)
        {
            points = Resample(points, NumPoints);
            var radians = IndicativeAngle(points);
            points = RotateBy(points, -radians);
            points = ScaleTo(points, SquareSize);
            points = TranslateTo(points, Origin);
            var vector = Vectorize(points); // for Protractor

            var b = +Infinity;
            var u = -1;
            for (var i = 0; i < this.Unistrokes.length; i++) // for each unistroke
            {
                var d;
                if (useProtractor) // for Protractor
                    d = OptimalCosineDistance(this.Unistrokes[i].Vector, vector);
                else // Golden Section Search (original $1)
                    d = DistanceAtBestAngle(points, this.Unistrokes[i], -AngleRange, +AngleRange, AnglePrecision);
                if (d < b) {
                    b = d; // best (least) distance
                    u = i; // unistroke
                }
            }
            return (u == -1) ? new Result("No match.", 0.0) : new Result(this.Unistrokes[u].Name, useProtractor ? 1.0 / b : 1.0 - b / HalfDiagonal);
        };
        this.AddGesture = function(name, points)
        {
            this.Unistrokes[this.Unistrokes.length] = new Unistroke(name, points); // append new unistroke
            var num = 0;
            for (var i = 0; i < this.Unistrokes.length; i++) {
                if (this.Unistrokes[i].Name == name)
                    num++;
            }
            return num;
        }
        //添加push remove clear方法
        this.PushGensture = function(settings){
            if(!settings[0] instanceof Unistroke) alert('数据出错');
            this.Unistrokes = settings;
            NumUnistrokes = settings.length;
        }
        this.removeGensture = function(num){
            this.Unistrokes.splice(num,1);
        }
        this.ClearGensture = function(){
            NumUnistrokes = this.Unistrokes.length = 0;
        }
        this.DeleteUserGestures = function()
        {
            this.Unistrokes.length = NumUnistrokes; // clear any beyond the original set
            return NumUnistrokes;
        }
    }
//
// Private helper functions from this point down
//
    function Resample(points, n)
    {
        var I = PathLength(points) / (n - 1); // interval length
        var D = 0.0;
        var newpoints = new Array(points[0]);
        for (var i = 1; i < points.length; i++)
        {
            var d = Distance(points[i - 1], points[i]);
            if ((D + d) >= I)
            {
                var qx = points[i - 1].X + ((I - D) / d) * (points[i].X - points[i - 1].X);
                var qy = points[i - 1].Y + ((I - D) / d) * (points[i].Y - points[i - 1].Y);
                var q = new Point(qx, qy);
                newpoints[newpoints.length] = q; // append new point 'q'
                points.splice(i, 0, q); // insert 'q' at position i in points s.t. 'q' will be the next i
                D = 0.0;
            }
            else D += d;
        }
        if (newpoints.length == n - 1) // somtimes we fall a rounding-error short of adding the last point, so add it if so
            newpoints[newpoints.length] = new Point(points[points.length - 1].X, points[points.length - 1].Y);
        return newpoints;
    }
    function IndicativeAngle(points)
    {
        var c = Centroid(points);
        return Math.atan2(c.Y - points[0].Y, c.X - points[0].X);
    }
    function RotateBy(points, radians) // rotates points around centroid
    {
        var c = Centroid(points);
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        var newpoints = new Array();
        for (var i = 0; i < points.length; i++) {
            var qx = (points[i].X - c.X) * cos - (points[i].Y - c.Y) * sin + c.X
            var qy = (points[i].X - c.X) * sin + (points[i].Y - c.Y) * cos + c.Y;
            newpoints[newpoints.length] = new Point(qx, qy);
        }
        return newpoints;
    }
    function ScaleTo(points, size) // non-uniform scale; assumes 2D gestures (i.e., no lines)
    {
        var B = BoundingBox(points);
        var newpoints = new Array();
        for (var i = 0; i < points.length; i++) {
            var qx = points[i].X * (size / B.Width);
            var qy = points[i].Y * (size / B.Height);
            newpoints[newpoints.length] = new Point(qx, qy);
        }
        return newpoints;
    }
    function TranslateTo(points, pt) // translates points' centroid
    {
        var c = Centroid(points);
        var newpoints = new Array();
        for (var i = 0; i < points.length; i++) {
            var qx = points[i].X + pt.X - c.X;
            var qy = points[i].Y + pt.Y - c.Y;
            newpoints[newpoints.length] = new Point(qx, qy);
        }
        return newpoints;
    }
    function Vectorize(points) // for Protractor
    {
        var sum = 0.0;
        var vector = new Array();
        for (var i = 0; i < points.length; i++) {
            vector[vector.length] = points[i].X;
            vector[vector.length] = points[i].Y;
            sum += points[i].X * points[i].X + points[i].Y * points[i].Y;
        }
        var magnitude = Math.sqrt(sum);
        for (var i = 0; i < vector.length; i++)
            vector[i] /= magnitude;
        return vector;
    }
    function OptimalCosineDistance(v1, v2) // for Protractor
    {
        var a = 0.0;
        var b = 0.0;
        for (var i = 0; i < v1.length; i += 2) {
            a += v1[i] * v2[i] + v1[i + 1] * v2[i + 1];
            b += v1[i] * v2[i + 1] - v1[i + 1] * v2[i];
        }
        var angle = Math.atan(b / a);
        return Math.acos(a * Math.cos(angle) + b * Math.sin(angle));
    }
    function DistanceAtBestAngle(points, T, a, b, threshold)
    {
        var x1 = Phi * a + (1.0 - Phi) * b;
        var f1 = DistanceAtAngle(points, T, x1);
        var x2 = (1.0 - Phi) * a + Phi * b;
        var f2 = DistanceAtAngle(points, T, x2);
        while (Math.abs(b - a) > threshold)
        {
            if (f1 < f2) {
                b = x2;
                x2 = x1;
                f2 = f1;
                x1 = Phi * a + (1.0 - Phi) * b;
                f1 = DistanceAtAngle(points, T, x1);
            } else {
                a = x1;
                x1 = x2;
                f1 = f2;
                x2 = (1.0 - Phi) * a + Phi * b;
                f2 = DistanceAtAngle(points, T, x2);
            }
        }
        return Math.min(f1, f2);
    }
    function DistanceAtAngle(points, T, radians)
    {
        var newpoints = RotateBy(points, radians);
        return PathDistance(newpoints, T.Points);
    }
    function Centroid(points)
    {
        var x = 0.0, y = 0.0;
        for (var i = 0; i < points.length; i++) {
            x += points[i].X;
            y += points[i].Y;
        }
        x /= points.length;
        y /= points.length;
        return new Point(x, y);
    }
    function BoundingBox(points)
    {
        var minX = +Infinity, maxX = -Infinity, minY = +Infinity, maxY = -Infinity;
        for (var i = 0; i < points.length; i++) {
            minX = Math.min(minX, points[i].X);
            minY = Math.min(minY, points[i].Y);
            maxX = Math.max(maxX, points[i].X);
            maxY = Math.max(maxY, points[i].Y);
        }
        return new Rectangle(minX, minY, maxX - minX, maxY - minY);
    }
    function PathDistance(pts1, pts2)
    {
        var d = 0.0;
        for (var i = 0; i < pts1.length; i++) // assumes pts1.length == pts2.length
            d += Distance(pts1[i], pts2[i]);
        return d / pts1.length;
    }
    function PathLength(points)
    {
        var d = 0.0;
        for (var i = 1; i < points.length; i++)
            d += Distance(points[i - 1], points[i]);
        return d;
    }
    function Distance(p1, p2)
    {
        var dx = p2.X - p1.X;
        var dy = p2.Y - p1.Y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    function Deg2Rad(d) { return (d * Math.PI / 180.0); }





    function Getsure(options){
        this._init(options);
        this._bindEvent();
    }
    Getsure.prototype = {
        _init(options){
            var el = document.querySelector(options.el),
                canvas = document.createElement('canvas');
            this.el = el;
            this.canvas = canvas;
            this.devive = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
            this.ctx = canvas.getContext('2d');
            this.flag = false;
            this.now = {};
            this.last = {};
            this.points = [];
            this.type = options.getsurtType;
            this.fontColor = options.fontColor || '#000';
            this.lineWidth = options.lineWidth || 5;
            this.isDrawLine = options.drawLine;
            this.callback = options.callback;

            this.$1 =  new DollarRecognizer();
            el.appendChild(canvas);

            this.resize();
        },
        /*
        *   画网格
        * */
        drawLine(){
            if(!this.isDrawLine) return;
            var canvas = this.canvas,
                ctx = this.ctx,
                jx = this.isDrawLine.x,
                jy = this.isDrawLine.y,
                wid = this.isDrawLine.width;

            ctx.lineWidth = wid;
            ctx.strokeStyle = this.isDrawLine.color||'#ccc';
            for( var i=wid+jx; i<canvas.width; i+=jx){
                ctx.beginPath();
                ctx.moveTo(i,0);
                ctx.lineTo(i,canvas.height);
                ctx.stroke();
                ctx.closePath();
            }
            for( var i=wid+jy; i<canvas.height; i+=jy){
                ctx.beginPath();
                ctx.moveTo(0,i);
                ctx.lineTo(canvas.width,i);
                ctx.stroke();
                ctx.closePath();
            }
        },

        /*
        *   点击事件
        * */
        _bindEvent(){
            var canvas = this.canvas,
                ctx = this.ctx,
                devive = this.devive,
                clickEvent = devive ? "touchstart": "mousedown",
                moveEvent = devive ? "touchmove": "mousemove",
                endEvent = devive ? "touchend": "mouseup";

            canvas.addEventListener(clickEvent,(e) =>{
                if(this.flag)return;
                this.points = [];
                this.flag = true;
                ctx.clearRect(0,0, canvas.width, canvas.height);
                this.drawLine();
                this.drawPen(e);
            })

            canvas.addEventListener(moveEvent, (e)=> {
                if (!this.flag)return;
                e.preventDefault();
                this.drawPen(e);
            })

            canvas.addEventListener(endEvent, (e)=>{
                //e.preventDefault();
                this.last = {};
                this.flag = false;

                //运算`
                var result = this.$1.Recognize(this.points, this.type);
                this.callback(result)
            })

            if(!devive) {
                canvas.addEventListener('mouseleave', ()=> {
                    this.flag = false;
                    this.last = {};
                })
            }
        },

        /*
        *   画线
        * */
        drawPen(e){
            var ctx = this.ctx;
            if(this.devive){
                var rect = e.target.getBoundingClientRect();
                this.now.x = parseInt(e.targetTouches[0].clientX-rect.left);
                this.now.y = parseInt(e.targetTouches[0].clientY-rect.top);
            }else {
                this.now.x = parseInt(e.offsetX);
                this.now.y = parseInt(e.offsetY);
            }
            var x = this.now.x,
                y = this.now.y;

            this.points.push(new Point(x, y));

            ctx.beginPath();
            ctx.fillStyle = ctx.strokeStyle = this.fontColor;
            ctx.arc( x, y, 3, 0, Math.PI*2 );
            ctx.fill();

            if(this.last){
                ctx.beginPath();
                ctx.lineWidth = this.lineWidth;
                ctx.lineCap = ctx.lineJoin = 'round';
                ctx.moveTo(this.last.x,this.last.y);
                ctx.lineTo(x,y);
                ctx.strokeStyle = this.fontColor;
                ctx.stroke();
            }
            this.last = {x,y};
            ctx.closePath();
        },

        /*
        *   添加手势
        * */
        addGetsure(name){
            if(name) {
                this.$1.AddGesture(name, this.points);
                alert('添加成功');
            }
        },

        /*
        *   导入配置
        * */
        importSettings(settings){           //导入配置
            this.$1.ClearGestures();        //清空
            this.$1.PushGensture(settings); //导入
        },

        /*
        *   导出配置
        * */
        exportSettings(){                   //导出配置
            return this.$1.Unistrokes;
        },

        /*
        *   获取手势信息
        * */
        getList(){
            var ret = [];
            for( var i=0,prop; prop = this.$1.Unistrokes[i++];  ){
                ret.push(prop.Name);
            }
            return ret;
        },

        /*
        *   删除手势
        * */
        removeGetsure(num){
            this.$1.removeGensture(num);
            return true;
        },

        /*
        *   设置线的颜色
        * */
        setColor(color){
            this.fontColor = color;
        },

        /*
        *   线的粗细
        * */
        setLineWidth(size){
            this.lineWidth = size;
        },

        /*
        *   重置宽高
        * */
        resize(){
            this.canvas.width = this.el.offsetWidth;
            this.canvas.height = this.el.offsetHeight;
            this.drawLine()
        }
    };

    return Getsure;
});