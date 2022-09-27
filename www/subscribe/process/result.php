<?php
    header("Content-Type: text/html; charset=UTF-8");
    include "Db.php";
    include "password.php";  //비밀번호 암호화를 위한 파일 인클루드


    if($_POST['key'] == 'insert') {    //댓글 입력시 실행

      $name = $_POST['name'];
      $company = $_POST['company'];
      $phone = $_POST['phone'];
      $customerNum = $_POST['customerNum'];
      $email = $_POST['email'];
      $privacy_agreement = isset($_POST['privacy_agreement']) ? 1 : 0;

      $db = new Db;

      $insert_result  = $db->insert($name,$company,$phone,$customerNum,$email,$privacy_agreement);

      // 작성 내용이 db에 정상적으로 입력되었으면 정보 입력 페이지로 이동, 그렇지않을경우 오류페이지로 이동
      if($insert_result == true) {
        echo "<script>
              alert('뉴스레터 신청이 완료되었습니다. 감사합니다.');
              window.location='../index.php';
              </script>";
      } else {
        echo "<script>
              alert('참여과정 중 오류가 발생했습니다. 다시 참여해주세요.');
              history.go(-1);
              </script>";
      }

    }



?>
