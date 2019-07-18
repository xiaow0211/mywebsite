window.onload=function(){
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var width=ctx.canvas.width;
var height=ctx.canvas.height;
var r=width/2;
function drawclock(){
//绘制外边框
ctx.save();
ctx.beginPath();
ctx.translate(r,r);
ctx.strokeStyle="#000";
ctx.lineWidth=15;
ctx.arc(0,0,r-7.5,0,2*Math.PI,false);
ctx.stroke();
//绘制数字
var clocknum=[3,4,5,6,7,8,9,10,11,12,1,2];
ctx.font="24px Arial";
ctx.textAlign="center";
ctx.textBaseline="middle"
clocknum.forEach(function(num,i){
var rad=2*Math.PI/12*i;
var x=Math.cos(rad)*(r-42);
var y=Math.sin(rad)*(r-42);
ctx.fillText(num,x,y);
});
//绘制刻度
for (var i=0;i<60;i++){
var rad=2*Math.PI/60*i;
var x=Math.cos(rad)*(r-25);
var y=Math.sin(rad)*(r-25);
ctx.beginPath();
if(i % 5=== 0){
ctx.fillStyle="#000";
ctx.arc(x,y,2,0,2*Math.PI,false);
}else{
ctx.fillStyle="#ccc";
ctx.arc(x,y,2,0,2*Math.PI,false);
}
ctx.fill();
}}
//绘制指针
//绘制时针
function drawhour(hour){
ctx.save();
ctx.beginPath();
var rad=2*Math.PI/12*hour;
ctx.lineWidth=7;
ctx.lineCap="round";
ctx.rotate(rad);
ctx.moveTo(0,10);
ctx.lineTo(0,-r/2);
ctx.stroke();
ctx.restore();
}
//绘制分针
function drawminute(minute){
ctx.save();
ctx.beginPath();
var rad=2*Math.PI/60*minute;
ctx.lineWidth=5;
ctx.lineCap="round";
ctx.rotate(rad);
ctx.moveTo(0,10);
ctx.lineTo(0,-r+35);
ctx.stroke();
ctx.restore();
}
//绘制秒针
function drawsecond(second){
ctx.save();
ctx.beginPath();
ctx.fillStyle="#c14543"
var rad=2*Math.PI/60*second;
ctx.rotate(rad);
ctx.moveTo(-2,20);
ctx.lineTo(2,20);
ctx.lineTo(0,-r+18);
ctx.fill();
ctx.restore();
}
//绘制螺丝
function drawdot(){
ctx.beginPath();
ctx.fillStyle="#fff"
ctx.arc(0,0,2,0,2*Math.PI,false);
ctx.fill();
}
//实现跳动
function draw(){
ctx.clearRect(0,0,width,height);
var now=new Date();
var hour=now.getHours();
var minute=now.getMinutes();
var second=now.getSeconds();
drawclock();
drawhour(hour+minute/60);
drawminute(minute+second/60);
drawsecond(second);
drawdot();
ctx.restore();
}
draw();
setInterval(draw,1000);
}
