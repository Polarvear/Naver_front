//유효성 체크
$("#insert_form").validate({
    //validation이 끝난 이후의 submit 직전 추가 작업할 부분
    submitHandler: function() {
        return true;
    },
    //규칙
    rules: {
        name: {
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
        salesManager: {
          required : true
        },
        password: {
          required : true,
          digits :  true,
        },
        privacy_agreement: {
          required : true,
        },
        comment: {
          required : true
        },
    },
    //규칙체크 실패시 출력될 메시지
    messages : {
        name: {
            required : "성함을 입력해주세요.",
            minlength: $.validator.format("성함은 최소 {0} 글자 이상 입력하세요."),
        },
        company: {
            required : "회사명을 입력해주세요.",
            minlength: $.validator.format("회사명은 최소 {0} 글자 이상 입력하세요."),
        },
        phone: {
            required : "연락처를 입력해주세요.",
            minlength: $.validator.format("연락처는 최소 {0} 글자 이상 입력하세요."),
        },
        customerNum: {
            required : "DHL 고객번호를 입력해주세요.",
            digits : "숫자만 입력하세요.",
            rangelength : "DHL 고객번호 9자리를 입력해주세요."
        },
        salesManager: {
            required : "DHL영업 담당자를 입력해주세요."
        },
        password: {
            required : "패스워드를 입력해주세요.",
            digits : "숫자만 입력하세요.",
        },
        privacy_agreement: {
          required : "개인정보 수집동의에 체크해주세요.",
        },
        comment: {
            required : "댓글을 입력해주세요."
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
