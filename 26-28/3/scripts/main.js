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
  var status = document.getElementsByClassName('spa');
  var panel = document.getElementsByClassName('panel')[0]
  return new commander(status,canvas,panel);
}
function addEv(commander){
  var aPowers = document.getElementsByClassName('power');
  var aEnergy = document.getElementsByClassName('energy');
  document.getElementsByClassName('setSpacecraft')[0].onclick = function(){
    for( var i=0; i<aPowers.length; i++ ){
      if(aPowers[i].checked){
        var pow = aPowers[i].getAttribute('data-power');
        var efficiency = aPowers[i].getAttribute('data-efficiency');
        break;
      }
    }
    for( var i=0; i<aEnergy.length; i++ ){
      if(aEnergy[i].checked){
        var energy = aEnergy[i].getAttribute('data-energy');
        break;
      }
    }
    commander.build(pow,efficiency,energy);
  }
}








window.onload = function(){
  var newCommander = setBck();
  addEv(newCommander);
}
