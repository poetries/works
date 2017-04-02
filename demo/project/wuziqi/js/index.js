/**
 * @CreateBy:   SublimeText3
 * @Author:     poetries
 * @DateTime:	2016-06-10 10:35:20
 */

//展示棋盘
//点击能下棋变色
//每次下棋要判断胜负
//如果胜负已经定 不允许下棋
//如果td有棋子也不允许下棋



function Qi(){
	var res = false;//本次下棋胜负是否以判定
	var tag = 'black';//默认是黑棋
	var winner = false; // 是否已判定胜负

	for (var i = 0,tds = document.getElementsByTagName('td'),len = tds.length; i < len; i++) {
		tds[i].num = i;//没有num这个属性 但是对象的属性是可以任意加减的
		tds[i].qi = 0;//下黑棋后期属性变为b 下白棋后 其属性变为w 给棋子加一个属性 用来标记是否已经下过棋 默认没下过  要是下过 标记 'b' 否则 标记'w'
	}

	document.getElementsByTagName('table')[0].onclick = function(ev){
		//这个函数从来做监听函数
		// alert('hahh ');
		
		ev = ev || window.event;//兼容 IE FF
		var tar = ev.srcElement || ev.target; // 兼容IE FF tar 点那个td就代表那个 单元格td  
		// alert(tar.num);
		
		xia.call(tar);//call apply方式(this就指：传哪个对象就指代哪个对象)

	}

//下棋动作 操作单元格
	var xia = function(){
		//判断棋局是否已经结束

		if(winner){
			alert('你输了,不能在下棋了');
			return;
		}
		//判断当前格子是否已经有棋子
		if(this.style.background.indexOf('gif')>0){//gif图片是字符串 有其字符串方法indexOf
			alert('不能重复下棋');
			return;
		}

		this.style.background = 'url(./images/'+tag+'.gif)';
		this.qi = tag == 'black'?'b':'w';//给棋子做标记
		tag = tag == 'black'?'white':'black';//交换棋权

/*		* 函数名.call(对象,参数1，参数2，参数3)
		*
		* 以fn.call(obj，'a','b')为例：

		* 实际效果相当于：
		* 1、fn内部的this指向了obj
		* 2、fn('a','b')
		* 
		**/

		//判断胜负
		judge.call(this);//this指代td

	}


	//判断胜负的功能

	var judge = function (){

		// console.log(getP os(this.num)); 
		
		var curr = getPos(this.num);
		var temp ;

		var line = ['','','',''];//数组里存四条线 分别代表 横、竖、右下、左下斜线

		for (var i = 0; i < 225; i++) {
			temp = getPos(i);

			if(temp.y == curr.y){//记录横线上的棋子
				line[0] = line[0] + tds[i].qi;
			}
			if(temp.x == curr.x){//记录竖线上的棋子
				line[1] = line[1] + tds[i].qi;
			}
			if((temp.x-curr.x) == (temp.y - curr.y)){//记录右下斜线
				line[2] = line[2] + tds[i].qi;
			}
			if ((temp.x + temp.y) == (curr.x + curr.y)) {//记录左下得斜线
				line[3] = line[3] + tds[i].qi;
			}
		}
		
		// alert(line[1]);
		
		//遍历四条线
		for (var j = 0; j < 4; j++) {
			if(line[j].indexOf('bbbbb')>=0){
				winner = 'black';
				break;//退出for循环
			}

		if(line[j].indexOf('wwwww')>=0){
			winner = 'white';
			break;//退出for循环
		}
		}

		if(winner){
			alert(winner+'获胜');
		}


}

//getPos专门负责把0-224位置格式化成坐标
var getPos = function (num){
	var pos = {};
	pos.y = parseInt(num/15);//this是指向单元格
	pos.x = num%15;

	return pos;
}

}



window.onload = function (){
	new Qi();
}