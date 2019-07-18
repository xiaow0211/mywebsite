//控制翻面
function turn(elem){
  var cls=elem.className;
  var n=elem.id.split('_')[1];

if(!/photo_center/.test(cls)){
 return rsort(n);
}  
 if(/photo_front/.test(cls)){
     cls=cls.replace(/photo_front/,'photo_back');
    get('#nav_'+n).className += ' i_back ';
   }else{
     cls=cls.replace(/photo_back/,'photo_front')
get('#nav_'+n).className = get('#nav_'+n).className.replace(/i_back/,' ');
     }
return elem.className=cls;
}

//通用函数
function get(selector){
  var method=selector.substr(0,1)=='.' ?  'getElementsByClassName':'getElementById';
return document[method](selector.substr(1));
}
//生成随机整数
function random(range){
  var max=Math.max(range[0],range[1]);
    var min=Math.min(range[0],range[1]);
       var diff=max-min;
    var number=Math.floor(Math.random()*diff+min);
return number;
}
//计算左右分区范围
function range(){
    var range={left:{x:[ ],y:[ ]},right:{x:[ ],y:[ ]}};
    var wrap={
       w:get('#wrap').clientWidth,
       h:get('#wrap').clientHeight
    }
    var photo={
       w:get('.photo')[0].clientWidth,
       h:get('.photo')[0].clientHeight
    }
         range.left.x=[0-photo.w , wrap.w/2-photo.w/2];
         range.left.y=[0-photo.h , wrap.h];
         range.right.x=[wrap.w/2+photo.w/2 , wrap.w+photo.w];
         range.right.y=[0-photo.h , wrap.h];
return range;
}
//输出所有海报
  var data=data;
function addphoto(){
 var template=get( '#wrap' ).innerHTML;
  var html = [ ];
  var nav = [ ];
    for(s in data){
       var _html=template
               .replace('{{index}}',s)
               .replace('{{img}}',data[s].img)
               .replace('{{caption}}',data[s].caption)
               .replace('{{desc}}',data[s].desc);
     html.push(_html);
     nav.push('<span id="nav_'+s+'"  onclick="turn(get(\'#photo_'+s+'\'))" class="i"></span>');
    }
html.push('<div class="nav">'+nav.join(' ')+'<div>');
get('#wrap').innerHTML=html.join(' ');
rsort(random([0,data.length]));
}


//排序海报
function rsort(n){
  var _photo=get('.photo');
  var photos=[]
    for(var s=0;s<_photo.length;s++){
_photo[s].className=_photo[s].className.replace(/\s*photo_center\s*/,' ');
_photo[s].className=_photo[s].className.replace(/\s*photo_back\s*/,' ');
_photo[s].className=_photo[s].className.replace(/\s*photo_front\s*/,' ');
_photo[s].className+='photo_front';
_photo[s].style.left='';
_photo[s].style.top='';
_photo[s].style['transform']='rotate(360deg) scale(1.3)' ;
photos.push(_photo[s]);
    }
  var photo_center=get('#photo_'+n);
  photo_center.className+=' photo_center'
  photo_center=photos.splice(n,1)[0];
//将海报分为左右两个分区

   var photos_left=photos.splice(0,Math.ceil(photos.length/2));
   var photos_right=photos;
   var ranges=range();
      for(var s=0;s<photos_left.length;s++){
         var photo=photos_left[s];
            photo.style.left=random(ranges.left.x)+'px';
            photo.style.top=random(ranges.left.y)+'px';
      photo.style['transform']='rotate('+random([-150,150])+'deg) scale(1)';
      };
     for(var s=0;s<photos_right.length;s++){
         var photo=photos_right[s];   
          photo.style.left=random(ranges.right.x)+'px';
        photo.style.top=random(ranges.right.y)+'px';
        photo.style['transform']='rotate('+random([-360,360])+'deg) scale(1)';     
     }
//控制按钮
var navs=get( '.i');
for(var s=0;s<navs.length;s++){
navs[s].className=navs[s].className.replace(/\s*i_current\s*/,' ');
navs[s].className=navs[s].className.replace(/\s*i_back\s*/,' ');
}
 get('#nav_'+n).className += ' i_current ';
}

window.onload=function(){

addphoto();
}
