var v = document.getElementById("video");
 var c = document.getElementById("canvas");     
    c.width=400;
    c.height=280;
ctx = c.getContext('2d');   

window.onclick = function(){
	v.play()
}
v.addEventListener('play', function() { 
   v.volume=0;
   var i = window.setInterval(function() {
      ctx.drawImage(v, 0, 0, c.width, c.height);
      if(v.ended){
         clearInterval(i);
      } 
    }, 20); 
 }, false);
 