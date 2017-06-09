/**
 * Created by Administrator on 2017/4/14 0014.
 */
window.onload = function(){
  var surf1 = new surfaced(document.getElementsByClassName('surfaced1')[0]);
  var surf2 = new surfaced(document.getElementsByClassName('surfaced2')[0],true,false);
  var surf3 = new surfaced(document.getElementsByClassName('surfaced3')[0],false,true);
  var surf4 = new surfaced(document.getElementsByClassName('surfaced4')[0],false,false);
  document.getElementsByClassName('btn1')[0].onclick = function(){
    surf1.show();
  }
  document.getElementsByClassName('btn2')[0].onclick = function(){
    surf2.show();
  }
  document.getElementsByClassName('btn3')[0].onclick = function(){
    surf3.show();
  }
  document.getElementsByClassName('btn4')[0].onclick = function(){
    surf4.show();
  }
}
