var HEIGHT=Math.min(900,$(window).width()-20);
var WIDTH=Math.min(900,$(window).width()-20);
var isMousedown=false;
var lastLoc={x:0,y:0};
var lastime=0;
var lastWidth=-1;
var strokecolor="black";
window.onload=function(){
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
   canvas.height=HEIGHT;
   canvas.width=WIDTH;
drawGrid(ctx);

$("#controller").css("width",WIDTH+"px");
//清除控件操作
$("#clear_btn").click( 
   function(e){
      ctx.clearRect(0,0,WIDTH,HEIGHT);
      drawGrid(ctx);
   }
)
//颜色选择器
$(".color_btn").click(
   function(e){
     $(".color_btn").removeClass("color_btn_selected");
$(this).addClass("color_btn_selected");
strokecolor=$(this).css("background-color");
   }
)
//位置转化
function windowTocanvas(x,y){
   var bbox=canvas.getBoundingClientRect();
   return{x:Math.round(x-bbox.left),y:Math.round(y-bbox.top)};
}
//获得运笔距离
function getX(loc1,loc2){
return Math.sqrt((loc1.x-loc2.x)*(loc1.x-loc2.x)+(loc1.y-loc2.y)*(loc1.y-loc2.y));
}
var maxwidth=25;
var minwidth=1;
var maxv=10;
var minv=0.1;
//运笔速度改变线条粗细
function getWidth(s,t){
var v=s/t;
   if(v<minv){
   width=maxwidth;
   }else if(v>maxv){
   width=minwidth;
   }else{
   width=maxwidth-(v-minv)/(maxv-minv)*(maxwidth-minwidth)
   }
   if(lastWidth==-1)
   return width;
return lastWidth*2/3+width*1/3;
}
function drawGrid(ctx){
//外框
   ctx.save();
   ctx.lineWidth=6;
   ctx.strokeStyle="rgba(255,0,0,1)";
   ctx.beginPath();
   ctx.lineJoin="round"
   ctx.moveTo(3,3);
   ctx.lineTo(WIDTH-3,3);
   ctx.lineTo(WIDTH-3,HEIGHT-3);
   ctx.lineTo(3,HEIGHT-3);
   ctx.closePath();
   ctx.stroke();
//内格
   ctx.lineWidth=1;
   ctx.strokeStyle="rgba(255,0,0,1)";
   ctx.beginPath();
   ctx.lineJoin="round"
   //斜向
   ctx.moveTo(3,3);
   ctx.lineTo(WIDTH-3,HEIGHT-3);
   ctx.moveTo(WIDTH-3,3);
   ctx.lineTo(3,HEIGHT-3);
   //横纵向
   ctx.moveTo(3,HEIGHT/2);
   ctx.lineTo(WIDTH,HEIGHT/2);
   ctx.moveTo(WIDTH/2,3);
   ctx.lineTo(WIDTH/2,HEIGHT);
   ctx.closePath();
   ctx.stroke();
   ctx.restore();
}
//绘制开始
function beginstroke(point){
   isMousedown=true;
   lastTime=new Date().getTime();    
lastLoc=windowTocanvas(point.x,point.y);

}
//绘制结束
function endstroke(){
   isMousedown=false;
}
//绘制
function draw(point){
var curLoc=windowTocanvas(point.x,point.y);
      var s=getX(curLoc,lastLoc);
      var curTime=new Date().getTime();
      var t=curTime-lastTime;
      var linewidth=getWidth(s,t);
      ctx.beginPath();
      ctx.moveTo(lastLoc.x,lastLoc.y);
      ctx.lineTo(curLoc.x,curLoc.y);
      ctx.closePath();
      ctx.lineWidth=linewidth;
      ctx.lineCap="round";
      ctx.lineJoin="round";
      ctx.strokeStyle=strokecolor;
      ctx.stroke();
lastLoc=curLoc;
lastTime=curTime;
lastWidth=lineWidth;

}
//鼠标事件
 //按下
canvas.onmousedown=function(e){
   e.preventDefault();
   beginstroke({x:e.clientX,y:e.clientY});
}
  //移动
canvas.onmousemove=function(e){
   e.preventDefault();
   if(isMousedown){
      draw({x:e.clientX,y:e.clientY});
   }
}
  //抬起
canvas.onmouseup=function(e){
   e.preventDefault();
   endstroke();
}
  //移出
canvas.onmouseout=function(e){
   e.preventDefault();
   endstroke();
}
//触控事件
document.addEventListener('touchmove',function(e){
event.preventDefault();
});
canvas.addEventListener('touchstart',function(e){
event.preventDefault();
      touch=e.touches[0];
      beginstroke({x:touch.pageX,y:touch.pageY});
});
canvas.addEventListener('touchmove',function(e){
event.preventDefault();
      touch=e.touches[0];
      draw({x:touch.pageX,y:touch.pageY});
});
canvas.addEventListener('touchend',function(e){
event.preventDefault();
endstroke();
});
}
