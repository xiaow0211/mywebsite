/*游戏底层支持逻辑*/
documentwidth=window.screen.availWidth;
containerwidth=0.90*documentwidth;
celllength=0.18*documentwidth;
cellspace=0.036*documentwidth;
function getPosTop(i,j){
return cellspace+i*(cellspace+celllength);
}
function getPosLeft(i,j){

return cellspace+j*(cellspace+celllength);
}
function getNumberbackgroundcolor(number){
   switch(number){
      case 2:return "#EEE4DA";break;
      case 4:return "#EDECC8";break;
      case 8:return "#F2B179";break;
      case 16:return "#F59563";break;
      case 32:return "#F67C5F";break;
      case 64:return "#F65E3B";break;
      case 128:return "#EDCF72";break;
      case 256:return "#EDCC61";break;
      case 512:return "#99CC00";break;
      case 1024:return "#33B5E5";break;
      case 2048:return "#0099CC";break;
      case 4096:return "#AA66CC";break;
      case 8192:return "#9933CC";break;
   }
return "red";
}

function getNumbercolor(number){
   if(number<=4)
   return "#776A65";

   return "white";
}
function nospace(board){
   for (var i=0;i<4;i++)
      for (var j=0;j<4;j++)
         if(board[i][j]==0)
          return false;
          return true;
}
function canMoveleft(board){
   for (var i=0;i<4;i++)
      for (var j=1;j<4;j++)
         if(!board[i][j]==0)
            if(board[i][j-1]==0 || board[i][j-1]==board[i][j])
               return true;           
return false;
}
function canMoveup(board){
   for (var i=1;i<4;i++)
      for (var j=0;j<4;j++)
         if(!board[i][j]==0)
            if(board[i-1][j]==0 || board[i-1][j]==board[i][j])
               return true;           
return false;
}
function canMoveright(board){
   for (var i=0;i<4;i++)
      for (var j=0;j<3;j++)
         if(!board[i][j]==0)
            if(board[i][j+1]==0 || board[i][j+1]==board[i][j])
               return true;           
return false;
}
function canMovedown(board){
   for (var i=0;i<3;i++)
      for (var j=0;j<4;j++)
         if(!board[i][j]==0)
            if(board[i+1][j]==0 || board[i+1][j]==board[i][j])
               return true;           
return false;
}
function
 noBlockhorizontal(row,col1,col2,board){
   for (var i=col1+1;i<col2;i++)
      if(board[row][i]!=0)
        return false;
return true;
}

function noBlockvertical(col,row1,row2,board){
for(var i=row1+1;i<row2;i++)
		if(board[i][col]!=0)
   	return false;
	return true;
}
function nomove(board){
   if(canMoveleft(board)||
      canMoveup(board)||
      canMoveright(board)||
      canMovedown(board))
         return false;
return true;
}




