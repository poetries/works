(function($){
	$.fn.pagebar = function(){
		this.each(function(){
			var $this = $(this);
			var $width = $this.width();
			//alert($width); 710px
			var $size = $this.attr("page-size");
			var $content = $('ul.content',this);
			var mode=$this.attr("mode")||"page";
			var $itemWidth = $width/$size;
			var $itemsize = $content.children("li").width($itemWidth).size();
			
			var $prev = $('<a href="#" class="prev bar"></a>').appendTo($this);
			var $next = $('<a href="#" class="next bar"></a>').appendTo($this);

			$size = $itemsize%$size==0?$itemsize/$size:Math.ceil($itemsize/$size);
			$content.fadeIn(500);

			if (mode === 'page')
			{
				$this.attr("curr-page","0");
				$prev.click(function(){
				//alert(1);
				
				var $curr = $this.attr("curr-page");
				$curr = $curr==0?$size-1:--$curr;
				$this.attr("curr-page",$curr);
				//console.log($curr);
				$content.animate({left:-($curr*$width)},500);//$curr*$width 翻一页 移动710px

				});

				$next.click(function(){
					//alert(2);
					var $curr = $this.attr("curr-page");
					$curr = $curr==$size-1?0:++$curr;
					$this.attr("curr-page",$curr);
					//console.log($curr);
					$content.animate({left:-($curr*$width)},500);//$curr*$width 翻一页 移动710px
				});
			}else if(mode === 'item'){
				$prev.click(function(){
					
					$content.children("li:first").animate({width:0},500,function(){
						$content.append($(this).hide().css("width",$itemWidth));
						$(this).show();
					});
					
				});

				$next.click(function(){
					
					var $last = $content.children("li:last");
					$content.prepend($last.css("width",0).hide());
					$last.show().animate({width:$itemWidth},500);
					

				});
			}
			
		});

		//theme start

		$('#themes div.set_theme_item').hover(function(){
			var $src = $(this).attr('data-src');
			$('div.theme').css("background-image","url('img/"+$src+"')");
		},function(){
			var $src = $('div.theme').attr('data-src');
			$('div.theme').css("background-image","url('img/theme b_0.png')");
		});
	}
})(jQuery);