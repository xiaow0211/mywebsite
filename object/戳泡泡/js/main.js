//todo  背景音乐  破裂音效 计时器
var WIDTH=document.body.clientWidth;
var HEIGHT=document.body.clientHeight;
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
canvas.width=WIDTH*3;
canvas.height=HEIGHT*3;
var bubbles=[];
var smallBubbles=[];
var cut=false;
	function updata(){
   	checkBoom();
	   for(var i=0;i<bubbles.length;i++){
	      bubbles[i].size+=(bubbles[i].r-bubbles[i].size)*0.25;
	      bubbles[i].x+=bubbles[i].vx;
	      bubbles[i].y+=bubbles[i].vy;
   	}
   	for(var i=0;i<smallBubbles.length;i++){
	        for(var j=0;j<smallBubbles[i].length;j++){
	        smallBubbles[i][j].time-=1;
	        if(smallBubbles[i][j].time<=1){
	         smallBubbles[i].splice(j,1);
	        }
	        }
	   }
	}
	window.addEventListener("touchstart",function(e){
	  var x=e.touches[0].clientX*3;
	  var y=e.touches[0].clientY*3;
	  //点击检测
	  for(var i=0;i<bubbles.length;i++){
	     if(getDistance(x,y,bubbles[i].x,bubbles[i].y)<=bubbles[i].r){
	         //当前泡泡破裂，并绘制小泡泡
	         var popNum=parseInt(random(40,50));
	         var array=[];
	         for(var j=0;j<popNum;j++){
	            var aSmall={
	               x:bubbles[i].x,
	               y:bubbles[i].y,
	               r:bubbles[i].r+parseInt(random(-5,5)),
	               size:random(1,5),
	               angle:random(-3.14,3.14),
	               color:`rgba(255,255,255,${random(0.3,0.7)})`,
	               time:50,
	            }
	            array.push(aSmall);
	         }
	         smallBubbles.push(array);
	         bubbles.splice(i,1);
	        
           
   	  }
	  }
	});
	function rander(){
	    ctx.clearRect(0,0,canvas.width,canvas.height);
   		ctx.fillStyle = "rgba(0,5,24,0.85)";
   		ctx.fillRect(0,0,canvas.width,canvas.height);
   		for(var i=0;i<bubbles.length;i++){
      ctx.beginPath();
      var grad=ctx.createRadialGradient(bubbles[i].x,bubbles[i].y,bubbles[i].size,bubbles[i].x,bubbles[i].y,0);
         grad.addColorStop(0,"rgba(255,255,255,0.4)");
         grad.addColorStop(0.2,"rgba(255,255,255,0.04)");
         grad.addColorStop(1,"rgba(255,255,255,0.04)");
   	    	ctx.fillStyle=grad;
       		ctx.arc(bubbles[i].x,bubbles[i].y,bubbles[i].size,0,2*Math.PI);
       		ctx.fill();
       		ctx.closePath();
	   }	   
	   for(var i=0;i<smallBubbles.length;i++){
	        for(var j=0;j<smallBubbles[i].length;j++){
	        var x=smallBubbles[i][j].x+Math.cos(smallBubbles[i][j].angle)*smallBubbles[i][j].r;
	        var y=smallBubbles[i][j].y+Math.sin(smallBubbles[i][j].angle)*smallBubbles[i][j].r;
	        ctx.beginPath();
	        ctx.fillStyle=smallBubbles[i][j].color;
       		ctx.arc(x,y,smallBubbles[i][j].size,0,2*Math.PI);
       		ctx.fill();
       		ctx.closePath();
	        }
	   }
	   
	}
	//碰撞检测
