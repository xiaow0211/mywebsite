//@game 游戏参数
var game = {
    level:1,          /*当前关卡数*/
    maxLevel:10,      /*最大关卡数，防止超出界限而报错*/
    gridSize:35,      /*格子大小，不支持修改*/
    startX:0,         /*绘制地图的起始点*/
    startY:0,
}
var Dmap;            //脏数据
var aMap;            //原始数据
var WIDTH = 960,     //canvas尺寸
    HEIGHT = 720;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
//引入图片
var mapImg = new Image();
    mapImg.src = "all.png";

mapImg.onload = function(){
    init();
}
/*
*初始化
*/
function init(){
    aMap = eval('map'+game.level);  /*用作对比添加目标，更新数据 */
    Dmap = deepcopy(aMap);          /*用作绘制，修改*/
    isGameEnd();                    /*主要用来重写关卡数*/
    draw();
    var oTips = document.getElementById('tips');
        oTips.style.display = "none";
}
/*
*遍历相应地图数组
*/
function draw(){
    check();
	ctx.clearRect(0,0,WIDTH,HEIGHT);
    game.startX = calDrawStart()[0];
    game.startY = calDrawStart()[1];
    for(var i = 0; i < Dmap.length; i ++){
    	for(var j = 0; j < Dmap[i].length; j ++){
    		if(Dmap[i][j] != 0){
                ctx.drawImage(mapImg,(Dmap[i][j]-1)*game.gridSize,0,game.gridSize,game.gridSize,j*game.gridSize+game.startX,i*game.gridSize+game.startY,game.gridSize,game.gridSize);
    		}
    	}
    }
}
/*
*移动
*符合人物移动则把当前位置修改为空，前方修改为角色，并判断是否符合箱子移动条件
*   #符合则将角色前两个格子替换为箱子
*/
function playerGoUp(){
    for (var i = 0; i < Dmap.length; i ++){
        for (var j = 0; j < Dmap[i].length; j ++){
            if(Dmap[i][j] == 4){
                if(canPlayerUp(i,j)){        
                    if(Dmap[i-1][j] == 2)     /*前方有盒子*/
                        {
                            boxUp(i,j);
                        }
                        Dmap[i][j] = 0;
                        Dmap[i-1][j] = 4;
                        draw();
                        return;
                }
            }
        }
    } 
    function boxUp(i,j){
        if(true){
           Dmap[i-2][j] = 2;
        }
    }
}
// down
function playerGoDown(){
    for (var i = 0; i < Dmap.length; i ++){
        for (var j = 0; j < Dmap[i].length; j ++){
            if(Dmap[i][j] == 4){
                if(canPlayerDown(i,j)){        
                    if(Dmap[i+1][j] == 2)     /*前方有盒子*/
                        {
                            boxDown(i,j);
                        }
                        Dmap[i][j] = 0;
                        Dmap[i+1][j] = 4;
                        draw();
                        return;
                }
            }
        }
    } 
    function boxDown(i,j){
        if(true){
           Dmap[i+2][j] = 2;
        }
    }
}
// left
function playerGoLeft(){
    for (var i = 0; i < Dmap.length; i ++){
        for (var j = 0; j < Dmap[i].length; j ++){
            if(Dmap[i][j] == 4){
                if(canPlayerLeft(i,j)){        
                    if(Dmap[i][j-1] == 2)     /*前方有盒子*/
                        {
                            boxLeft(i,j);
                        }
                        Dmap[i][j] = 0;
                        Dmap[i][j-1] = 4;
                        draw();
                        return;
                }
            }
        }
    } 
    function boxLeft(i,j){
        if(true){
           Dmap[i][j-2] = 2;
        }
    }
}
// right
function playerGoRight(){
    for (var i = 0; i < Dmap.length; i ++){
        for (var j = 0; j < Dmap[i].length; j ++){
            if(Dmap[i][j] == 4){
                if(canPlayerRight(i,j)){        
                    if(Dmap[i][j+1] == 2)     /*前方有盒子*/
                        {
                            boxRight(i,j);
                        }
                        Dmap[i][j] = 0;
                        Dmap[i][j+1] = 4;
                        draw();
                        return;
                }
            }
        }
    } 
    function boxRight(i,j){
        if(true){
           Dmap[i][j+2] = 2;
        }
    }
}
// 事件绑定
document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(isGameEnd()){
        e.preventDefault();
        return;
    }
    if(e && e.keyCode==38){ // up 
        e.preventDefault();
        playerGoUp();
    }
    if(e && e.keyCode==40){ // down 
        e.preventDefault();
        playerGoDown();
    } 
    if(e && e.keyCode==37){ // left
        e.preventDefault();
        playerGoLeft();
    }
    if(e && e.keyCode==39){ // right
        e.preventDefault();
        playerGoRight();
    }
}; 
/*
*判断目标是否被覆盖
*如果未被覆盖，但已被修改，则还原为目标
*/
function check(){
    for(var  i = 0; i < aMap.length; i ++){
        for(var j = 0; j < aMap[i].length; j ++){
            if(aMap[i][j] == 3){
               if(Dmap[i][j] == 0){
                   Dmap[i][j] = 3;
               } 
            }
        }
    }
}
/*
*计算地图绘制起始位置
*@return 绘制地图的X,Y坐标 
*/
function calDrawStart(){
	var mapSizeX = Dmap[0].length*game.gridSize;
	var mapSizeY = Dmap.length*game.gridSize;
	var startX = WIDTH / 2 - mapSizeX / 2;
	var startY = HEIGHT / 2 - mapSizeY / 2;
    return new Array(startX,startY);
}
/*
*二维数组深拷贝
*/
function deepcopy(obj) {
            var out = [],i = 0,len = obj.length;
            for (; i < len; i++) {
                if (obj[i] instanceof Array){
                    out[i] = deepcopy(obj[i]);
                }
                else out[i] = obj[i];
            }
            return out;
        }
