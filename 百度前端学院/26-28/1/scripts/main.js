var canvasWidth = 600;
var canvasHeight = canvasWidth;
function setBck(){
  var canvas = document.getElementsByClassName('canvas')[0];
  var ctx = canvas.getContext('2d');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,canvasWidth,canvasHeight);
  ctx.fillStyle = 'blue';
  ctx.arc(canvasWidth/2,canvasWidth/2,canvasWidth/10,0,2*Math.PI,true);
  ctx.fill();
  var status = document.getElementsByClassName('status')[0];
  var panel = document.getElementsByClassName('panel')[0]
  return new commander(status,canvas,panel);
}
function addEv(commander){
  document.getElementsByClassName('setSpacecraft')[0].onclick = function(){
    commander.build();
  }
}








window.onload = function(){
  var newCommander = setBck();
  addEv(newCommander);
}
