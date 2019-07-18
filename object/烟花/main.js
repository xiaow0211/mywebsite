var WIDTH=document.body.clientWidth;
var HEIGHT=document.body.clientHeight;
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var p=document.getElementById("p")
canvas.width=WIDTH;
canvas.height=HEIGHT;
var bullets=[];
var bullet=function(x,r,color,boomArea){
   this.fires=[];
   this.x=x;
   this.y=(HEIGHT+r);
   this.color=color;
   this.r=r;
   this.dead=false;
   this.boomArea=boomArea;
   this.ba=parseInt(random(80, 200));
}
bullet.prototype={
_move:function(){
var dx=this.boomArea.x-this.x;
var dy=this.boomArea.y-this.y;
this.x=this.x+dx*0.01;
this.y=this.y+dy*0.01;

if(Math.abs(dx)<=this.ba && Math.abs(dy)<=this.ba){
     this._boom();
     this.dead=true;
				}else {
					this._render();
				}
},
_render:function(){
ctx.save();
ctx.beginPath();
ctx.fillStyle=this.color;
ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
ctx.fill();
ctx.closePath();
ctx.restore();
},
_drawLight:function(){
    ctx.save();
				ctx.fillStyle = "rgba(255,228,150,0.3)";
				ctx.beginPath();
				ctx.arc(this.x , this.y , this.r+3*Math.random()+1 , 0 , 2*Math.PI);
				ctx.fill();
				ctx.restore();
},
_boom:function(){

  var fireNum=parseInt(random(150,200));
  var color;
  color={
    r:parseInt(random(128,255)),
    g:parseInt(random(128,255)),
    b:parseInt(random(128,255)),
  };
  var boomSize=parseInt(random(300,400));
  for(var i=0;i<=fireNum;i++){
     var a = random(-Math.PI, Math.PI);
					var x = random(0,  boomSize) * Math.cos(a) + this.x;
					var y = random(0,  boomSize) * Math.sin(a) + this.y; 
					var radius = random(0 , 2);
					var frag = new Frag(this.x , this.y , radius , color , x , y );
					this.fires.push(frag);
				}
  
},

}
/**/
		window.onload = function(){
			initAnimate();
		}
		function initAnimate(){
			lastTime = new Date();
			animate();
		}
		var lastTime;
		function animate(){
				ctx.save();
			ctx.fillStyle = "rgba(0,5,24,0.1)";
			ctx.fillRect(0,0,canvas.width,canvas.height);
			ctx.restore();
			var newTime = new Date();
           if(newTime-lastTime>500){
              var x=random(WIDTH/5,WIDTH*4/5);
              var y=random(50,200);
              var abullet = new bullet(random(WIDTH/2-100,WIDTH/2+100),2,"#fff",{x:x,y:y});
              bullets.push(abullet);
			           	lastTime = newTime;
        		}
  
			bullets.foreach(function(index){
				var that = this;
				if(!this.dead){
					this._move();
					this._drawLight();
				}
				else{
					this.fires.foreach(function(index){
						if(!this.dead) {
							this.moveTo(index);
						}
						else if(index === that.fires.length-1){
							bullets[fires.indexOf(that)] = null;
						}
					})
				}
			})
			raf(animate);
		}
		
		Array.prototype.foreach = function(callback){
			for(var i=0;i<this.length;i++){
				if(this[i]!==null) callback.apply(this[i] , [i])
			}
		}
		/**/
		var focallength = 250;
		var Frag = function(centerX , centerY , radius , color ,tx , ty){	
			this.tx = tx;
			this.ty = ty;
			this.x = centerX;
			this.y = centerY;
			this.dead = false;
			this.centerX = centerX;
			this.centerY = centerY;
			this.radius = radius;
			this.color = color;
		}
		Frag.prototype = {
			paint:function(){
				ctx.save();
				ctx.beginPath();
				ctx.arc(this.x , this.y , this.radius , 0 , 2*Math.PI);
				ctx.fillStyle = "rgba("+this.color.r+","+this.color.g+","+this.color.b+",1)";
				ctx.fill()
				ctx.restore();
			},
			moveTo:function(index){
				this.ty = this.ty+0.3;
				var dx = this.tx - this.x , dy = this.ty - this.y;
				this.x = Math.abs(dx)<0.1 ? this.tx : (this.x+dx*0.1);
				this.y = Math.abs(dy)<0.1 ? this.ty : (this.y+dy*0.1);
				if(dx===0 && Math.abs(dy)<=80){
					this.dead = true;
				}
				this.paint();
			}
		}

		/**/
		var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60); };
/**/
function random(min,max){
return min+Math.random()*(max-min);
}