<?php
    header("Content-Type: text/html; charset=UTF-8");
    include "Db.php";
    include "password.php";  //비밀번호 암호화를 위한 파일 인클루드


    if($_POST['key'] == 'insert') {    //댓글 입력시 실행

      $name = $_POST['name'];
      $company = $_POST['company'];
      $phone = $_POST['phone'];
      $customerNum = $_POST['customerNum'];
      $salesManager = $_POST['salesManager'];
      $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
      $privacy_agreement = isset($_POST['privacy_agreement']) ? 1 : 0;
      $comment = $_POST['comment'];

      $db = new Db;

      $insert_result  = $db->insert($name,$company,$phone,$customerNum,$salesManager,$password,$privacy_agreement,$comment);

      // 작성 내용이 db에 정상적으로 입력되었으면 정보 입력 페이지로 이동, 그렇지않을경우 오류페이지로 이동
      if($insert_result == true) {
        echo "<script>
              alert('이벤트 참여가 완료되었습니다. 감사합니다.');
              window.location='../index.php';
              </script>";
      } else {
        echo "<script>
              alert('참여과정 중 오류가 발생했습니다. 다시 참여해주세요.');
              history.go(-1);
              </script>";
      }

    } else if($_POST['key'] == 'update') {    //댓글 수정시 실행

      $id = $_POST['id'];
      $name = $_POST['name'];
      $company = $_POST['company'];
      $phone = $_POST['phone'];
      $customerNum = $_POST['customerNum'];
      $salesManager = $_POST['salesManager'];
      $comment = $_POST['comment'];

      $db = new Db;

      $update_result  = $db->update($name,$company,$phone,$customerNum,$salesManager,$comment,$id);

      // 작성 내용이 db에 정상적으로 입력되었으면 정보 입력 페이지로 이동, 그렇지않을경우 오류페이지로 이동
      if($update_result == true) {
        echo "<script>
              alert('댓글 수정이 완료되었습니다.');
              window.location='../index.php';
              </script>";
      } else {
        echo "<script>
              alert('수정중 오류가 발생했습니다.');
              history.go(-1);
              </script>";
      }

    } else if($_POST['key'] == 'confirm_password') {  // db에 저장된 비밀번호와 입력받은 비밀번호를 비교시 실행

      $id = $_POST['id'];
      $password = $_POST['password'];

      $db = new Db;
      $result  = $db->select_pw($id);

      //입력받은 패스워드와 DB에 저장된 암호화된 패스워드를 비교한다.
      //패스워드가 일치하면 1, 일치하지 않으면 2를 반환한다.
      if(password_verify($password,$result)) {
        echo 1;
      } else {
        echo 2;
      }


    }



?>
