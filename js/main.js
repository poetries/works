$(function(){
	//nav
	$(".side-nav li").click(function(e){
		e.preventDefault();
		var _index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".ui-content .ui-content-item").eq(_index).show().siblings().hide();
	});
	
});
