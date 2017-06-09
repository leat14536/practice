/**
 * Created by Administrator on 2017/4/11 0011.
 */
(function(window){
  function spacecraft(id,distance,cav,meditor,priId){
    this.id = id;
    this.distance = distance; //与地面的距离
    this.angel = 0; //当前角度
    this.runAngel = 20/this.distance;//每秒飞行角度 这里的20表示默认每秒跑20px;
    this.cav = null;
    this.ctx = null;  //画布
    this.fule = 100; //能量
    this.chargeTimer = null;//自动充能计时器
    this.runTimer = null;//运动计时器
    this.state = 0;//0表示停止,1表示运动
    this.meditor = meditor; //信号传播介质
    this.priId = priId;//私有id
    this.init(cav);
  }

  spacecraft.prototype = {
    //创造一个canvasDom节点并画出方形
    init :function(cav) {
      this.cav = document.createElement('canvas');
      this.cav.setAttribute('class','spa'+this.priId);
      this.cav.style.position = 'absolute';
      this.cav.style.top = 0;
      this.cav.style.left = 0;
      this.cav.width = cav.width;
      this.cav.height = cav.height;
      this.cav.style.zIndex = 2;
      this.ctx = this.cav.getContext('2d');
      cav.parentNode.style.position = 'relative';
      cav.parentNode.insertBefore(this.cav, cav);
      cav.style.zIndex = 1;
      this.drawRect();
      //自动充能
      this.energize();
    },
    //处理信号
    receive: function(obj){
      //模拟 1/3 丢包率
      var flag = parseInt(Math.random()*100)%3;
      //判断是不是给自己的信号
      if(flag&&this.id==obj.id){
        if(obj.commond=='fly'){
          this.fly();
        }else if(obj.commond=='stop'){
          this.stop();
        }else if(obj.commond=='destroy'){
          this.destory();
          //注销id时先压入介质的注销数组
          this.meditor.removeArr.push(this.priId);
        }
      }
      // else if(this.id==obj.id){
      //   console.log(this.priId+'号飞船 丢包 commond: '+obj.commond);
      // }
    },
    //自动充能 build时开启,自爆时关闭
    energize: function(){
      var me = this;
      this.timer = setInterval(function(){
        if(me.fule<100){
          me.fule+=2;
        }
        if(me.fule>100){
          me.fule=100;
        }
        if(me.state==0){
          me.drawRect();
        }
      },1000);
    },
    //飞行指令
    fly:function(){
      if(!this.state) {
        //状态设为 正在飞行
        this.state = 1;
        var me = this;
        this.runTimer = setInterval(function () {
          me.fule -= 0.5;
          if(me.fule>=0){
            me.angel += me.runAngel / 10;
            me.drawRect();
          }else{
            //能量为0时停止
            me.state = 0;
            clearInterval(me.runTimer);
          }
        }, 100);
      }
    },
    stop: function(){
      this.state = 0;
      clearInterval(this.runTimer)
    },
    destory: function(){
      //清除计时器
      clearInterval(this.chargeTimer);
      clearInterval(this.runTimer);
      //清除canvasDOM节点
      this.cav.parentNode.removeChild(this.cav);
    },
    drawRect: function(){
      this.ctx.save();
      this.ctx.clearRect(0,0,this.cav.width,this.cav.height);
      this.ctx.beginPath();
      this.ctx.translate(this.cav.width / 2, this.cav.height / 2);
      this.ctx.rotate(this.angel);
      this.ctx.translate(this.distance,-25);
      this.ctx.rotate(Math.PI/2);
      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(0, 0, 50, 30);
      this.ctx.fillStyle = '#fff';
      this.ctx.fillText(this.id+': '+parseInt(this.fule),10,20);
      this.ctx.fill();
      this.ctx.restore();
    }
  }
  window.spacecraft = spacecraft;
})(window)
