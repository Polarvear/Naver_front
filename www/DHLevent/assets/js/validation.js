//유효성 체크
$("#insert_form").validate({
    //validation이 끝난 이후의 submit 직전 추가 작업할 부분
    submitHandler: function() {
        return true;
    },
    //규칙
    rules: {
        fname: {
          required : true,
          minlength: 1,
        },
        lname: {
          required : true,
          minlength: 1,
        },
        email: {
          required : true,
          minlength: 2,
        },
        company: {
          required : true,
          minlength: 2,
        },
        phone: {
          required : true,
          minlength: 9,
        },
        customerNum: {
          required : true,
          digits :  true,
          rangelength: [9, 9]
        },
    },
    //규칙체크 실패시 출력될 메시지
    messages : {
        fname: {
            required : "성함을 입력해주세요.",
            minlength: $.validator.format("성함은 최소 {0} 글자 이상 입력하세요."),
        },
		lname: {
            required : "성함을 입력해주세요.",
            minlength: $.validator.format("성함은 최소 {0} 글자 이상 입력하세요."),
        },
        email: {
            required : "이메일을 입력해주세요.",
            minlength: $.validator.format("회사명은 최소 {0} 글자 이상 입력하세요."),
        },
        company: {
            required : "회사명을 입력해주세요.",
            minlength: $.validator.format("회사명은 최소 {0} 글자 이상 입력하세요."),
        },
        phone: {
            required : "연락처를 입력해주세요.",
            minlength: $.validator.format("연락처는 최소 {0} 글자 이상 입력하세요."),
        },
    }
});

$(document).ready(function() {
  $('input[name=phone]').inputmask('9{2,3}-9{3,4}-9999');
    $('#insert_form').validate({
    	errorClass: 'has-error',

    	errorPlacement: function(error, element) {
      error.insertAfter(element);
    },
    rules: validationParams.rules,
    messages: validationParams.messages
  });
});
