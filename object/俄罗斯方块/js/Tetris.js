(function(window) {
    function Tetris() {
        this.board = new Board(this);
        this.score = new Score();
        this.timer = new Timer();
        this.level = new Level();
        this.nextshape = new Nextshape();
        this.highscore = new HighScore();

        this._sound;
        this._state = 'playing';
        (new Keyboard(this.board)).init(this.board);
    };
    Tetris.prototype = {
        constructor: Tetris,
        startGame: function() {
            this._initAudio();
            this._startTick();
        },
        _playSound() {
            if (TetrisConfig.config.enableSound) {
                this._sound.play();
            }
        },
        _startTick() {
            var self = this;
            window.TetrisConfig.intervalId = window.setInterval(function() {
                self.board.tick();
            }, TetrisConfig.speed);
        },
        _stopTick: function() {
            window.clearInterval(window.TetrisConfig.intervalId);
        },
        _initAudio: function() {
            this._sound = new Howl({
                src: ['audio/bg.wav'],
                loop: true,
                volume: 0.005
            });
            this._playSound();
        },
        endGame() {
            this._sound.stop();
            this._stopTick();
            this.timer.stop();
        },
        pause() {
            if (this._state === "over") {
                return;
            };
            this._sound.pause();
            this._state = "pause";
            this._stopTick();
            this.timer.pause();
        },
        resume() {
            if (this._state === "over") {
                return;
            };
            this._playSound();
            this._state = "playing";
            this._startTick();
            this.timer.resume();
        },
    };
    window.tetris = Tetris;
})(window);