var Width=window.screen.availWidth;
var Height=window.screen.availHeight;
//存储"i_j"格式数组
var linedots=[];
//存储"x,y"信息
var dots=[];
var iscantry=true;
var times=5;
var keyword=[];
var a=[];
window.onload=function(){
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
   canvas.width=Width;
   canvas.height=Height;
   begin();
//准备
function begin(){
   $("#wrap").css("width",Width);
   $("#wrap").css("height",Height);
   $("#lock").css("width",Width);
   $("#home").css("height",Height);
   for(var i=1;i<4;i++){
      for(var j=1;j<4;j++){
         var digit=$("#digit_"+i+"_"+j);
          digit.css("left",i*Width/4);
          digit.css("top",Height/3.5+j*Width/4);
      }
   }
   if(keyword.length==0){
$("p").text("请设置密码!")
   }
}
//初始化
function clear(){
   ctx.clearRect(0,0,Width,Height);
   linedots=[];
   dots=[];
}
//密码比对
function check(){
var mykey=[];
var truekey=[];
   if(linedots.length==keyword.length){
     for(var i=0;i<keyword.length;i++){
var c=linedots[i].substring(0,1)+linedots[i].substring(2,3);
var d=keyword[i].substring(0,1)+keyword[i].substring(2,3);
       mykey.push(c);
       truekey.push(d);
      }
     var a1=mykey.join("");
     var a2=truekey.join("");
      if(a1==a2){
         yes();
      }else{
         no();
      }
   }else{
      no();
   }
}
//解锁成功
function yes(){
   var r=confirm("解锁成功,是否重新解锁?");
   if (r==false){
      $(".digit").css("display","none");
      $("#lock").css("display","none");
      $("#home").css("display","block");
      $("p").text(" ")
      iscantry=false;
   }else{
      times=5;
     $("p").text("请解锁!");
}
}
//解锁失败
function no(){
   $("p").text("密码错误,请重试!");
   times-=1;
   if(times==0){
   $("p").text("手机已锁定,请于10秒后重试!");
      iscantry=false;
      setTimeout(lockoff,10000);
   }
}
function lockoff(){
      iscantry=true;
      times=5;
     $("p").text("请解锁!");
}
//获得线条信息
function getline(){
   for(var i=0;i<linedots.length;i++){
var dot={
x:linedots[i].substring(1,0)*Width/4+3,
y:Height/3.5+linedots[i].substring(3,2)*Width/4+3
}
   }
dots.push(dot);
   for (var i=0;i<dots.length;i++){
      var start=dots[i];
       var end=dots[i+1];
       drawline(start,end);
   }
}
//获得触摸点信息
function getdot(dot){
   var x=dot.x;
   var y=dot.y;
      for(var i=1;i<4;i++){
         for(var j=1;j<4;j++){
          var divx=i*Width/4;
          var divy=Height/3.5+j*Width/4;
            if(x<divx+30&&x>divx-30){
                if(y<divy+30&&y>divy-30){
                   var linedot=i+"_"+j;
   var b=$.inArray(linedot,linedots);
   if(b<0){
    linedots.push(linedot);
                 }
               }
           }
         }
   }
}
//设置密码
function restkey(){
   for(var i=0;i<linedots.length;i++){
    var key=linedots[i];
    keyword.push(key);
   }
//添加线条
for(var i=0;i<linedots.length;i++){
var d={
x:linedots[i].substring(1,0)*Width/4+3,
y:Height/3.5+linedots[i].substring(3,2)*Width/4+3
}
a.push(d);
}
setTimeout(clear,1000);
setTimeout(alert("设置成功!"),1000);
setTimeout($("p").text("请解锁"),1000);
      linedots=[];
for (var i=0;i<a.length;i++){
      var start=a[i];
       var end=a[i+1];
       drawline(start,end);
   }
}

//绘制直线
function drawline(start,end){
   ctx.beginPath();
   ctx.moveTo(start.x,start.y);
   ctx.lineTo(end.x,end.y);
   ctx.closePath();
   ctx.strokeStyle="rgba(255,255,255,0.5)"
   ctx.lineWidth=4;
   ctx.lineCap="round";
   ctx.stroke();
}
document.addEventListener('touchstart',function(event){
   event.preventDefault();
if(iscantry){
   $("img").css("opacity",0.5);
   var touch=event.touches[0];
if(touch.pageX>Width/4-30&&touch.pageX<Width/4*3+30&&touch.pageY>Height/3.5+Width/4){
   getdot({x:touch.pageX,y:touch.pageY});
}}
});
document.addEventListener('touchmove',function(event){
   event.preventDefault();
if(iscantry){
   var touch=event.touches[0];
if(touch.pageX>Width/4-30&&touch.pageX<Width/4*3+30&&touch.pageY>Height/3.5+Width/4){
    getdot({x:touch.pageX,y:touch.pageY});
if(keyword.length>0){
      getline();
}
}
}
});
document.addEventListener('touchend',function(event){
   event.preventDefault();
if(iscantry&&linedots.length>0){
   if(keyword.length==0){
      restkey();
    }else{
   check();
   }
   clear();
}
});
}

