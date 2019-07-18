(function(window) {
    function Block(blockType) {
        this.blockType = blockType;
        this.size = 30;
        this.originalSize = 32;
        this.sprite = window.Resource.getResource('blocks');
    }
    Block.prototype = {
        constructor: Block,
        draw: function(context, x, y, blockType, size) {
            var size = size || this.size;
            context.drawImage(this.sprite, ((blockType || this.blockType) - 1) * this.originalSize, 0, this.originalSize, this.originalSize, x * size, y * size, size, size);
        }
    };
    window.Block = Block;
})(window);