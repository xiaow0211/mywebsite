var body = document.body;
var showMenuboxBtn = document.getElementsByClassName('nav2-icon2')[0];
var menuBox = document.getElementById('set-menu');
var Menuboxfrist = menuBox.getElementsByTagName('li')[0];
var setBox = Menuboxfrist.getElementsByClassName('set-item')[0];
var setRow = Menuboxfrist.getElementsByClassName('up-and-down')[0];
var opener1 = menuBox.getElementsByClassName('opener')[0];
var opener2 = menuBox.getElementsByClassName('opener')[1];
var header = document.getElementsByClassName('nav1')[0];
var css = document.getElementById('css');
var mask = document.getElementById('mask');
var form = document.getElementsByTagName('form')[0];
var input = document.getElementsByTagName('input')[0];
var logo = document.getElementById('logo');
var Tab = document.getElementsByClassName('search-tab');
var searchTip = document.getElementById('searchTip');
///localStorage.removeItem("History");
/***************/
var isMenuboxshow = false;
var isSetboxshow = false;
var isMove = false;
var decollator = "%";
var Height = document.documentElement.scrollHeight;
//localStorage.setItem("History", "vanida;%jkkjlk");
//var name = localStorage.getItem("History");
var searchTip = document.getElementById('searchTip');
var oUl = searchTip.getElementsByTagName('ul')[0];

function pushList(Data) {
    var listNum = oUl.children.length;
    if (listNum >= 8 || !Data) {
        return;
    }
    var listFromhistory = [];
    var listFromsearch = [];
    if (typeof Data === "string") {
        listFromhistory = Data.split(decollator);
        Array.prototype.distinct = function() {
            var arr = this,
                result = [],
                i,
                j,
                len = arr.length;
            for (i = 0; i < len; i++) {
                for (j = i + 1; j < len; j++) {
                    if (arr[i] === arr[j]) {
                        j = ++i;
                    }
                }
                result.push(arr[i]);
            }
            return result;
        }
        listFromhistory = listFromhistory.distinct();
        oUl.innerHTML = "";
    } else {
        listFromsearch = Data;
    }

    for (var i = 0; i < listFromhistory.length; i++) {
        var oList = document.createElement('li');
        oList.innerHTML = listFromhistory[i];
        var oSpan = document.createElement('span');
        oSpan.id = "delateHistory" + i;
        oSpan.className = "delateData";
        oSpan.innerHTML = "删除";
        oList.appendChild(oSpan);
        oUl.appendChild(oList);
        aUL = searchTip.getElementsByTagName('ul');
    }
    for (var i = 0; i < listFromsearch.length - listNum; i++) {
        var oList = document.createElement('li');
        oList.innerHTML = listFromsearch[i];
        oUl.appendChild(oList);
    }
}
input.addEventListener("keyup", function() {
    pushList(dataFormat(search,true));
});
input.addEventListener("keydown", function(e) {
    if (e.keyCode == 13) {
    	var storage = [];
        e.preventDefault();
        var key = input.value;
        var history = localStorage.getItem("History");
        if(history){
        	storage.push(history);
        }
        storage.push(key);
        localStorage.setItem("History", storage.join("%"));
        //window.location.href = "https://cn.bing.com/search?q=" + key;
    } else {
        return;
    }
});
//清空缓存
document.addEventListener("keydown", function(e) {
    if (e.keyCode == 8) {
        localStorage.removeItem("History")
    }
});
// 去重 去空值+ 整合数组格式 长度控制
var result;
function dataFormat(Data,type) {
	if(!type&&Data){
       result = Data;
	}else if(type&&result != ""){
	   result = result +'%'+ Data;
	}else if(type&&result == ""){
		result = Data;
	}else{
		result = "";
	}
	//去空值 
    var Rxp1 = /null%|\s/g;
    var Rxp2 = /%{2,}/g;
    var bf = result.replace(Rxp1,"").replace(Rxp2,"");
    //去重
    Array.prototype.distinct = function() {
        var arr = this,
            result = [],
            i,
            j,
            len = arr.length;
        for (i = 0; i < len; i++) {
            for (j = i + 1; j < len; j++) {
                if (arr[i] === arr[j]) {
                    j = ++i;
                }
            }
            result.push(arr[i]);
        }
        return result;
    }
    result = result.split("%");
    //.distinct();
    console.log(result);
    //长度控制
    return result;
}
for (var i = Tab.length - 1; i >= 0; i--) {
    Tab[i].addEventListener("click", function() {
        var index = this.getAttribute('index');
        Tab[index == 1 ? 1 : 0].className = "search-tab noselected";
        this.className = "search-tab";
    });
}
input.onfocus = function() {
    mask.style.display = "block";
    mask.style.height = Height + "px";
    form.style.zIndex = 15;
    logo.style.zIndex = 15;
    var History = localStorage.getItem("History");
    pushList(dataFormat(History,false));
}
mask.onclick = function() {
    this.style.display = "none";
    form.style.zIndex = 6;
    logo.style.zIndex = 6;
}

showMenuboxBtn.onclick = function() {
    if (!isMove) {
        isMove = true;
        if (isMenuboxshow == false) {
            menuBox.style.padding = "15px 0";
            change(menuBox, 324);
        } else {
            change(menuBox, 0);
            menuBox.style.padding = "0 0";
        }
        isMenuboxshow = !isMenuboxshow;
        isMove = false;
    }
}
Menuboxfrist.onclick = function() {
    if (!isMove) {
        isMove = true;
        if (isSetboxshow == false) {
            setBox.className = "set-item item-open";
            change(Menuboxfrist, 191);
            change(menuBox, 475);
            setRow.className = "up-and-down down";
            isMove = false;
        } else {
            setRow.className = "up-and-down up";
            change(Menuboxfrist, 41);
            change(menuBox, 324);
            window.setTimeout(function() {
                setBox.className = "set-item item-close";
                isMove = false;
            }, 300);
        }
        isSetboxshow = !isSetboxshow;
    }
}
opener1.onclick = function() {
    if (this.className === "opener open") {
        this.className = "opener close";
        header.style.display = "none";
    } else {
        this.className = "opener open";
        header.style.display = "inline-block";
    }
}
opener2.onclick = function() {
    if (this.className === "opener open") {
        this.className = "opener close";
        css.href = "style-nobg.css";
    } else {
        this.className = "opener open";
        css.href = "style-bg.css";
    }
}

function change(el, height) {
    el.style.height = height + 'px';
}