function random(a,b){
   var min=a||0;
   var max=b||1;
   return (Math.random()*(max-min)+min).toFixed(2);
}
/*
*获取两点之间距离
*保留两位小数
**/
function getDistance(ax,ay,bx,by){
   return Math.sqrt((ax-bx)*(ax-bx)+(ay-by)*(ay-by)).toFixed(2);
}
/*
*最大值,array必须是小于三维的规则数组
*/
function getMax(array){
   array.map(function(item,index){
     if (typeof(item)=="object"){
        
     }
     
   })
   
}
function getMin(array){
   return Math.min.apply(Math,array);
}

for(var i=0;i<=10;i++){
   //log(getDistance(0,0,i,i));
}
