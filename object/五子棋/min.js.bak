window.onload=function(){
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext('2d');
var box=canvas.getBoundingClientRect();
var left=box.left;
var top=box.top;
var me=true;
var board=[];
var wins=[];
var mywin=[];
var computerwin=[];
var over=false;
//初始化棋盘格
for(var i=0;i<15;i++){
 board[i]=[];
  for (var j=0;j<15;j++){
  board[i][j]=0;
  }
}
//赢法数组初始化
for(var i=0;i<15;i++){
 wins[i]=[];
  for (var j=0;j<15;j++){
  wins[i][j]=[];
  }
}
//横向赢法
var count=0;
for(var i=0;i<15;i++){
 for(var j=0;j<11;j++){
  for(var k=0;k<5;k++){
   wins[i][j+k][count]=true;
  }
count++;
 }
}
//竖向赢法
for(var i=0;i<15;i++){
 for(var j=0;j<11;j++){
  for(var k=0;k<5;k++){
   wins[j+k][i][count]=true;
  }
count++;
 }
}
//斜向赢法
for(var i=0;i<11;i++){
 for(var j=0;j<11;j++){
  for(var k=0;k<5;k++){
   wins[i+k][j+k][count]=true;
  }
count++;
 }
}
for(var i=0;i<11;i++){
 for(var j=14;j>3;j--){
  for(var k=0;k<5;k++){
   wins[i+k][j-k][count]=true;
  }
count++;
 }
}
//初始化赢法统计数组
for (var i=0;i<count;i++){
mywin[i]=0;
computerwin[i]=0;
}
//画棋盘
function Drawboard(){
 ctx.strokeStyle="#BFBFBF";
  for(var i=0;i<16;i++){
  ctx.moveTo(30+i*60,30);
  ctx.lineTo(30+i*60,870);
  ctx.stroke();
  ctx.moveTo(30,30+i*60);
  ctx.lineTo(870,30+i*60);
  ctx.stroke();
  }
}
//画棋子
function onestep(i,j,me){
 ctx.beginPath();
 ctx.arc(30+i*60,30+j*60,26,0,2*Math.PI);
 ctx.closePath();
 var gradient=ctx.createRadialGradient(30+i*60+3,30+j*60-3,26,30+i*60+5,30+j*60-5,0);
   if(me){
   gradient.addColorStop(0,"#0A0A0A");
   gradient.addColorStop(1,"#636766");
   }else{
   gradient.addColorStop(0,"#D1D1D1");
   gradient.addColorStop(1,"#F9F9F9");
   };
 ctx.fillStyle=gradient;
 ctx.fill();
}
//触控实现落子
canvas.addEventListener('touchstart',function(e){
 if(over){
  return;
 }
 if(!me){
  return;
 }
 touch=e.touches[0]
 var x=touch.pageX-left;
 var y=touch.pageY-top;
 var i=Math.floor(x/60);
 var j=Math.floor(y/60);
//我方赢法判断
 if(board[i][j]==0){
  onestep(i,j,me);
  board[i][j]=1;
    for (var k=0;k<count;k++){
      if(wins[i][j][k]){
        mywin[k]++;
        computerwin[k]=6;
         if(mywin[k]==5){
         alert("你赢了");
         over=ture;
         }
       }
     }
       if(!over){
       me=!me;
      computerAI();
      }
    }
  }
);
//计算机实现AI算法
function computerAI(){
  var myscore=[];
  var computerscore=[];
  var max=0;
  var u=0,v=0;
    //初始化得分数组
    for (var i=0;i<15;i++){
     myscore[i]=[];
     computerscore[i]=[];
        for(var j=0;j<15;j++){
         myscore[i][j]=0;
         computerscore[i][j]=0;
        }
    }
//加权
for(var i=0;i<15;i++){
 for(var j=0;j<15;j++){
  if(board[i][j]==0){
   for(var k=0;k<count;k++){
     if(wins[i][j][k]){
       //对我方棋子的判断
       if(mywin[k]==1){
         myscore[i][j]+=200;
     }else if(mywin[k]==2){
         myscore[i][j]+=400;
      }else if(mywin[k]==3){
         myscore[i][j]+=2000;
      }else if(mywin[k]==4){
         myscore[i][j]+=10000;
      }
    //对计算机棋子的判断
    if(computerwin[k]==1){
         computerscore[i][j]+=220;
     }else if(computerwin[k]==2){
         computerscore[i][j]+=420;
      }else if(computerwin[k]==3){
         computerscore[i][j]+=2100;
      }else if(computerwin[k]==4){
         computerscore[i][j]+=20000;
      }
    }
   }
   //统计记录最高得分的位置及其坐标
   //我方
   if(myscore[i][j]>max){
    max=myscore[i][j];
    u=i;
    v=j;
   }else if(myscore[i][j]==max){
if(computerscore[i][j]>computerscore[u][v]){
    u=i;
    v=j;
    }
   }
//计算机方
   if(computerscore[i][j]>max){
     max=computerscore[i][j];
     u=i;
     v=j;
   }else if(computerscore[i][j]==max){
     if(myscore[i][j]>myscore[u][v]){
       u=i;
       v=j;
    }
   }
  }
 }
}
  onestep(u,v,false);
  board[u][v]=2;
//计算机赢法判断
  for (var k=0;k<count;k++){
    if(wins[u][v][k]){
     computerwin[k]++;
     mywin[k]=6;
        if(computerwin[k]==5){
          alert("计算机赢了");
          over=ture;
        }
    }
  }
   if(!over){
    me=!me;
   }
}
Drawboard();
}

