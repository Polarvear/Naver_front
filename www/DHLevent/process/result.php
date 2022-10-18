<?php
    header("Content-Type: text/html; charset=UTF-8");
    include "Db.php";
    include "password.php";  //비밀번호 암호화를 위한 파일 인클루드


    if($_GET['key'] == 'insert') {    //댓글 입력시 실행

      $fname = $_GET['fname'];
      $lname = $_GET['lname'];
      $email = $_GET['email'];
      $phone = $_GET['phone'];
      $company = $_GET['company'];
      $addr1 = $_GET['addr1'];
      $addr2 = $_GET['addr2'];
      $marketNM = $_GET['marketNM'];
	  
	  
      $db = new Db;
	  
	  $name = $fname.$lname;
	  
      $insert_result  = $db-> insert($name,$email,$phone,$company,$addr1,$addr2,$marketNM);


      // 작성 내용이 db에 정상적으로 입력되었으면 정보 입력 페이지로 이동, 그렇지않을경우 오류페이지로 이동
      if($insert_result == true) {
        echo "<script>
              alert('등록 신청이 완료되었습니다. 감사합니다.');
              window.location='../index.php';
              </script>";
      } else {
        echo "<script>
              alert('참여과정 중 오류가 발생했습니다. 다시 참여해주세요.');
              history.go(-1);
              </script>";
      }
    }
	
	
	 if($_GET['key'] == 'newsLetter') {    //댓글 입력시 실행
	  
	  $link    = $_GET['link'];
      $company = $_GET['customNum'];
      $email = $_GET['customEmail'];
	  
      $db = new Db;
	  
      $insert_result  = $db-> newsLetter($customNum,$customEmail,$link);
	  
      // 작성 내용이 db에 정상적으로 입력되었으면 정보 입력 페이지로 이동, 그렇지않을경우 오류페이지로 이동
      if($insert_result == true) {
        echo "<script>
              alert('등록 신청이 완료되었습니다. 감사합니다.');
              window.location='../".$link."/index.php';
              </script>";
      } else {
        echo "<script>
              alert('참여과정 중 오류가 발생했습니다. 다시 참여해주세요.');
              history.go(-1);
              </script>";
      }
    }

?>
