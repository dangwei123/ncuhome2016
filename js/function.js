//返回顶部
var backTopObj = function(){
	this.demo;
	this.bTop;
	this.timer;
	this.speed = 0;
	this.isShowTop = false;
	this.isHideTop = false;
	this.hideTopTimer;
}
backTopObj.prototype.init = function(){
	if(document.documentElement.scrollTop >= 500 || document.body.scrollTop >= 500){
		this.isShowTop = true;
	}
	else{
		this.isHideTop = true;
	}
	this.demo = document.getElementById('back_top');
	this.demo.addEventListener('click',back,false);
	document.body.addEventListener('mousewheel',function(){clearInterval(backTop.timer);},false);
}
backTopObj.prototype.showTop = function(){
	this.isShowTop = false;
	this.isHideTop = true;
	clearInterval(this.hideTopTimer);
	this.demo.style.display = 'block';
	this.demo.style.opacity = 1;
	this.demo.style.transition = 'opacity 0.7s';
}
backTopObj.prototype.hideTop = function(){
	this.isShowTop = true;
	this.isHideTop = false;
	this.demo.style.opacity = 0;
	this.demo.style.transition = 'opacity 0.7s';
	this.hideTopTimer = setInterval(function(){
		backTop.demo.style.display = 'none';
		clearInterval(this.hideTopTimer);
	},1000);
}
function back(){
	clearInterval(backTop.timer);
	backTop.timer = setInterval(function(){
		backTop.bTop = document.documentElement.scrollTop || document.body.scrollTop;
		backTop.speed = Math.floor(- backTop.bTop / 6);
		document.documentElement.scrollTop = document.body.scrollTop = backTop.bTop + backTop.speed;
		if(backTop.bTop <= 0){
			clearInterval(backTop.timer);
		}
	},30);
}
//返回顶部按钮和导航栏的显示和隐藏
backTopObj.prototype.backTopBtn = function(){
	if(document.documentElement.scrollTop >= 500 || document.body.scrollTop >= 500){
		if(this.isShowTop){
			this.showTop();
		}
	}
	else if(document.documentElement.scrollTop <= 500 || document.body.scrollTop <= 500){
		if(this.isHideTop){
			this.hideTop();
		}
	}
	else{
		return;
	}
}
//导航栏
var navBarObj = function(){
	this.left;
	this.demo;
	this.navs;
	this.height = 0.000;
}
navBarObj.prototype.init = function(){
	this.position = '';
	this.left = document.documentElement.scrollLeft || document.body.scrollLeft;
	this.demo = getDemo('nav_bar');
	this.navs = getDemo('navs').getElementsByClassName('nav');
	this.height = this.navs[0].offsetHeight;
	for(var i=1; i<this.navs.length-1; i++){
		this.navs[i].getElementsByTagName('ul')[0].style.top = this.height + 'px';
	}
}
navBarObj.prototype.check = function(){
	if(document.documentElement.scrollTop >= 135 || document.body.scrollTop >= 135){
		this.demo.style.position = 'fixed';
		this.demo.style.left = -this.left + 'px';
	}
	else{
		this.demo.style.position = '';
	}
}

//香樟家园
var xzObj = function(){
	this.nowDistance;
	this.toDistance;
	this.speed;
	this.demo;
	this.timer;
}
xzObj.prototype.init = function(){
	this.toDistance = document.getElementsByClassName('xiangzhang')[0].offsetTop-150;
	this.nowDistance = document.documentElement.scrollTop || document.body.scrollTop;
	this.speed = 100;
	this.demo = getDemo('xzjy');
	this.demo.addEventListener('click',jumpTo,false);
}
function jumpTo(){
	xz.nowDistance = document.documentElement.scrollTop || document.body.scrollTop;
	xz.timer = setInterval(function(){
		xz.nowDistance += xz.speed;
		console.log(xz.nowDistance);
		if(xz.nowDistance >= xz.toDistance){
			clearInterval(xz.timer);
		}
		document.documentElement.scrollTop = document.body.scrollTop = xz.nowDistance;
	},20);
}

//搜索
var searchObj = function(){
	this.text;
	this.searchInput;
	this.searchBtn;
}
searchObj.prototype.init = function(){
	this.text = '';
	this.searchInput = getDemo('searchInput');
	this.searchBtn = getDemo('search');
	this.searchBtn.addEventListener('click',checkSearch,false);
}
function checkSearch(){
	search.text = search.searchInput.value;
	if(len(search.text) > 2){
		window.open('http://home.ncu.edu.cn/NewIndex2013/Article_search.aspx?KeyWord=' + encodeURI(search.text));
		searchInput.value = '';
	}
	else if(len(search.text) == 0){
		return;
	}
	else{
		alert('搜索的内容太短了');
	}
}
function len(s){
	var l = 0;
	var a = s.split('');
	for(var i=0; i<a.length; i++){
		if(a[i].charCodeAt(0) < 299){
			l++;
		}
		else{
			l += 2;
		}
	}
	return l;
}

