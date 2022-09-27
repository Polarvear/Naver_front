<!DOCTYPE html>
<html>
  <head>
    <title>DHL 이벤트</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="title" content="DHL Newsletter Subscribe" >
    <meta name="description" content="DHL 사랑나눔 이벤트" />
    <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
    <script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/jquery.validate.js"></script>
    <script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/additional-methods.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/3.3.1/inputmask/inputmask.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/3.3.1/jquery.inputmask.bundle.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />
    <link rel="Stylesheet" type="text/css" href="../event/assets/css/global_css.css">
  </head>

   <body>
    <div class="container">
      <div class="title">
        <div class="text-center title-text">[DHL 뉴스레터 구독 신청]</div>
      </div>
      <div class="content">
      <div class="row">
        <div class="">
          <hr>
        </div>
      </div>
      <form  method="POST" class="form-horizontal" name="insert_form" id="insert_form" action="process/result.php">
        <input type="hidden" name="key" value="insert">
          <div class="comment-section">
            <div class="form-group">
              <label for="name1" class="col-md-1 comment-title">이름</label>
              <div class="col-md-3 comment-content-m">
                <input class="form-control" name="name" type="text">
              </div>
              <label for="company1" class="col-md-1 comment-title">회사</label>
              <div class="col-md-3 comment-content-m">
                <input class="form-control" id="company1" name="company" type="text">
              </div>
              <label for="phone1" class="col-md-1 comment-title">휴대폰번호</label>
              <div class="col-md-3 comment-content">
                <input class="form-control" id="phone1" name="phone" type="text">
              </div>
            </div>

            <div class="form-group">
              <label for="customerNum1" class="col-md-1 comment-title">DHL고객번호</label>
              <div class="col-md-3 comment-content-m">
                <input class="form-control" id="customerNum1" name="customerNum" type="text">
              </div>
              <label for="email1" class="col-md-1 comment-title">이메일 주소</label>
              <div class="col-md-3 comment-content-m">
                <input class="form-control" id="email1" name="email" type="text">
              </div>
            </div>
            <div class="form-group" style="text-align: right;">
              <input id="privacy_agreement1" name="privacy_agreement" type="checkbox">
              <label for="privacy_agreement" class="comment-title" id="private_agree">
                <a href="https://www.facebook.com/DHLExpressKorea/app/208195102528120/">개인정보 수집 동의</a>
              </label>
            </div>
            <div class="text-center">
              <button class="submit-btn">뉴스레터 구독 신청</button>
            </div>
          </div>
        </form>
        <div class="row">
          <div class="">
            <hr>
          </div>
        </div>
 
      </div>


      <div class='footer'>
        <div class="text-center"><img src="../event/assets/image/talktime_bottom.png" class="footer-img"></div>
      </div>
    </div>
	</body>
	 <script src="../event/assets/js/validation.js"></script>
  <script>
    $( ".pw-confirm-btn" ).each(function( index ) {
      $(".pw-confirm-btn").eq(index).click(function(){
        var key = 'confirm_password'
        var id = $(this).data('indexs');
        var password = $(".pw"+id).val();
        //console.log(id);
        var pwRequest = $.ajax({
          url: "process/result.php",
          method: "POST",
          data: { id : $(this).data('indexs') , password: password, key:key},
          dataType: 'html'
        });

        pwRequest.done(function( msg ) {
          if (msg == 1) {
            $('.modify-comment-section'+id).css('display','block');
          } else {
            alert('비밀번호를 확인해주세요.');
            //console.log(msg);
          }
        });
      });
    });
  </script>
</html>
