var HEIGHT=860;
var WIDTH=960;
var RADIUS=8.4;
var MARGIN_TOP=120;
var MARGIN_LEFT=30;
var curShowTimeSeconds=0;

var balls=[ ];
const colors=["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000" ];

window.onload=function(){
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
    canvas.height=HEIGHT;
    canvas.width=WIDTH;

curShowTimeSeconds=getCurrentShowTimeSeconds();
//动画
      setInterval(
         function(){
             render(ctx);
             update();
          },
      50
      );
}
//函数部分
//获取秒数
function getCurrentShowTimeSeconds(){
  var curTime=new Date();
  var ret=curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds()
return ret;
}
//刷新函数[改变]
function update(){
  var nextShowTimeSeconds=getCurrentShowTimeSeconds();
    var nextHour=parseInt(nextShowTimeSeconds/3600);
    var nextMinute=parseInt((nextShowTimeSeconds-nextHour*3600)/60);
    var nextSecond=nextShowTimeSeconds%60;
    var curHour=parseInt(curShowTimeSeconds/3600);
    var curMinute=parseInt((curShowTimeSeconds-curHour*3600)/60);
    var curSecond=curShowTimeSeconds%60;
      if(nextSecond != curSecond){
        //判断时间改变的位置，并添加彩色小球
           //时

          if(parseInt(nextHour/10) !=parseInt(curHour/10)){
addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(curHour/10));
          }
         if(parseInt(nextHour%10) !=parseInt(curHour%10)){
addBalls(MARGIN_LEFT+15*RADIUS,MARGIN_TOP,parseInt(curHour%10));
        }
        //分
        if(parseInt(nextMinute/10) !=parseInt(curMinute/10)){
addBalls(MARGIN_LEFT+39*RADIUS,MARGIN_TOP,parseInt(curMinute/10));
         }
        if(parseInt(nextMinute%10) !=parseInt(curMinute%10)){
addBalls(MARGIN_LEFT+54*RADIUS,MARGIN_TOP,parseInt(curMinute%10));
         }
         //秒
         if(parseInt(nextSecond/10) !=parseInt(curSecond/10)){
addBalls(MARGIN_LEFT+78*RADIUS,MARGIN_TOP,parseInt(curSecond/10));
          }
          if(parseInt(nextSecond%10) !=parseInt(curSecond%10)){
addBalls(MARGIN_LEFT+93*RADIUS,MARGIN_TOP,parseInt(curSecond%10));
          }
curShowTimeSeconds=nextShowTimeSeconds;
      }
updateballs();
}
//彩色小球的运动
function updateballs(){
   for (var i=0;i<balls.length;i++){
      balls[i].x+=balls[i].vx;
      balls[i].y+=balls[i].vy;
      balls[i].vy+=balls[i].g;
      //碰撞检测
      if (balls[i].y>=HEIGHT-(RADIUS-1)){
         balls[i].y=HEIGHT-(RADIUS-1);
         balls[i].vy=-balls[i].vy*0.75;
      }
   }
   var cnt=0;
   for (var i=0;i<balls.length;i++)
      if(balls[i].x+(RADIUS-1)>0 && balls[i].x-(RADIUS-1)<WIDTH)
         balls[cnt++]=balls[i];
         while(balls.length>cnt){
             balls.pop();
         }
}
//添加彩色小球
function addBalls(x,y,num){
   for (var i=0;i<digit[num].length;i++){
      for (var j=0;j<digit[num][i].length;j++){
         if(digit[num][ i ][ j ]==1){
           var aball={
               x:x+2*j*RADIUS+RADIUS,
               y:y+2*i*RADIUS+RADIUS,
               g:1.5+Math.random(),
               vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
               vy:-5,
               color:colors[Math.floor(Math.random()*colors.length)]
            }
balls.push(aball);
         }
      }
   }
}

//时间变形及输出[To renderDigit();]
function render(ctx){
ctx.clearRect(0,0,WIDTH,HEIGHT);
    var hour=parseInt(curShowTimeSeconds/3600);
    var minute=parseInt((curShowTimeSeconds-hour*3600)/60);
    var second=curShowTimeSeconds%60;
 //小时 
renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hour/10),ctx);
renderDigit(MARGIN_LEFT+15*RADIUS,MARGIN_TOP,parseInt(hour%10),ctx);
//冒号digit[10]
renderDigit(MARGIN_LEFT+30*RADIUS,MARGIN_TOP,10,ctx);
//分钟
renderDigit(MARGIN_LEFT+39*RADIUS,MARGIN_TOP,parseInt(minute/10),ctx);
renderDigit(MARGIN_LEFT+54*RADIUS,MARGIN_TOP,parseInt(minute%10),ctx);
//冒号digit[10]
renderDigit(MARGIN_LEFT+69*RADIUS,MARGIN_TOP,10,ctx);
//秒钟
renderDigit(MARGIN_LEFT+78*RADIUS,MARGIN_TOP,parseInt(second/10),ctx);
renderDigit(MARGIN_LEFT+93*RADIUS,MARGIN_TOP,parseInt(second%10),ctx);
   //绘制彩色小球
   for (var i=0;i<balls.length;i++){
     ctx.fillStyle=balls[i].color;
     ctx.beginPath();

ctx.arc(balls[i].x,balls[i].y,RADIUS-1,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();
    }
}
//绘制的具体函数
function renderDigit(x,y,num,ctx){
ctx.fillStyle="rgb(0,102,153)";
  for (var i=0;i<digit[num].length;i++){
    for (var j=0;j<digit[num][ i ].length;j++){
      if(digit[num][ i ][ j ]==1){
        ctx.beginPath();
        ctx.arc(x+2*j*RADIUS+RADIUS,y+2*i*RADIUS+RADIUS,RADIUS-1,0,2*Math.PI);
        ctx.closePath();
        ctx.fill();
      }
    }
  }
}



