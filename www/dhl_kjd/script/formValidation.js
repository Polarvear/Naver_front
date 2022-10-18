//유효성 체크
$("form").validate({
    //validation이 끝난 이후의 submit 직전 추가 작업할 부분
    submitHandler: function() {
        return true;
    },
    //규칙
    rules: {
        name: {
            required : true,
        },
        company: {
            required : true
        },
        department: {
            required : true
        },
        position: {
            required : true
        },
        customer_number: {
            required : true,
            digits :  true,
            rangelength: [9, 9]
        },
        question: {
            required : true
        },
    },
    //규칙체크 실패시 출력될 메시지
    messages : {
        name: {
            required : "성함을 입력해주세요",
        },
        company: {
            required : "회사명을 입력해주세요"
        },
        department: {
            required : "부서를 입력해주세요"
        },
        position: {
            required : "직책을 입력해주세요"
        },
        customer_number: {
            required : "DHL 고객번호를 입력해주세요",
            digits : "숫자만 입력하세요",
            rangelength : "DHL 고객번호 9자리를 입력해주세요."
        },
        question: {
            required : "질문을 입력해주세요."
        },
    }
});

//질문 글자수 제한
function updateChar(length_limit){

    var question= eval("document.all.question");
    var length = calculate_msglen(insert.question.value);

    document.getElementById("textlimit").innerHTML = length;
    if (length > length_limit) {
        alert("최대 " + length_limit + "byte이므로 초과된 글자수는 자동으로 삭제됩니다.");
        insert.question.value = insert.question.value.replace(/\r\n$/, "");
        insert.question.value = assert_msglen(insert.question.value, length_limit);
    }
}

//글자수반환
function calculate_msglen(message){
    var nbytes = 0;
    for (i=0; i<message.length; i++) {
    var ch = message.charAt(i);
    if(escape(ch).length > 4) {
        nbytes += 2;
        } else if (ch == '\n') {
            if (message.charAt(i-1) != '\r') {
            nbytes += 1;
            }
        } else if (ch == '<' || ch == '>') {
            nbytes += 4;
        } else {
            nbytes += 1;
        }
    }
    return nbytes;
}

//글자수 Max까지다시 잘라내기
function assert_msglen(message, maximum){
    var inc = 0;
    var nbytes = 0;
    var msg = "";
    var msglen = message.length;
    for (i=0; i<msglen; i++) {
        var ch = message.charAt(i);
        if (escape(ch).length > 4) {
            inc = 2;
       } else if (ch == '\n') {
            if (message.charAt(i-1) != '\r') {
                inc = 1;
            }
        } else if (ch == '<' || ch == '>') {
            inc = 4;
        } else {
            inc = 1;
        }
        if ((nbytes + inc) > maximum) {
            break;
        }
        nbytes += inc;
        msg += ch;
    }
    document.getElementById("textlimit").innerHTML = nbytes;
    return msg;
}
