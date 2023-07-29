(function($) {
	"use strict";

	var base_url=$('#base_url').val();
	var BASE_URL=$('#base_url').val();
	var csrf_token=$('#csrf_token').val();
	var csrfName=$('#csrfName').val();
	var csrfHash=$('#csrfHash').val();
	
	$( document ).ready(function() {
		$('.select_from_time').on('change',function(){
			var id=$(this).attr('data-id');
			select_from_time(id);
		}); 
		$('.validate_time').on('click',function(){
			var id=$(this).attr('data-id');
			validate_time(id);
		}); 
		$('#update_service').on('submit',function(){
			var result=subCheck();
			return result;
		}); 
		
	});
	$(document).on('change','.daysfromtime_check',function(){
		var off_hour_array=['00:00 AM','00:30 AM','01:00 AM','01:30 AM','02:00 AM','02:30 AM','03:00 AM','03:30 AM','04:00 AM','04:30 AM','05:00 AM','05:30 AM','06:00 AM','06:30 AM','07:00 AM','07:30 AM','08:00 AM','08:30 AM','09:00 AM','09:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM','01:00 PM','01:30 PM','02:00 PM','02:30 PM','03:00 PM','03:30 PM','04:00 PM','04:30 PM','05:00 PM','05:30 PM','06:00 PM','06:30 PM','07:00 PM','07:30 PM','08:00 PM','08:30 PM','09:00 PM','09:30 PM','10:00 PM','10:30 PM','11:00 PM','11:30 PM'];
		var time = $(this).val();
		var select_html  = '<option value="">Select Time</option>';
		var check=0
		for (var i=0; i<off_hour_array.length; i++) {
			if(check==1){
				select_html += '<option id="to_time" value="'+off_hour_array[i]+'">'+off_hour_array[i]+'</option>';
			}
			if(off_hour_array[i] == time){
				check=1;
			}
		}
		
		$('.daystotime_check').html(select_html);
		//console.log(objselectobject);
	//	 var time_digit = parseInt(time);
		//var html= $('.daystotime_check').html();
	//	console.log(html);

		// var select_html  = '<option value="">Select Time</option>';

		// for(var i=1; i<=23; i++){
		// 	var nexttime =  parseInt(i);
		// 	if(nexttime.toString().length < 2){
		// 		nexttime = '0'+ parseInt(nexttime);
		// 	}
			

		// 	var timeval = nexttime+':00:00';
		// 	var timeString = nexttime+':00:00';
		// 	var H = +timeString.substr(0, 2);
		// 	var h = H % 12 || 12;
		// 	var ampm = H < 12 ? " AM" : " PM";
		// 	timeString = h + timeString.substr(2, 3) + ampm;
		// 	console.log(timeString); 
		// 	//alert(timeString); //return false;
		// 	if(time_digit != i && time_digit < i){
		// 		select_html += '<option id="to_time" value="'+timeString+'">'+timeString+'</option>';
		// 	}
		// }
		//$('.daystotime_check').html(select_html);
	});


	function select_from_time(id){
		var time = $(".eachdayfromtime"+id).val();
		var off_hour_array=['00:00 AM','00:30 AM','01:00 AM','01:30 AM','02:00 AM','02:30 AM','03:00 AM','03:30 AM','04:00 AM','04:30 AM','05:00 AM','05:30 AM','06:00 AM','06:30 AM','07:00 AM','07:30 AM','08:00 AM','08:30 AM','09:00 AM','09:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM','01:00 PM','01:30 PM','02:00 PM','02:30 PM','03:00 PM','03:30 PM','04:00 PM','04:30 PM','05:00 PM','05:30 PM','06:00 PM','06:30 PM','07:00 PM','07:30 PM','08:00 PM','08:30 PM','09:00 PM','09:30 PM','10:00 PM','10:30 PM','11:00 PM','11:30 PM'];
		var select_html  = '<option value="">Select Time</option>';
		var check=0
		for (var i=0; i<off_hour_array.length; i++) {
			if(check==1){
				select_html += '<option value="'+off_hour_array[i]+'">'+off_hour_array[i]+'</option>';
			}
			if(off_hour_array[i] == time){
				check=1;
			}
		}
		
		$('.eachdaytotime'+id).html(select_html);







		// var time_digit = parseInt(time);
		// var select_html  = '<option value="">Select Time</option>';

		// for(var i=1; i<=23; i++){
		// 	var nexttime =  parseInt(i);
		// 	if(nexttime.toString().length < 2){
		// 		nexttime = '0'+ parseInt(nexttime);
		// 	}

		// 	var timeval = nexttime+':00:00';
		// 	var timeString = nexttime+':00:00';
		// 	var H = +timeString.substr(0, 2);
		// 	var h = H % 12 || 12;
		// 	var ampm = H < 12 ? " AM" : " PM";
		// 	timeString = h + timeString.substr(2, 3) + ampm;

		// 	if(time_digit != i && time_digit < i){
		// 		select_html += '<option value="'+timeString+'">'+timeString+'</option>';
		// 	}
		// }
		// $('.eachdaytotime'+id).html(select_html);
	}
       
	function subCheck() {
		var test =true; 
		if ($(".days_check").prop('checked')==true){
			var all_from=$(".daysfromtime_check").val();
			var all_to=$(".daystotime_check").val();

			if(all_from=='' || all_to==''){
				swal({
					title: "Wrong Selection !",
					text: "Please Select Day Relevant From & To Time....!",
					icon: "error",
					button: "okay",
				});
				test=false;

			}

		}else{
			var row=1;
			$('.eachdays').each(function(){
				if ($(".eachdays"+row).prop('checked')==true){
					var from_time=$('.eachdayfromtime'+row).val();
					var to_time=$('.eachdaytotime'+row).val();
					if(from_time=='' || to_time==''){
						swal({
							title: "Wrong Selection...!",
							text: "Please Select Day Relevant From & To Time....!",
							icon: "error",
							button: "okay",
						});

						test=false;
					}

				}

				/*from time validate*/

				if($('.eachdayfromtime'+row).val() !=''){


					var to_time=$('.eachdaytotime'+row).val();

					if($(".eachdays"+row).prop('checked')==false || to_time ==''){
						swal({
							title: "Wrong Selection...!",
							text: "Please Select All Day Relevant From & To Time....!",
							icon: "error",
							button: "okay",
						});

						test=false;
					}

				}

				/*to time Validate*/

				if($('.eachdaytotime'+row).val()!=''){
					var from_time=$('.eachdaytotime'+row).val();
					if($(".eachdays"+row).prop('checked')==false || from_time ==''){
						swal({
							title: "Wrong Selection...!",
							text: "Please Select Day Relevant From & To Time....!",
							icon: "error",
							button: "okay",
						});

						test=false;
					}

				}
				row=row+1;   
			})

		}

		return test;

	}

	function validate_time(id){
		if($('.eachdays'+id).prop('checked')==true){
			$('.eachdayfromtime'+id).val('');
			$('.eachdaytotime'+id).val('');

			var t_val=0;
			$(".err_check").each(function(){
				if ($(this).prop('checked')==true){ 
					t_val+=Number($(this).val());
					$('.eachdayfromtime'+id).val('');
					$('.eachdaytotime'+id).val('');
				}

				if(t_val==0){
					$("#time_submit").attr("disabled", true);
				}else{
					$("#time_submit").removeAttr("disabled");
				}
			})
		}else{ 
			$(".err_check").each(function(){
				if ($(this).prop('checked')==false){  

					$('.days_check').attr('checked',false);
					$('.daysfromtime_check').val('');
					$('.daystotime_check').val('');
					
					t_val+=Number($(this).val());
					$('.eachdayfromtime'+id+'[value=""]').attr('selected', 'selected');
					$('.eachdayfromtime'+id).val("");
					select_from_time(id);
				}


			})
		}
	}

})(jQuery);