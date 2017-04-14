/**
 * Created by Administrator on 2017/4/11 0011.
 */
(function(window){
  //飞船私有id
  var privateId = 0;
  function Mediator(cav){
    this.depot = [];
    this.cav = cav;
    //移除队列
    this.removeArr = [];
  }

  Mediator.prototype = {
    diffusion: function(obj){
      var me = this;
      setTimeout(function(){
        for( var i=0; i<me.depot.length; i++ ){
          //if(!i) console.log("depot:"+me.depot.length);
          me.depot[i].receive(obj);
        }
        //统一移除
        me.remove();
      },1000);
    },
    build: function(id){
      this.depot.push( new window.spacecraft(id,(id*40+this.cav.width/10),this.cav,this,privateId++) );
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
    }
  }
  window.Mediator = Mediator;
})(window);