//多图
var focusObj = function(){
	this.container;
	this.changeBtn = [];
	this.turnLeft;
	this.turnRight;
	this.aImage;
	this.bIndex;
	this.aIndex;
	this.end;
	this.timer;
}
focusObj.prototype.init = function(){
	this.container = getDemo('focus_container');
	this.container.addEventListener('mouseover',function(){clearInterval(focus.timer)},false);
	this.container.addEventListener('mouseout',autoPlay,false);
	this.changeBtn = getDemo('focus_buttons').getElementsByTagName('li');
	this.turnLeft = getDemo('change_focus_left');
	this.turnRight = getDemo('change_focus_right');
	this.aImage = getDemo('focus_images');
	this.bIndex = 1;
	this.aIndex = 0;
	this.end = 0;
	for(var i=0; i<this.changeBtn.length; i++){
		this.changeBtn[i].addEventListener('click',changeImage,false);
	}
}
function changeImage(e){
	focus.aIndex = parseInt(e.srcElement.getAttribute('index'));
	focus.changeBtn[focus.aIndex-1].className = 'on';
	focus.changeBtn[focus.bIndex-1].className = '';
	focus.bIndex = focus.aIndex;
	focus.end = - (73.1 * focus.aIndex).toFixed(1);
	focus.aImage.style.left = focus.end + 'rem';
}
function autoPlay(){
	focus.timer = setInterval(function(){
		if(focus.aIndex == 5){
			focus.aIndex = 0;
		}
		focus.aIndex += 1;
		focus.changeBtn[focus.aIndex-1].className = 'on';
		focus.changeBtn[focus.bIndex-1].className = '';
		focus.bIndex = focus.aIndex;
		focus.end = - (73.1 * focus.aIndex).toFixed(1);
		focus.aImage.style.left = focus.end + 'rem';
	},3000);
}

//校园人物
var personObj = function(){
	this.containers = [];
	this.picCon = [];
	this.textCon = [];
	this.clickIndex;
	this.showIndex;
	this.changeBtn;
}
personObj.prototype.num = 3;
personObj.prototype.init = function(){
	this.containers = getDemo('school_persons').getElementsByTagName('li');
	for(var i=0; i<this.num; i++){
		this.picCon[i] = this.containers[i].getElementsByTagName('div')[0];
		this.textCon[i] = this.containers[i].getElementsByTagName('div')[2];
		this.picCon[i].addEventListener('click',shPerson,false);
		if(this.textCon[i].className == 'show'){
			this.showIndex = parseInt(this.textCon[i].getAttribute('index')) - 1;
		}
	}
	this.changeBtn = getDemo('changePerson');
	this.changeBtn.addEventListener('click',function(){getAjax(ajaxs.ajaxUrl[2],3)},false);
}
function shPerson(e){
	person.clickIndex = parseInt(e.srcElement.getAttribute('index')) - 1;
	if(person.textCon[person.clickIndex].className == 'show'){
		console.log('is showed');
	}
	else{
		//to show
		person.textCon[person.showIndex].style.width = '0rem';
		person.textCon[person.showIndex].className = 'hide';
		person.textCon[person.clickIndex].style.width = '20rem';
		person.textCon[person.clickIndex].className = 'show';
		person.showIndex = person.clickIndex;
	}
}

//校园资讯
var inforObj = function(){
	this.container;
	this.cons = [];
	this.show;
	this.stimer;
	this.htimer;
	this.index;
	this.changeDemo;
	this.click;
	this.first;
}
inforObj.prototype.num = 4;
inforObj.prototype.init = function(){
	this.container = getDemo('school_infors');
	this.cons = this.container.getElementsByTagName('li');
	this.show = false;
	this.index = 0;
	this.changeDemo = getDemo('changeInfor');
	this.changeDemo.addEventListener('click',hInfors,false);
	this.click = false;
	this.first = true;
}
function sInfors(){
	if(!infor.show){
		infor.stimer = setInterval(function(){
			infor.cons[infor.index].style.transform = 'scale(1)';
			infor.index += 1;
			if(infor.index == 4){
				infor.show = true;
				infor.click = true;
				infor.index = 0;
				clearInterval(infor.stimer);
			}
		},200);
	}
}
function hInfors(){
	if(infor.click){
		infor.click = false;
		if(infor.show){
			infor.htimer = setInterval(function(){
				infor.cons[infor.index].style.transform = 'scale(0)';
				infor.index += 1;
				if(infor.index == 4){
					infor.show = false;
					infor.index = 0;
					setTimeout(function(){getAjax(ajaxs.ajaxUrl[1],2);},200);
					clearInterval(infor.htimer);
				}
			},200);
		}
	}
}
//活动讲座
getDemo('changeLecture').addEventListener('click',function(){getAjax(ajaxs.ajaxUrl[3],4)},false);

