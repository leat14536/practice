/**
 * Created by Administrator on 2017/4/15 0015.
 */
/*
*   冻结表格行首
* */
(function(window){
  function freezeForm(tab){
    addScroll(tab);
  }

  function addScroll(tab){
    var first = tab.firstChild;
    document.addEventListener('scroll',function(){
      if(document.body.scrollTop > tab.offsetTop+first.offsetHeight && document.body.scrollTop<tab.offsetTop+tab.offsetHeight-first.offsetHeight){
        first.style.position = 'fixed';
        first.style.left = tab.offsetLeft;
        first.style.top = 0;
      }else if(document.body.scrollTop < tab.offsetTop-first.offsetHeight*2 || document.body.scrollTop > tab.offsetTop+tab.offsetHeight){
        first.style.position = 'inherit'
      }
    })
  }

  window.freezeForm = freezeForm;
})(window);
