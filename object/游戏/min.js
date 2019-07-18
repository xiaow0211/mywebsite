var Width=window.screen.availWidth;
var Height=window.screen.availHeight;
var barriers=[];
var hero=[];
var v=-22;
var isbegin=false;
var isgameover=false;
var score=0;

window.onload=function(){
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
   canvas.height=Height*0.5;
   canvas.width=Width;
      //初始化
      prepare();
      //准备
function prepare(){
    draw();
       $(".play").click(
          function(){
            $(".play").css("display","none");
            go();
         }
      )
 }
//绘制
function draw(){
   drawmap();
   getball();
   drawhero();
   drawbarrie();
}
//绘制地图
function drawmap(){
   ctx.beginPath();
   ctx.moveTo(0,Height/2.5);
   ctx.lineTo(Width,Height/2.5);
   ctx.closePath();
   ctx.lineWidth=10;
   ctx.strokeStyle="rgba(0,0,0,1)";
   ctx.stroke();
}
//获得角色位置
function getball(){
   var ahero={
      x:50,
      y:Height/2.5-15,
      v:0,
      g:0
   }
hero.push(ahero);
}
//绘制角色
function drawhero(){
   var ballx=hero[0].x;
   var bally=hero[0].y;
   ctx.beginPath();
   ctx.arc(ballx,bally,10,0,2*Math.PI);
   ctx.closePath();
   ctx.fillStyle="rgba(0,0,0,1)";
   ctx.fill();
}
//添加障碍
function addbarrie(){
   if(barriers.length<2){
      for(var i=1;i<3;i++){
          var barrie={
             x:(50*Math.random()+350)*i+150,
             height:50*Math.random()+160,
             width:30*Math.random()+10
              }
           barriers.push(barrie);
        }
    }
}
//绘制障碍
function drawbarrie(){
   for(var i=0;i<barriers.length;i++){
    ctx.beginPath();
    ctx.moveTo(barriers[i].x,barriers[i].height);
    ctx.lineTo(barriers[i].x,Height/2.5-5);
    ctx.closePath();
    ctx.lineWidth=barriers[i].width;
    ctx.stroke();
   }
}
//开始
function go(){
   addbarrie();
   drawbarrie();
   isbegin=true;
//触控事件
document.addEventListener('touchstart',function(e){
   e.preventDefault();
  if(hero[0].y!=Height/2.5-15){
     return;
   }else{
    jump();
   addbarrie();
   }
});
document.addEventListener('touchmove',function(e){
   e.preventDefault();
});
document.addEventListener('touchend',function(e){
   e.preventDefault();
});
}
//刷新障碍
function updatebarrie(){
   if(isbegin&&!isgameover){
      for(var i=barriers.length-1;i>=0;i--){
        barriers[i].x-=6;
            if(barriers[i].x+barriers[i].width<0){
                score+=1;
                $("span").text(score);
                 barriers.splice(i,1);
             }
//判断
             if(barriers[i].x<60+barriers[i].width/2&&barriers[i].x>40-barriers[i].width/2&&barriers[i].height<=hero[0].y+10){
              $(".tip").css("opacity",1)
              isgameover=true;
           }
       }
   }
}
//刷新位置
function updatehero(){
if(!isgameover){
   x=hero[0].x;
   hero[0].y+=hero[0].v;
   hero[0].v+=hero[0].g;
   if(hero[0].y>Height/2.5-15){
     hero[0].y=Height/2.5-15;
     hero[0].v=0;
   }
}
  drawhero(x,hero[0].y);   
}
function jump(){
      hero[0].v=v;
      hero[0].g=2;
}
//刷新绘图
function update(){
   ctx.clearRect(0,0,Width,Height);
   drawmap();
   updatehero();
   drawhero();
   addbarrie();
   drawbarrie();
   updatebarrie();
}
setInterval(
   function(){
   	update();
   }, 50);

/////
}