//二维码
var erObj = function(){
	this.erImage;
	this.erImageSrc;
	this.changeBtn = [];
	this.bBtnImage = [];
	this.index;
}
erObj.prototype.num = 3;
erObj.prototype.init = function(){
	this.erImage = document.getElementsByClassName('erweima')[0];
	this.erImageSrc = ['./image/QQ_code.jpg','./image/weibo_code.jpg','./image/weixiner.png'];
	this.bBtnImage = ['qq','weibo','weixin'];
	this.erImage.src = this.erImageSrc[2];
	this.changeBtn = getDemo('erContainer').getElementsByTagName('a');
	this.index = 2;
}
function changeEr(e){
	er.index = parseInt(e.srcElement.getAttribute('index'));
	for(var i=0; i<er.num; i++){
		er.changeBtn[i].style.background = 'url(./image/share_' + er.bBtnImage[i] + '.png)';
	}
	er.changeBtn[er.index-1].style.background = 'url(./image/share_' + er.bBtnImage[er.index-1] + '_after.png)';
	er.erImage.src = er.erImageSrc[er.index - 1];
}

//ajax
var ajaxsObj = function(){
	this.ajaxUrl;
}
ajaxsObj.prototype.num = 4;
ajaxsObj.prototype.init = function(){
	this.ajaxUrl = ['http://120.27.137.151:8585/api/pic/','http://120.27.137.151:8585/api/infos/','http://120.27.137.151:8585/api/persons/','http://120.27.137.151:8585/api/lecture/'];
}
function getAjax(url,num){
	$.ajax({
		url: url,
		success: function(res){
			switch(num){
				case 1:
					var dataImage = res.data.infors;
					ajaxImage(dataImage);
					break;
				case 2:
					var dataInfor = res.data.infors;
					ajaxs.ajaxUrl[num-1] = 'http://120.27.137.151:8585' + res.data.url;
					if(!infor.first){
						sInfors();
					}
					infor.first = false;
					ajaxInfor(dataInfor);
					break;
				case 3:
					var dataPerson = res.data.persons;
					ajaxs.ajaxUrl[num-1] = 'http://120.27.137.151:8585' + res.data.url;
					ajaxPerson(dataPerson);
					break;
				case 4:
					var dataLecture = res.data.lectures;
					ajaxs.ajaxUrl[num-1] = 'http://120.27.137.151:8585/' + res.data.url;
					ajaxLecture(dataLecture);
					break;
			}
			console.log(num);
		}
	});
}
function ajaxImage(data){
	pic.images[0].picurl = data[4].picurl;
	pic.images[6].picurl = data[0].picurl;
	for(var i=0; i<data.length; i++){
		pic.images[i+1].picurl = data[i].picurl;
		focus.changeBtn[i].style.background = 'url(' + data[i].picurl + ') no-repeat';
	}
}
function ajaxInfor(data){
	for(var i=0; i<data.length; i++){
		schoolInfor.infors[i].inforAdd = data[i][0].inforAdd;
		schoolInfor.infors[i].inforCon = data[i][0].inforCon;
		schoolInfor.infors[i].inforName = data[i][0].inforName.substring(0,13) + '……';
		schoolInfor.infors[i].inforTime = data[i][0].inforTime;
		schoolInfor.infors[i].pic = 'http://120.27.137.151:8585' + data[i][0].pic;
	}
}
function ajaxPerson(data){
	for(var i=0; i<data.length; i++){
		vschoolPerson.persons[i].personName = data[i][0].personName;
		vschoolPerson.persons[i].personInfor1 = data[i][0].personInfor1;
		vschoolPerson.persons[i].personInfor2 = data[i][0].personInfor2;
		vschoolPerson.persons[i].personInfor3 = data[i][0].personInfor3;
		vschoolPerson.persons[i].personInfor4 = data[i][0].personInfor4;
		person.picCon[i].style.background = 'url(' + data[i][0].headpic + ') no-repeat';
	}
}
function ajaxLecture(data){
	for(var i=0; i<data.length; i++){
		if(data[i][0].lectureAdd.length > 16){
			vlecture.lectures[i].lectureAdd = data[i][0].lectureAdd.substring(0,16) + '……';
		}
		else{
			vlecture.lectures[i].lectureAdd = data[i][0].lectureAdd;
		}
		if(data[i][0].lectureHost.length > 20){
			vlecture.lectures[i].lectureHost = data[i][0].lectureHost.substring(0,18) + '……';
		}
		else{
			vlecture.lectures[i].lectureHost = data[i][0].lectureHost;
		}
		if(data[i][0].lectureName.length > 20){
			vlecture.lectures[i].lectureName = data[i][0].lectureName.substring(0,20) + '……';
		}
		else{
			vlecture.lectures[i].lectureName = data[i][0].lectureName;
		}
		vlecture.lectures[i].lectureTime = data[i][0].lectureTime;
		vlecture.lectures[i].lectureType = data[i][0].lectureType;
	}
}