
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
        if (document.documentElement.scrollTop >= window.screen.availHeight) {
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