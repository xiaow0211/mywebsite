var envelope = document.getElementById("envelope");
var container = document.getElementById("container");
var front = document.getElementById("front");
var seal = document.getElementById("seal");
var waxBack = document.getElementById("waxBack");
var waxFront = document.getElementById("waxFront");
var stA = document.getElementById('stA');
var stB = document.getElementById('stB');
var paper = document.getElementById('paper');
var back = document.getElementById('back');
envelope.onclick = function () {
    container.classList.add('containerOpen');
    setTimeout(function () {
        waxBack.style.zIndex = "-1";
        waxFront.style.zIndex = "-2";
        seal.style.zIndex = "0";
    }, 300);
}

paper.onclick = function () {
    st.style.zIndex = "8";
    // paper.style.transform = 'translateY(-' + 520 + 'px)';
    envelope.style.transform = 'translateY(' + 550 + 'px)';
    setTimeout(function () {
        front.classList.add('bag');
        container.classList.add('bag');
        back.classList.add('bag');
        paper.classList.add('bigPaper');
    }, 600);
}