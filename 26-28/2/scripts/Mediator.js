/**
 * Created by Administrator on 2017/4/11 0011.
 */
(function(window){
  //飞船私有id
  //传播介质升级 速度加快到300ms 成功率90% 发送失败时每隔100ms持续发送 直到成功
  var privateId = 0;
  function Mediator(cav){
    this.depot = [];
    this.cav = cav;
    //移除队列
    this.removeArr = [];
  }

  Mediator.prototype = {
    diffusion: function(str){
      var me = this;
      setTimeout(function(){
        me.send(str);
        //统一移除
        me.remove();
      },300);
    },
    build: function(id,pow,efficiency,energy){
      this.depot.push( new window.spacecraft(id,(id*40+this.cav.width/10),this.cav,this,privateId++,pow,efficiency,energy) );
    },
    remove: function(){
      while(this.removeArr.length){
        var remPriId = this.removeArr.pop();
        for( var i=0; i<this.depot.length; i++ ){
          if(this.depot[i].priId==remPriId){
            this.depot.splice(i,1);
            break;
          }
        }
      }
    },
    send: function(str){
      var me = this;
      //发送成功时sucFlag为true
      var sucFlag = false;
      //持续发送,直到成功为止
      var timer = setInterval(function(){
        if(!str)clearInterval(timer);
        for (var i = 0; i < me.depot.length; i++) {
          //模拟丢包率
          var flag = parseInt(Math.random() * 100) % 10;
          if (flag) {
            sucFlag = me.depot[i].receive(str);
          }
          if(sucFlag){
            clearInterval(timer);
          }
        }
      },100);
    }
  }
  window.Mediator = Mediator;
})(window);
