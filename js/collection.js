/*

 */

 if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ) { 
    var wrap = document.getElementById('wrap');
    wrap.style.minWidth="0px";
    var search = document.getElementById('search');
    search.style.position = 'absolute';
    search.style.top = "100px";
    search.style.left = "50%";
    search.style.transform = "translateX(-50%)";
    var articleBox = document.getElementById('articleBox');
    articleBox.style.marginTop = '420px';
 }

var searchTags = document.getElementById('searchTags');
var input = document.getElementById('input');
var tip = document.getElementById('searchTip');
var button = document.getElementById('button');

var nowCon = []; //已选中的条件
var Tags = []; //存储标签
var Result = [];
(function() {
    function init() {
        input.style.width = 290 - searchTags.clientWidth + "px";
        createBox(COLLECTION);
        addTagButton();
    }
    init();
})();
/*创建文章盒子*/
function createBox(DATA) {
    var box = document.getElementById('articleBox');
    box.innerHTML = "";
    DATA.forEach(function(el, index) {
        var aLi = document.createElement('li');
        aLi.className = "list";
        var aLink = document.createElement('a');
        aLink.href = el.link;
        var imgBox = document.createElement('div');
        imgBox.id = 'img';
        imgBox.style = `background: url(../${el.img}) no-repeat; background-size: cover;`;
        var titleBox = document.createElement('div');
        titleBox.id = 'title';
        var title = document.createElement('p');
        title.innerHTML = el.title;
        /**/
        var inforBox = document.createElement('div');
        inforBox.id = "infor";
        inforBox.innerHTML = `<span class="ori">${el.ori}</span><span class="time">${el.time}</span>`;
        var tagBox = document.createElement('div');
        tagBox.id = 'tag';
        var bUl = document.createElement('ul');
        box.appendChild(aLi);
        aLi.appendChild(aLink);
        aLink.appendChild(imgBox);
        aLink.appendChild(titleBox);
        aLink.appendChild(inforBox);
        titleBox.appendChild(title);
        aLink.appendChild(tagBox);
        tagBox.appendChild(bUl);
        el.tag.forEach(function(e, i) {
            var bLi = document.createElement('li');
            bLi.innerHTML = `<span class="tagText"><span></span>${e}</span>`;
            bUl.appendChild(bLi);
        })
    });
}
/*生成标签按钮*/
function addTagButton() {
    var tagLists = document.getElementById('tagLists');
    COLLECTION.forEach(function(el, index) {
        el.tag.forEach(function(e, i) {
            if (!Tags.includes(e) && e != "") {
                Tags.push(e);
            }
        });
    });
    for (var i = Tags.length - 1; i >= 0; i--) {
        var aLi = document.createElement('li');
        aLi.className = "li";
        aLi.innerHTML = Tags[i];
        tagLists.appendChild(aLi);
        aLi.onclick = function() {
            if (this.getAttribute("canClick") === "false") {
                return;
            }
            if (addCondition(this.innerText)) {
                this.setAttribute("canClick", "false");
                this.style.border = "1px solid #999";
                this.style.color = "#999";
                this.className = "";
                if (nowCon.length != 0) {
                    input.placeholder = "";
                }
            }
        }
    }
}
/*添加条件*/
function addCondition(str) {
    if (!nowCon.includes(str)) {
        if (nowCon.length >= 3) {
            searchTip.innerHTML = "最多只能选择三个标签！"
            return false;
        }
        nowCon.push(str);
        searchTags.innerHTML = "";
        tip.innerHTML = "";
        for (var i = 0; i < nowCon.length; i++) {
            var aTag = document.createElement('span');
            aTag.className = "tag";
            aTag.innerHTML = `<span class="p">${nowCon[i]}</span><span class="clear"></span>`;
            searchTags.appendChild(aTag);
            input.style.width = 290 - searchTags.clientWidth + "px";
            var clear = aTag.getElementsByClassName('clear')[0];
            clear.onclick = function(e) {
                offCondition(this);
            }
        }
        return true;
    }
}
/*删除条件*/
function offCondition(el) {
    var text = el.parentNode.getElementsByClassName('p')[0].innerHTML;
    searchTags.removeChild(el.parentNode);
    if (nowCon.length <= 3) {
        searchTip.innerHTML = "";
    }
    nowCon.splice(nowCon.indexOf(text), 1);
    var list = tagLists.getElementsByTagName('li');
    var index = list.length - Tags.indexOf(text) - 1;
    list[index].className = "li";
    list[index].style.color = "#07c160";
    list[index].style.border = "1px solid #07c160";
    list[index].setAttribute("canClick", "true");
    input.style.width = 290 - searchTags.clientWidth + "px";
    if (nowCon.length == 0) {
        input.placeholder = "输入关键字/文章来源,以空格分割";
    }
}
button.onclick = function() {
    Result = [];
    tip.innerHTML = "";
    if (!input.value) { /*输入框为空，按标签检索*/
        if (nowCon.length == 0) {
            createBox(COLLECTION);
            tip.innerHTML = "请输入关键字或者添加标签！";
            return;
        } else {
            _searchOntag();
            createBox(Result);
        }

    } else { /*关键字优先*/
        //数据处理
        var str = input.value;
        var arr = str.split(' ');
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == '' || arr[i] == null || typeof(arr[i]) == undefined) {
                arr.splice(i, 1);
                i = i - 1;
            }
        }
        //标题检索
        _searchOntitle(arr);
        //来源检索
        _searchOnori(arr);
        if (Result.length == 0) {
            _searchOntag();
        }
        if (Result.length == 0) {
            createBox(COLLECTION);
            tip.innerHTML = "很抱歉没有找到符合条件的文章，请更换关键字试试！";
        } else {
            createBox(Result);
        }
    }
    function _searchOnori(arr) {
        COLLECTION.forEach(function(e, i) {
            var oriArray = e.ori.split('>');
            arr.forEach(function(el, index) {
                if (oriArray.includes(el)) {
                    if (!Result.includes(e)) {
                        Result.push(e);
                    } else {
                        return;
                    }
                }
            });
        });
    }

    function _searchOntitle(arr) {
        COLLECTION.forEach(function(e, i) {
            arr.forEach(function(el, index) {
                if (e.title.includes(el)) {
                    if (!Result.includes(e)) {
                        Result.push(e);
                    } else {
                        return;
                    }
                }
            })
        })

    }

    function _searchOntag() {
        COLLECTION.forEach(function(e, i) {
            nowCon.forEach(function(el, index) {
                if (e.tag.includes(el)) {
                    if (!Result.includes(e)) {
                        Result.push(e);
                    } else {
                        return;
                    }
                }
            })
        })
    }
}