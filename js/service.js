(function($) {

    "use strict";



    var base_url = $('#base_url').val();

    var csrf_token = $('#csrf_token').val();

    var csrfName = $('#csrfName').val();

    var csrfHash = $('#csrfHash').val();

    var placeSearch, autocomplete;
    $('.paypal_desc').hide();
    $('#paypal-button').hide();


    $(document).ready(function() {
		
        $('#my_stripe_payyment').hide();
		if($("#page").val()!="service-edit")
		{
		 
			 
		

        $('.select').selectpicker();



        //location

        $("#category1,#subcategory").selectpicker();



        $.ajax({

            type: "GET",

            url: base_url + "user/service/get_category",

            data: { id: $(this).val(), 'csrf_token_name': csrf_token },

            beforeSend: function() {

                $("#category option:gt(0)").remove();

                $('#category').selectpicker('refresh');

                $("#category").selectpicker();

                $('#category').find("option:eq(0)").html("Please wait..");

                $('#category').selectpicker('refresh');

                $("#category").selectpicker();

            },

            success: function(data) {

                $('#category').selectpicker('refresh');

                $("#category").selectpicker();

                $('#category').find("option:eq(0)").html("Select Category");

                $('#category').selectpicker('refresh');

                $("#category").selectpicker();
                var provider_category=$('#provider_category').val();

                var obj = jQuery.parseJSON(data);


                $('#category').selectpicker('refresh');

                $("#category").selectpicker();

                $(obj).each(function() {
                    var option = $('<option />');

                    option.attr('value', this.value).text(this.label);

                    

                    $('#category').append(option);

                });



              if(provider_category!=undefined && provider_category!=''){
              //  alert('Hii');
                $('#category').find('option[value="' + provider_category + '"]').prop("selected", true);

                getSelectedSubcategory();
                $('#category').attr('disabled', true);
              } 
                

                $('#category').selectpicker('refresh');

                $("#category").selectpicker();

            }

        });


		
		}

        $('.callStripe').on('click',function(){
			var e=this;
			callStripe(e);
		}); 
        function callStripe(e) {
            var payment_type = $('input[name="payment_type"]:checked').val();
            var sub_id = $(e).attr('data-id');
            var final_gig_amount = $(e).attr('data-amount');
            var final_gig_currency = $(e).attr('data-currency');
            var curconv = $(e).attr('data-curcon');
            if(parseInt(final_gig_amount)==0.00) {
                free_subscription();
            }
            else {
                
                if (payment_type == '' || payment_type == undefined) {
                    swal({
                        title: "payment Type",
                        text: "Kindly Select payment Type...",
                        icon: "error",
                        button: "okay",
                        closeOnEsc: false,
                        closeOnClickOutside: false
                    });
                    return false;
                }
                if (payment_type == "razorpay" && payment_type != undefined) {
                    
                    curconv = curconv *100;
                    var product_id =  '123';
                    var product_name =  'Add Subscription';				
                    var options = {
                        "key": $('#razorpay_apikey').val(),
                        "currency": 'INR', //final_gig_currency,
                        "amount": Math.round(curconv),
                        "name": product_name,
                        "description": product_name,
                        "handler": function (response){
                              $.ajax({
                                url: base_url+'user/subscription/razorpay_payment',
                                type: 'post',
                                dataType: 'json',
                                data: {sub_id:sub_id,final_gig_amount:curconv * 100,csrf_token_name:csrf_token},
                                success: function (msg) {						
                                  window.location.href = base_url+'provider-subscription';
                                }
                            });
                        },
                        "theme": {
                            "color": "#F37254"
                        }
                    }
                    var rzp1 = new Razorpay(options);
                    rzp1.open();
                    e.preventDefault();
                    return false;
                }
                if (payment_type == "stripe" && payment_type != undefined) {
                    $('#my_stripe_payyment').click();
                }
                if (payment_type == "paypal") {
                    
                    document.getElementById("frm_paypal_detail_"+sub_id).submit();
                    var amnt=curconv * 100;
                        
                }
                if (payment_type == "paysolution" && payment_type != undefined) {
                    $('#paysolution_amt').val(final_gig_amount);
                    $('#productdetail').val('subscription_'+sub_id);
                    $('#paysolution_subscription').submit();
                }
                
                //flutterwave
                if(payment_type == "flutter" && payment_type != undefined) {
                
                    if(flutter_key == '' || flutter_key == undefined) {
                      
                        swal({
                        title: "Empty Key",
                        text: "Please Enter Payment api key",
                        icon: "error",
                        button: "okay",
                        closeOnEsc: false,
                        closeOnClickOutside: false
                    });
                    } else {
                                            
                        makePayment();
                        function makePayment(){
                            
                            var amount =  curconv;
                            var product_id = '1234';
                            var product_name = 'Add Subscription';	
                            var public_key = $('#flutter_key').val();
                            var email = $('#email').val();
                            var mobileno = $('#mobileno').val();
                            var username = $('#username').val();
                            // var currency = $('#currency_val').val();
                            var uniqueid = $('#refno').val();
                            var currency = "NGN";
    
                            FlutterwaveCheckout({
                                
                                "public_key": public_key,
                                "tx_ref" : uniqueid,
                                "amount" : amount,
                                "currency": currency,
                                payment_options: "card, mobilemoneyghana, ussd",
                                redirect_url: base_url+'flutterwave-payment-post',
                                customer: {
                                    "email": email,
                                    "name":username,
                                   "phone_number": "<?=  !empty($mobileno) ? $mobileno : ''; ?>",
                                },
                                callback: function (data) {
                                },
                                onclose: function () {
                                },
                               
                            });
                            
                        }
                        
                    }
                }
    
                //iyzico
    
                if(payment_type == "iyzico" && payment_type != undefined) {
                
                    if(iyzico_key == '' || iyzico_key == undefined) {
                      
                        swal({
                        title: "Empty Key",
                        text: "Please Enter Payment api key",
                        icon: "error",
                        button: "okay",
                        closeOnEsc: false,
                        closeOnClickOutside: false
                    });
                    } else {
                        var totalAmount =  curconv;
                            
                        var product_id = '123';
                        var product_name = 'Wallet Topup';
                        var public_key = $('#iyzico_apikey').val();
                        var email = $('#email').val();
                        var mobileno = $('#mobileno').val();
                        var username = $('#username').val();
                        var uniqueid = $('#refno').val();
                        var currency = $('#currency_val').val();
                        var csrf_token = $('#csrf_token').val();
                        
                        var req_url = base_url+'user/dashboard/iyzico_provider_subscription/'+totalAmount;
                       
                        window.location.replace(req_url);						
                        
                    }        			
                    
                }
    
    
                //midtrans
                if (payment_type == "midtrans" && payment_type != undefined) {
    
                    curconv = curconv *100;
                    
                    var product_id =  '1234';
                    var product_name =  'Add Subscription';				
                    var options = {
                        "key": $('#midtrans_key').val(),
                        "currency": 'IDR', //final_gig_currency,
                        "amount": Math.round(curconv),
                        "name": product_name,
                        "description": product_name,
                        "handler": function (response){
                              $.ajax({
                                url: base_url+'user/subscription/midtrans_payment',
                                type: 'post',
                                dataType: 'json',
                                data: {sub_id:sub_id,final_gig_amount:curconv * 100,csrf_token_name:csrf_token},
                                success: function (msg) {						
                                  window.location.href = base_url+'provider-subscription';
                                }
                            });
                        },
                        
                    }
                    
                    $('#gross_amount').val(final_gig_amount);
                    $('#order_id').val('subscription_'+sub_id);
                    $('#midtrans_form').submit();
                }
    
                var currency_val = $("#currency_val").val();
                 //paystack
                    if(payment_type=="paystack") {
                        if(paystack_key == '' || paystack_key == undefined) {
                        swal({
                            title: "Empty Key",
                            text: "Please Enter Payment api key",
                            icon: "error",
                            button: "okay",
                            closeOnEsc: false,
                            closeOnClickOutside: false
                        });
                        } else {
                            button_loading();
                            currency_conversion(final_gig_amount,currency_val);
                        }
                    }
    
                  //endpaystack
    
                  //Offline Payment
                  if (payment_type=="offline_payment") {
                      window.location.href = base_url+'advofflinepayment/'+sub_id;
                  }
    
                  if (payment_type=="cashfree") {
                      window.location.href = base_url+'advonlinepayment/'+sub_id;
                  }		
                
            }
        }
    
        function free_subscription() {
            $.ajax({
                url: base_url+'user/subscription/stripe_payments/',
                data: {sub_id:sub_id,final_gig_amount:final_gig_amount,csrf_token_name:csrf_token},
                type: 'POST',
                dataType: 'JSON',
                beforeSend: function(){
                    $('.loading').show();
                },
                success: function(response){
                    $('.loading').fadeOut("slow");
                    window.location.href = base_url+'provider-subscription';
                },
                error: function(error){
                    console.log(error);
                }
            });
        }
function getSelectedSubcategory() {
    var category_id = $('#category').val();
    $("#subcategory").val('default');
    $("#subcategory").selectpicker("refresh");

    $.ajax({
        type: "POST",
        url: base_url + "user/service/get_subcategory",
        data: { id: category_id, csrf_token_name: csrf_token },
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
        }

 $('#category123').change(function() {

            $("#subcategory123").val('default');

            $("#subcategory123").selectpicker("refresh");


            $.ajax({

                type: "POST",

                url: base_url + "user/service/get_subcategory",

                data: { id: $(this).val(), csrf_token_name: csrf_token },

                beforeSend: function() {

                    $("#subcategory123 option:gt(0)").remove();

                    $('#subcategory123').selectpicker('refresh');

                    $("#subcategory123").selectpicker();

                    $('#subcategory123').find("option:eq(0)").html("Please wait..");

                    $('#subcategory123').selectpicker('refresh');

                    $("#subcategory123").selectpicker();

                },

                success: function(data) {

                    $('#subcategory123').selectpicker('refresh');

                    $("#subcategory123").selectpicker();

                    $('#subcategory123').find("option:eq(0)").html("Select SubCategory");

                    $('#subcategory123').selectpicker('refresh');



                    $('#subcategory123').selectpicker('refresh');

                    $("#subcategory123").selectpicker();

                    if (data) {

                        var obj = jQuery.parseJSON(data);

                        $(obj).each(function() {

                            var option = $('<option />');

                            option.attr('value', this.value).text(this.label);

                            $('#subcategory123').append(option);

                        });

                    }



                    $('#subcategory123').selectpicker('refresh');

                    $("#subcategory123").selectpicker();

                }

            });



        });


//
//        $('#category,#category1').change(function() {
//
//            $("#subcategory").val('default');
//
//            $("#subcategory").selectpicker("refresh");
//
//
//
//            $.ajax({
//
//                type: "POST",
//
//                url: base_url + "user/service/get_subcategory",
//
//                data: { id: $(this).val(), csrf_token_name: csrf_token },
//
//                beforeSend: function() {
//
//                    $("#subcategory option:gt(0)").remove();
//
//                    $('#subcategory').selectpicker('refresh');
//
//                    $("#subcategory").selectpicker();
//
//                    $('#subcategory').find("option:eq(0)").html("Please wait..");
//
//                    $('#subcategory').selectpicker('refresh');
//
//                    $("#subcategory").selectpicker();
//
//                },
//
//                success: function(data) {
//
//                    $('#subcategory').selectpicker('refresh');
//
//                    $("#subcategory").selectpicker();
//
//                    $('#subcategory').find("option:eq(0)").html("Select SubCategory");
//
//                    $('#subcategory').selectpicker('refresh');
//
//
//
//                    $('#subcategory').selectpicker('refresh');
//
//                    $("#subcategory").selectpicker();
//
//                    if (data) {
//
//                        var obj = jQuery.parseJSON(data);
//
//                        $(obj).each(function() {
//
//                            var option = $('<option />');
//
//                            option.attr('value', this.value).text(this.label);
//
//                            $('#subcategory').append(option);
//
//                        });
//
//                    }
//
//
//
//                    $('#subcategory').selectpicker('refresh');
//
//                    $("#subcategory").selectpicker();
//
//                }
//
//            });
//
//
//
//        });

$('#update_adv_post').bootstrapValidator({
    fields: {
        service_title: {

            validators: {

                notEmpty: {

                    message: 'Please Enter your advertisement name'

                }

            }

        }
    }
}).on('success.form.bv', function(e) {
    return true;
 });

$('#add_adv_service').bootstrapValidator({

    fields: {
        service_title: {

            validators: {

                notEmpty: {

                    message: 'Please Enter your advertisement name'

                }

            }

        },
        'images': {

            validators: {

                file: {

                    extension: 'jpeg,png,jpg',

                    type: 'image/jpeg,image/png,image/jpg',

                    message: 'The selected file is not valid. Only allowed jpeg,png files'

                },

                notEmpty: {

                    message: 'Please upload advertisement image...'

                }

            }

        },

    }
}).on('success.form.bv', function(e) {
    return true;



 });
        $('#add_service').bootstrapValidator({

            fields: {

                 username:           {

                      validators:           {

                        notEmpty:               {

                          message: 'Please select Provider'

                        }

                      }

                    },

                    country_id:           {

                      validators:           {

                        notEmpty:               {

                          message: 'Please select Country'

                        }

                      }

                    },

                    state_id:           {

                      validators:           {

                        notEmpty:               {

                          message: 'Please select State'

                        }

                      }

                    },

                    city_id:           {

                      validators:           {

                        notEmpty:               {

                          message: 'Please select City'

                        }

                      }

                    },

                service_title: {

                    validators: {

                        remote: {

                            url: base_url + 'user/service/check_service_title',

                            data: function(validator) {

                                return {

                                    service_title: validator.getFieldElements('service_title').val(),

                                    'csrf_token_name': $('#login_csrf').val()

                                };

                            },

                            message: 'This Service is already exist',

                            type: 'POST'

                        },

                        notEmpty: {

                            message: 'Please Enter your service title'

                        }

                    }

                },

                service_sub_title: {

                    validators: {

                        notEmpty: {

                            message: 'Please Enter service sub title'

                        }

                    }

                },

                category: {

                    validators: {

                        notEmpty: {

                            message: 'Please select category...'

                        }

                    }

                },

                subcategory: {

                    validators: {

                        notEmpty: {

                            message: 'Please select subcategory...'

                        }

                    }

                },

                service_location: {

                    validators: {

                        notEmpty: {

                            message: 'Please Enter service location...'

                        }

                    }

                },

                service_amount: {

                    validators: {

                        digits: {

                            message: 'Please Enter valid service amount and not user in special characters...'

                        },

                        notEmpty: {

                            message: 'Please Enter service amount...'

                        }

                    }

                },

                'service_offered[]': {

                    validators: {

                        notEmpty: {

                            message: 'Please Enter service offered'

                        }

                    }

                },

                about: {

                    validators: {

                        notEmpty: {

                            message: 'Please Enter About Informations...'

                        }

                    }

                },

                'images[]': {

                    validators: {

                        file: {

                            extension: 'jpeg,png,jpg',

                            type: 'image/jpeg,image/png,image/jpg',

                            message: 'The selected file is not valid. Only allowed jpeg,png files'

                        },

                        notEmpty: {

                            message: 'Please upload Service image...'

                        }

                    }

                },

                service_country: {

                    validators: {

                        notEmpty: {

                            message: 'Please Enter service country'

                        }

                    }

                },

                service_city: {

                    validators: {

                        notEmpty: {

                            message: 'Please Enter service city'

                        }

                    }

                },

                service_state: {

                    validators: {

                        notEmpty: {

                            message: 'Please Enter service state'

                        }

                    }

                },

            }
        }).on('success.form.bv', function(e) {
            $('#category').attr('disabled', false);
            return true;
 
 
 
         });
  //      });

        //.on('success.form.bv', function(e) {

            /*if ($('.submit_status').val() == 0) {



                //var desc = CKEDITOR.instances["about"].getData();



                //console.log(desc); return false;

                let formData = new FormData($('#add_service')[0]),

                    files = [];

                for (var i = 0; i < AttachmentArray.length; i++) {

                    // console.log(AttachmentArray[i].file);

                    //formData.append('images2[]', AttachmentArray[i].file);

                }

                $('#load_div').html('<img src="' + base_url + 'assets/img/loader.gif" alt="" />');

                $('#load_div').show();



                $('#submit_add_service').attr('disabled', true);

                $.ajax({

                    type: "POST",

                    url: base_url + "user/service/add_service_ajax",

                    data: formData,

                    processData: false,

                    contentType: false,

                    beforeSend: function() {

                        button_loading();

                    },

                    success: function(res) {

                        button_unloading();

                        if (res == 1) {

                            window.location.href = base_url + "my-services";

                        } else {

                           // window.location.reload();

                        }

                    }

                });

                return false;

            } else {

                return false;

            }*/



            //return false;

        //});

        $('#update_service').bootstrapValidator({

            fields: {

                username:           {

                      validators:           {

                        notEmpty:               {

                          message: 'Please select Provider'

                        }

                      }

                    },

                service_title: {

                    validators: {

                        remote: {

                            url: base_url + 'user/service/check_service_title',

                            data: function(validator) {

                                return {

                                    service_title: validator.getFieldElements('service_title').val(),

                                    service_id: validator.getFieldElements('service_id').val(),

                                    'csrf_token_name': $('#login_csrf').val()

                                };

                            },

                            message: 'This Service is already exist',

                            type: 'POST'

                        },

                        notEmpty: {

                            message: 'Please Enter your service title'

                        }

                    }

                },

                service_sub_title: {

                    validators: {

                        notEmpty: {

                            message: 'Please Enter service sub title'

                        }

                    }

                },

                category: {

                    validators: {

                        notEmpty: {

                            message: 'Please select category...'

                        }

                    }

                },

                subcategory: {

                    validators: {

                        notEmpty: {

                            message: 'Please select subcategory...'

                        }

                    }

                },

                service_location: {

                    validators: {

                        notEmpty: {

                            message: 'Please Enter service location...'

                        }

                    }

                },

                service_amount: {

                    validators: {

                        digits: {

                            message: 'Please Enter valid service amount and not user in special characters...'

                        },

                        notEmpty: {

                            message: 'Please Enter service amount...'

                        }

                    }

                },

                'service_offered[]': {

                    validators: {

                        notEmpty: {

                            message: 'Please Enter service offered'

                        }

                    }

                },

                // about: {

                //     validators: {

                //         notEmpty: {

                //             message: 'Please Enter About Informations...'

                //         }

                //     }

                // },

                /*'images[]': {

                  validators: {

                    file: {

                      extension: 'jpeg,png,jpg',

                      type: 'image/jpeg,image/png,image/jpg',

                      message: 'The selected file is not valid. Only allowed jpeg,png files'

                    },

                    notEmpty:               {

                      message: 'Please upload category image...'

                    }

                  }

                }*/

            }

        }).on('success.form.bv', function(e) {

           return true;



        });

    });

    //document end





    function initialize() {

        // Create the autocomplete object, restricting the search

        // to geographical location types.

        autocomplete = new google.maps.places.Autocomplete(

            /** @type {HTMLInputElement} */

            (document.getElementById('service_location')), {

                types: ['geocode']

            });







        google.maps.event.addDomListener(document.getElementById('service_location'), 'focus', geolocate);

        autocomplete.addListener('place_changed', get_latitude_longitude);



    }



    function get_latitude_longitude() {

        // Get the place details from the autocomplete object.

        var place = autocomplete.getPlace();

        var key = $("#map_key").val();

        $.get('https://maps.googleapis.com/maps/api/geocode/json', { address: place.formatted_address, key: key }, function(data, status) {



            $(data.results).each(function(key, value) {



                $('#service_address').val(place.formatted_address);

                $('#service_latitude').val(value.geometry.location.lat);

                $('#service_longitude').val(value.geometry.location.lng);





            });

        });

    }



    function geolocate() {



        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(function(position) {



                var geolocation = new google.maps.LatLng(

                    position.coords.latitude, position.coords.longitude);

                var circle = new google.maps.Circle({

                    center: geolocation,

                    radius: position.coords.accuracy

                });

                autocomplete.setBounds(circle.getBounds());



            });

        }

    }



    initialize();



    /* Image Upload */



    if ($('#add_service, #update_service, #add_provider, #add_adv_service, #update_adv_post').length > 0) {
        document.addEventListener("DOMContentLoaded", init, false);



        //To save an array of attachments 

        var AttachmentArray = [];



        //counter for attachment array

        var arrCounter = 0;



        //to make sure the error message for number of files will be shown only one time.

        var filesCounterAlertStatus = false;



        //un ordered list to keep attachments thumbnails

        var ul = document.createElement('ul');

        ul.className = ("upload-wrap");

        ul.id = "imgList";



        function init() {

            //add javascript handlers for the file upload event

            document.querySelector('#images').addEventListener('change', handleFileSelect, false);

        }



        //the handler for file upload event

        function handleFileSelect(e) {

            //to make sure the user select file/files

            if (!e.target.files) return;



            //To obtaine a File reference

            var files = e.target.files;

        





            // Loop through the FileList and then to render image files as thumbnails.

            for (var i = 0, f; f = files[i]; i++) {



                //instantiate a FileReader object to read its contents into memory

                var fileReader = new FileReader();



                // Closure to capture the file information and apply validation.

                fileReader.onload = (function(readerEvt) {

                    return function(e) {



                        //Apply the validation rules for attachments upload

                        ApplyFileValidationRules(e, readerEvt)



                        //Render attachments thumbnails.

                        RenderThumbnail(e, readerEvt);



                        //Fill the array of attachment

                        FillAttachmentArray(e, readerEvt)

                    };

                })(f);



                // Read in the image file as a data URL.

                // readAsDataURL: The result property will contain the file/blob's data encoded as a data URL.

                // More info about Data URI scheme https://en.wikipedia.org/wiki/Data_URI_scheme

                fileReader.readAsDataURL(f);

            }

            document.getElementById('images').addEventListener('change', handleFileSelect, false);

        }



        //To remove attachment once user click on x button

        jQuery(function($) {

            $('div').on('click', '.upload-images .file_close', function() {

                var id = $(this).closest('.upload-images').find('img').data('id');

                //to remove the deleted item from array

                var elementPos = AttachmentArray.map(function(x) { return x.FileName; }).indexOf(id);



                if (elementPos !== -1) {

                    AttachmentArray.pop(elementPos, 1);

                }



                //to remove image tag

                $(this).parent().find('img').not().remove();



                //to remove div tag that contain the image

                $(this).parent().find('div').not().remove();



                //to remove div tag that contain caption name

                $(this).parent().parent().find('div').not().remove();



                //to remove li tag

                var lis = document.querySelectorAll('#imgList li');

                for (var i = 0; i = lis[i]; i++) {

                    if (i.innerHTML == "") {

                        i.parentNode.removeChild(lis);

                    }

                }

            });

        });



        //Apply the validation rules for attachments upload

        function ApplyFileValidationRules(e, readerEvt) {

            //To check file type according to upload conditions

            if (CheckFileType(readerEvt.type) == false) {

                alert("The file (" + readerEvt.name + ") does not match the upload conditions, You can only upload jpg/png/gif files");

                e.preventDefault();

                return;

            }



            //To check files count according to upload conditions

            if (CheckFilesCount(AttachmentArray) == false) {

                if (!filesCounterAlertStatus) {

                    filesCounterAlertStatus = true;

                    alert("You have added more than 10 files. According to upload conditions you can upload 10 files maximum");

                }

                e.preventDefault();

                return;

            }

        }



        //To check file type according to upload conditions

        function CheckFileType(fileType) {

            if (fileType == "image/jpeg") {

                return true;

            } else if (fileType == "image/png") {

                return true;

            } else if (fileType == "image/gif") {

                return true;

            } else {

                return false;

            }

            return true;

        }



        //To check file Size according to upload conditions

        function CheckFileSize(fileSize) {

            if (fileSize < 300000) {

                return true;

            } else {

                return false;

            }

            return true;

        }



        //To check files count according to upload conditions

        function CheckFilesCount(AttachmentArray) {

            //Since AttachmentArray.length return the next available index in the array, 

            //I have used the loop to get the real length

            var len = 0;

            for (var i = 0; i < AttachmentArray.length; i++) {

                if (AttachmentArray[i] !== undefined) {

                    len++;

                }

            }

            //To check the length does not exceed 10 files maximum

            if (len > 9) {

                $("#images").val('');

                $('.submit_status').val(1);

                return false;

            } else {

                $('.submit_status').val(0);

                return true;

            }

        }



        //Render attachments thumbnails.

        function RenderThumbnail(e, readerEvt) {

            var li = document.createElement('li');

            ul.appendChild(li);

            li.innerHTML = ['<div class="upload-images"> ' +

                '<a style="display:block;" href="javascript:void(0);" class="file_close btn btn-icon btn-danger btn-sm">X</a><img class="thumb" src="', e.target.result, '" title="', escape(readerEvt.name), '" data-id="',

                readerEvt.name, '"/>' + '</div>'

            ].join('');

            var div = document.createElement('div');

            div.className = "FileNameCaptionStyle d-none";

            li.appendChild(div);

            div.innerHTML = [readerEvt.name].join('');

            document.getElementById('uploadPreview').insertBefore(ul, null);

        }



        //Fill the array of attachment

        function FillAttachmentArray(e, readerEvt) {

            AttachmentArray[arrCounter] = {

                AttachmentType: 1,

                ObjectType: 1,

                FileName: readerEvt.name,

                FileDescription: "Attachment",

                NoteText: "",

                MimeType: readerEvt.type,

                Content: e.target.result.split("base64,")[1],

                FileSizeInBytes: readerEvt.size,

                file: readerEvt,

            };

            arrCounter = arrCounter + 1;

        }

    }



    function button_loading() {

        var $this = $('.btn');

        var loadingText = '<i class="fa fa-circle-o-notch fa-spin"></i> loading...';

        if ($this.html() !== loadingText) {

            $this.data('original-text', $this.html());

            $this.html(loadingText).prop('disabled', 'true').bind('click', false);

        }

    }



    function button_unloading() {

        var $this = $('.btn');

        $this.html($this.data('original-text')).prop('disabled', 'false');

    }



    function testdesc() {

        alert();

    }

    /*CKEDITOR.instances["sampleInstance"].on('keyup', function() {

        alert('rrrr');

    });*/

      
	  



})(jQuery);