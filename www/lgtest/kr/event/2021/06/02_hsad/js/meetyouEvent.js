(function() {
    var meetyouEvent = {
        init: function() {
            var self = this;
            self.setting();
        },

        setting: function() {
            var self = this;
      
            $('.section03 .btns.b01 a').on('click', function(e){
                e.preventDefault();
                location.href = 'https://www.naver.com';
            });
            $('.section04 .btns.b02 a').on('click', function(e){
                e.preventDefault();
                location.href = 'https://www.naver.com';
            });
            $('.section05 .btns.b03 a').on('click', function(e){
                e.preventDefault();
                lgkorUI.alert("", {
                    title: "이벤트는 0/0에 오픈 예정입니다.<br>많은 참여 바랍니다."
                });
                return;
            })
            $('.section06 .btns.b04 a').on('click', function(e){
                e.preventDefault();
                lgkorUI.alert("", {
                    title: "이벤트는 0/0에 오픈 예정입니다.<br>많은 참여 바랍니다."
                });
                return;
            });
        },
    }
    $(document).ready(function() {
        meetyouEvent.init();
    });
})();