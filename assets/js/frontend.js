/*-----------------Hide table-------------- */
var submit = $("#confirm_push");
var messageList = $(".card-body");


function hideList(){
    messageList.hide();
    }

    hideList();

    $(submit).on('click', function() {
        messageList.fadeIn("slow");
       
    })
/*-----------------End Hide table-------------- */

/*----------------- Input Mask-------------- */
    $("#phone").inputmask({"mask": "(999) 999-9999"});
 /*-------------End Input Mask--------------*/   

/*----------------- Form Validation-------------- */

  
        // Rules for submisson fields
        $("#main_form").validate({
            errorClass: "errors",
            rules: {
                name: {
                    required: true,
                },
                phone: {
                    required: true,
                },
                occasion: {
                    required: true,
                },
                date:
                {
                    required: true,
                },
                message: {
                    required: true,
                }
            },
            // Setting error messages for the fields
            messages: {
                name: "Please enter a name",
                phone: "Please enter a valid phone number",
                occasion: "Please enter an occasion",
                message: "Please enter a message"
            }
        });




    /*-------------End form Validation--------------*/




