//用户 电脑 游戏

Function.prototype.extends = function(base,extend){//base函数 extend传进来的对象
	for(var prop in base){
		this.prototype[prop] = base.prototype[prop];
	}
	for(var prop in extend){
		this.prototype[prop] = extend[prop];
	}
}
function Player(name){
	this.name = name;
	this.point = 0;//点数 0：石头 1：剪刀 2：布
}
Player.prototype.guess = function(){}

function User(name){
	Player.call(this,name);//call调用Player的方法 是以当前User这个对象创建的空间调用的 此时Player中的this指代user中的this
}

User.extends(Player,{
	guess:function(point){
		return this.point = point; 
	}
});

function Comp(name){
	Player.call(this,name);
}

Comp.extends(Player,{
	guess:function(point){
		return this.point = (Math.random()*100<<2)%3; 
	}
});

var user = new User("小明");
var comp = new Comp("比克大魔王");


function Game(u,c){
	this.user = u;
	this.comp = c;
	this.init();
}

Game.prototype.init = function(){
	var names = document.getElementsByClassName("name");
	names[0].innerHTML = "您:"+this.user.name;
	names[1].innerHTML = "电脑:"+this.comp.name;
	
}

Game.prototype.play = function(){
	//alert(1);

	this.toggleButton();//让按钮失去功能 改变样式
	this.startAnimate();//开始猜拳动画
}
/*
Game.prototype.disabledButton = function(){
	var btn = document.getElementById("play");
	btn.disabled = true;
	btn.className = "disabled";
}
Game.prototype.enableButton = function(){
	var btn = document.getElementById("play");
	btn.disabled = false;
	btn.className = "";
	btn.innerHTML = "再玩一局";
}
*/
Game.prototype.toggleButton = function(){
	var btn = document.getElementById("play");
	if(btn.disabled ){
		btn.disabled = false;
		btn.className = "";
		btn.innerHTML = "再玩一局";
	}else{
		btn.disabled = true;
		btn.className = "disabled";
		btn.innerHTML = "游戏进行中";
	}
}

Game.prototype.startAnimate = function(){
	//让猜拳版面出现
	document.getElementsByClassName("guess")[0].style.display = "block";

	//改变提示文本
	this.changeText("请出拳...");

	var anims = document.getElementsByClassName("anim");
	//计时器
	var count=0;
	this._interval = window.setInterval(function(){
		anims[0].className = "anim user guess"+(count++)%3;
		anims[1].className = "anim user guess"+(count++)%3;
	},600);
}

Game.prototype.changeText = function(message){
	document.getElementsByClassName("text")[0].innerHTML = message;
}

Game.prototype.verdict = function(point){
	//停止定时器
	window.clearInterval(this._interval);
	//获取动画元素
	var anims = document.getElementsByClassName("anim");
	anims[0].className = 'anim user guess'+this.user.guess(point);
	anims[1].className = 'anim comp guess'+this.comp.guess();
	
	//alert(this.user.point);
	//让猜拳版面出现
	document.getElementsByClassName("guess")[0].style.display = "none";

	//输出结果

	var res = this.user.point - this.comp.point;
	switch(res){
		case 0:
			this.changeText("打成平手");
			break;
		case 1:
		case -2:
			this.changeText("555~我输了");
			break;
	    case -1:
		case 2:
			this.changeText("恭喜您~您赢了");
			break;
	}
	this.toggleButton();
}

var game = new Game(user,comp);

