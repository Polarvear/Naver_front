<!DOCTYPE html>
<?php
  // 댓글 출력을 위한 db connect
  $dbHost = 'localhost';
  $dbName = 'dhlkorea';
  $dbUser = 'dhlkorea';
  $dbPass = 'dhl2014kr';
  $dbh = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8", $dbUser, $dbPass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));


  	/* 페이징 시작 */
  $stmt_num = $dbh->prepare('SELECT count(*) FROM event_participants_03');
  $stmt_num->execute();


  if(isset($_GET['page'])) {
  	$page = $_GET['page'];
  } else {
  	$page = 1;
  }

  $allPost = $stmt_num->fetchColumn();
	$onePage = 20; // 한 페이지에 보여줄 게시글의 수.
	$allPage = ceil($allPost / $onePage); //전체 페이지의 수


	$oneSection = 10; //한번에 보여줄 총 페이지 개수(1 ~ 10, 11 ~ 20 ...)
	$currentSection = ceil($page / $oneSection); //현재 섹션
	$allSection = ceil($allPage / $oneSection); //전체 섹션의 수

	$firstPage = ($currentSection * $oneSection) - ($oneSection - 1); //현재 섹션의 처음 페이지

	if($currentSection == $allSection) {
		$lastPage = $allPage; //현재 섹션이 마지막 섹션이라면 $allPage가 마지막 페이지가 된다.
	} else {
		$lastPage = $currentSection * $oneSection; //현재 섹션의 마지막 페이지
	}

	$prevPage = (($currentSection - 1) * $oneSection); //이전 페이지, 11~20일 때 이전을 누르면 10 페이지로 이동.
	$nextPage = (($currentSection + 1) * $oneSection) - ($oneSection - 1); //다음 페이지, 11~20일 때 다음을 누르면 21 페이지로 이동.

	$paging = '<ul>'; // 페이징을 저장할 변수

	//첫 페이지가 아니라면 처음 버튼을 생성
	if($page != 1) {
		$paging .= '<li class="page page_start"><a href="./index.php?page=1">처음</a></li>';
	}
	//첫 섹션이 아니라면 이전 버튼을 생성
	if($currentSection != 1) {
		$paging .= '<li class="page page_prev"><a href="./index.php?page=' . $prevPage . '">이전</a></li>';
	}

	for($i = $firstPage; $i <= $lastPage; $i++) {
		if($i == $page) {
			$paging .= '<li class="page current"><a href="./index.php?page=' . $i . '">' . $i . '</a></li>';
		} else {
			$paging .= '<li class="page"><a href="./index.php?page=' . $i . '">' . $i . '</a></li>';
		}
	}

	//마지막 섹션이 아니라면 다음 버튼을 생성
	if($currentSection != $allSection) {
		$paging .= '<li class="page page_next"><a href="./index.php?page=' . $nextPage . '">다음</a></li>';
	}

	//마지막 페이지가 아니라면 끝 버튼을 생성
	if($page != $allPage) {
		$paging .= '<li class="page page_end"><a href="./index.php?page=' . $allPage . '">끝</a></li>';
	}
	$paging .= '</ul>';

	/* 페이징 끝 */

  $currentLimit = ($onePage * $page) - $onePage; //몇 번째의 글부터 가져오는지 체크
	$sqlLimit = ' limit ' . $currentLimit . ', ' . $onePage; //limit sql 구문

  $sql = "SELECT * FROM event_participants_03 ORDER BY date DESC" . $sqlLimit;
  $stmt = $dbh->prepare($sql);
  $stmt->execute();
  $result = $stmt->fetchAll();


 ?>
