(function(window) {
    function HighScore() {
        this.canvas = new Canvas('Highscore', 150, 50);
        this.Highscore = 0;
        this._init();
    };
    HighScore.prototype = {
        constructor: HighScore,
        _init: function() {
            this.Highscore = this._getScore();
            this._render();
        },
        _render: function() {
            this.canvas.drawText(this.Highscore, 75, 30);
        },
        _getScore: function() {
            return window.localStorage.getItem('high-score') || 0;
        },
        _setScore: function(value) {
            window.localStorage.setItem('high-score', value);
        },
        checkScore: function(score) {
            console.log(score)
            if (score > this.Highscore) {
                this.Highscore = score;
                this._setScore(score);
                this._render();
            }
        },
    }
    window.HighScore = HighScore;
})(window);