/*首页轮播图及切换*/
(function() {
    var src = ["#&a=1", "#&a=2", "#&a=3", "#&a=4", "#&a=5", "#&a=6", "#&a=7", "#&a=8"];
    //todo
    var canvas = document.getElementById('canvas');
    canvas.width = 1200;
    canvas.height = 500;
    var ctx = canvas.getContext('2d');
    var index = 1;
    var gridSize = 100;
    var W = 15;
    var H = 6;
    var isRuning = false;
    var boxSite = [];
    var right = document.getElementById('left');
    var left = document.getElementById('right');
    left.addEventListener('click', function(e) {
        BACK();
    })
    right.addEventListener('click', function(e) {
        NEXT();
    })

    function init() {
        drawPic(index);
    }
    init();

    function drawPic(index) {
        var image = new Image();
        image.src = `image/b${index}.jpg`;
        image.onload = function() {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        }
    }

    var timerA = window.setInterval(function() {
        NEXT()
    }, 5000)
    canvas.addEventListener("mouseover", function() {
        window.clearInterval(timerA)
    })
    canvas.addEventListener('mouseout', function() {
        timerA = window.setInterval(function() {
            NEXT();
        }, 5000)
    })
    canvas.onclick = function() {
        window.location.href = src[index - 1];
    }

    function BACK() {
        if (!isRuning) {
            if (index == 1) {
                next = 8
            } else {
                next = index - 1;
            }

            switchPic(index, next);
            index = next;
        }

    }

    function NEXT() {
        if (!isRuning) {
            if (index == 8) {
                next = 1
            } else {
                next = index + 1;
            }
            switchPic(index, next);
            index = next;
        }
    }

    function switchPic(now, next) {
        var step = 0;
        var nextImage = new Image();
        nextImage.src = `image/b${next}.jpg`;
        nextImage.onload = function() {
            animate(step);
        }

        function animate(step) {
            isRuning = true;
            setTimeout(function() {
                if (step <= W + H - 1) {
                    boxSite = [];
                    getSite(step);
                    step += 1;
                    animate(step);
                } else {
                    isRuning = false;
                }
            }, 20)
            if (boxSite.length > 0) {
                for (var i = 0; i < boxSite.length; i++) {
                    _drawStep(boxSite[i].x, boxSite[i].y);
                }
            }

        }

        function getSite(step) {
            if (step <= Math.min(W, H) - 2) {
                for (var i = 0; i <= step; i++) {
                    var box = {
                        x: step - i,
                        y: i
                    }
                    boxSite.push(box);
                }
            } else if (step <= Math.max(W, H) - 1) {
                for (var i = 0; i < Math.min(W, H) - 1; i++) {
                    var box = {
                        x: step - i,
                        y: i
                    }
                    boxSite.push(box);
                }
            } else {
                for (var i = 0; i <= W + H - 2 - step; i++) {
                    var box = {
                        x: step - i,
                        y: i
                    }
                    boxSite.push(box);
                }
            }
        }

        function _drawStep(i, j) {
            ctx.drawImage(nextImage, i * gridSize, j * gridSize, gridSize, gridSize, i * gridSize, j * gridSize, gridSize, gridSize);
        }
    }
})();