<html>
  <head>
    <title>DHL 이벤트</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="title" content="DHL Newsletter Event" >
    <meta name="description" content="DHL 사랑나눔 이벤트" />
    <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
    <script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/jquery.validate.js"></script>
    <script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/additional-methods.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/3.3.1/inputmask/inputmask.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/3.3.1/jquery.inputmask.bundle.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />
    <link rel="Stylesheet" type="text/css" href="./assets/css/global_css.css">

    <!-- GOOGLE 애널리틱스 -->
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-91408977-1', 'auto');
      ga('send', 'pageview');

    </script>

    <!-- 네이버 애널리틱스 -->
    <script type="text/javascript" src="http://wcs.naver.net/wcslog.js"></script>
    <script type="text/javascript">
      if(!wcs_add) var wcs_add = {};
      wcs_add["wa"] = "279ba0737a7ebc";
      wcs_do();
    </script>

    <!-- Facebook Pixel -->
    <script>
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window,document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
       fbq('init', '1035885463132719');
      fbq('track', 'PageView');
    </script>
    <noscript>
       <img height="1" width="1"
      src="https://www.facebook.com/tr?id=1035885463132719&ev=PageView
      &noscript=1"/>
    </noscript>
      <!-- End Facebook Pixel Code -->
  </head>

  <body>
    <div class="container">
      <div class="title">
        <div class="text-center title-text">[이벤트]DHL 뉴스레터 창간 2주년 맞이 Double Event! 선물을 두번 드립니다!!</div>
      </div>
      <div class="content">
      <div class="text-center">
        <img src="./assets/image/event_top.png" class="img-responsive" style=" margin: 0 auto;">
      </div>
      <div class="text-center content-text">
        <div class="participate-explain">
          DHL 뉴스레터를 발행한지 엊그제 같은데~<br />
          벌써 뉴스레터 창간 2주년을 맞았답니다~<br />
          그래서 이번 뉴스레터 고객 전용 이벤트는 <br />
          DHL 뉴스레터 창간 2주년을 맞아 선물도 2배로 받을 수 있는<br />
          특별한 "더블 이벤트"로 준비했습니다.
        </div>
        <div class="participate-box">
          <p class="participate-detail">
            <p class="participate-title">*참여방법</p>
            아래의 댓글 입력 서식에 맞춰 기재 후<br />
            뉴스레터 창간 2주년을 축하하는 메시지를 남겨주세요!<br />
            <신청자 이름/ 회사명/ 휴대폰 번호/ DHL 고객번호/ DHL영업 담당자 / 축하 메시지> 남기기
            <br /><br />
            <span class="italic">*댓글 수정을 위한 비밀번호도 함께 설정해야 합니다~</span>
          </p>

          <p class="participate-detail">
            <p class="participate-title">*경품</p>
            <1등> DHL 간식박스를 회사로 2번 배달<br />
            <2등> 스타벅스 카페라떼 기프티콘 2회 제공
          </p>

          <p class="participate-detail">
            <p class="participate-title">*이벤트 기간</p>
            2017년 3월 3일 (금) ~ 3월 9일 (목)
          </p>

          <p class="participate-detail">
            <p class="participate-title">*당첨자 발표</p>
            DHL 고객전용 블로그 / 3월 14일 (화)
            <p class="blog-hint-btn"><a href="http://bit.ly/DHL_Korea" target="_blank"><img src="./assets/image/blog.png" alt="DHL 공식 블로그 바로가기"></a></p>
          </p>
        </div>
        <div class="participate-explain">
          고객 여러분의 격렬한 축하 메시지 기대할께요~^^
        </div>
      </div>
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
              <label for="salesManager1" class="col-md-1 comment-title">DHL영업담당자</label>
              <div class="col-md-3 comment-content-m">
                <input class="form-control" id="salesManager1" name="salesManager" type="text">
              </div>
              <label for="passowrd1" class="col-md-1 comment-title">비밀번호</label>
              <div class="col-md-3 comment-content">
                <input class="form-control" id="passowrd1" name="password" type="password" placeholder="댓글 수정시 사용됩니다.">
              </div>
            </div>

            <div class="form-group">
              <textarea class="form-control" id="comment1" rows="5" name="comment" placeholder="축하메시지를 적어주세요~!"></textarea>
            </div>
            <div class="form-group" style="text-align: right;">
              <input id="privacy_agreement1" name="privacy_agreement" type="checkbox">
              <label for="privacy_agreement" class="comment-title" id="private_agree">
                <a href="https://www.facebook.com/DHLExpressKorea/app/208195102528120/">개인정보 수집 동의</a>
              </label>
            </div>
            <div class="text-center">
              <button class="submit-btn">이벤트 응모 완료</button>
            </div>
          </div>
        </form>
        <div class="row">
          <div class="">
            <hr>
          </div>
        </div>
        <?php
        foreach($result as $row) {
        ?>
        <div class="row">
          <div class="participant_name">
            <?=$row['name']?>
            <a role="button" data-toggle="collapse" href="#modify<?=$row['id']?>" aria-expanded="false" aria-controls="modify">(수정)</a>
          </div>
          <div class="collapse modify-comment-box" id="modify<?=$row['id']?>">
            <div class="confirm-pw-form">
              <label for="passowrd2">비밀번호 입력</label>
              <input name="password" type="password" class="pw<?=$row['id']?>">
              <button class="pw-confirm-btn" type="button" data-indexs="<?=$row['id']?>">확인</button>
            </div>
          </div>

          <div class="participant_date"><?=$row['date']?></div>
          <div class="participant_company">회사명 : <?=$row['company']?></div>
          <div class="participant_comment">비밀글입니다.</div>

          <!-- 비밀번호가 맞았을 경우 보이는 수정 폼 start-->
          <div class="modify-box ">
            <form  method="POST" class="form-horizontal" action="process/result.php">
              <input type="hidden" name="key" value="update">
              <input type="hidden" name="id" value="<?=$row['id']?>">
              <div class="well modify-comment-section<?=$row['id']?>" style="display:none">
                <div class="form-group modify-form-group">
                  <label for="name1" class="col-md-1 comment-title">이름</label>
                  <div class="col-md-3 comment-content-m">
                    <input class="form-control" name="name" type="text" value="<?=$row['name']?>">
                  </div>
                  <label for="company1" class="col-md-1 comment-title">회사</label>
                  <div class="col-md-3 comment-content-m">
                    <input class="form-control" id="company1" name="company" type="text" value="<?=$row['company']?>">
                  </div>
                  <label for="phone1" class="col-md-1 comment-title">휴대폰번호</label>
                  <div class="col-md-3 comment-content-m">
                    <input class="form-control" id="phone1" name="phone" type="text" value="<?=$row['phone']?>">
                  </div>
                </div>

                <div class="form-group modify-form-group">
                  <label for="customerNum1" class="col-md-1 comment-title">DHL고객번호</label>
                  <div class="col-md-3 comment-content-m">
                    <input class="form-control" id="customerNum1" name="customerNum" type="text" value="<?=$row['customerNum']?>">
                  </div>
                  <label for="salesManager1" class="col-md-1 comment-title">DHL영업담당자</label>
                  <div class="col-md-3 comment-content-m">
                    <input class="form-control" id="salesManager1" name="salesManager" type="text" value="<?=$row['salesManager']?>">
                  </div>
                  <label for="passowrd1" class="col-md-1 comment-title"></label>
                  <div class="col-md-3 comment-content-m"></div>
                </div>
                <div class="form-group modify-form-group">
                  <textarea class="form-control" id="comment1" rows="5" name="comment" ><?=$row['comment']?></textarea>
                </div>
                <div class="text-center">
                  <button class="submit-btn">수정</button>
                </div>
              </div>
            </form>
          </div>
          <!-- 비밀번호가 맞았을 경우 보이는 수정 폼 end-->

          <div class="">
            <hr>
          </div>
        </div>

        <?php } ?>
        <?php if($allPost == 0) { ?>
        <div class="paging"></div>
        <?php } else { ?>
        <div class="paging">
      	  <?php echo $paging ?>
      	</div>
        <?php }?>
      </div>


      <div class='footer'>
        <div class="text-center"><img src="./assets/image/talktime_bottom.png" class="footer-img"></div>
      </div>
    </div>
  </body>
  <script src="./assets/js/validation.js"></script>
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