function checkBoom(){
   for(var i=0;i<bubbles.length;i++){
	      for(var j=0;j<bubbles.length;j++){
	         if(i!=j){
	         //防止相同球的比较
	            if(getDistance(bubbles[i].x,bubbles[i].y,bubbles[j].x,bubbles[j].y)<=bubbles[i].r+bubbles[j].r){
	            //发生碰撞
	              var toDistance=bubbles[i].r+bubbles[j].r-getDistance(bubbles[i].x,bubbles[i].y,bubbles[j].x,bubbles[j].y);
	              var range=Math.atan((bubbles[i].y-bubbles[j].y)/(bubbles[i].x-bubbles[j].x));
	              var dx=toDistance*Math.cos(range)/2;
	              var dy=toDistance*Math.sin(range)/2;
	               if(bubbles[i].y<=bubbles[j].y){
	                  if(bubbles[i].x<=bubbles[j].x){
	                  //左上右下
	                 bubbles[i].x-=dx*0.1;
	                 bubbles[j].x+=dx*0.1;
	                 bubbles[i].y-=dy*0.1;
	                 bubbles[j].y+=dy*0.1;
	                  }else{
	                  //右上左下
	                 bubbles[i].x+=dx*0.1;
	                 bubbles[j].x-=dx*0.1;
	                 bubbles[i].y+=dy*0.1;
	                 bubbles[j].y-=dy*0.1;
	                  }
	               }	               
	            }
 	        }
	      }
	       //x
	     if(bubbles[i].x>=canvas.width-bubbles[i].r){
	        var dx=bubbles[i].r-canvas.width+bubbles[i].x;
	        bubbles[i].x-=dx*0.1;
	      }
	     if(bubbles[i].x<=bubbles[i].r){
	        var dx=bubbles[i].r-bubbles[i].x;
	        bubbles[i].x+=dx*0.1;
	      }
	     if(bubbles[i].y>=canvas.height-bubbles[i].r){
	        var dy=bubbles[i].r-canvas.height+bubbles[i].y;
	        bubbles[i].y-=dy*0.1;
	      }
	     if(bubbles[i].y<=bubbles[i].r){
	        var dy=bubbles[i].r-bubbles[i].y;
	        bubbles[i].y+=dy*0.1;
	      }
	   }
}
window.onload = function(){
   		ctx.fillStyle = "rgba(0,5,24,0.8)";
   		ctx.fillRect(0,0,canvas.width,canvas.height);
   		var isfirst = window.localStorage.getItem("cpp");
   		if(isfirst === "false"){
   		 musicPlayer();
   	   	 initAnimate();	
   		}else{
   	      textplayer();
   	      window.localStorage.setItem("cpp",false);
   		}
}
		function initAnimate(){
			lastTime = new Date();
			animate();
		}
		var lastTime;
		function animate(){
			var newTime = new Date();
			        if(bubbles.length>10){
            cut=true;
           }else{
            cut=false;
           }
           if(newTime-lastTime>random(100+bubbles.length*60,200+bubbles.length*60)&&!cut){
              var abubble = {
              x:~~getLoc().x,
              y:~~getLoc().y,
              r:~~random(120,170),
              vx:+random(-0.1,0.1),
              vy:+random(-0.1,0.1),
              size:0,
              }
               bubbles.push(abubble);
			           	lastTime = newTime;
        		}
		        updata();
		        rander();		        
       			raf(animate);			
							}
var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60); };
function getLoc(){
 var x=random(100,canvas.width*4/5);
 var y=random(200,canvas.height*4/5);
 return{
    x:x,y:y
 }
}

function musicPlayer(){
var audio= new Audio("mp3/a.mp3");
var button = document.getElementById("musicButton");
button.style.display="block";
  var isplaying=true;
  var angle=0;
  // _play();
   button.onclick=function(){
      if(!audio.paused){
      isplaying=false;
      _pause();
      }else{
      isplaying=true;
      _play();
      }
   }
   function _play(){
      button.className="play";
      function rotate(){
        button.style.transform=`rotate(${angle}deg)`;
        angle+=1;
        if(isplaying){
           setTimeout(function(){
              rotate();
           },50)
        }
      }
      rotate();
      //alert(audio.vol)
      audio.play();
   }
   function _pause(){
      audio.pause();
      button.className="pause";
   }
}
function textplayer(){
var shade=document.getElementById("shade");
shade.style.display="block";
var p=document.getElementById("p");
var close=document.getElementById("close");
var str="无论发生了什么，阴霾一定会烟消云散，明天又是阳光明媚的一天。愿你每天都可以开心，快乐。";
var text="";
var show=true;
length=0;
 _ainimate();
   function _ainimate(){
      if(show){
        text=text+"_";
      }else{
        length+=1;
        text=str.slice(0,length);
      }
      _showText();
      show=!show;
      if(text.length<=str.length){
         setTimeout(function(){
             _ainimate();
         },200)
      }else{
         _end();
      }
   }
   function _end(){
   close.style.display="block";
      curser();
      var closed=false;
      function curser(){
         if(show){
           text=text+"_";
         }else{
           text=text.slice(0,text.length-1);
         }
         _showText();
         show=!show;         
         if(!closed){
            setTimeout(function(){
              curser()
            },400);
         }
      }
      
      close.onclick=function(){
         shade.style.display="none"
         closed=true;
   		 musicPlayer();
   	   	 initAnimate();	
      }
      return;
   }
   function _showText(){
      p.innerHTML=text;
   }
   return;
}