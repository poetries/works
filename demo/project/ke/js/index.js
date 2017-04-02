$(function(){
	//weixinICON
	var $button = $("#banner div.content div.nav-right-board div.button");
	$button.mouseover(function(){
		$(this).find("img",$(this)).show();
	});
	$button.mouseout(function(){
		$(this).find("img",$(this)).hide();
	});

	//hot-course-tab
	$("div.content div.course-nav ul.course-type li").mouseover(function(){
		$(this).addClass("curr").siblings().removeClass("curr");
		$($("a",$(this)).attr("for")).addClass("on").siblings().removeClass("on");
	});

	//banner
	var _index = 0;
	var oTimer = null;
	var oLi = $("#banner  div.big-banner ul li").size();

	function oBtnNext(){
		_index++;
		if (_index==oLi)
		{
			_index=0;
		}
		oBtnDo();
	}
	function oBtnDo(){
		$("#banner  div.big-banner ul li").css("left","0px").eq(_index).fadeIn().siblings().fadeOut();
		$("#banner div.big-banner ol li").eq(_index).addClass("curr-list").siblings().removeClass("curr-list");
	}


	//banner start
	$("#banner div.big-banner").hover(function(){
		clearInterval(oTimer);
	},function(){
		oTimer = setInterval(oBtnNext,3000);
	});

	oTimer = setInterval(oBtnNext,3000);

	$("#banner  div.big-banner a.next").click(function(){//next

		oBtnNext();
		oBtnDo();

	});

	$("#banner  div.big-banner a.prev").click(function(){//prev

		_index--;
		if (_index<0)
		{
			_index=oLi-1;
		}
		oBtnDo();
	});

	$("#banner div.big-banner ol li").mouseover(function(){
		//alert(1);
		if (_index!=$(this).index())
		{
			if (_index<$(this).index())
			{
				var oWidth=$("#banner  div.big-banner ul li").width();
				$("#banner  div.big-banner ul li").eq(_index).animate({left:-oWidth},function(){
					$(this).hide();
				}).end().eq($(this).index()).show().css("left",oWidth).animate({left:0});
				_index=$(this).index();
				$(this).addClass("curr-list").siblings().removeClass("curr-list");
			}
			else{
				var oWidth=$("#banner  div.big-banner ul li").width();
				$("#banner  div.big-banner ul li").eq(_index).animate({left:oWidth},function(){
					$(this).hide();
				}).end().eq($(this).index()).show().css("left",-oWidth).animate({left:0});
				_index=$(this).index();
				$(this).addClass("curr-list").siblings().removeClass("curr-list");
			}
		}
	});

	//authority

	$("#authority div.content div.lists a.prev").click(function(){//prev
		//alert(1);
		var _index1=0;
		var oLi1 = $("#authority div.content div.lists ul li").size();
		_index1--;
		if (_index1<0)
		{
			_index1=oLi1-1;
		}
		$("#authority div.content div.lists ul li").css("left","-110px").eq(_index1).fadeIn().siblings().fadeOut();
	});



});