/*
*角色是否可以移动
*角色前方为空||角色前为目标||[角色前方为箱子&&(箱子前方为目标||箱子前方为空)]
*/
function canPlayerUp(i,j){
    if(Dmap[i-1][j] == 0||Dmap[i-1][j] == 3||(Dmap[i-1][j] == 2&&(Dmap[i-2][j] == 3||Dmap[i-2][j] == 0))){
        return true;
    }
}
function canPlayerDown(i,j){
    if(Dmap[i+1][j] == 0||Dmap[i+1][j] == 3||(Dmap[i+1][j] == 2&&(Dmap[i+2][j] == 3||Dmap[i+2][j] == 0))){
        return true;
    }
}
function canPlayerLeft(i,j){
    if(Dmap[i][j-1] == 0||Dmap[i][j-1] == 3||(Dmap[i][j-1] == 2&&(Dmap[i][j-2] == 3||Dmap[i][j-2] == 0))){
        return true;
    }
}
function canPlayerRight(i,j){
    if(Dmap[i][j+1] == 0||Dmap[i][j+1] == 3||(Dmap[i][j+1] == 2&&(Dmap[i][j+2] == 3||Dmap[i][j+2] == 0))){
        return true;
    }
}
/*
*判断游戏进度
*@return true
*/
function isGameEnd(){
    var amount = 0,residue = 0;
    for(var  i = 0; i < aMap.length; i ++){
        for(var j = 0; j < aMap[i].length; j ++){
            if(aMap[i][j] == 3){
                amount += 1;
                if(Dmap[i][j] == 2){
                    residue += 1;
                } 
            }
        }
    }
    WriteText(amount,residue);
    if(amount == residue){
        var oTips = document.getElementById('tips');
        oTips.style.display = "block";
        return true;
    }
}
/*
*修改文本
*@amount 总目标数
*@residue 剩余目标数
*/
function WriteText(amount,residue){
    var levelText = document.getElementById('levelNum');
        levelText.getElementsByTagName('i')[0].innerHTML = game.level;
    var pointText = document.getElementById('pointNum');
        pointText.getElementsByTagName('i')[0].innerHTML = residue+'/'+amount;
}
/*
*关卡选择
*/
function pre(){
    if(game.level <= 1){
        game.level = 1;
    }else{
        game.level -= 1;
    }
    init();
}
function next(){
    if(game.level >= game.maxLevel){
        game.level = game.maxLevel;
    }else{
        game.level += 1;
    }
    init();
}
function afresh(){
    init();
}
