(function(window) {
    function Canvas(canvasId, width, height) {
        this.canvasId = canvasId;
        this.el = document.getElementById(canvasId);
        this.context = this.el.getContext("2d");
        this.width = width || window.innerWidth;
        this.height = height || window.innerHeight;
        this._init();
    };
    Canvas.prototype = {
        constructro: Canvas,
        _init: function() {
            this.el.width = this.width;
            this.el.height = this.height;
        },
        clear: function(fromX, fromY, toX, toY) {
            fromY = fromY || 0;
            fromX = fromX || 0;
            toX = toX || this.width;
            toY = toY || this.height;
            this.context.clearRect(fromX, fromY, toX, toY);
        },
        drawText: function(text, x, y) {
            this.clear(0, 0);
            this.context.font = "26px Arial";
            this.context.textAlign = "center";
            this.context.fillStyle = "#000";
            this.context.fillText(text, x === undefined ? (this.width / 2) : x, y === undefined ? 45 : y);
        }
    };
    window.Canvas = Canvas;
})(window);