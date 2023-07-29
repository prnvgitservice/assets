(function($) {
	"use strict";
	
	var base_url=$('#base_url').val();
	var BASE_URL=$('#base_url').val();
	var csrf_token=$('#csrf_token').val();
	var csrfName=$('#csrfName').val();
	var csrfHash=$('#csrfHash').val();
	
	$('.searchFilter').on('change',function(){
		searchFilter();
	}); 
	
	function searchFilter(page_num){
		page_num = page_num?page_num:0;
		var status = $('#status').val();
		var sortBy = $('#sortBy').val();

	//	alert(status);
	//	alert(sortBy);
		$.ajax({
			type: 'POST',
			url: base_url+'user-search/'+page_num,
			data:'page='+page_num+'&status='+status+'&sortBy='+sortBy+'&csrf_token_name='+csrf_token,
			beforeSend: function(){
				$('.loading').show();
			},
			success: function(html){
				$('#dataList').html(html);
				$('.loading').fadeOut("slow");
			}
		});
	}
})(jQuery);