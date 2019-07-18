/*游戏动画特效*/
function showNumberwithanimate(i,j,randnumber){
var numberCell=$('#number-cell-'+i+"-"+j);
numberCell.css('background-color',getNumberbackgroundcolor(randnumber) );
numberCell.css('color',getNumbercolor(randnumber));
numberCell.text(randnumber);
numberCell.animate({
width:celllength,
height:celllength,
top:getPosTop(i,j),
left:getPosLeft(i,j)
},50);
}

function  showMoveAnimate(formx,formy,tox,toy){
var numberCell=$('#number-cell-'+formx+"-"+formy);
   numberCell.animate({
      top:getPosTop(tox,toy),
      left:getPosLeft(tox,toy)
   },200);
}
function updatescore(score,addnum){
$('#score').text(score);
}





