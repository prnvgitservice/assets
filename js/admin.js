(function($) {
  "use strict";
  var csrf_token=$('#admin_csrf').val();
  var base_url=$('#base_url').val();


	// Variables declarations
	
	var $wrapper = $('.main-change_languagewrapper');
	var $wrapper1 = $('.main-wrapper');
	var $pageWrapper = $('.page-wrapper');
	var $slimScrolls = $('.slimscroll');

	$( document ).ready(function() {
        $('#save_profile_change').on('click',function(){
            changeAdminProfile();
        });
  
        $('#adminmail').on('blur',function(){
    	   var email = $('#adminmail').val();
           $.ajax({
             type:'POST',
             url: base_url+'admin/profile/check_admin_mail',
             data :  {email:email,csrf_token_name:csrf_token},
             success:function(response)
             {
               if(response==1)
               {
        		 
        		 $("#email_error").html("Email ID already exist...!");
        		 $("#save_profile_change").prop("disabled",true);
               }
               else {
        		$("#email_error").html("");
        		$("#save_profile_change").prop("disabled",false);
              }
            }
          });
        });
  
  
        $('#upload_images').on('click',function(){
            upload_images();
        }); 
    });

    $(document).on('change', '.change_auto_approval_status', function() {
        var approveStatus= $('#auto_approval').prop('checked');
        if(approveStatus==true) {
            var status=1;
        }
        else {
            var status=0;
        }
        $.post(base_url+'admin/service/changeAutoApprovalStatus',{status:status,csrf_token_name:csrf_token},function(data){
            if(data=="1"){
                swal({
                    title: "Service Status",
                    text: "Service Status Changed SuccessFully....!",
                    icon: "success",
                    button: "okay",
                    closeOnEsc: false,
                    closeOnClickOutside: false
                }).then(function(){
                    location.reload();
                });
            } else if(data=="2") {
                swal({
                    title: "Service Status",
                    text: "Unable to change the status in Demo mode",
                    icon: "failure",
                    button: "okay",
                    closeOnEsc: false,
                    closeOnClickOutside: false
                }).then(function(){
                    location.reload();
                });
            } else {
                swal({
                    title: "Service Status",
                    text: "Something went wrong, Try again later!!",
                    icon: "failure",
                    button: "okay",
                    closeOnEsc: false,
                    closeOnClickOutside: false
                }).then(function(){
                    location.reload();
                });
            }
            
        });
    }); 
    // editor
	if ($('#editor').length > 0) {
		ClassicEditor.create( document.querySelector( '#editor' ), {
			toolbar: {
                items: [
                    'heading', '|',
                    'fontfamily', 'fontsize', '|',
                    'alignment', '|',
                    'fontColor', 'fontBackgroundColor', '|',
                    'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
                    'link', '|',
                    'outdent', 'indent', '|',
                    'bulletedList', 'numberedList', 'todoList', '|',
                    'code', 'codeBlock', '|',
                    'insertTable', '|',
                    'uploadImage', 'blockQuote', '|',
                    'undo', 'redo'
                ],
                shouldNotGroupWhenFull: true
            }
		} )
		.then( editor => {
			window.editor = editor;
		} )
		.catch( err => {
			console.error( err.stack );
		} );
	}	
	// Sidebar
	var Sidemenu = function() {
		this.$menuItem = $('#sidebar-menu a');
	};
	
	function init() {
		var $this = Sidemenu;
		$('#sidebar-menu a').on('click', function(e) {
			if($(this).parent().hasClass('submenu')) {
				e.preventDefault();
			}
			if(!$(this).hasClass('subdrop')) {
				$('ul', $(this).parents('ul:first')).slideUp(350);
				$('a', $(this).parents('ul:first')).removeClass('subdrop');
				$(this).next('ul').slideDown(350);
				$(this).addClass('subdrop');
			} else if($(this).hasClass('subdrop')) {
				$(this).removeClass('subdrop');
				$(this).next('ul').slideUp(350);
			}
		});
		$('#sidebar-menu ul li.submenu a.active').parents('li:last').children('a:first').addClass('active').trigger('click');
	}
	
	// Sidebar Initiate
	init();
	
	// Mobile menu sidebar overlay
	
	$('body').append('<div class="sidebar-overlay"></div>');
	$(document).on('click', '#mobile_btn', function() {
		$wrapper1.toggleClass('slide-nav');
		$('.sidebar-overlay').toggleClass('opened');
		$('html').addClass('menu-opened');
		return false;
	});
	
	// Sidebar overlay
	
	$(".sidebar-overlay").on("click", function () {
		$wrapper1.removeClass('slide-nav');
		$(".sidebar-overlay").removeClass("opened");
		$('html').removeClass('menu-opened');
	});	
	
	// Select 2
	//minimumResultsForSearch: -1,
	if ($('.select').length > 0) {
		$('.select').select2({
			
			width: '100%'
		});
	}

	$(document).on('click', '#filter_search', function() {
		$('#filter_inputs').slideToggle("slow");
	});

	// Datetimepicker
	
	if($('.datetimepicker').length > 0 ){
		$('.datetimepicker').datetimepicker({
			format: 'DD-MM-YYYY',
			icons: {
				up: "fas fa-angle-up",
				down: "fas fa-angle-down",
				next: 'fas fa-angle-right',
				previous: 'fas fa-angle-left'
			}
		});
		$('.datetimepicker').on('dp.show',function() {
			$(this).closest('.table-responsive').removeClass('table-responsive').addClass('temp');
		}).on('dp.hide',function() {
			$(this).closest('.temp').addClass('table-responsive').removeClass('temp')
		});
	}
  $('.start_date').datetimepicker({
    format: 'DD-MM-YYYY',
    icons: {
      up: "fas fa-angle-up",
      down: "fas fa-angle-down",
      next: 'fas fa-angle-right',
      previous: 'fas fa-angle-left'
    }
  });
  $('.start_date').on('dp.show',function() {
    $(this).closest('.table-responsive').removeClass('table-responsive').addClass('temp');
  }).on('dp.hide',function(e) {
    $('.end_date').data("DateTimePicker").minDate(e.date)
    $(this).closest('.temp').addClass('table-responsive').removeClass('temp')
  });
  $('.end_date').datetimepicker({
    format: 'DD-MM-YYYY',
    icons: {
      up: "fas fa-angle-up",
      down: "fas fa-angle-down",
      next: 'fas fa-angle-right',
      previous: 'fas fa-angle-left'
    }
  });
  $('.end_date').on('dp.show',function() {
    $(this).closest('.table-responsive').removeClass('table-responsive').addClass('temp');
  }).on('dp.hide',function() {
    $(this).closest('.temp').addClass('table-responsive').removeClass('temp')
  });

	// Tooltip
	
	if($('[data-toggle="tooltip"]').length > 0 ){
		$('[data-toggle="tooltip"]').tooltip();
	}
	
    // Datatable

    if ($('.datatable').length > 0) {
      $('.datatable').DataTable({
        "bFilter": false,
        columnDefs: [{ orderable: false, "targets": -1 }] /* -1 = 1st colomn, starting from the right */

      });
    }
    $('.revenue_table').DataTable({ columnDefs: [
      { orderable: false, targets: -1 }
   ]});
    $('.language_table').DataTable();
    $('.completed_payout').DataTable();

    
    $('.categories_table').DataTable({
      columnDefs: [
        { orderable: false, targets: -1 }
     ]
    });
    $('.ratingstype_table').DataTable({
      columnDefs: [
        { orderable: false, targets: -1 }
     ]
    });
    $('.service_table').DataTable({
      columnDefs: [
        { orderable: false, targets: -1 }
     ]
    });
    $('.payment_table').DataTable({
     
    });
    
    $('.earnings_table').DataTable({
      columnDefs: [
        { orderable: false, targets: -1 }
     ]
    });
    $('.weblanguages').DataTable({
      columnDefs: [
        { orderable: false, targets: -1 }
     ]
    });
    $('.blogcategories_table').DataTable({
      columnDefs: [
        { orderable: false, targets: -1 }
     ]
    });
    $('.blogcomments_table').DataTable({
      columnDefs: [
        { orderable: false, targets: -1 }
     ]
    });
    

    

    // Owl Carousel

    if ($('.images-carousel').length > 0) {
      $('.images-carousel').owlCarousel({
       loop: true,
       center: true,
       margin: 10,
       responsiveClass: true,
       responsive: {
        0: {
         items: 1
       },
       600: {
         items: 1
       },
       1000: {
         items: 1,
         loop: false,
         margin: 20
       }
     }
   });
    }

	// Sidebar Slimscroll

	if($slimScrolls.length > 0) {
		$slimScrolls.slimScroll({
			height: 'auto',
			width: '100%',
			position: 'right',
			size: '7px',
			color: '#ccc',
			allowPageScroll: false,
			wheelStep: 10,
			touchScrollStep: 100
		});
		var wHeight = $(window).height() - 60;
		$slimScrolls.height(wHeight);
		$('.sidebar .slimScrollDiv').height(wHeight);
		$(window).resize(function() {
			var rHeight = $(window).height() - 60;
			$slimScrolls.height(rHeight);
			$('.sidebar .slimScrollDiv').height(rHeight);
		});
	}
	
	// Small Sidebar

	$(document).on('click', '#toggle_btn', function() {
		if($('body').hasClass('mini-sidebar')) {
			$('body').removeClass('mini-sidebar');
			$('.subdrop + ul').slideDown();
		} else {
			$('body').addClass('mini-sidebar');
			$('.subdrop + ul').slideUp();
		}
		setTimeout(function(){ 
			mA.redraw();
			mL.redraw();
		}, 300);
		return false;
	});
	
	$(document).on('mouseover', function(e) {
		e.stopPropagation();
		if($('body').hasClass('mini-sidebar') && $('#toggle_btn').is(':visible')) {
			var targ = $(e.target).closest('.sidebar').length;
			if(targ) {
				$('body').addClass('expand-menu');
				$('.subdrop + ul').slideDown();
			} else {
				$('body').removeClass('expand-menu');
				$('.subdrop + ul').slideUp();
			}
			return false;
		}
		
		$(window).scroll(function() {
      if ($(window).scrollTop() >= 30) {
        $('.header').addClass('fixed-header');
      } else {
        $('.header').removeClass('fixed-header');
      }
    });
		
	});

    $(document).on('click', '#loginSubmit', function() {
        $("#adminSignIn").submit();
    });

  $('#adminSignIn').bootstrapValidator({
    fields: {
      username:   {
        validators:          {
          notEmpty:              {
            message: 'Please enter your Username'
          }
        }
      },
      password:           {
        validators:           {
          notEmpty:               {
            message: 'Please enter your Password'
          }
        }
      }
    }
  }).on('success.form.bv', function(e) {

    var username = $('#username').val();
    var password = $('#password').val();
    $.ajax({
     type:'POST',
     url: base_url+'admin/login/is_valid_login',
     data :  $('#adminSignIn').serialize(),
     success:function(response)
     {
       if(response==1)
       {
         window.location = base_url+'dashboard';
       }
       else {
        swal({
            title: "Wrong Credentials..!",
            text: "Invalid login credentials..",
            icon: "error",
            button: "okay",
            closeOnEsc: false,
            closeOnClickOutside: false
          }).then(function(){
            location.reload();
          });
      }
    }
  });
    return false;
}); 

$('#add_payout').bootstrapValidator({
    fields: {
      provider_id:   {
        validators:          {
          notEmpty:              {
            message: 'Please select any one provider'
          }
        }
      },
      payout_method:           {
        validators:           {
          notEmpty:               {
            message: 'Please select any one payment option'
          }
        }
      },
      payout_amount:           {
        validators:           {
          notEmpty:               {
            message: 'Please enter amount'
          }
        }
      },
      payout_amount:   {
        validators: {
          remote: {
            url: base_url + 'admin/payouts/walletAmtCheck',
            data: function(validator) {
              return {
                payout_amount: validator.getFieldElements('payout_amount').val(),
                provider_id: validator.getFieldElements('provider_id').val(),
                csrf_token_name:csrf_token
              };
            },
            message: 'Insufficient wallet amount',
            type: 'POST'
          },
          notEmpty: {
            message: 'Please enter amount'

          }
        }
      },
      payout_status:           {
        validators:           {
          notEmpty:               {
            message: 'Please select payment status'
          }
        }
      },
    }
  }).on('success.form.bv', function(e) {
        return true;
  });


  $('#forgotpwdadmin').bootstrapValidator({
    fields: {
      email:   {
        validators:          {
          notEmpty:              {
            message: 'Please enter your Email ID'
          }
        }
      }
    }
  }).on('success.form.bv', function(e) {

    var email = $('#email').val();
    $.ajax({
     type:'POST',
     url: base_url+'admin/login/check_forgot_pwd',
     data :  $('#forgotpwdadmin').serialize(),
     success:function(response)
     {
       if(response==1)
       {
		 $("#err_frpwd").html("Reset link has been sent to your mail ID, Check your mail.").css("color","green");
       }
       else {
		$("#err_frpwd").html("Email ID Not Exist...!").css("color","red");
      }
    }
  });
    return false;
}); 



  $('#resetpwdadmin').bootstrapValidator({
    fields: {
      new_password:   {
        validators:          {
          notEmpty:              {
            message: 'Please enter your New Password'
          }
        }
      },
	  
	  confirm_password:   {
        validators:          {
          notEmpty:              {
            message: 'Please enter your Confirm Password'
          }
        }
      }
    }
  }).on('success.form.bv', function(e) {

    var new_password = $('#new_password').val();
    var confirm_password = $('#confirm_password').val();
	
	if(new_password == confirm_password)
	{
		$.ajax({
		 type:'POST',
		 url: base_url+'admin/login/save_reset_password',
		 data :  $('#resetpwdadmin').serialize(),
		 success:function(response)
		 {
		   if(response==1)
		   {
			 $("#err_respwd").html("Password Changed SuccessFully...!").css("color","green");
			 window.location = base_url+'admin';
		   }
		   else {
			$("#err_respwd").html("Something went wrong...!").css("color","red");
		  }
		}
	  });
	}
	else
	{
		$("#err_respwd").html("Password Mismatch...!").css("color","red");
		
	}
    
    return false;
}); 


  $('#addSubscription').bootstrapValidator({
    fields: {
      subscription_name:   {
        validators: {
          remote: {
            url: base_url + 'service/check_subscription_name',
            data: function(validator) {
              return {
                subscription_name: validator.getFieldElements('subscription_name').val(),
                csrf_token_name:csrf_token
              };
            },
            message: 'This subscription name is already exist',
            type: 'POST'
          },
          notEmpty: {
            message: 'Please enter subscription name'

          }
        }
      },
      amount:           {
        validators:           {
          notEmpty:               {
            message: 'Please enter subscription amount'
          }
        }
      },
      duration:           {
        validators:           {
          notEmpty:               {
            message: 'Please select subscription duration'
          }
        }
      }
    }
  }).on('success.form.bv', function(e) {

   
    return true;
        }); 
        
  $('#add_app_keywords').bootstrapValidator({
    fields: {
      page_name:   {
        validators: {
          notEmpty: {
            message: 'Please enter page name'

          }
        }
      },                
  }
}).on('success.form.bv', function(e) {


  return true;
});

  $('#add_language').bootstrapValidator({
    fields: {
      language_name:   {
        validators: {
          notEmpty: {
            message: 'Please enter language name'

          }
        }
      },
      language_value:   {
        validators: {
          notEmpty: {
            message: 'Please enter language value'

          }
        }
      },
      language_type:   {
        validators: {
          notEmpty: {
            message: 'Please enter language type'

          }
        }
      },                  
  }
}).on('success.form.bv', function(e) {


  return true;
});

  $('#admin_settings').bootstrapValidator({
    fields: {
      website_name:   {
        validators: {
          notEmpty: {
            message: 'Please enter website name'

          }
        }
      },
      contact_details:   {
        validators: {
          notEmpty: {
            message: 'Please enter contact details'

          }
        }
      },
      mobile_number:   {
        validators: {
          notEmpty: {
            message: 'Please enter mobile number'

          }
        }
      },
	currency_option:   {
        validators: {
          notEmpty: {
            message: 'Please select currency'

          }
        }
      },
	commission:   {
        validators: {
          notEmpty: {
            message: 'Please enter commission amount'

          }
        }
      },
	  
	  login_type:   {
        validators: {
          notEmpty: {
            message: 'Please select Login type'

          }
        }
      },
	paypal_gateway:   {
        validators: {
          notEmpty: {
            message: 'Please enter paypal gateway'

          }
        }
      },
	braintree_key:   {
        validators: {
          notEmpty: {
            message: 'Please enter braintree key'

          }
        }
      },
	site_logo:           {
		   validators:           {
			file: {
			  extension: 'jpeg,png,jpg',
			  type: 'image/jpeg,image/png,image/jpg',
			  message: 'The selected file is not valid. Only allowed jpeg,jpg,png files'
			}
		  }
		},
	favicon:           {
		   validators:           {
			file: {
			  extension: 'png,ico',
			  type: 'image/png,image/ico',
			  message: 'The selected file is not valid. Only allowed ico,png files'
			}
			
		  }
		},	
  }
}).on('success.form.bv', function(e) {


  return true;
});

$('#map_settings').bootstrapValidator({
    fields: {
        map_key:   {
            validators: {
                notEmpty: {
                    message: 'Please enter google map API key'
                }
            }
        },
    }
}).on('success.form.bv', function(e) {
  return true;
});

$('#apikey_settings').bootstrapValidator({
    fields: {
        firebase_server_key:   {
            validators: {
                notEmpty: {
                    message: 'Please enter Firebase server key'
                }
            }
        },
    }
}).on('success.form.bv', function(e) {
  return true;
});

$('#social_settings').bootstrapValidator({
    fields: {
        login_type:   {
            validators: {
                notEmpty: {
                    message: 'Please select any one option'
                }
            }
        },
        otp_by:   {
            validators: {
                notEmpty: {
                    message: 'Please select any one option'
                }
            }
        },
    }
}).on('success.form.bv', function(e) {
  return true;
});

$('#general_settings').bootstrapValidator({
    fields: {
        website_name:   {
            validators: {
                notEmpty: {
                    message: 'Please enter website name'
                }
            }
        },
        contact_details:   {
            validators: {
                notEmpty: {
                    message: 'Please enter contact details'
                }
            }
        },
        mobile_number:   {
            validators: {
                notEmpty: {
                    message: 'Please enter mobile number'
                }
            }
        },
        language:   {
            validators: {
                notEmpty: {
                    message: 'Please select one language'
                }
            }
        },
        currency_option:   {
            validators: {
                notEmpty: {
                    message: 'Please select one option'
                }
            }
        },
        radius:   {
            validators: {
                notEmpty: {
                    message: 'Please select range of radius'
                }
            }
        },
        location_type:   {
            validators: {
                notEmpty: {
                    message: 'Please select language type'
                }
            }
        }
    }
}).on('success.form.bv', function(e) {
  return true;
});

$('#seo_settings').bootstrapValidator({
    fields: {
        meta_title:   {
            validators: {
                notEmpty: {
                    message: 'Please enter Meta Title '
                }
            }
        },
        meta_desc:   {
            validators: {
                notEmpty: {
                    message: 'Please enter Meta Description '
                }
            }
        },
    }
}).on('success.form.bv', function(e) {
  return true;
});

$('#image_settings').bootstrapValidator({
    fields: {
        logo_front:   {
            validators: {
                file: {
                    extension: 'jpeg,png,jpg',
                    type: 'image/jpeg,image/png,image/jpg',
                    message: 'The selected file is not valid. Only allowed jpeg,jpg,png files'
                },
            }
        },
        favicon:   {
            validators: {
                file: {
                    extension: 'jpeg,png,jpg',
                    type: 'image/jpeg,image/png,image/jpg',
                    message: 'The selected file is not valid. Only allowed jpeg,jpg,png files'
                },
            }
        },
        header_icon:   {
            validators: {
                file: {
                    extension: 'jpeg,png,jpg',
                    type: 'image/jpeg,image/png,image/jpg',
                    message: 'The selected file is not valid. Only allowed jpeg,jpg,png files'
                },
            }
        },
    }
}).on('success.form.bv', function(e) {
  return true;
});

$('#placeholder_settings').bootstrapValidator({
    fields: {
        service_placeholder_image:   {
            validators: {
                file: {
                    extension: 'jpeg,png,jpg',
                    type: 'image/jpeg,image/png,image/jpg',
                    message: 'The selected file is not valid. Only allowed jpeg,jpg,png files'
                },
               
            }
        },
        profile_placeholder_image:   {
            validators: {
                file: {
                    extension: 'jpeg,png,jpg',
                    type: 'image/jpeg,image/png,image/jpg',
                    message: 'The selected file is not valid. Only allowed jpeg,jpg,png files'
                },
             
            }
        },
    }
}).on('success.form.bv', function(e) {
  return true;
});

// $('#add_roles').bootstrapValidator({
//     fields: {
//         role_name_:   {
//             validators: {
//                 notEmpty: {
//             message: 'Please enter role name'

//           }
               
//             }
//         },
//         selectall1:   {
//             validators: {
//                 notEmpty: {
//             message: 'Please select any access module'

//           }
               
//             }
//         },
//     }
// }).on('success.form.bv', function(e) {
//   return true;
// });

  $('#add_category').bootstrapValidator({
    fields: {
      category_name:   {
        validators: {
          remote: {
            url: base_url + 'categories/check_category_name',
            data: function(validator) {
              return {
                category_name: validator.getFieldElements('category_name').val(),
                csrf_token_name:csrf_token
              };
            },
            message: 'This category name is already exist',
            type: 'POST'
          },
          stringLength: {
                    min : 1, 
                    max: 100,
                    message: "Category name must be between 1 and 100 characters long"
                },
          notEmpty: {
            message: 'Please enter category name'

          }
        }
      },
      category_slug:   {
        validators: {
          notEmpty: {
            message: 'Please enter category slug'

          }
        }
      },
     /* category_image:           {
       validators:           {
        file: {
          extension: 'jpeg,png,jpg',
          type: 'image/jpeg,image/png,image/jpg',
          message: 'The selected file is not valid. Only allowed jpeg,jpg,png files'
        },
        notEmpty:               {
          message: 'Please upload category image'
        }
      }
    },*/
    category_mobile_icon:           {
      validators:           {
        file: {
          extension: 'jpeg,png',
          type: 'image/jpeg,image/png',
          message: 'The selected file is not valid. Only allowed jpeg,png files'
        },

        notEmpty:               {
          message: 'Please upload category mobile icon'
        }
      }
    }                    
  }
}).on('success.form.bv', function(e) {


  return true;
});  

$('#update_category').bootstrapValidator({
  fields: {
    category_name:   {
      validators: {
        remote: {
          url: base_url + 'categories/check_category_name',
          data: function(validator) {
            return {
              category_name: validator.getFieldElements('category_name').val(),
              csrf_token_name:csrf_token,
              category_id: validator.getFieldElements('category_id').val()
            };
          },
          message: 'This category name is already exist',
          type: 'POST'
        },
        notEmpty: {
          message: 'Please enter category name'

        }
      }
    },
    category_slug:   {
      validators: {
        notEmpty: {
          message: 'Please enter category slug'

        }
      }
    },
     category_image:           {
       validators:           {
        file: {
          extension: 'jpeg,png,jpg',
          type: 'image/jpeg,image/png,image/jpg',
          message: 'The selected file is not valid. Only allowed jpeg,jpg,png files'
        }
      }
    },

  }
}).on('success.form.bv', function(e) {


  return true;
        });  
        $('#add_blog_category').bootstrapValidator({
          fields: {
            name:   {
              validators: {
                remote: {
                  url: base_url + 'blog_categories/check_category_name',
                  data: function(validator) {
                    return {
                      category_name: validator.getFieldElements('name').val(),
                      csrf_token_name:csrf_token
                    };
                  },
                  message: 'This category name is already exist',
                  type: 'POST'
                },
                stringLength: {
                          min : 1, 
                          max: 100,
                          message: "Category name must be between 1 and 100 characters long"
                      },
                notEmpty: {
                  message: 'Please enter category name'
      
                }
              }
            },
            category_order:           {
             validators:           {
              notEmpty:               {
                message: 'Please enter category order'
              }
            }
          }                   
        }
      }).on('success.form.bv', function(e) {
      
      
        return true;
      });  
      
      $('#update_blog_category').bootstrapValidator({
        fields: {
            name:   {
              validators: {
                remote: {
                  url: base_url + 'blog_categories/check_category_name',
                  data: function(validator) {
                    return {
                      category_name: validator.getFieldElements('name').val(),
                      csrf_token_name:csrf_token
                    };
                  },
                  message: 'This category name is already exist',
                  type: 'POST'
                },
                stringLength: {
                          min : 1, 
                          max: 100,
                          message: "Category name must be between 1 and 100 characters long"
                      },
                notEmpty: {
                  message: 'Please enter category name'
      
                }
              }
            },
            category_order:           {
            validators:           {
              notEmpty:               {
                message: 'Please enter category order'
              }
            }
          }                   
        }
      }).on('success.form.bv', function(e) {
      
      
        return true;
              }); 
        $('#add_blog').bootstrapValidator({
          fields: {
            title:   {
              validators: {
                notEmpty: {
                  message: 'Please enter Blog Title'
      
                }
              }
            },
            lang_id:           {
             validators:           {
              notEmpty:               {
                message: 'Please enter category order'
              }
            }
          },
          category_id:           {
           validators:           {
            notEmpty:               {
              message: 'Please Select Blog Category'
            }
          }
        },
        content:           {
         validators:           {
          notEmpty:               {
            message: 'Please enter content'
          }
        }
      }             
        }
      }).on('success.form.bv', function(e) {
      
      
        return true;
      });  
      
      $('#update_blog').bootstrapValidator({
        fields: {
          title:   {
            validators: {
              notEmpty: {
                message: 'Please enter Blog Title'
    
              }
            }
          },
          lang_id:           {
           validators:           {
            notEmpty:               {
              message: 'Please enter category order'
            }
          }
        },
        category_id:           {
         validators:           {
          notEmpty:               {
            message: 'Please Select Blog Category'
          }
        }
      },
      content:           {
       validators:           {
        notEmpty:               {
          message: 'Please enter content'
        }
      }
    }             
      }
      }).on('success.form.bv', function(e) {
      
      
        return true;
              }); 

        $('#update_banner').bootstrapValidator({
          fields: {
            banner_content: {
              validators:           {
                notEmpty: {
                  message: 'Content is required'
        
                },
            }
          },
            banner_sub_content: {
              validators:           {
                notEmpty: {
                  message: 'Sub content is required'
        
                },
            }
          },
        
          }
        }).on('success.form.bv', function(e) {
          var img_err = $('.img_err').text();
          if(img_err == '') {
            return true;
          } else {
            return false;
          }
          
                });   

$('#add_subcategory').bootstrapValidator({
  fields: {
    subcategory_name:   {
      validators: {
        remote: {
          url: base_url + 'categories/check_subcategory_name',
          data: function(validator) {
            return {
              category: validator.getFieldElements('category').val(),
              csrf_token_name:csrf_token,
              subcategory_name: validator.getFieldElements('subcategory_name').val()
            };
          },
          message: 'This sub category name is already exist',
          type: 'POST'
        },
        notEmpty: {
          message: 'Please enter sub category name'

        }
      }
    },
    subcategory_slug:   {
      validators: {
        notEmpty: {
          message: 'Please enter category slug'

        }
      }
    },
   /* subcategory_image:           {
       validators:           {
        file: {
          extension: 'jpeg,png,jpg',
          type: 'image/jpeg,image/png,image/jpg',
          message: 'The selected file is not valid. Only allowed jpeg,jpg,png files'
        },
        notEmpty:               {
          message: 'Please upload sub category image'
        }
      }
    },*/
    category:           {
      validators:           {
        notEmpty:               {
          message: 'Please select category'
        }
      }
    }                  
  }
}).on('success.form.bv', function(e) {


  return true;
});  



$('#update_subcategory').bootstrapValidator({
  fields: {
    subcategory_name:   {
      validators: {
        remote: {
          url: base_url + 'categories/check_subcategory_name',
          data: function(validator) {
            return {
              category: validator.getFieldElements('category').val(),
              subcategory_name: validator.getFieldElements('subcategory_name').val(),
              csrf_token_name:csrf_token,
              subcategory_id: validator.getFieldElements('subcategory_id').val()
            };
          },
          message: 'This sub category name is already exist',
          type: 'POST'
        },
        notEmpty: {
          message: 'Please enter sub category name'

        }
      }
    },
    subcategory_slug:   {
      validators: {
        notEmpty: {
          message: 'Please enter category slug'

        }
      }
    },
     subcategory_image:           {
       validators:           {
        file: {
          extension: 'jpeg,png,jpg',
          type: 'image/jpeg,image/png,image/jpg',
          message: 'The selected file is not valid. Only allowed jpeg,jpg,png files'
        }
      }
    },
    category:           {
      validators:           {
        notEmpty:               {
          message: 'Please select category'
        }
      }
    } 

  }
}).on('success.form.bv', function(e) {


  return true;
        });   

$('#add_ratingstype').bootstrapValidator({
  fields: {
    name_:   {
      validators: {
        remote: {
          url: base_url + 'ratingstype/check_ratingstype_name',
          data: function(validator) {
            return {
              category_name: validator.getFieldElements('name').val(),
              csrf_token_name:csrf_token
            };
          },
          message: 'This Rating type name is already exist',
          type: 'POST'
        },
        notEmpty: {
          message: 'Please enter rating type name'

        }
      }
    },
  }
}).on('success.form.bv', function(e) {


  return true;
});

$('#update_ratingstype').bootstrapValidator({
  fields: {
    name_:   {
      validators: {
        remote: {
          url: base_url + 'ratingstype/check_ratingstype_name',
          data: function(validator) {
            return {
              name: validator.getFieldElements('name').val(),
              csrf_token_name:csrf_token,
              id: validator.getFieldElements('id').val()
            };
          },
          message: 'This rating type name is already exist',
          type: 'POST'
        },
        notEmpty: {
          message: 'Please enter rating type name'

        }
      }
    },

  }
}).on('success.form.bv', function(e) {


  return true;
        });   


$("#amount").on("change", function(){
    var amount = $('#amount').val();

    if((amount) == 0) {
        //$("#duration").prop("sle", 0);
        $("#duration").val('0').trigger('change')
        $("#duration").attr("disabled", true); 
    } else {
        $("#duration").val('').trigger('change')
        $("#duration").attr("disabled", false); 
    }
  //var description = $("#duration option:selected").text();
  //$("#subscription_description").val(description);
})

$("#duration").on("change", function(){
  var description = $("#duration option:selected").text();
  $("#subscription_description").val(description);
})

$('#editSubscription').bootstrapValidator({
  fields: {
    subscription_name:   {
      validators: {
        remote: {
          url: base_url + 'service/check_subscription_name',
          data: function(validator) {
            return {
              subscription_name: validator.getFieldElements('subscription_name').val(),
              csrf_token_name:csrf_token,
              subscription_id: validator.getFieldElements('subscription_id').val()
            };
          },
          message: 'This subscription name is already exist',
          type: 'POST'
        },
        notEmpty: {
          message: 'Please enter subscription name'

        }
      }
    },
    amount:           {
      validators:           {
        notEmpty:               {
          message: 'Please enter subscription amount'
        }
      }
    },
    duration:           {
      validators:           {
        notEmpty:               {
          message: 'Please select subscription duration'
        }
      }
    }
  }
}).on('success.form.bv', function(e) {

  return true;
        }); 

$('#addKeyword').bootstrapValidator({
  fields: {
    multiple_key:           {
      validators:           {
        notEmpty:               {
          message: 'Please enter keyword'
        }
      }
    }
  }
}).on('success.form.bv', function(e) {

  var page_key = $('#page_key').val();
  var multiple_key = $('#multiple_key').val();
  $.ajax({
   type:'POST',
   url: base_url+'admin/language/save_keywords',
   data : {page_key:page_key,multiple_key:multiple_key},
   success:function(response)
   {
     if(response==1)
     {
       window.location = base_url+'language/'+page_key;
     }
   }
 });
  return false;
        }); 

$('#image_upload_error').hide();
$('#image_error').hide();


var csrf_toiken=$('#admin_csrf').val();
var url = base_url+'admin/profile/check_password';

$('#change_password_form').bootstrapValidator({
  fields: {
    current_password: {
      validators: {
        remote: {
         url: url,
         data: function(validator) {
           return {
             current_password: validator.getFieldElements('current_password').val(),
             'csrf_token_name':csrf_token
           };
         },
         message: 'Current Password is Not Valid',
         type: 'POST'
       },
       notEmpty: {
        message: 'Please Enter Current Password'
      }
    }
  },

  new_password: {
    validators: {
     stringLength: {
      min: 4,
      message: 'The full name must be less than 4 characters'
    },
    different: {
      field: 'current_password',
      message: 'The username and password cannot be the same as each other'
    },
    notEmpty: {
      message: 'Please Enter Password...'
    }
  }
},
confirm_password: {
  validators: {
   identical: {
    field: 'new_password',
    message: 'The password and its confirm are not the same'
  },
  notEmpty: {
    message: 'Please Enter Password...'
  }
}
}                    
}
}).on('success.form.bv', function(e) {
  e.preventDefault();
  $.ajax({
    url: base_url+'admin/profile/change_password',
    type: "post",
    data: $('#change_password_form').serialize(),
    success: function(response) {
        if(response == 1) {
          swal({
            title: "Password Updated..!",
            text: "Password Updated SuccessFully..",
            icon: "success",
            button: "okay",
            closeOnEsc: false,
            closeOnClickOutside: false
          }).then(function(){
            location.reload();
          });
        } else if(response == 3) {
            swal({
            title: "Password Updated..!",
            text: "Unable to access this feature in Demo mode",
            icon: "success",
            button: "okay",
            closeOnEsc: false,
            closeOnClickOutside: false
          }).then(function(){
            location.reload();
          });
      } else {
        swal({
            title: "Error",
            text: "Something went wrong, Try again!",
            icon: "error",
            button: "okay",
            closeOnEsc: false,
            closeOnClickOutside: false
          }).then(function(){
            location.reload();
          });
      }
  }

})   

});

function update_language(lang_key, lang, page_key) {
	var cur_val = $('input[name="'+lang_key+'['+lang+']"]').val();
	var prev_val = $('input[name="prev_'+lang_key+'['+lang+']"]').val();

	$.post(base_url+'admin/language/update_language',{lang_key:lang_key, lang:lang, cur_val:cur_val, page_key:page_key},function(data){
		if(data == 1) {
			$("#flash_success_message").show();
		}
		else if(data == 0) {
			$('input[name="'+lang_key+'['+lang+']"]').val(prev_val);
			$("#flash_error_message").html('Sorry, This keyword already exist!');
			$("#flash_error_message").show();
		}
		else if(data == 2) {
			$('input[name="'+lang_key+'['+lang+']"]').val(prev_val);
			$("#flash_error_message").html('Sorry, This field should not be empty!');
			$("#flash_error_message").show();
		}
	});
}

function upload_images(){
	var img= $('.avatar-input').val();
	if(img!=''){
		$('#image_upload_error').hide();
		return true;
	}else{
		$('#image_upload_error').text('Please Upload an Image . ');
		$('#image_upload_error').show();
		return false;
	}
}

function changeAdminProfile(){
	$('#image_error').hide();
	var profile_img = $('#crop_prof_img').val();
	var adminmail = $('#adminmail').val();
	
	var error = 0;
	
	
	if(error==0){
		var url = base_url+'admin/profile/update_profile';
		//fetch file
		var formData = new FormData();
		formData.append('profile_img', profile_img);
		formData.append('adminmail', adminmail);
		formData.append('csrf_token_name', csrf_token);
		$.ajax({
			url: url,
			type: "POST",
			data: formData,
			cache: false,
			processData: false,
			contentType: false,
			context: this,
			success:function(res)
			{
       window.location.href=base_url+'admin-profile';
     }
   });
	}
}

function delete_category(id) {
	$('#delete_category').modal('show');
	$('#category_id').val(id);
}

function delete_subcategory(id) {
	$('#delete_subcategory').modal('show');
	$('#subcategory_id').val(id);
}

function delete_ratings_type(id) {
	$('#delete_ratings_type').modal('show');
	$('#id').val(id);
}


 $(document).on("click", ".delete_show", function () {
    var id=$(this).attr('data-id');
    delete_modal_show(id);
  });
  
  $(document).on("click", "#chkdel_subcribe", function () {
    var id=$(this).attr('sid');
    subdelete_modal_show(id);
});
function subdelete_modal_show(id) {
      $('#sub_delete_modal').modal('show');
      $('#confirm_delete_sub1').attr('data-id',id);
  }
  $('#confirm_delete_sub1').on('click',function(){
      var id=$(this).attr('data-id');
      confirm_delete_subcriptions(id);
  });
  function confirm_delete_subcriptions(id) {
      if(id!=''){
            $('#sub_delete_modal').modal('hide');
             $.ajax({
                   type:'POST',
                   url: base_url+'admin/service/delete_subsciption',
                   data : {id:id,csrf_token_name:csrf_token},
                   dataType:'json',
                   success:function(response) {
                        if(response == 'success') {
                            swal({
                                title: "Success..!",
                                text: "Deleted SuccessFully",
                                icon: "success",
                                button: "okay",
                                closeOnEsc: false,
                                closeOnClickOutside: false
                              }).then(function(){
                                location.reload();
                              });
                        }  else {
                            swal({
                                title: "Failure..!",
                                text: "Unable to access this feature in Demo mode",
                                icon: "error",
                                button: "okay",
                                closeOnEsc: false,
                                closeOnClickOutside: false
                              }).then(function(){
                                location.reload();
                              });
                        }
                      
                }
              });
            }
  }
  
  function delete_modal_show(id){
    $('#delete_modal').modal('show');
    $('#confirm_btn').attr('data-id',id);
    $('#confirm_delete_pro').attr('data-id',id);
	$('#confirm_btn_admin').attr('data-id',id);
  }
    $('#confirm_btn_admin').on('click',function(){ 
    var id=$(this).attr('data-id');
    var url=base_url+"admin/dashboard/adminuser_delete";
    delete_confirm(id,url);
  });
   function delete_confirm(id,url){
    if(id!=''){
      $('#delete_modal').modal('hide');
       $.ajax({
     type:'POST',
     url: url,
     data : {id:id,csrf_token_name:csrf_token},
     dataType:'json',
     success:function(response)
     {
       if(response.status)
       {
        swal({
          title: "Success..!",
          text: response.msg,
          icon: "success",
          button: "okay",
          closeOnEsc: false,
          closeOnClickOutside: false
        }).then(function(){
          location.reload();
        });

      }
      else {
       swal({
        title: "Error..!",
        text: response.msg,
        icon: "error",
        button: "okay",
        closeOnEsc: false,
        closeOnClickOutside: false
      }).then(function(){
        location.reload();
      });
    }
  }
});
    }
  }

  /*Footer submenu*/
  $(document).ready(function() {
    if ($("#main_menu option:selected").text() == "category") {
        $("#category").show();
        $('#category_count').attr('required', '');
        $('#category_count').attr('data-error', 'This field is required.');
        $("#hidey").hide();
        $("#quick_link").hide();
        $("#contact_us").hide();
        $("#follow_us").hide();
    } else if($("#main_menu option:selected").text() == "Quick Link") {
        $("#quick_link").show();
        $('#footer_submenu').attr('required', '');
        $('#link').attr('required', '');
        $("#category").hide();
        $("#hidey").hide();
        $("#contact_us").hide();
        $("#follow_us").hide();
    } else if($("#main_menu option:selected").text() == "Follow Us") {
        $("#follow_us").show();
        $("#category").hide();
        $("#quick_link").hide();
        $("#contact_us").hide();
        $("#hidey").hide();
    } else if($("#main_menu option:selected").text() == "Contact Us") {
        $("#contact_us").show();
        $('#address').attr('required', '');
        $('#phone').attr('required', '');
        $('#email').attr('required', '');
        $("#category").hide();
        $("#hidey").hide();
        $("#quick_link").hide();
        $("#follow_us").hide();
    } else {
      $("#category").hide();
      $('#category_count').removeAttr('required');
      $('#category_count').removeAttr('data-error');
    }
 });

  $("#main_menu").change(function () {
    if ($("#main_menu option:selected").text() == "category") {
      $("#category").show();
      $('#category_count').attr('required', '');
      $('#category_count').attr('data-error', 'This field is required.');
      $("#hidey").hide();
      $("#quick_link").hide();
      $("#contact_us").hide();
      $("#follow_us").hide();
      $("#category_check").hide();
    }else {
      $("#category").hide();
      $("#category_check").hide();
      $('#category_count').removeAttr('required');
      $('#category_count').removeAttr('data-error');
    }
    if ($("#main_menu option:selected").text() == "Follow Us") {
      $("#follow_us").show();
      $("#category").hide();
      $("#quick_link").hide();
      $("#contact_us").hide();
      $("#hidey").hide();
    }else {
      $("#follow_us").hide();
    }
    if ($("#main_menu option:selected").text() == "Contact Us") {
      $("#contact_us").show();
      $('#address').attr('required', '');
      $('#phone').attr('required', '');
      $('#email').attr('required', '');
      $("#category").hide();
      $("#hidey").hide();
      $("#quick_link").hide();
      $("#follow_us").hide();
    } else {
      $("#contact_us").hide();
      $('#address').removeAttr('required', '');
      $('#phone').removeAttr('required', '');
      $('#email').removeAttr('required', '');
    }
    if ($("#main_menu option:selected").text() == "Quick Link") {
      $("#quick_link").show();
      $('#footer_submenu').attr('required', '');
      $('#link').attr('required', '');
      $("#category").hide();
      $("#hidey").hide();
      $("#contact_us").hide();
      $("#follow_us").hide();
    } else {
      $("#quick_link").hide();
      $('#footer_submenu').removeAttr('required', '');
      $('#link').removeAttr('required', '');
    }
  });

  $(document).ready(function(){
    var but = $('#quick_link').val();
    var max = 4;
    var x = 1;
    $("#btn1").click(function(){
      if(x <= max){
        $("#quick_link").append('<div class="form-group" id="quick_link"><div class="row"><div class="col-sm-6"> <div class="form-group sub_menu ml-3"><div class="row"><label class="col-sm-3 control-label mt-2">Label</label><div class="col-sm-9"><input type="text" class="form-control" name="label[]" attr="label" id="label" value=""></div></div></div></div><div class="col-sm-6"><div class="form-group sub_menu"><div class="row"><label class="col-sm-3 control-label mt-2">Link</label><div class="col-sm-9"><input type="text" class="form-control" name="link[]" attr="link" id="link" value="" required></div></div></div></div></div></div>');
        x++;
      }else{
        alert('Allowing 5 links only');
        }        
    });
  });

 /*appsection*/
  $('#appsection_showhide').on('click',function(){
      if($('#appsection_showhide').prop("checked")==true) {
          $('#store_links').show();
      } else {
         $('#store_links').hide();
      }
  });
  $(document).ready(function() {
    if($('#appsection_showhide').prop("checked")==true) {
            $('#store_links').show();
    } else {
           $('#store_links').hide();
    }
 });

/*sms gateway*/
  $(document).ready(function(){
  $("#2factor_div").css({"display": "none"});
  $("#twilio_div").css({"display": "none"});
  
  $("ul li").click(function(){
    if($(this).attr("data-id") == "nexmo") {
        $('ul li.active').removeClass('active');
        $(this).addClass("active");
        $("#nexmo_div").css({"display": ""});
        
        $("#2factor_div").css({"display": "none"});
        $("#twilio_div").css({"display": "none"});
    }
    
    if($(this).attr("data-id") == "2factor") {
        $('ul li.active').removeClass('active');
        $(this).addClass("active");
        $("#2factor_div").css({"display": ""});
        
        $("#twilio_div").css({"display": "none"});
        $("#nexmo_div").css({"display": "none"});
    }
    
    if($(this).attr("data-id") == "twilio") {
        $('ul li.active').removeClass('active');
        $(this).addClass("active");
        $("#twilio_div").css({"display": ""});
        
        $("#2factor_div").css({"display": "none"});
        $("#nexmo_div").css({"display": "none"});
    }
  });
});

$(document).ready(function(){
  $(".sms_option").click(function(){
  var clickedByme = $(this).val();
  
    $('.sms_option').each(function () {
    if(clickedByme != this.value) {
        $(this).prop('checked', false);
    }
    });
  });
});

$(document).on("click",".addfaq",function () {
  var experiencecontent = '<div class="row counts-list" id="faq_content">' +
  '<div class="col-md-11">' +
  '<div class="cards">' +
  '<div class="form-group">' +
  '<label>Title</label>' +
  '<input type="text" class="form-control" name="page_title[]" style="text-transform: capitalize;" required>' +
  '</div>' +
  '<div class="form-group mb-0">' +
  '<label>Page Content</label>' +
  ' <textarea class="form-control content-textarea" id="ck_editor_textarea_id"  name="page_content[]"></textarea>'+
  '</div>' +
  '</div>' +
  '</div>' +
  '<div class="col-md-1">' +
  '<a href="#" class="btn btn-sm bg-danger-light delete_faq">' +
  '<i class="far fa-trash-alt "></i> ' +
  '</a>' +
  '</div>' +
  '</div> ';
  
  $(".faq").append(experiencecontent);
  return false;
});

  
  function faq_delete(id)
  {
  var r = confirm("Deleting FAQ will also delete its related all datas!! ");
    if (r == true) {

      var csrf_token = $('#active_csrf').val();
      $.ajax({
        type: 'POST',
        url: base_url+"admin/settings/faq_delete",
        data: {
          id: id, 
          csrf_token_name: csrf_token
        },
        success: function (response)
        {

          if (response == 'success')
          {
            window.location = base_url+'admin/settings/faq_delete';
          }else{
            
            window.location = base_url+'admin/settings/faq_delete';
          }
        }
      });

    } else {
      return false;
    }
  

}
 $(document).ready(function() {
            $(document).on("click",".faq_delete",function() {
                var id = $(this).attr('data-id');
                faq_delete(id);
            });
       });

 function getcurrencysymbol(currencies) { 
     var csrf_toiken=$('#admin_csrf').val();
    $.ajax({
        type: "POST",
        url:  base_url+"admin/settings/get_currnecy_symbol",
        data:{
          id:currencies,
         'csrf_token_name': csrf_token,
        }, 
                           
        success: function (data) {
            $('#currency_symbol').val(data); 
        }
    });
}
$(document).ready(function() {
            $(document).on("change",".currency_code",function() {
             var currencies = $('#currency_option option:selected').text();
             getcurrencysymbol(currencies);
            });

            $(document).on("change",".countryCode",function() {
                var countryKey = $(this).find(':selected').attr('data-key');
                $('#country_code_key').val(countryKey); 
            });
       });

$(document).on("click",".addlinknew",function () {
    var len = $('.links-cont').length + 1;
    if(len <= 6) {
      var experiencecontent = '<div class="form-group links-cont">' +
      '<div class="row align-items-center">' +
      '<div class="col-lg-3 col-12">' +
      '<input type="text" class="form-control" name="label[]" attr="label" id="label" value="">' +
      '</div>' +
      '<div class="col-lg-8 col-12">' +
      '<input type="text" class="form-control" name="link[]" attr="link" id="link" value="'+base_url+'">' +
      '</div>' +
      '<div class="col-lg-1 col-12">' +
      '<a href="#" class="btn btn-sm bg-danger-light delete_links">' +
      '<i class="far fa-trash-alt "></i> ' +
      '</a>' +
      '</div>' +
      '</div>' +
      '</div>' ;
        $(".links-forms").append(experiencecontent);
    } else {
        $('.addlinknew').hide();
        alert('Allow 6 links only');
    }
  return false;
});

//Remove updated Links menus
$(document).on("click",".delete_links",function () {
    var id = $(this).attr('data-id');
    $('#link_'+id).remove();
    return false;
});

//Remove new Links menus
$(document).on("click",".delete_links",function () {
    $(this).closest('.links-cont').remove();
    return false;
});

$(document).on("click",".addsocail",function () {
  var experiencecontent = '<div class="form-group countset">' +
  '<div class="row align-items-center">' +
  '<div class="col-lg-2 col-12">' +
  '<div class="socail-links-set">' +
  '<ul>' +
  '<li class=" dropdown has-arrow main-drop">' +
  '<a href="#" class="dropdown-toggle nav-link" data-bs-toggle="dropdown" aria-expanded="false">' +
  '<span class="user-img">' +
  '<i class="fab fa-github me-2"></i>' +
  '</span>' +
  '</a>' +
  '<div class="dropdown-menu">' +
  '<a class="dropdown-item" href="#"><i class="fab fa-facebook-f me-2"></i>Facebook</a>' +
  '<a class="dropdown-item" href="#"><i class="fab fa-twitter me-2"></i>twitter</a>' +
  '<a class="dropdown-item" href="#"><i class="fab fa-youtube me-2"></i> Youtube</a>' +
  '</div>' +
  '</li>' +
  '</ul>' +
  '</div>' +
  '</div>' +
  '<div class="col-lg-9 col-12">' +
  '<input type="text" class="form-control" name="snapchat" attr="snapchat" id="facebook" value="">' +
  '</div>' +
  '<div class="col-lg-1 col-12">' +
  '<a href="#" class="btn btn-sm bg-danger-light  delete_review_comment">' +
  '<i class="far fa-trash-alt "></i> ' +
  '</a>' +
  '</div>' +
  '</div> ' +
  '</div> ';
  
  $(".setings").append(experiencecontent);
  return false;
});

$(".setings").on('click','.delete_review_comment', function () {
  $(this).closest('.countset').remove();
  return false;
});

$(document).on("click",".addnewlinks",function () {
  
    var len = $('.copyright_content').length + 1;
  
      var experiencecontent = '<div class="form-group links-conts copyright_content">' +
      '<div class="row align-items-center">' +
      '<div class="col-lg-3 col-12">' +
      '<input type="text" class="form-control" value="" name="label1[]">' +
      '</div>' +
      '<div class="col-lg-6 col-12">' +
      '<input type="text" class="form-control" value="'+base_url+'" name="link1[]">' +
      '</div>' +
      '<div class="col-lg-1 col-12">' +
      '<a href="#" class="btn btn-sm bg-danger-light delete_copyright">' +
      '<i class="far fa-trash-alt "></i> ' +
      '</a>' +
      '</div>' +
      '</div>' +
      '</div>' ;
      $(".settingset").append(experiencecontent);
           
       return false;
  
});

//Remove updated copyright menus
$(document).on("click",".delete_copyright",function () {
    var id = $(this).attr('data-id');
    $('#link1_'+id).remove();
    return false;
});

//Remove new copyright menus
$(document).on("click",".delete_copyright",function () {
    $(this).closest('.copyright_content').remove();
    return false;
});

$(document).ready(function(){
    $("#2factor_div").css({"display": "none"});
    $("#twilio_div").css({"display": "none"});
  
    $("ul li").click(function(){
        if($(this).attr("data-id") == "nexmo") {
            $('ul li.active').removeClass('active');
            $(this).addClass("active");
            $("#nexmo_div").css({"display": ""});
            
            $("#2factor_div").css({"display": "none"});
            $("#twilio_div").css({"display": "none"});
        }
        
        if($(this).attr("data-id") == "2factor") {
            $('ul li.active').removeClass('active');
            $(this).addClass("active");
            $("#2factor_div").css({"display": ""});
            
            $("#twilio_div").css({"display": "none"});
            $("#nexmo_div").css({"display": "none"});
        }
        
        if($(this).attr("data-id") == "twilio") {
            $('ul li.active').removeClass('active');
            $(this).addClass("active");
            $("#twilio_div").css({"display": ""});
            
            $("#2factor_div").css({"display": "none"});
            $("#nexmo_div").css({"display": "none"});
        }
    });
});

$(document).ready(function(){
    $(".sms_option").click(function(){
        var clickedByme = $(this).val();
      
        $('.sms_option').each(function () {
            if(clickedByme != this.value) {
                $(this).prop('checked', false);
            }
        });
    });
});

$('.noty_clear').on('click',function(){
      var id=$(this).attr('data-token');
      noty_clear(id);
    });
 function noty_clear(id){
  if(id!=''){
   $.ajax({
     type: "post",
    // url: base_url+"admin/clear_all_noty",
     url: base_url+"admin/dashboard/clear_all_noty",
     data:{csrf_token_name: csrf_token,id:id}, 
     dataType:'json',
     success: function (data) {


       if(data.success){
        $('.notification-list li').remove();
        $('.bg-yellow').text(0);
      }
    }

  });
 }
}

     $(document).ready(function() {
  $("#selectallad1").change(function(){
    if(this.checked){
      $(".checkboxad").each(function(){
        this.checked=true;
      })              
    }else{
      $(".checkboxad").each(function(){
        this.checked=false;
      })              
    }
  });

  $(".checkboxad").click(function () {
    if ($(this).is(":checked")){
      var isAllChecked = 0;
      $(".checkboxad").each(function(){
        if(!this.checked)
           isAllChecked = 1;
      })              
      if(isAllChecked == 0){ $("#selectallad1").prop("checked", true); }     
    }else {
      $("#selectallad1").prop("checked", false);
    }
  });

  if ($(".checkboxad").is(":checked")){
      var isAllChecked = 0;
      $(".checkboxad").each(function(){
        if(!this.checked)
           isAllChecked = 1;
      })              
      if(isAllChecked == 0){ $("#selectallad1").prop("checked", true); }     
    }else {
      $("#selectallad1").prop("checked", false);
    }
});

      $(document).ready(function(){
        var loginemail = $('.loginemail').val()
        if(loginemail == 'email'){
        $("#otp_by").hide();
        }
        $('#chkYes').on('change',function(){
          $("#otp_by").hide();
        });
        $('#phpmail').on('change',function(){
          $("#otp_by").show();
        });
      });

      $('.lang_code').on('click',function(){
        var lang_code = $(this).attr('data-lang');
        $('#code_value').val(lang_code);
      });

      $('.lang_app_code').on('click',function(){
        var lang_code = $(this).attr('data-lang');
        $('#code_app_value').val(lang_code);
      });

  $(document).on("click", "#not_del", function () {
    var id=$(this).attr('data-id');
    delete_modal_show(id);
  });
  function delete_modal_show(id) {
      $('#not_delete_modal').modal('show');
      $('#confirm_delete_sub').attr('data-id',id);
    }
    $('#confirm_delete_sub').on('click',function(){
      var id=$(this).attr('data-id');
      confirm_delete_subcription(id);
    });
    function confirm_delete_subcription(id) {
      if(id != ''){
            $('#not_delete_modal').modal('hide');
             $.ajax({
                   type:'POST',
                 //  url: base_url+'user/service/pro_not_del',
                   url: base_url+'admin/dashboard/pro_not_del',
                   data : {id:id,csrf_token_name:csrf_token},
                   dataType:'json',
                   success:function(response)
                   {
                      swal({
                        title: "Success..!",
                        text: "Deleted SuccessFully",
                        icon: "success",
                        button: "okay",
                        closeOnEsc: false,
                        closeOnClickOutside: false
                      }).then(function(){
                        location.reload();
                      });
                }
              });
            }
    }

  $(document).on("click", "#not_del_all", function () {

    var id=$(this).attr('data-id');

    alldelete_modal_showz(id);
  });
  function alldelete_modal_showz(id) {
    //alert(id)
    // alert(id)
      $('#notall_delete_modal').modal('show');
      $('#confirm_deleteall_sub').attr('data-id',id);
    }
  $('#confirm_deleteall_sub').on('click',function(){
    var id=$(this).attr('data-id');
    confirm_deleteall_subcription(id);
  });
    function confirm_deleteall_subcription(id) {
      if(id ==''){
            $('#notall_delete_modal').modal('hide');
             $.ajax({
                   type:'POST',
                  // url: base_url+'user/service/pro_not_del',
                   url: base_url+'admin/dashboard/pro_not_del',
                   data : {id:id,csrf_token_name:csrf_token},
                   dataType:'json',
                   success:function(response)
                   {
                      swal({
                        title: "Success..!",
                        text: "Deleted SuccessFully",
                        icon: "success",
                        button: "okay",
                        closeOnEsc: false,
                        closeOnClickOutside: false
                      }).then(function(){
                        location.reload();
                      });
                }
              });
            }
    }

    $('#currency_add').bootstrapValidator({
    fields: {
      currency_name:   {
        validators: {
          notEmpty: {
            message: 'Please enter Currency name'

          }
        }
      },
      currency_symbol:   {
        validators: {
          notEmpty: {
            message: 'Please enter Currency Symbol'

          }
        }
      },
      currency_code:   {
        validators: {
          notEmpty: {
            message: 'Please enter Currency Code'

          }
        }
      },
      rate:   {
        validators: {
          notEmpty: {
            message: 'Please enter Currency Rate'

          }
        }
      },                  
  }
  }).on('success.form.bv', function(e) {
    return true;
  });

    $('#currency_edit').bootstrapValidator({
    fields: {
      currency_name:   {
        validators: {
          notEmpty: {
            message: 'Please enter Currency name'

          }
        }
      },
      currency_symbol:   {
        validators: {
          notEmpty: {
            message: 'Please enter Currency Symbol'

          }
        }
      },
      currency_code:   {
        validators: {
          notEmpty: {
            message: 'Please enter Currency Code'

          }
        }
      },
      rate:   {
        validators: {
          notEmpty: {
            message: 'Please enter Currency Rate'

          }
        }
      },                  
  }
  }).on('success.form.bv', function(e) {
    return true;
  });

  $(document).on("click", "#cur_del", function () {
    var id=$(this).attr('data-id');
    alldelete_modal_show(id);
  });
  function alldelete_modal_show(id) {
      $('#cur_delete_modal').modal('show');
      $('#confirm_delete_cur').attr('data-id',id);
    }
    $('#confirm_delete_cur').on('click',function(){
      var id=$(this).attr('data-id');
      confirm_delete_currency(id);
    });
    function confirm_delete_currency(id) {
      if(id !=''){
            $('#cur_delete_modal').modal('hide');
             $.ajax({
                   type:'POST',
                   url: base_url+'admin/settings/cur_delete',
                   data : {id:id,csrf_token_name:csrf_token},
                   dataType:'json',
                   success:function(response)
                   {
                      swal({
                        title: "Success..!",
                        text: "Deleted SuccessFully",
                        icon: "success",
                        button: "okay",
                        closeOnEsc: false,
                        closeOnClickOutside: false
                      }).then(function(){
                        location.reload();
                      });
                }
              });
            }
    }

  $('.pages_list_status').on('click',function(){
      var id = $(this).attr('data-id');
      pages_list_status(id);
  });
  function pages_list_status(id){
  var stat= $('#pages_list_status'+id).prop('checked');
  if(stat==true) {
    var status=1;
  }
  else {
    var status=2;
  }
  var url = base_url+ 'admin/settings/page_list_status';
  var status_id = id;
  var status = status;
  var data = { 
    status_id: status_id,
    status: status,
    csrf_token_name:csrf_token
  };
  $.ajax({
    url: url,
    data: data,
    type: "POST",
    success: function (data) {
      console.log(data);
      if(data.trim()=="success"){
        swal({
             title: "Pages",
             text: "Status Change SuccessFully....!",
             icon: "success",
             button: "okay",
             closeOnEsc: false,
             closeOnClickOutside: false
         });
      } else if(data=="failure") {
            swal({
                 title: "Pages",
                 text: "Unable to access this feature in Demo mode",
                 icon: "error",
                 button: "okay",
                 closeOnEsc: false,
                 closeOnClickOutside: false
             });
      } else {
        swal({
                 title: "Pages",
                 text: "Something went wrong, Try again later!",
                 icon: "error",
                 button: "okay",
                 closeOnEsc: false,
                 closeOnClickOutside: false
             });
      }
    }
  });
  }

  $('.advrefundstatus').on('change', function() {
    var id = $(this).attr('data-id');
    var statusId = $(this).val();
    var subDetailId = $(this).attr('data-detail-id');
    var userId = $(this).attr('data-userid');
    var planId=$(this).attr('plan-id');
    var userType=$(this).attr('user-type');
    
    //alert(userId); return false;
    if (statusId) {
        var url = base_url+ 'admin/settings/adv_offline_status';
        var status_id = id;
        var detail_id = subDetailId;
        var status = status;
        var userId = userId;
        var data = { 
          status_id: status_id,
          status: statusId,
          detailId: detail_id,
          userId : userId,
          planId:planId,
          csrf_token_name:csrf_token
        };
        $.ajax({
          url: url,
          data: data,
          type: "POST",
            success: function (data) {
                console.log(data);
                if(data == 1){
                    swal({
                        title: "offline Payment",
                        text: "Status Change SuccessFully....!",
                        icon: "success",
                        button: "okay",
                        closeOnEsc: false,
                        closeOnClickOutside: false
                    }).then(function(){
                        location.reload();
                    });
                } else if(data=="2") {
                    swal({
                        title: "Faliure",
                        text: "Unable to change status in Demo mode",
                        icon: "error",
                        button: "okay",
                        closeOnEsc: false,
                        closeOnClickOutside: false
                    }).then(function(){
                        location.reload();
                    });
                }
            }
        });
    } else {
        return false;
    }
});


$('.refundstatus').on('change', function() {

    var id = $(this).attr('data-id');
    var statusId = $(this).val();
    var subDetailId = $(this).attr('data-detail-id');
    var userId = $(this).attr('data-userid');
    var planId=$(this).attr('plan-id');
    var paymentId=$(this).attr('payment-id');
    //alert(userId); return false;
    if (statusId) {
        var url = base_url+ 'admin/settings/offline_status';
        var status_id = id;
        var detail_id = subDetailId;
        var status = status;
        var userId = userId;
        var data = { 
          status_id: status_id,
          status: statusId,
          detailId: detail_id,
          userId : userId,
          planId:planId,
          csrf_token_name:csrf_token,
          paymentId:paymentId
        };
        $.ajax({
          url: url,
          data: data,
          type: "POST",
            success: function (data) {
                console.log(data);
                if(data == 1){
                    swal({
                        title: "offline Payment",
                        text: "Status Change SuccessFully....!",
                        icon: "success",
                        button: "okay",
                        closeOnEsc: false,
                        closeOnClickOutside: false
                    }).then(function(){
                        location.reload();
                    });
                } else if(data=="2") {
                    swal({
                        title: "Faliure",
                        text: "Unable to change status in Demo mode",
                        icon: "error",
                        button: "okay",
                        closeOnEsc: false,
                        closeOnClickOutside: false
                    }).then(function(){
                        location.reload();
                    });
                }
            }
        });
    } else {
        return false;
    }
});

  $(document).on("click", "#pages_del", function () {
    var id=$(this).attr('data-id');
    pagesdelete_modal_show(id);
  });
  function pagesdelete_modal_show(id) {
      $('#pages_delete_modal').modal('show');
      $('#confirm_delete_pages').attr('data-id',id);
    }
    $('#confirm_delete_pages').on('click',function(){
      var id=$(this).attr('data-id');
      confirm_delete_pages(id);
    });
    function confirm_delete_pages(id) {
      if(id !=''){
            $('#pages_delete_modal').modal('hide');
             $.ajax({
                   type:'POST',
                   url: base_url+'admin/settings/pages_delete',
                   data : {id:id,csrf_token_name:csrf_token},
                   dataType:'json',
                   success:function(response) {
                        if(response == 'success') {
                            swal({
                                title: "Success..!",
                                text: "Deleted SuccessFully",
                                icon: "success",
                                button: "okay",
                                closeOnEsc: false,
                                closeOnClickOutside: false
                            }).then(function(){
                                location.reload();
                            });
                        } else if(response == 'failure') {
                            swal({
                                title: "Failure",
                                text: "Unable to add pages in Demo mode",
                                icon: "error",
                                button: "okay",
                                closeOnEsc: false,
                                closeOnClickOutside: false
                            }).then(function(){
                                location.reload();
                            });
                        } else {
                            swal({
                                title: "Failure",
                                text: "Something went wrong, Try again!",
                                icon: "error",
                                button: "okay",
                                closeOnEsc: false,
                                closeOnClickOutside: false
                            }).then(function(){
                                location.reload();
                            });
                        }
                }
              });
            }
    }

    $(document).ready(function() {
        $('.select').selectpicker();

        //location
        $("#category1,#subcategory").selectpicker();

        $.ajax({
            type: "GET",
            url: base_url + "admin/service/get_category",
            data: { id: $(this).val(), 'csrf_token_name': csrf_token },
            beforeSend: function() {
                $("#category option:gt(0)").remove();
                $('#category').selectpicker('refresh');
                $("#category").selectpicker();
                $('#category').find("option:eq(0)").html("Select Category..");
                $('#category').selectpicker('refresh');
                $("#category").selectpicker();
            },
            success: function(data) {
                $('#category').selectpicker('refresh');
                $("#category").selectpicker();
                $('#category').find("option:eq(0)").html("Select Category");
                $('#category').selectpicker('refresh');
                $("#category").selectpicker();
                var obj = jQuery.parseJSON(data);
                $('#category').selectpicker('refresh');
                $("#category").selectpicker();
                $(obj).each(function() {
                    var option = $('<option />');
                    option.attr('value', this.value).text(this.label);
                    $('#category').append(option);
                });
                $('#category').selectpicker('refresh');
                $("#category").selectpicker();
            }
        });

        // Membership Add More

    $(".membership-info").on('click','.trash', function () {
      $(this).closest('.membership-cont').remove();
      return false;
    });

    $(".add-membership").on('click', function () {
      var len = $('.membership-cont').length + 1;
      if(len <= 4) {
      var membershipcontent = '<div class="row form-row membership-cont">' +
      '<div class="col-12 col-md-10 col-lg-6">' +
      '<div class="form-group">' +
      '<input type="text" class="form-control" name="service_offered[]" id="field1">' +
      '</div>' +
      '</div>' +
      '<div class="col-12 col-md-2 col-lg-2">' +
      '<a href="#" class="btn btn-danger trash"><i class="far fa-times-circle"></i></a>' +
      '</div>' +
      '</div>';
      $(".membership-info").append(membershipcontent);
       } else {
        $('.add-membership').hide();
        alert('Allow 4 links only');
    }
      return false;
    });

    $('.delete_img').on('click', function() {
        var img_id = $(this).attr('data-img_id');
        delete_img(img_id);
    });

    function delete_img(img_id) {
        $('#service_img_' + img_id).remove();
        $.ajax({
            type: "POST",
            url: base_url + 'user/service/delete_service_img',
            data: { img_id: img_id, csrf_token_name:csrf_token },
            success: function(data) {}
        });
    }


        $('#category,#category1').change(function() {
            $("#subcategory").val('default');
            $("#subcategory").selectpicker("refresh");

            $.ajax({
                type: "POST",
                url: base_url + "user/service/get_subcategory",
                data: { id: $(this).val(), csrf_token_name: csrf_token },
                beforeSend: function() {
                    $("#subcategory option:gt(0)").remove();
                    $('#subcategory').selectpicker('refresh');
                    $("#subcategory").selectpicker();
                    $('#subcategory').find("option:eq(0)").html("Select Subcategory..");
                    $('#subcategory').selectpicker('refresh');
                    $("#subcategory").selectpicker();
                },
                success: function(data) {
                    $('#subcategory').selectpicker('refresh');
                    $("#subcategory").selectpicker();
                    $('#subcategory').find("option:eq(0)").html("Select SubCategory");
                    $('#subcategory').selectpicker('refresh');

                    $('#subcategory').selectpicker('refresh');
                    $("#subcategory").selectpicker();
                    if (data) {
                        var obj = jQuery.parseJSON(data);
                        $(obj).each(function() {
                            var option = $('<option />');
                            option.attr('value', this.value).text(this.label);
                            $('#subcategory').append(option);
                        });
                    }

                    $('#subcategory').selectpicker('refresh');
                    $("#subcategory").selectpicker();
                }
            });

        });

   });

  $(document).on("click", "#ear_del", function () {
    var id=$(this).attr('data-id');
    alldelete_modal_show(id);
  });
  function alldelete_modal_show(id) {
      $('#ear_delete_modal').modal('show');
      $('#confirm_delete_ear').attr('data-id',id);
    }
    $('#confirm_delete_ear').on('click',function(){
      var id=$(this).attr('data-id');
      confirm_delete_earnings(id);
    });
    function confirm_delete_earnings(id) {
      if(id !=''){
            $('#ear_delete_modal').modal('hide');
             $.ajax({
                   type:'POST',
                   url: base_url+'admin/payments/ear_delete',
                   data : {id:id,csrf_token_name:csrf_token},
                   dataType:'json',
                   success:function(response)
                   {
                      swal({
                        title: "Success..!",
                        text: "Deleted SuccessFully",
                        icon: "success",
                        button: "okay",
                        closeOnEsc: false,
                        closeOnClickOutside: false
                      }).then(function(){
                        location.reload();
                      });
                }
              });
            }
    }

  $(document).on("click", "#state_del", function () {
    var id=$(this).attr('data-id');
    state_delete_modal_show(id);
  });
  function state_delete_modal_show(id) {
      $('#state_delete_modal').modal('show');
      $('#confirm_delete_state').attr('data-id',id);
    }
    $('#confirm_delete_state').on('click',function(){
      var id=$(this).attr('data-id');
      confirm_delete_state(id);
    });
    function confirm_delete_state(id) {
      if(id !=''){
            $('#state_delete_modal').modal('hide');
             $.ajax({
                   type:'POST',
                   url: base_url+'admin/dashboard/state_delete',
                   data : {id:id,csrf_token_name:csrf_token},
                   dataType:'json',
                    success:function(response) {
                        if(response == 'failure') {
                            swal({
                                title: "Failure..!",
                                text: "Unable to add payouts in Demo mode",
                                icon: "error",
                                button: "okay",
                                closeOnEsc: false,
                                closeOnClickOutside: false
                              }).then(function(){
                                location.reload();
                            });
                        } else {
                            swal({
                                title: "Success",
                                text: "State Deleted SuccessFully",
                                icon: "success",
                                button: "okay",
                                closeOnEsc: false,
                                closeOnClickOutside: false
                              }).then(function(){
                                location.reload();
                            });
                        } 
                      
                }
              });
            }
    }

  $(document).on("click", "#city_del", function () {
    var id=$(this).attr('data-id');
    city_delete_modal_show(id);
  });
  function city_delete_modal_show(id) {
      $('#city_delete_modal').modal('show');
      $('#confirm_delete_city').attr('data-id',id);
    }
    $('#confirm_delete_city').on('click',function(){
      var id=$(this).attr('data-id');
      confirm_delete_city(id);
    });
    function confirm_delete_city(id) {
      if(id !=''){
            $('#city_delete_modal').modal('hide');
             $.ajax({
                   type:'POST',
                   url: base_url+'admin/dashboard/city_delete',
                   data : {id:id,csrf_token_name:csrf_token},
                   dataType:'json',
                   success:function(response)
                   {
                      swal({
                        title: "Success..!",
                        text: "Deleted SuccessFully",
                        icon: "success",
                        button: "okay",
                        closeOnEsc: false,
                        closeOnClickOutside: false
                      }).then(function(){
                        location.reload();
                      });
                }
              });
            }
    }

    $('#add_country_code_config').bootstrapValidator({
    fields: {
      country_code:   {
        validators: {
          notEmpty: {
            message: 'Please enter Country Code'

          }
        }
      },
      country_id:   {
        validators: {
          notEmpty: {
            message: 'Please enter Country ID'

          }
        }
      },
      country_name:   {
        validators: {
          notEmpty: {
            message: 'Please enter Country Name'

          }
        }
      },                  
    }
    }).on('success.form.bv', function(e) {
      return true;
    });

    $('#edit_country').bootstrapValidator({
    fields: {
      country_code:   {
        validators: {
          notEmpty: {
            message: 'Please enter Country Code'

          }
        }
      },
      country_id:   {
        validators: {
          notEmpty: {
            message: 'Please enter Country ID'

          }
        }
      },
      country_name:   {
        validators: {
          notEmpty: {
            message: 'Please enter Country Name'

          }
        }
      },                  
    }
    }).on('success.form.bv', function(e) {
      return true;
    });

    $('#add_state').bootstrapValidator({
    fields: {
      countryid:   {
        validators: {
          notEmpty: {
            message: 'Please enter Select Country'

          }
        }
      },
      state_name:   {
        validators: {
          notEmpty: {
            message: 'Please enter State Name'

          }
        }
      },                 
    }
    }).on('success.form.bv', function(e) {
      return true;
    });

    $('#edit_state').bootstrapValidator({
    fields: {
      countryid:   {
        validators: {
          notEmpty: {
            message: 'Please enter Select Country'

          }
        }
      },
      state_name:   {
        validators: {
          notEmpty: {
            message: 'Please enter State Name'

          }
        }
      },                 
    }
    }).on('success.form.bv', function(e) {
      return true;
    });

})(jQuery);