/**
 * 函数将从localStorage中读取用户名称和配色方案，然后调整导航栏的标题
 * 使其显示用户名称，改变文档元素的class，来选定配色方案
 */

//检测localStorage是否存在
var enableStorage = 'localStorage' in window;

//从localStorage中取回应用设置
var loadSettings = function(){
	if (enableStorage) {
		var name = localStorage.getItem("name");
		var	colorType = localStorage.getItem('colorType');
		var	nameDisplay = document.getElementById("todoTitle");
		var	colorTypeField = document.getElementById("colorType");
		var	nameFiled = document.getElementById("name-filed");
		
		if (name) {
			nameDisplay.innerHTML = name;
			nameFiled.value = "";
		}else {
			nameDisplay.innerHTML = "Todo List";
			nameFiled.value = '';
		}
		if (colorType) {
			$("#todoTitle").css("background",colorType);
		}
	}
}


var color1;

//颜色选择
$(".showColor").bigColorpicker(function(el,icolor){
	color1 = icolor;
});
$("#f333").bigColorpicker("f3","L",6);


//保存数据到localStorage中 只需利用setItem()方法，并将键值作为参数传入
//将用户名称和配色信息保存到localStorage中

var saveSettings = function(e) {
	e.preventDefault();
	if (enableStorage){
		var name = document.getElementById("name-filed").value;
			
		if (name.length > 0) {
			localStorage.setItem('name',name);
			localStorage.setItem('colorType',color1);
			loadSettings();//保存好数据后 更新应用
			alert("您的设置成功保存");
		} else {
			alert('请输入你的清单名字');
		}
	}else {
		alert("浏览器不支持localStorage");
	}
}

/**
 * 从localStorage中清除数据：
 * localStorage有两种清除数据的方法，第一个是removeItem，适用于删除单个数据
 * 第二种是clear，删除所有的数据
 */

/**
 * 清除后需要加载默认用户设置
 *
 */

var resetSettings = function(){
	//if (confirm("你确定删除所有的数据?","Reset Data")) {
		if (enableStorage) {
			localStorage.clear();
		}
		resetSettings();//数据清除后 将数据设置为默认状态
	//}
}


//将UI与localStorage函数连接起来
//将事件监听器添加到设置视图上，当用户按下按钮时，就能保存或重置数据
//还需要调用loadSeetings() 这样每次从localStorage中读取数据时，都重新加载到应用页面

loadSettings();
document.getElementById("save").addEventListener("click",saveSettings,false);
document.getElementById("reset").addEventListener("click",resetSettings,false);


