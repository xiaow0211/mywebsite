/*

 */
 if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ) { 
    var welcomBox = document.getElementById('welcom');
    welcomBox.style.width  = "200px";
    welcomBox.style.fontSize = "14px";
    welcomBox.style.letterSpacing = "1px";

  
 }
/*时间显示*/
(function() {
    var timer = document.getElementById('timer');
    if(!timer){
        return;
    }
    var today, week, YYYY, MM, DD, hh, mm, ww;

    function getTime() {
        today = new Date();
        week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        YYYY = today.getFullYear();
        MM = Format(today.getMonth() + 1);
        DD = Format(today.getDate());

        hh = Format(today.getHours());
        mm = Format(today.getMinutes());
        ww = today.getDay();
    }
    getTime();
    timer.innerHTML = `${YYYY}/${MM}/${DD}  ${hh}:${mm} ${week[ww]}`;
    window.setInterval(function() {
        var lastM = mm;
        var nowM = Format(new Date().getMinutes());
        if (nowM != lastM) {
            timer.innerHTML = `${YYYY}/${MM}/${DD}  ${hh}:${nowM} ${week[ww]}`;
            getTime();
            lastM = mm;
        }
    }, 1000);

    function Format(str) {
        if (str < 10) {
            return "0" + str;
        } else {
            return str;
        }
    }
})();
/*回到顶部*/
(function() {
    var totop = document.getElementById('totop');
    if(!totop){
        return;
    }
    document.onscroll = function() {
        if (document.documentElement.scrollTop >= window.screen.availHeight/2) {
            totop.style.display = "block";
        } else {
            totop.style.display = "none";
        }
        
    }
    totop.onclick = function() {
        var timer = null;
        cancelAnimationFrame(timer);
        timer = requestAnimationFrame(function fn() {
            var oTop = document.body.scrollTop || document.documentElement.scrollTop;
            if (oTop > 0) {
                document.body.scrollTop = document.documentElement.scrollTop = oTop - 50;
                timer = requestAnimationFrame(fn);
            } else {
                cancelAnimationFrame(timer);
            }
        })
    }
})()