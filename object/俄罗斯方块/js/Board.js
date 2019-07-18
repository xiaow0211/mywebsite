(function(window) {
    function Board(gameInst) {
        this.gameInst = gameInst;
        this.blockSize = 30;
        this.rows = TetrisConfig.rows;
        this.cols = TetrisConfig.cols;
        this.canvas = new Canvas("c_game", this.blockSize * this.cols, this.blockSize * this.rows);
        this.context = this.canvas.context;
        this.boardList = [];
        this.shape = new window.Shape();
        this._init();
    };
    Board.prototype = {
        constructor: Board,
        _init: function() {
            this._buildGridData();
            this._initGrid();
            this.shape.draw(this.context);
            var self = this;
            setTimeout(function(){
                self._bulidNextShape();
            });
        },
        _bulidNextShape: function() {
            this.nextShape = new window.Shape();
            this.nextShape.setPosition(this.gameInst.nextshape.cols, this.gameInst.nextshape.rows);
            this.gameInst.nextshape.render(this.nextShape);
        },
        _buildGridData: function() {
            for (var i = 0; i < this.rows; i++) {
                this.boardList[i] = [];
                for (var j = 0; j < this.cols; j++) {
                    this.boardList[i][j] = 0;
                }
            }
        },
        _initGrid: function() {
            this.context.strokeStyle = 'green';
            this.context.lineWidth = 0.5;
            for (var i = 0; i <= this.rows; i++) {
                this.context.moveTo(0, i * this.blockSize);
                this.context.lineTo(this.canvas.width, i * this.blockSize);
            }
            for (var i = 0; i <= this.cols; i++) {
                this.context.moveTo(i * this.blockSize, 0);
                this.context.lineTo(i * this.blockSize, this.canvas.height);
            }
            this.context.stroke();
            this.gridData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
        },
        tick: function() {
            if (this.vaildMove(0, 1)) {
                this.shape.y += 1;
            } else {
                this.addShapeToBoardList();
                if (this.gameInst._state === "over") {
                    this.gameInst.endGame();
                    return;
                }
                this.clearFullRows();
                this.shape = this.nextShape;
                this.shape.setPosition(this.cols, this.rows, true);
                this._bulidNextShape();
            }
            this.refresh();
            this.shape.draw(this.context);
        },
        refresh: function() {
            this.canvas.clear();
            this.context.putImageData(this.gridData, 0, 0);
            this.drawBlocks();
        },
        vaildMove: function(moveX, moveY) {
            var nextX = this.shape.x + moveX;
            var nextY = this.shape.y + moveY;
            for (var y = 0; y < this.shape.layout.length; y++) {
                for (var x = 0; x < this.shape.layout[y].length; x++) {
                    if (this.shape.layout[y][x]) {
                        if (typeof this.boardList[nextY + y] === 'undefined' ||
                            typeof this.boardList[nextY + y][nextX + x] === 'undefined' ||
                            this.boardList[nextY + y][nextX + x] ||
                            nextX + x < 0 ||
                            nextX + x >= this.cols ||
                            nextY + y >= this.rows
                        ) {
                            return false;
                        }
                    }
                }
            }
            return true;
        },
        addShapeToBoardList: function() {
            for (var y = 0; y < this.shape.layout.length; y++) {
                for (var x = 0; x < this.shape.layout[y].length; x++) {
                    if (this.shape.layout[y][x]) {
                        var boardX = this.shape.x + x;
                        var boardY = this.shape.y + y;
                        if (this.boardList[boardY][boardX]) {
                            this.gameInst._state = 'over';
                            return;
                        } else {
                            this.boardList[boardY][boardX] = this.shape.blockType;
                        }
                    }
                }
            }
        },
        drawBlocks: function() {
            for (var y = 0; y < this.rows; y++) {
                for (var x = 0; x < this.cols; x++) {
                    if (this.boardList[y][x]) {
                        this.shape.block.draw(this.context, x, y, this.boardList[y][x]);
                    }
                }
            }
        },
        createEmptyRows() {
            var emptyArr = [];
            for (var i = 0; i < this.cols; i++) {
                emptyArr.push(0);
            }
            return emptyArr;
        },
        clearFullRows: function() {
            var lines = 0;
            var self = this;
            for (var y = this.rows - 1; y >= 0; y--) {
                var filled = this.boardList[y].filter(function(item) { return item > 0; }).length === this.cols;
                if (filled && y) {
                    this.boardList.splice(y, 1);
                    this.boardList.unshift(this.createEmptyRows());
                    y++;
                    lines++;
                }
            }
            var score = lines * 100 * lines;
            var totalScore = this.gameInst.score.addScore(score);
            var currentLevel = this.gameInst.level.checkLevel(totalScore);
            this.gameInst.highscore.checkScore(totalScore);
            if (currentLevel) {
                window.TetrisConfig.speed = Math.floor(window.TetrisConfig.constSpeed * (1 - (currentLevel - 1) / 10));
                this.gameInst.pause();
                setTimeout(function() {
                    window.alert('恭喜您,游戏升级,游戏加速!');
                    self.gameInst.resume();
                });
            }
        },
    };
    window.Board = Board;
})(window);