(function(window) {
    function Score() {
        this.canvas = new Canvas('score', 150, 50);
        this.score = 0;
        this._init();
    };
    Score.prototype = {
        constructor: Score,
        _init: function() {
            this._render();
        },
        _render: function() {
            this.canvas.drawText(this.score, 75, 30);
        },
        addScore: function(value) {
            this.score += value;
            this._render();
            return this.score;
        }
    }
    window.Score = Score;
})(window);