function passwordCK(id) {
    var e = document.getElementById("pw-modify-"+id);
    if(e.style.display == 'none') {
        e.style.display = 'block'
    } else {
        e.style.display = 'none';
    }
}


jQuery(document).ready(function($) {
    $('.test').on("submit", function(e){
        e.preventDefault();
        //console.log($(this).find('.password-class').val());
        
        var self = $(this);
        //alert(ajax.ajaxurl);
        $.ajax({
            type: 'GET',
            url: ajax.ajaxurl,
            data: {
                action: 'passwordCheck',
                'password':$(this).find('.password-class').val(),
                'comment_ID':$(this).find('.commentID-class').val()
            },
            dataType: 'json',
            success : function(result) {

                if(result['result'] == true){
                    
                    self.closest('.form-parent').find('.modify-form-area').removeAttr("style");
                }else {
                    alert('비밀번호를 다시 입력해주세요.');
                }
            },
            error:function(request,status,error){
                //alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                alert('비밀번호를 다시 입력해주세요.');
            }
        });
        // e.preventDefault();

    });
});
