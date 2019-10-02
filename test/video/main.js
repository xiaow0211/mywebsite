var video = document.getElementById('video');
var audio = document.getElementById('audio');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.height = screen.availHeight;
canvas.width = screen.availWidth;
var i = 0;
video.addEventListener('canplay', function() {
    window.onclick = function() {
        video.play();
        play();

    }
}, false)

function play() {
    
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        raf(play)
    
}
video.onended = function() {
    video.play();
    video.currentTime = 21;
    if (i == 0) {
        audio.volume = 0.2;
        audio.play();
    }
    i += 1;
}

var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60); };