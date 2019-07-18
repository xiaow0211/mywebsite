
//加分特效
/*游戏主逻辑及游戏数据*/
var board=[ ];
var score=0;
var startx=0;
var starty=0;
var endx=0;
var endy=0;
var hasConflicted=[ ];
$(document).ready(function(){
sizeforphohe();
newGame();
});
function sizeforphohe(){
if(documentwidth>500){
containerwidth=500;
celllength=100;
cellspace=20;
}

$('#grid-container').css("width",containerwidth-2*cellspace);
$('#grid-container').css("height",containerwidth-2*cellspace);
$('#grid-container').css("padding",cellspace);
$('#grid-container').css("border-radius",0.02*containerwidth);

$('.grid-cell').css("width",celllength);
$('.grid-cell').css("height",celllength);
$('.grid-cell').css("border-radius",0.02*containerwidth);
}

function newGame(){
init();
generateOnenumber();
generateOnenumber();
}
function init(){
   for (var i=0;i<4;i++){
      for (var j=0;j<4;j++){
       var gridCell=$("#grid-cell-"+i+"-"+j);
          gridCell.css('top',getPosTop(i,j));
          gridCell.css('left',getPosLeft(i,j));
      }
   }
   //将board数组变成二维数组
   for (var i=0;i<4;i++){
     board[i]=[ ];
     hasConflicted[i]=[ ];
      for (var j=0;j<4;j++){
        board[i][j]=0;
        hasConflicted[i][j]=false;
      }
   }
score=0;
updatescore(score,0);
updateboardView();
}
//数字块样式改变
function updateboardView(){
  $(".number-cell").remove();
   for (var i=0;i<4;i++){
      for (var j=0;j<4;j++){
$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
        var thenumberCell=$('#number-cell-'+i+'-'+j);
         if(board[i][j]==0){
         thenumberCell.css('width','0px');
         thenumberCell.css('height','0px');
         thenumberCell.css('top',getPosTop(i,j)+celllength/2);
         thenumberCell.css('left',getPosLeft(i,j)+celllength/2);
         }else{
         thenumberCell.css('width',celllength);
         thenumberCell.css('height',celllength);
         thenumberCell.css('top',getPosTop(i,j));
         thenumberCell.css('left',getPosLeft(i,j));
         thenumberCell.css('background-color',getNumberbackgroundcolor(board[i][j]));
         thenumberCell.css('color',getNumbercolor(board[i][j]));
         thenumberCell.text(board[i][j]);
         }
hasConflicted[i][j]=false;
      }
$('.number-cell').css("line-height",celllength+"px");
$('.number-cell').css("font-size",30+'px');
   }
}
//生成数字
function generateOnenumber(){
if(nospace(board))
return false;
//随机位置
var randx=parseInt(Math.floor(Math.random()*4));
var randy=parseInt(Math.floor(Math.random()*4));
var times=0;
while(times<50){
  if(board[randx][randy]==0)
   break;
var randx=parseInt(Math.floor(Math.random()*4));
var randy=parseInt(Math.floor(Math.random()*4));
times++;
}
if(times==25){
   for (var i=0;i<4;i++){
      for (var j=0;j<4;j++){
         if(board[i][j]==0){
            randx=i;
            randy=j;
         }
      }
   }
}
//随机数字
var randnumber=Math.random()>0.5 ? 2:4;
//显示随机出的数字
board[randx][randy]=randnumber;
showNumberwithanimate(randx,randy,randnumber);
return true;
}
//触控事件
document.addEventListener('touchstart',function(event){
startx=event.touches[0].pageX;
starty=event.touches[0].pageY;
});

