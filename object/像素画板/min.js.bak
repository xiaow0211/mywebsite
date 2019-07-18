var Height=900;
var Width=900;
var color="#ccc";
var grid=17;
var margin=Height/grid;
window.onload=function(){
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
   canvas.height=Height;
   canvas.width=Width;
var box=canvas.getBoundingClientRect();
   var Left=box.left;
   var Top=box.top;
$("#get").click(function(){
   color=$("#color").val();
});
$("#clear").click(function(){
   ctx.clearRect(0,0,Width,Height);
   drawGrid();
})
$("#eraser").click(function(){
   color="#fff";
})
drawGrid();
canvas.addEventListener('touchstart',function(e){
   e.preventDefault();
   touch=e.touches[0];
    var x=touch.pageX-Left;
    var y=touch.pageY-Top;
    var i=Math.floor(x/margin);
    var j=Math.floor(y/margin);
drawColor(i,j);
});
canvas.addEventListener('touchmove',function(e){
   e.preventDefault();
   touch=e.touches[0]
    var x=touch.pageX-Left;
    var y=touch.pageY-Top;
    var i=Math.floor(x/margin);
    var j=Math.floor(y/margin);
drawColor(i,j);
});
canvas.addEventListener('touchend',function(e){
   e.preventDefault();
});
//绘制格子
function drawGrid(){
   ctx.lineWidth=1;
   ctx.strokeStyle="#555";
   for(var i=0;i<grid+1;i++){
     ctx.moveTo(margin*i,0);
     ctx.lineTo(margin*i,Height);
     ctx.stroke();
     ctx.moveTo(0,margin*i);
     ctx.lineTo(Height,margin*i);
     ctx.stroke();
   }  
}
//绘制像素画
function drawColor(x,y){
   ctx.fillStyle=color;
   ctx.fillRect(x*margin+1,y*margin+1,margin-2,margin-2);
   ctx.fill();
}
}
