/**
 * Created by Administrator on 2017/4/11 0011.
 */
(function(window){
  function commander(status,cav,panel){
    this.depot = [0,0,0,0];
    this.status = status;
    this.Mediator = new window.Mediator(cav);
    this.panel = panel;
    this.init();
  }

  commander.prototype = {
    init: function(){
      var me = this;
      this.panel.addEventListener('click',function(e){
        var target = e.target||e.srcElement;
        me.diffusion(target.getAttribute('data'),target.getAttribute('class'));
      })
    },
    build : function(){
      var flag = -1;
      this.depot.forEach(function(spa,i){
        if(!spa&&flag==-1)
          flag = i;
      });
      if(flag == -1){
        this.reportStr('飞船上限已满');
      }else{
        this.depot[flag] = 1;
        this.reportStr((flag+1)+'号飞船已就绪');
        this.Mediator.build(flag+1);
        this.setPanel(flag+1);
      }
    },
    reportStr : function(str){
      this.status.value = str+'\n'+this.status.value;
    },
    diffusion: function(id,commond){
      if(commond=='destroy'){
        this.removePanel(id);
      }
      this.Mediator.diffusion({
        id: id,
        commond: commond
      })
    },
    setPanel: function(id){
      var panelBox = document.createElement('div');
      panelBox.setAttribute('class','panelbox panel'+id);
      panelBox.innerHTML = '<span>id: '+id+'</span><input type="button" value="飞行" class="fly" data='+id+'><input type="button" value="停止" class="stop"data='+id+'><input type="button" value="摧毁" class="destroy" data='+id+'>';
      this.panel.appendChild(panelBox);
    },
    removePanel: function(id){
      this.depot[id-1] = 0;
      this.panel.removeChild(this.panel.getElementsByClassName('panel'+id)[0]);
    }
  }

  window.commander = commander;
})(window);
