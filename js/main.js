var backTop;
var navBar;
var focus;
var person;
var infor;
var xz;
var ajaxs;
var er;
var search;

function getDemo(ID){
	return document.getElementById(ID);
}
window.onload = function(){
	document.getElementsByTagName('html')[0].style.fontSize = (62.5 / 1366) * window.screen.availWidth + "%";

	backTop = new backTopObj();
	backTop.init();
	backTop.backTopBtn();

	navBar = new navBarObj();
	navBar.init();
	navBar.check();

	search = new searchObj();
	search.init();

	focus = new focusObj();
	focus.init();
	focus.container.addEventListener('mouseover',function(){clearInterval(focus.timer)},false);
	autoPlay();

	person = new personObj();
	person.init();

	infor = new inforObj();
	infor.init();
	sInfors();

	xz = new xzObj();
	xz.init();

	er = new erObj();
	er.init();
	for(var i=0; i<er.num; i++){
		er.changeBtn[i].addEventListener('mouseover',changeEr,false);
	}

	ajaxs = new ajaxsObj();
	ajaxs.init();
	for(var i=0; i<ajaxs.num; i++){
		getAjax(ajaxs.ajaxUrl[i],i+1);
	}

	window.onscroll = function(){
		navBar.left = document.documentElement.scrollLeft || document.body.scrollLeft;
		backTop.backTopBtn();
		navBar.check();
	}
}
