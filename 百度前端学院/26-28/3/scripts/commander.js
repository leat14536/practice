/**
 * Created by Administrator on 2017/4/11 0011.
 */
(function(window){
  var power = {
    '30':'前进号',
    '50':'奔腾号',
    '80':'超越号'
  };
  var energy = {
    '2': '劲量型',
    '3': '光能型',
    '4': '永久型'
  };
  function commander(status,cav,panel){
    this.depot = [0,0,0,0];                        //0表示可以造船, 1表示已经有船
    this.spaModule = [{},{},{},{}];                //{power:num, energy:num}build时设置
    this.status = status;                          //状态面板[dom,dom,dom,dom],在dom节点里渲染
    this.Mediator = new window.Mediator(cav,this); //信号传播介质
    this.panel = panel;                            //飞船控制面板的父节点
    this.init();                                   //添加飞船控制事件监听
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
        str = parseInt(id).toString(2);
        while(str.length<4)str = '0'+str;
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
      if(flag != -1){
        this.depot[flag] = 1;
        this.spaModule[flag].power = pow;
        this.spaModule[flag].energy = energy;
        this.Mediator.build(flag+1,pow,efficiency,energy);
        this.setPanel(flag+1);
      }
    },
    //状态面板

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
    },

    //接收16位2进制字符串并处理
    DC: function(str){
      var id = parseInt(str.slice(0,4),2);
      var state = parseInt(str.slice(4,8),2);
      switch(state){
        case(1):state = '飞行';
              break;
        case(2):state = '停止';
              break;
        case(12):state = '准备销毁'
              break;
      }
      var energy = parseInt(str.slice(8,16),2);
      this.render(id,state,energy);
      return true;
    },
    render: function(id,state,nowEnergy){
        this.status[id-1].innerHTML = '<td>'+id+'号</td><td>'+power[this.spaModule[id-1].power]+'</td><td>'+energy[this.spaModule[id-1].energy]+'</td><td>'+state+'</td><td>'+nowEnergy+'</td>';
    }
  }

  window.commander = commander;
})(window);
