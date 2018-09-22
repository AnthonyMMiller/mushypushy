var submit = $("#confirm_push");
var messageList = $(".card-body");


function hideList(){
    messageList.hide();
    }

    hideList();

    $(submit).on('click', function() {
        messageList.fadeIn("slow");
       
    })
  

    // $(submit).on('click', function() {
    //     messageList.fadeIn("slow");
    //     $(this).addClass('animated hinge').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
    //       $(this).removeClass('animated hinge');
    //   });
    // })
  