document.addEventListener('touchmove',function(event){
event.preventDefault();
});
document.addEventListener('touchend',function(event){
endx=event.changedTouches[0].pageX;
endy=event.changedTouches[0].pageY;

var daltex=endx-startx;
var daltey=endy-starty;
  if(Math.abs(daltex)<0.1*documentwidth && Math.abs(daltey)<0.1*documentwidth)
    return;

//x
   if(Math.abs(daltex)>Math.abs(daltey)){
      if(daltex>0){
//moveright
if(moveRight()){
setTimeout("generateOnenumber()",210);
setTimeout("isgameover()",300);
}
      }else{
//moveleft
if(moveLeft()){
setTimeout("generateOnenumber()",210);
setTimeout("isgameover()",300);
}
      }
   }
//y
   else{
      if(daltey>0){
//movedown
if(moveDown()){
setTimeout("generateOnenumber()",210);
setTimeout("isgameover()",300);
}
      }else{
//moveup
if(moveUp()){
setTimeout("generateOnenumber();",210);
setTimeout("isgameover()",300);
}
     }
   }
});
//键盘事件
$(document).keydown(function(event){
event.preventDefault();
   switch(event.keyCode){
      case 37: //left
         if(moveLeft()){
setTimeout("generateOnenumber()",210);
setTimeout("isgameover()",300);
         }
      break;
      case 38: //up
         if(moveUp()){
setTimeout("generateOnenumber()",210);
setTimeout("isgameover()",300);
         }
      break;
      case 39: //right
         if(moveRight()){
setTimeout("generateOnenumber()",210);
setTimeout("isgameover()",300);
         }
      break;
      case 40: //down
         if(moveDown()){
setTimeout("generateOnenumber()",210);
setTimeout("isgameover()",300);
         }
      break;
      default:  //default
      break;
   }
});
//游戏结束
function isgameover(){
   if(nospace(board) && nomove(board)){
     gameover();
   }
}
function gameover(){
alert("Game over! Your score is:"+score);
}
function moveLeft(){
   if(!canMoveleft(board))
return false;
//moveleft
   for (var i=0;i<4;i++)
      for (var j=1;j<4;j++){
         if(!board[i][j]==0){
            for (var k=0;k<j;k++){
               if(board[i][k]==0 && noBlockhorizontal(i,k,j,board)){
 //move
   showMoveAnimate(i,j,i,k);
   board[i][k]=board[i][j];
   board[i][j]=0;
continue;
                }else if(board[i][k]==board[i][j] && noBlockhorizontal(i,k,j,board)&&! hasConflicted[i][k]){
//move
   showMoveAnimate(i,j,i,k);
//add
   board[i][k]+=board[i][j];
   board[i][j]=0;
   score+=board[i][k];
   updatescore(score,board[i][k]);
hasConflicted[i][k]=true;
continue;
                 }
             }
         }
      }
setTimeout("updateboardView()",200);
return true;
}
function moveUp(){
   if(!canMoveup(board))
return false;
//move
   for (var j=0;j<4;j++)
      for (var i=1;i<4;i++){
         if(!board[i][j]==0){
            for (var k=0;k<i;k++){
               if(board[k][j]==0 && noBlockvertical(j,k,i,board)){
//move
   showMoveAnimate(i,j,k,j);
   board[k][j]=board[i][j];
   board[i][j]=0;
continue;
                }else if(board[k][j]==board[i][j] && noBlockvertical(j,k,i,board)&&!hasConflicted[k][j]){
//move
   showMoveAnimate(i,j,k,j);
//add
   board[k][j]+=board[i][j];
   board[i][j]=0;
   score+=board[k][j];
   updatescore(score,board[k][j]);
hasConflicted[k][j]=true;
continue;
                 }
             }
         }
      }
setTimeout("updateboardView()",200);
return true;
}
function moveRight(){
   if(!canMoveright(board))
return false;
//moveright
   for (var i=0;i<4;i++)
      for (var j=2;j>=0;j--){
         if(!board[i][j]==0){
            for (var k=3;k>j;k--){
               if(board[i][k]==0 && noBlockhorizontal(i,j,k,board)){
//move
   showMoveAnimate(i,j,i,k);
   board[i][k]=board[i][j];
   board[i][j]=0;
continue;
                }else if(board[i][k]==board[i][j] && noBlockhorizontal(i,j,k,board)&&!hasConflicted[i][k]){
//move
   showMoveAnimate(i,j,i,k);
//add
   board[i][k]+=board[i][j];
   board[i][j]=0;
   score+=board[i][k];
   updatescore(score,board[i][k]);
   hasConflicted[i][k]=true;
continue;
                 }
             }
         }
      }
setTimeout("updateboardView()",200);
return true;
}
function moveDown(){
   if(!canMovedown(board))
return false;
//movedown
   for (var j=0;j<4;j++)
      for (var i=2;i>=0;i--){
         if(!board[i][j]==0){
            for (var k=3;k>i;k--){
               if(board[k][j]==0 && noBlockvertical(j,i,k,board)){
//move
   showMoveAnimate(i,j,k,j);
   board[k][j]=board[i][j];
   board[i][j]=0;
continue;
                }else if(board[k][j]==board[i][j] && noBlockvertical(j,i,k,board)&&!hasConflicted[k][j]){
//move
   showMoveAnimate(i,j,k,j);
//add
   board[k][j]+=board[i][j];
   board[i][j]=0;
   score+=board[k][j];
   updatescore(score,board[k][j]);
   hasConflicted[k][j]=true;
continue;
                 }
             }
         }
      }
setTimeout("updateboardView()",200);
return true;
}



