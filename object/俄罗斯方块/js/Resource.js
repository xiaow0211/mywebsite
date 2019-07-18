(function(window) {
    var cacheMap = new Map();
    var resourceTotalCount = 1;
    var currentLoaded = 0;
    var isAddLoaded = function() {
        currentLoaded += 1;
        if (currentLoaded === resourceTotalCount && typeof window.Resource.onResourceLoaded === 'function') {
            window.Resource.onResourceLoaded();
        }
    }
    var init = function() {
        var image = new Image();
        image.src = "image/block.png";
        image.onload = function() {
            cacheMap.set('blocks', image);
            isAddLoaded();
        };
    };
    var getResource = function(key) {
        return cacheMap.get(key);
    };
    window.Resource = {
        getResource: getResource,
        init: init,
        onResourceLoaded: null,
    };
})(window);