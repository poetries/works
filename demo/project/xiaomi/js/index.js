//cate

$("#mi-topbar .topbar-cart").hover(function(){
	$(this).find(".cart-menu").fadeIn(500);
},function(){
	$(this).find(".cart-menu").fadeOut(500);
});

//search

$("#header .header-search form").find(".txt").focus(function(event) {
	$(this).parents("form").find(".show-list").fadeIn(400);
	$(this).parents("form").find(".border").removeClass("border").addClass('on');
	$(this).parents("form").find("p").hide();
	
}).blur(function(event) {
	/* Act on the event */
	$(this).parents("form").find(".show-list").fadeOut(400);
	$(this).parents("form").find(".on").removeClass("on").addClass("border");
	$(this).parents("form").find("p").show();
});

//隐藏的菜单

$("#header").find("ul li").hover(function() {
	$(this).parents("#header").find(".header-details ol li").eq($(this).index()).show().siblings().hide();
	$(this).parents("#header").addClass('on');
	$(this).parents("#header").find(".detail-bg").show();

},function(){
	$(this).parents("#header").find(".header-details ol li").hide();
	$(this).parents("#header").removeClass('on');
	$(this).parents("#header").find(".detail-bg").hide();
});

//nav

$("#banner .banner-aside").find(" ul li.item").hover(function() {
	$(".children",$(this)).show();
}, function() {
	$(".children",$(this)).hide();
});


//banner

var _index = 0;
var oTimer = null;
var oLi = $("#banner .banner-pic ul li").size();

function oBtnNext(){
	_index++;

	if (_index==oLi)
	{
		_index=0;
	}
	oBtnDo();
}
function oBtnDo(){
	$("#banner  .banner-wrap ul li").css("left","0px").eq(_index).fadeIn(50).siblings().fadeOut(50);
	$("#banner .banner-wrap ol li").eq(_index).addClass("active").siblings().removeClass("active");
}

$("#banner .banner-wrap .prev").click(function(){//prev
	_index--;

	if (_index<0)
	{
		_index=oLi-1;
	}
	oBtnDo();
	
});

$("#banner .banner-wrap .next").click(function(){//next
	oBtnNext();
	oBtnDo();
});

$("#banner .banner-wrap ol li").mouseover(function(){
		
		if (_index!=$(this).index())
		{
			if (_index<$(this).index())
			{
				var oWidth=$("#banner  .banner-wrap ul li").width();
				$("#banner  .banner-wrap ul li").eq(_index).animate({left:-oWidth},function(){
					$(this).hide();
				}).end().eq($(this).index()).show().css("left",oWidth).animate({left:0});
				_index=$(this).index();
				$(this).addClass("active").siblings().removeClass("active");
			}
			else{
				var oWidth=$("#banner  .banner-wrap ul li").width();
				$("#banner .banner-wrap ul li").eq(_index).animate({left:oWidth},function(){
					$(this).hide();
				}).end().eq($(this).index()).show().css("left",-oWidth).animate({left:0});
				_index=$(this).index();
				$(this).addClass("active").siblings().removeClass("active");
			}
		}
	});

//banner Timer

$("#banner .banner-wrap").hover(function(){
	clearInterval(oTimer);
},function(){
	oTimer = setInterval(oBtnNext,3000);
});

oTimer = setInterval(oBtnNext,3000);

//tabs-btn

$("#mi-star .more").find("a").click(function(){
	if ($(this).not(".no-click")) {
		$(".star-goods-content").find("ul").css("margin-left",-1240*$(this).index()+"px");
		$(this).addClass('no-click').siblings().removeClass('no-click');
	}
});
$("#recommend .more").find("a").click(function(){
	if ($(this).not(".no-click")) {
		$(".star-goods-content").find("ul").css("margin-left",-1240*$(this).index()+"px");
		$(this).addClass('no-click').siblings().removeClass('no-click');
	}
});

//tabs-toggle

$(".comm-content-right ul li").hover(function() {
	$(this).find(".comment").css('height',"80px");
}, function() {
	$(this).find(".comment").css('height',"0px");
});

function fnTab(objLi,objUl){
	objLi.mouseover(function(){
		objUl.eq($(this).index()).show().siblings().hide();
		$(this).addClass("active").siblings().removeClass("active");
	})
}

fnTab($("#match .topic .more li"),$("#match .comm-content-right ul"));
fnTab($("#parts .topic .more li"),$("#parts .comm-content-right ul"));
fnTab($("#around .topic .more li"),$("#around .comm-content-right ul"));

$("#content").find(".content-item").each(function(i,elem){
	(function (obj){
		var iNum=0;
		obj.find(".nextBtn").click(function(){
			if(iNum<3){
				iNum++;
				fntab();
			}
		})
		obj.find(".prevBtn").click(function(){
			if(iNum>0){
				iNum--;
				fntab();
			}
		})

		obj.find(".dotBtn").find("li").click(function(){
			iNum=$(this).index();
			fntab();
		})

		function fntab(){
			obj.find(".content-scroll").css("left",-296*iNum+"px");
			obj.find(".dotBtn").find("li").eq(iNum).addClass("on").siblings().removeClass("on");
		}
	})($(elem));
});
