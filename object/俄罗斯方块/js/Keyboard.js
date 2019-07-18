(function(window) {
    var keys = {
        37: "left",
        38: "top",
        39: "right",
        40: "down",
    }

    function Keyboard(board) {
        this.board;
    }
    Keyboard.prototype = {
        coustructor: Keyboard,
        init: function(board) {
            var self = this;
            self.board = board;
            window.addEventListener('keydown', function(e) {
                e.preventDefault();
                self.processKeyDown(e);
            });
        },
        processKeyDown: function(e) {
            if (this.board.gameInst._state != 'playing') {
                return;
            }
            if (keys[e.keyCode]) {
                this.process(keys[e.keyCode]);
            }
        },
        process: function(key) {
            var refresh = false;
            switch (key) {
                case 'top':
                    if (this.board.vaildMove(0, 0)) {
                        this.board.shape.rotato();
                        refresh = true;
                    }
                    break;
                case 'right':
                    if (this.board.vaildMove(1, 0)) {
                        this.board.shape.x += 1;
                        refresh = true;
                    }
                    break;
                case 'down':
                    if (this.board.vaildMove(0, 1)) {
                        this.board.shape.y += 1;
                        refresh = true;
                    }
                    break;
                case 'left':
                    if (this.board.vaildMove(-1, 0)) {
                        this.board.shape.x -= 1;
                        refresh = true;
                    }
                    break;
            }
            if (refresh) {
                this.board.refresh();
                this.board.shape.draw(this.board.context);
                if (key === 'down') {
                    var self = this;
                    window.clearInterval(window.TetrisConfig.intervalId);
                    window.TetrisConfig.intervalId = window.setInterval(function() {
                        self.board.tick();
                    }, TetrisConfig.speed);
                }
            };
        }
    }
    window.Keyboard = Keyboard;
})(window);