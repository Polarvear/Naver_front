

(function() {
    // 이벤트 2 응모하기 버튼 이벤트
    function eventJoinFunc(){
        // 이벤트 진입 시 바로 로그인 체크
        eventApplyFunc('event2');
    }
    //### '이벤트 응모하기 및 결과 확인하기' 버튼 이벤트
    function eventApplyFunc(eventGubun){
        configData.loginFlag = action.ssoSessionCheck();// SSO Session 체크

        // 팝업 오픈 기간일때
        if(configData.isPopupOpen == 'Y'){
            var url = '/benefits/event/2021/05/detailPopup';
            if( configData.loginFlag == 'Y' ){
                //window.open(url+'?eventId='+EVENTID+'&eventGubun='+eventGubun,'win1','width=912,height=760,scrollbars=yes'); 
                // 인앱에서는 팝업 차단 안내 문구 나오지 않게 수정
                if(isApp()){
                    window.open(url+'?eventId='+EVENTID+'&eventGubun='+eventGubun,'win1','width=912,height=760,scrollbars=yes');
                }else{
                    // 이벤트 참여 팝업
                    var winOpen = window.open( 'about:_blank' ,'win1','width=912,height=760,scrollbars=yes');

                    setTimeout( function(){ 
                        if(!winOpen){
                            lgkorUI.alert("", {title: "원활한 이벤트 참여를 위해 팝업 차단을 해지해주세요."} );
                        }else{
                            winOpen.location.href = url+'?eventId='+EVENTID+'&eventGubun='+eventGubun;
                        }
                    }, 500 );
                }
            } else{
                //### SSO 인증 팝업 console.log("<c:out value="${memberInformation}"/>");
                var memberInformation = $("#memberInformation").val();
                if(memberInformation == ""){
                    url = "/sso/api/Login?state="+url;
                    lgkorUI.alert("", {title: "본 이벤트는 LG전자 회원 로그인 후 참여 가능합니다.", ok: function(){
                        setTimeout(function(){
                            window.open(url+'?eventId='+EVENTID+'%26eventGubun='+eventGubun,'win1','width=912,height=760,scrollbars=yes');
                        }, 500)
                    }});
                }else{
                    window.open(url,'win1','width=912,height=760,scrollbars=yes');
                }
            }
        }else{
            lgkorUI.alert("", {title: "이벤트 참여 기간이 아닙니다."} );
        }
    }
    var broswer = {};

    broswer.isMobile = function() {
        var tempUser = navigator.userAgent;
        var isMobile = '';
        // userAgent 값에 iPhone, iPad, ipot, Android 라는 문자열이 하나라도 존재한다면 모바일로 간주됨.
        if (tempUser.indexOf("iPhone") > 0 || tempUser.indexOf("iPad") > 0 || tempUser.indexOf("iPod") > 0) {
            isMobile = 'apple';
        }else if(tempUser.indexOf("Android") > 0){
            isMobile = 'android';
        }
        return isMobile;
    };    
    
    //브라우저의 종류 확인
    broswer.getBroswerName = function() {
        var agt = navigator.userAgent.toLowerCase();
        if(agt.indexOf("chrome") != -1) {
            return 'Chrome';
        }
        else if(agt.indexOf("opera") != -1) {
            return 'Opera';
        }
        else if(agt.indexOf("firefox") != -1) {
            return 'Firefox';
        }
        else if(agt.indexOf("safari") != -1) {
            return 'Safari';
        }
        else if(agt.indexOf("skipstone") != -1) {
            return 'Skipstone';
        }
        //msie는 Expolrer 11d이전 버전, trident는 Explorer 11버전
        else if(agt.indexOf("msie") != -1 || agt.indexOf("trident") != -1) {
            return 'Internet Explorer';
        }
        else if(agt.indexOf("netscape") != -1) {
            return 'Netscape';
        }
        else {
            return 'Unknown';
        }
    };

    var neAREvent = {
        init: function() {
            var self = this;
            self.setting();
            self.bindEvent();
        }, 

        setting: function() {
            var self = this;
            self.$wrap = $('.event_wrap');
            self.$inner = $('.inner');
            self.$btns = self.$inner.find('.btns');  
            
            self.$neAREventPopup = $('#popupneAREvent');
            self.$name = $('#popupneAREvent').find('#name');
            self.$phone = $('#popupneAREvent').find('#phone');             
        },

        bindEvent: function() {
            var self = this;
            //AR체험 띄우기
            self.$inner.on('click','.btns.b01 > a', function(e){
                //모바일 앱 일때
                if($('html').hasClass('app')) {
                    if($('.b01 a').hasClass('off')){
                        lgkorUI.alert("", {title:"해당 이벤트 기간이 아닙니다."});
                        return;
                    }
                    
                    if(self.$wrap.data('eventRestrictFlag') == "Y") {
                        lgkorUI.alert("", {title: "서버 점검중입니다."});
                        return;
                    }

                    //AR 구동 코드 입력
                    location.href = 'lgeapp://goto?type=AR&product=';

                } else {
                    if(broswer.isMobile()){
                        if(broswer.isMobile()=="android"){
                            var obj = {title:'앱에서만 참여 가능한 이벤트입니다.<br>앱다운로드 후 참여해주시기 바랍니다.<br>앱스토어로 이동합니다. ', cancelBtnName:'취소', okBtnName:'확인', ok: function (){
                                location.href = 'https://play.google.com/store/apps/details?id=kr.co.lge.android';
                            }};
                            lgkorUI.confirm(null, obj);
                        }else if(broswer.isMobile()=="apple"){
                            //모바일웹 - iOS 일때
                            var obj = {title:'앱에서만 참여 가능한 이벤트입니다.<br>앱다운로드 후 참여해주시기 바랍니다.<br>앱스토어로 이동합니다. ', cancelBtnName:'취소', okBtnName:'확인', ok: function (){
                                location.href = 'https://itunes.apple.com/app/id1561079401?mt=8';
                            }};
                            lgkorUI.confirm(null, obj);
                        }else{
                            lgkorUI.alert("", {title:"앱에서만 참여 가능한 이벤트입니다.<br>구글 플레이/앱 스토어에서<br>'LGE.COM'을 검색하여<br>앱 다운로드 후 참여해주시기 바랍니다.<br>감사합니다."});    
                        }
                    }else{
                        lgkorUI.alert("", {title:"본 이벤트 참여는 모바일 앱에서만 가능합니다.<br>구글 플레이/앱 스토어에서<br>'LGE.COM'을 검색하여<br>앱 다운로드 후 참여해주시기 바랍니다.<br>감사합니다."});
                    }
                }
            });

            //해시태그 복사 버튼
            self.$inner.on('click','.btns.b02 > a',function (e) {
                e.preventDefault();
                var tag = $(".input-hashtag");
                tag.select();
                // Use try & catch for unsupported browser
                try { // The important part (copy selected text)
                    var successful = document.execCommand('copy');
                    lgkorUI.alert('해시태그가 복사되었습니다', {
                        ok:function() {}
                    });
                } catch (err) {
                    lgkorUI.alert('이 브라우저는 해시태그 복사 기능을 지원하지 않습니다.', {
                        ok:function() {}
                    });
                }
            });
            
            self.$inner.on('click','.btns.b03 > a',function (e) {
                //모바일 앱 일때
                if(true){//$('html').hasClass('app')) {
                    if($('.b03 a').hasClass('off')){
                        lgkorUI.alert("", {title:"해당 이벤트 기간이 아닙니다."});
                        return;
                    }
    
                    // if(self.$wrap.data('eventRestrictFlag') == "Y") {
                    //     lgkorUI.alert("", {title: "서버 점검중입니다."});
                    //     return;
                    // }

                    //CNS 측과 논의 필요
                    // if(lgkorUI.stringToBool($(this).data('isToday'))) {
                    //     //금일 이미 참여한 이벤트
                    //     lgkorUI.alert("", {title: '하루에 한번만 참여 가능합니다.'});
                    //     return;
                    // }
                    
                    //로그인방법 1
                    //evetJoin('/benefits/event/2021/06/joinCinebeam','EV00001401');
                    
                    //로그인방법 2
                    // var loginUrl = self.$wrap.data('loginUrl');
                    // if(loginUrl && loginUrl.length > 0){
                    //     var obj = {title:'로그인이 필요합니다.<br>이동하시겠습니까', cancelBtnName:'아니오', okBtnName:'네', ok: function (){
                    //         location.href = loginUrl;
                    //     }};
                    //     lgkorUI.confirm(null, obj);
                    //     return;
                    // }
                    //  else{
                    //     var url = $(this).data("sendUrl");
                    //     var eventId = $(this).data("eventId");
                    //     self.setMyProductRegiste(url, eventId);
                    // }

                    self.$neAREventPopup.find('#instagramID').val("");
                    self.$neAREventPopup.find('#instagramLink').val("");
                    self.$neAREventPopup.find('input[type="checkbox"]').prop('checked',false);
                    self.$neAREventPopup.vcModal({opener: this});             
                } else {
                    if(broswer.getBroswerName()=="Chrome"){
                        var obj = {title:'앱에서만 참여 가능한 이벤트입니다.<br>앱다운로드 후 참여해주시기 바랍니다.<br>앱스토어로 이동합니다. ', cancelBtnName:'취소', okBtnName:'확인', ok: function (){
                            location.href = 'https://play.google.com/store/apps/details?id=kr.co.lge.android';
                        }};
                        lgkorUI.confirm(null, obj);
                    }else if(broswer.getBroswerName()=="Safari"){
                        //모바일웹 - iOS 일때
                        var obj = {title:'앱에서만 참여 가능한 이벤트입니다.<br>앱다운로드 후 참여해주시기 바랍니다.<br>앱스토어로 이동합니다. ', cancelBtnName:'취소', okBtnName:'확인', ok: function (){
                            location.href = 'https://itunes.apple.com/app/id1561079401?mt=8';
                        }};
                        lgkorUI.confirm(null, obj);
                    }else{
                        lgkorUI.alert("", {title:"본 이벤트 참여는 모바일 앱에서만 가능합니다.<br>구글 플레이/앱 스토어에서<br>'LGE.COM'을 검색하여<br>앱 다운로드 후 참여해주시기 바랍니다.<br>감사합니다."});
                    }
                }
            });

            //neAR 이벤트 응모
            self.$neAREventPopup.on('click','.pop-footer .btn-group button',function (e) {
                e.preventDefault();

                if(self.$wrap.data('eventRestrictFlag') == "Y") {
                    lgkorUI.alert("", {title: "서버 점검중입니다."});
                    return;
                }
                
                //로그인을 해야 하는가
                var login = self.$wrap.data('loginUrl');
                if(login && login.length > 0) {
                    var obj = {title:'로그인이 필요합니다.<br>이동하시겠습니까', cancelBtnName:'아니오', okBtnName:'네', ok: function (){
                        location.href = login;
                    }};
                    lgkorUI.confirm(null, obj);
                    return;
                }

                //체크
                var param = {};
                var $chk = self.$neAREventPopup.find('#chk1-1');
                if($chk.length) {
                    if(!$chk.is(':checked')) {
                        lgkorUI.alert("", {title: '개인정보 수집 이용 동의는 필수입니다.'});
                        $chk.focus();
                        return;
                    } else {
                        param.chk1 = "Y"
                    }
                }

                $chk = self.$neAREventPopup.find('#chk2-1');
                if($chk.length) {
                    if(!$chk.is(':checked')) {
                        lgkorUI.alert("", {title: '개인정보 처리 위탁 동의는 필수입니다.'});
                        $chk.focus();
                        return;
                    } else {
                        param.chk2 = "Y"
                    }
                }

                $chk = self.$neAREventPopup.find('#chk3-1');
                if($chk.length) {
                    if(!$chk.is(':checked')) {
                        lgkorUI.alert("", {title: '콘텐츠 저작권 양도 동의는 필수입니다.'});
                        $chk.focus();
                        return;
                    } else {
                        param.chk3 = "Y"
                    }
                }

                var instagramID = self.$neAREventPopup.find('#instagramID').val();
                var instagramLink = self.$neAREventPopup.find('#instagramLink').val();

                var checkInstagramID = vcui.string.replaceAll(instagramID," ","");
                var checkInstagramLink = vcui.string.replaceAll(instagramLink," ","");

                if(checkInstagramID.length > 0) {
                    param.instagramID = instagramID;
                } else {
                    lgkorUI.alert("", {title: '인스타그램 ID를 입력해주세요.'});
                    return;
                }

                if(checkInstagramLink.length > 0) {
                    param.instagramLink = instagramLink;
                } else {
                    lgkorUI.alert("", {title: '인스타그램 게시물 링크를 입력해주세요.'});
                    return;
                }
                
                var eventId = self.$wrap.data('eventId');
                param.eventId = eventId;

                var isApplication = isApp();
                param.isApp = isApplication ? "Y" : "N";

                var ajaxUrl = self.$wrap.data('neAREventUrl');
                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(ajaxUrl,param,function(result) {
                    var data = result.data;
                    if(lgkorUI.stringToBool(data.success)) {
                        lgkorUI.alert("", {title: "이벤트에 참여되었습니다.", ok: function(){
                            if(typeof dataLayer !== 'undefined' && dataLayer) {
                                dataLayer.push({				
                                'event': 'customEvent',				
                                'customEventCategory': '이벤트',				
                                'customEventAction': '이벤트 - 신청 완료',				
                                'customEventLabel': '컨텐츠 : ' + eventId
                                });
                            }
                        }});
                        self.$neAREventPopup.vcModal('close');
                        self.requestData(1);
                    }
                });
            });                   
        },
        
        requestData: function (page) {
            var self = this;

            var param = {};
            var eventId = self.$wrap.data('eventId');
            param.eventId = eventId;
            param.page = page;

            var ajaxUrl = self.$wrap.attr('data-list-url');
            lgkorUI.showLoading();
            lgkorUI.requestAjaxData(ajaxUrl, param, function(result) {
                var data = result.data;

                if(lgkorUI.stringToBool(data.isApply)) {
                    self.$btns.addClass('apply');
                } else {
                    self.$btns.removeClass('apply');
                }

                if(lgkorUI.stringToBool(data.isToday)) {
                    self.$btnWrap.find('.b01 a.write').data('isToday','Y');
                }

                if(data.userName) {
                    self.$name.val(data.userName);
                } else {
                    self.$name.val('');
                }

                if(data.userPhone) {
                    self.$phone.val(data.userPhone);
                } else {
                    self.$phone.val('');
                }

                var loginUrl = result.loginUrl;
                if(loginUrl) {
                    self.$wrap.data('loginUrl', loginUrl);
                } else {
                    self.$wrap.data('loginUrl', "");
                }
            });
        },          
    };

    $(document).ready(function() {
        neAREvent.init();
    });
})(); 



