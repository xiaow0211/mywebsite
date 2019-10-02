var video = document.getElementById('video');
var audio = document.getElementById('audio');
video.onclick = function(){
	video.play()
}
video.onended = function(){
	video.currentTime = 22;
	video.play()
	audio.volume = 0.2;
	audio.play()
}