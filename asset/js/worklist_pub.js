window.addEventListener('load', function() {
	
	fn.wTab({
		btn : $('.w_tab'),
		content : $('.w_panel')
	});

	fn.wlistCont();
});

const fn = {
	wTab : function(v) {
		let $wTabPanel, $wTabBtn;
		console.log(v.btn, v.content)

		function init() {
			$wTabPanel = v.content;
			$wTabBtn = v.btn;
		}

		function event() {
			$wTabPanel.hide();
			$wTabBtn.find('li:first-child > a').addClass('active');
			$wTabPanel.first().show();


			$wTabBtn.find('a').each(function() {
				let $this = $(this);
				
				$this.on('click', function() {
					tabEvent($this);
				});
			});
		}

		function tabEvent(btn) {
			btn.parent().siblings().children().removeClass('active');
			btn.addClass('active');

			$wTabPanel.each(function(){
				let _panelthis = $(this);
				if(btn.attr('data-link') == _panelthis.attr('id')){
					_panelthis.show();
				} else {
					if(btn.attr('data-link') == 'all'){
						_panelthis.show();
					} else {
						_panelthis.hide();
					}
				}	
			});
		}
		init();
		event();
	},
	wlistCont : function() {
		$('.table_wrap tr').each(function() {
			let $td = $(this).find('td');	
			let $td_leng = $td.length;

			if(!!$td_leng){
				$td.eq(0).addClass('no');
				$td.eq(7).addClass('tc worker');
				$td.eq(8).addClass('tc');
				$td.eq(9).addClass('tc end');
				$td.eq(11).addClass('tc');
			}
		});

		$('.table_wrap tbody .end').each(function() {
			if(!$.trim($(this).html())==''){
				$(this).parent('tr').addClass('complete');
			}
		});

		$('.w_panel').each(function(){
			var $this = $(this),
				$noIdx = 1;
			$this.find('tbody tr').each(function(){
				if($(this).find('.no').length){
					$(this).find('.no').text($noIdx);
					$noIdx++;
				}
			});
		});

		var totalPageNum =  $('table:not(.tbl_guide) .no').length,
		completeTotalNum = $('table:not(.tbl_guide) .complete').length,
		perTotal = Math.round((100/totalPageNum)*completeTotalNum);

		$('.project_info_wrap .total .num').text(totalPageNum);
		$('.project_info_wrap .confirm .num').text(completeTotalNum);
		$('.project_info_wrap .ing .num').text(perTotal);
		$('.project_info_wrap .bar').css('width', perTotal+'%');
	}
} 