// 0空白 1墙 2箱子 3目标 4玩家
var map1 =
[  
	[0,0,1,1,1,0,0,0],
	[0,0,1,3,1,0,0,0],
	[0,0,1,0,1,1,1,1],
	[1,1,1,2,0,2,3,1],
	[1,3,0,2,4,1,1,1],
	[1,1,1,1,2,1,0,0],
	[0,0,0,1,3,1,0,0],
	[0,0,0,1,1,1,0,0],
];
var map2 = 
[
	[1,1,1,1,1,0,0,0,0],
	[1,4,0,0,1,0,0,0,0],
	[1,0,2,2,1,0,1,1,1],
	[1,0,2,0,1,0,1,3,1],
	[1,1,1,0,1,1,1,3,1],
	[0,1,1,0,0,0,0,3,1],
	[0,1,0,0,0,1,0,0,1],
	[0,1,0,0,0,1,1,1,1],
	[0,1,1,1,1,1,0,0,0],
];
var map3 =
[
    [0,1,1,1,1,1,1,1,0,0],
    [0,1,0,0,0,0,0,1,1,1],
    [1,1,2,1,1,1,0,0,0,1],
    [1,0,4,0,2,0,0,2,0,1],
    [1,0,3,3,1,0,2,0,1,1],
    [1,1,3,3,1,0,0,0,1,0],
    [0,1,1,1,1,1,1,1,1,0],
];
var map4 = [
    [0,1,1,1,1,0],
    [1,1,0,0,1,0],
    [1,4,2,0,1,0],
    [1,1,2,0,1,1],
    [1,1,0,2,0,1],
    [1,3,2,0,0,1],
    [1,3,3,2,3,1],
    [1,1,1,1,1,1],
];
var map5 = [
    [0,1,1,1,1,1,0,0],
    [0,1,4,0,1,1,1,0],
    [0,1,0,2,0,0,1,0],
    [1,1,1,0,1,0,1,1],
    [1,3,1,0,1,0,0,1],
    [1,3,2,0,0,1,0,1],
    [1,3,0,0,0,2,0,1],
    [1,1,1,1,1,1,1,1],
];
var map6 = [
    [0,0,0,1,1,1,1,1,1,1,0,0,0],
    [1,1,1,1,0,0,0,0,0,1,0,0,0],
    [1,0,0,0,3,1,1,1,0,1,0,0,0],
    [1,0,1,0,1,0,0,0,0,1,1,0,0],
    [1,0,1,0,2,0,2,1,3,0,1,0,0],
    [1,0,1,0,0,2,0,0,1,0,1,0,0],
    [1,0,3,1,2,0,2,0,1,0,1,0,0],
    [1,1,0,0,0,0,1,0,1,0,1,1,1],
    [0,1,0,1,1,1,3,0,0,0,0,4,1],
    [0,1,0,0,0,0,0,1,1,0,0,0,1],
    [0,1,1,1,1,1,1,1,1,1,1,1,1],
];
var map7 = [
    [0,0,0,1,1,1,1,1,1,1],
    [0,0,1,1,0,0,1,0,4,1],
    [0,0,1,0,0,0,1,0,0,1],
    [0,0,1,2,0,2,0,2,0,1],
    [0,0,1,0,2,1,1,0,0,1],
    [1,1,1,0,2,0,1,0,1,1],
    [1,3,3,3,3,3,0,0,1,0],
    [1,1,1,1,1,1,1,1,1,0],
];
var map8 = [
	[0,0,0,1,1,1,1,1,1,0],
	[0,1,1,1,0,0,0,0,1,0],
	[1,1,3,0,2,1,1,0,1,1],
	[1,3,3,2,0,2,0,0,4,1],
	[1,3,3,0,2,0,2,0,1,1],
	[1,1,1,1,1,1,0,0,1,0],
	[0,0,0,0,0,1,1,1,1,0],
];
var map9 = [
    [0,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,1,1,0,0,0,1,0],
    [0,1,0,0,0,2,0,0,0,1,0],
    [0,1,2,0,1,1,1,0,2,1,0],
    [0,1,0,1,3,3,3,1,0,1,0],
    [1,1,0,1,3,3,3,1,0,1,1],
    [1,0,2,0,0,2,0,0,2,0,1],
    [1,0,0,0,0,0,1,0,4,0,1],
    [1,1,1,1,1,1,1,1,1,1,1],
];
var map10 = [
	[0,0,1,1,1,1,1,1],
	[0,0,1,0,0,0,0,1],
	[1,1,1,2,2,2,0,1],
	[1,4,0,2,3,3,0,1],
	[1,0,2,3,3,3,1,1],
	[1,1,1,1,0,0,1,0],
	[0,0,0,1,1,1,1,0],
];