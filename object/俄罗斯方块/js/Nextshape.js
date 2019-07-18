(function(window) {
    function Nextshape() {
        this.canvas = new Canvas('nextshape', 150, 150);
        this._init();
    };
    Nextshape.prototype = {
        constructor: Nextshape,
        _init: function() {
            this.cols = 6;
            this.rows = 4;
        },
        render: function(shape) {
            this.canvas.clear();
           shape.draw(this.canvas.context,25);
        },
    };
    window.Nextshape = Nextshape;
})(window);
