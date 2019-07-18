(function(document) {
    var gameInst;
    function DOM(dom) {
        this.dom = dom;
    }
    DOM.prototype.get = function() {
        return this.dom;
    };
    DOM.prototype.on = function(eventName, eventHandler) {
        this.get().addEventListener(eventName, eventHandler);
    };
    DOM.prototype.css = function(styleKey, styleValue) {
        this.get().style[styleKey] = styleValue;
    };
    function $(selector, context) {
        return new DOM((context || document).querySelector(selector));
    }

    function startGame() {
        Resource.onResourceLoaded = function() {
            gameInst = new tetris();
            gameInst.startGame();
        }
        Resource.init();
    }

    function _init() {
        $('#btn-start').on('click', function(e) {
            $('#game-start').css('display', 'none');
            $('#game-containar').css('display', 'block');
            startGame();
        });
        $('#btn-setting').on('click', function(e) {
            $('.modal-dialog').css('display', 'block');
        });
        $('#btn-dialog-close').on('click', function(){
            $('.modal-dialog').css('display', 'none');
            gameInst && gameInst.resume();
        });
        $('#ck-sound').on('change', function(){
            var enable = $('#ck-sound').get().checked;
            window.TetrisConfig.config.enableSound = enable;
        });
        $('#button-pause').on('click', function (e){
            var el = e.target;
            if(el.innerText === "暂停"){
                el.innerText = "继续";
                gameInst.pause();
            }else{
                el.innerText = "暂停";
                gameInst.resume();
            };
        });
        $('#button-setting').on('click', function (e){
            $('.modal-dialog').css('display', 'block');
            gameInst.pause();
        });
    }
    document.addEventListener('DOMContentLoaded', function(e) {
        _init();
    })
})(document);