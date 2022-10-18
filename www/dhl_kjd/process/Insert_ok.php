<?php

    include "Db.php";

    $name = $_POST['name'];
    $company = $_POST['company'];
    $department = $_POST['department'];
    $position = $_POST['position'];
    $customer_number = $_POST['customer_number'];
    $question = $_POST['question'];
    $info_open_closed = isset($_POST['iCheck'])?0:1;


    function alert($msg='', $base_url='') {
		if (!$msg) $msg = '올바른 방법으로 이용해 주십시오.';

		echo "<meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\">";
		echo "<script type='text/javascript'>alert('".$msg."');";
	    if ($base_url)
	        echo "location.replace('".$base_url."');";
		else
			echo "history.go(-1);";
		echo "</script>";
		exit;
	}

    $db = new Db;

    $insert_result  = $db->insert($name,$company,$department,$position,$customer_number,$question,$info_open_closed);

    $result_message = "전송과정중 오류가 발생하였습니다.다시 참여해주세요.";

    // 작성 내용이 db에 정상적으로 입력되었으면 정보 입력 페이지로 이동, 그렇지않을경우 오류페이지로 이동
    if($insert_result == true){
        //$result_message = "전송이 완료되었습니다. 참여해주셔서 감사합니다.";
        header("location:../view/success.php");
    }else{
        alert($result_message, '../index.php');
    }


?>
