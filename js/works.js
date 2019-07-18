
var ul = document.getElementById('ul');
WORKS.forEach(function(e,i){
	var li = document.createElement('li');
	var aWorkbox = document.createElement('div');
	aWorkbox.id = "work";
	aWorkbox.innerHTML = `<div class="pic normal" style="background: url(../${e.bgSrc}) no-repeat; background-size: cover;"></div>
            <div class="pic midPic" style="background: url(../${e.bgSrc}) no-repeat; background-size: cover;"></div>
            <div class="pic smallPic" style="background: url(../${e.bgSrc}) no-repeat; background-size: cover;"></div>
            <div class="tip">${e.title}</div>`;
       li.appendChild(aWorkbox); 
       ul.appendChild(li);
       li.onclick = function(){
       		window.location.href=`../${e.link}`;
       }
})


