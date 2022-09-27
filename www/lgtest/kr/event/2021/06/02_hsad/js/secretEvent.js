(function() {
    var broswer = {};

    broswer.isMobile = function() {
        var tempUser = navigator.userAgent;
        var isMobile = false;
        // userAgent 값에 iPhone, iPad, ipot, Android 라는 문자열이 하나라도 존재한다면 모바일로 간주됨.
        if (tempUser.indexOf("iPhone") > 0 || tempUser.indexOf("iPad") > 0
                || tempUser.indexOf("iPot") > 0 || tempUser.indexOf("Android") > 0) {
            isMobile = true;
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

    var secretEvent = {
        init: function() {
            var self = this;     
            self.setting();
            self.bindEvent();
            //self.requestData(1);
            var apply = self.$wrap.data('isApply');
            if(lgkorUI.stringToBool(apply)) {
                self.$btns.addClass('apply');
            }
        },

        setting: function() {
            var self = this;
            self.$wrap = $('.event_wrap');
            self.$inner = $('.inner');
            self.$btns = self.$inner.find('.btns'); 

            self.$secretEventPopup = $('#popupsecretEvent');
            self.$name = $('#popupsecretEvent').find('#name');
            self.$phone = $('#popupsecretEvent').find('#phone');          
        },

        bindEvent: function() {
            var self = this;

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
                    
                    // LG전자 서비스 마케팅 수신동의 처리
                    $("#loading").css("visibility","visible");
                    $.ajax({
                        type : "post",
                          url : "/auth/mktInfoUpdate.json",
                          data : { unifyId : $('#unifyId').val()},
                          success : function(data, textStatus, jqXHR) {
                              $("#loading").css("visibility","hidden");
                              if (data.resultCode == '100') {
                                  location.reload();
                              } else {
                                  document.getElementById("errorMsg").innerText= data.resultMsg;
                                  document.getElementById("popup").style.display = 'block';
                              }
                          }, 
                          error : function(jqXHR, textStatus, errorThrown){
                              $("#loading").css("visibility","hidden");
                              console.log("시스템에 장애가 발생했습니다!");
                          }
                    });

                } else {
                    if(broswer.isMobile()){
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
                            lgkorUI.alert("", {title:"앱에서만 참여 가능한 이벤트입니다.<br>구글 플레이/앱 스토어에서<br>'LGE.COM'을 검색하여<br>앱 다운로드 후 참여해주시기 바랍니다.<br>감사합니다."});    
                        }
                    }else{
                        lgkorUI.alert("", {title:"본 이벤트 참여는 모바일 앱에서만 가능합니다.<br>구글 플레이/앱 스토어에서<br>'LGE.COM'을 검색하여<br>앱 다운로드 후 참여해주시기 바랍니다.<br>감사합니다."});
                    }
                }
            });

            self.$inner.on('click','.btns.q01 > a', function(e){
                //모바일 앱 일때
                if($('html').hasClass('app')) {
                    if($('.q01 a').hasClass('off')){
                        lgkorUI.alert("", {title:"해당 이벤트 기간이 아닙니다."});
                        return;
                    }

                    if(self.$wrap.data('eventRestrictFlag') == "Y") {
                        lgkorUI.alert("", {title: "서버 점검중입니다."});
                        return;
                    }
                    
                    // 응모
                    self.$secretEventPopup.find('input[type="checkbox"]').prop('checked',false);
                    self.$secretEventPopup.vcModal({opener: this});      
                } else {
                    if(broswer.isMobile()){
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
                            lgkorUI.alert("", {title:"앱에서만 참여 가능한 이벤트입니다.<br>구글 플레이/앱 스토어에서<br>'LGE.COM'을 검색하여<br>앱 다운로드 후 참여해주시기 바랍니다.<br>감사합니다."});    
                        }
                    }else{
                        lgkorUI.alert("", {title:"본 이벤트 참여는 모바일 앱에서만 가능합니다.<br>구글 플레이/앱 스토어에서<br>'LGE.COM'을 검색하여<br>앱 다운로드 후 참여해주시기 바랍니다.<br>감사합니다."});
                    }
                }
            });  

            self.$inner.on('click','.btns.q02 > a', function(e){
                //모바일 앱 일때
                if($('html').hasClass('app')) {
                    if($('.q02 a').hasClass('off')){
                        lgkorUI.alert("", {title:"해당 이벤트 기간이 아닙니다."});
                        return;
                    }

                    if(self.$wrap.data('eventRestrictFlag') == "Y") {
                        lgkorUI.alert("", {title: "서버 점검중입니다."});
                        return;
                    }
                    
                    // 응모
                    self.$secretEventPopup.find('input[type="checkbox"]').prop('checked',false);
                    self.$secretEventPopup.vcModal({opener: this});      
                } else {
                    if(broswer.isMobile()){
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
                            lgkorUI.alert("", {title:"앱에서만 참여 가능한 이벤트입니다.<br>구글 플레이/앱 스토어에서<br>'LGE.COM'을 검색하여<br>앱 다운로드 후 참여해주시기 바랍니다.<br>감사합니다."});    
                        }
                    }else{
                        lgkorUI.alert("", {title:"본 이벤트 참여는 모바일 앱에서만 가능합니다.<br>구글 플레이/앱 스토어에서<br>'LGE.COM'을 검색하여<br>앱 다운로드 후 참여해주시기 바랍니다.<br>감사합니다."});
                    }
                }
            });  
            
            self.$inner.on('click','.btns.q03 > a', function(e){
                //모바일 앱 일때
                if($('html').hasClass('app')) {
                    if($('.q03 a').hasClass('off')){
                        lgkorUI.alert("", {title:"해당 이벤트 기간이 아닙니다."});
                        return;
                    }

                    if(self.$wrap.data('eventRestrictFlag') == "Y") {
                        lgkorUI.alert("", {title: "서버 점검중입니다."});
                        return;
                    }
                    
                    // 응모
                    self.$secretEventPopup.find('input[type="checkbox"]').prop('checked',false);
                    self.$secretEventPopup.vcModal({opener: this});      
                } else {
                    if(broswer.isMobile()){
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
                            lgkorUI.alert("", {title:"앱에서만 참여 가능한 이벤트입니다.<br>구글 플레이/앱 스토어에서<br>'LGE.COM'을 검색하여<br>앱 다운로드 후 참여해주시기 바랍니다.<br>감사합니다."});    
                        }
                    }else{
                        lgkorUI.alert("", {title:"본 이벤트 참여는 모바일 앱에서만 가능합니다.<br>구글 플레이/앱 스토어에서<br>'LGE.COM'을 검색하여<br>앱 다운로드 후 참여해주시기 바랍니다.<br>감사합니다."});
                    }
                }
            });  
            //secret 이벤트 응모
            self.$secretEventPopup.on('click','.pop-footer .btn-group button',function (e) {
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
                var $chk = self.$secretEventPopup.find('#chk1-1');
                if($chk.length) {
                    if(!$chk.is(':checked')) {
                        lgkorUI.alert("", {title: '개인정보 수집 이용 동의는 필수입니다.'});
                        $chk.focus();
                        return;
                    } else {
                        param.chk1 = "Y"
                    }
                }

                $chk = self.$secretEventPopup.find('#chk2-1');
                if($chk.length) {
                    if(!$chk.is(':checked')) {
                        lgkorUI.alert("", {title: '개인정보 처리 위탁 동의는 필수입니다.'});
                        $chk.focus();
                        return;
                    } else {
                        param.chk2 = "Y"
                    }
                }

                var eventId = self.$wrap.data('eventId');
                param.eventId = eventId;

                var isApplication = isApp();
                param.isApp = isApplication ? "Y" : "N";

                var ajaxUrl = self.$wrap.data('secretEventUrl');
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
                        self.$secretEventPopup.vcModal('close');
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
            var ajaxUrl = self.$wrap.attr('data-list-url');
            lgkorUI.showLoading();
            lgkorUI.requestAjaxData(ajaxUrl, param, function(result) {
                var data = result.data;

                if(lgkorUI.stringToBool(data.isApply)) {
                    self.$btns.addClass('apply');
                } else {
                    self.$btns.removeClass('apply');
                }

                // if(lgkorUI.stringToBool(data.isToday)) {
                //     self.$btnWrap.find('.b01 a.write').data('isToday','Y');
                // }

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
        secretEvent.init();
    });
})(); 



// var userAgent = window.navigator.userAgent.toLowerCase();

// //WebView 여부 확인 true false 반환
// var isApp = function() {
//     return /LGEMMA|lgemma\/[0-9\.]+$/.test( userAgent );
// }

// var isAppObs = function() {
//     return userAgent.indexOf("lgeapp")>-1;
// }

// //iOS 여부 확인 
// var isIOS = function() {
//     return /iphone|ipod|ipad/.test( userAgent );
// }

// //Android 여부 확인 
// var isAndroid = function() {
//     return /android/.test( userAgent );
// }

// //Mobile 여부 확인 
// var isMobileYn = function() {
//     return /mobile/.test( userAgent );
// }
