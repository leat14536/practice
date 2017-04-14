/**
 * Created by Administrator on 2017/4/11 0011.
 */
(function(window){
  function commander(status,cav,panel){
    //0表示可以造船, 1表示已经有船
    this.depot = [0,0,0,0];

    //状态面板
    this.status = status;

    //信号传播介质
    this.Mediator = new window.Mediator(cav);

    //飞船控制面板的父节点
    this.panel = panel;

    //添加飞船控制事件监听
    this.init();
  }

  commander.prototype = {
    //添加飞船控制事件监听
    init: function(){
      var me = this;
      this.panel.addEventListener('click',function(e){
        var target = e.target||e.srcElement;
        //修改发送方式
        //me.diffusion(target.getAttribute('data'),target.getAttribute('class'));
        var id = target.getAttribute('data');
        var instruction = target.getAttribute('class');
        //发送的数据用二进制数字组成的字符串表示
        var str = '';
        switch(id){
          case ('1'): str+='0001';
            break;
          case ('2'): str+='0010';
            break;
          case ('3'): str+='0100';
            break;
          case ('4'): str+='1000';
            break;
        }
        switch(instruction){
          case ('fly'): str+='0001';
            break;
          case ('stop'): str+='0010';
            break;
          case ('destroy'): str+='1100';
            me.removePanel(id);
            break;
        }
        me.Mediator.diffusion(str);
      })
    },
    build : function(pow,efficiency,energy){
      var flag = -1;
      //判断是否超出飞船上限
      this.depot.forEach(function(spa,i){
        if(!spa&&flag==-1)
          flag = i;
      });
      if(flag == -1){
        this.reportStr('飞船上限已满');
      }else{
        this.depot[flag] = 1;
        this.reportStr((flag+1)+'号飞船已就绪');
        this.Mediator.build(flag+1,pow,efficiency,energy);
        this.setPanel(flag+1);
      }
    },
    //状态面板
    reportStr : function(str){
      this.status.value = str+'\n'+this.status.value;
    },
    //设置飞船控制面板
    setPanel: function(id){
      var panelBox = document.createElement('div');
      panelBox.setAttribute('class','panelbox panel'+id);
      panelBox.innerHTML = '<span>id: '+id+'</span><input type="button" value="飞行" class="fly" data='+id+'><input type="button" value="停止" class="stop"data='+id+'><input type="button" value="摧毁" class="destroy" data='+id+'>';
      this.panel.appendChild(panelBox);
    },
    //移除飞船控制面板
    removePanel: function(id){
      this.depot[id-1] = 0;
      this.panel.removeChild(this.panel.getElementsByClassName('panel'+id)[0]);
    }
  }

  window.commander = commander;
})(window);
