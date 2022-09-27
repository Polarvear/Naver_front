<html>
	<head>
		<meta charset="utf-8" />
	</head>
	<body>
<?php 
	$user_name 				= $_POST['userName'];
	$user_cellphone_number 	= $_POST['userTel'];
	$user_email 			= $_POST['userEmail'];
	$company_name			= $_POST['companyName'];
	$dhl_customer_number 	= $_POST['dhlCustomerNumber'];
	$dhl_staff_name 		= $_POST['dhlStaffName'];
	$manu_tour_reason_text 	= $_POST['manuTourReasonText'];
	$check_privacy 			= $_POST['checkPrivacy'];
	$check_event_note 		= $_POST['checkEventNote'];

	$user_birth_year 		= $_POST['userBirthYear'];
	$user_birth_month 		= $_POST['userBirthMonth'];
	$user_birth_day 		= $_POST['userBirthDay'];

	if(strcmp($check_privacy, 'on') == 0)
		$check_privacy = 1;
	else
		$check_privacy = 0;

	if(strcmp($check_event_note, 'on') == 0)
		$check_event_note = 1;
	else
		$check_event_note = 0;

	$username = "dhlkorea";
	$password = "dhl2014kr";
	$hostname = "localhost";

	$mydb = mysql_connect($hostname, $username, $password) 
					or die("MySQL에 연결할 수 없습니다.");
	if(!mysql_select_db('dhlkorea', $mydb))
			die("데이터베이스를 선택할 수 없습니다.");

	mysql_query ("set names utf8");		


	// if($user_birth_month < 10)
	// 	$user_birth_month = '0'.$user_birth_month;

	// if($user_birth_day < 10)
	// 	$user_birth_month = '0'.$user_birth_day;


	//$user_dob = "{$user_birth_year}-{$user_birth_month}-{user_birth_day}";	
	$user_dob = mktime(0,0,0, $user_birth_month, $user_birth_day, $user_birth_year);
	$user_dob = date('Y-m-d', $user_dob);
	
	$sql = "INSERT INTO `dhlkorea`.`b2b_Manu_Reg` (`id`, 
												   `reg_date`, 
												   `user_name`, 
												   `DOB`, 
												   `user_cellphone_number`, 
												   `user_email`, 
												   `company_name`,
												   `dhl_customer_number`, 
												   `dhl_staff_name`, 
												   `manu_tour_reason_text`, 
												   `check_privacy`, 
												   `check_event_note`) 
											VALUES (NULL, 
													NOW(), 
													'$user_name', 
													'$user_dob',
													'$user_cellphone_number', 
													'$user_email', 
													'$company_name', 
													'$dhl_customer_number', 
													'$dhl_staff_name', 
													'$manu_tour_reason_text', 
													'$check_privacy', 
													'$check_event_note')";
	// $sql = "INSERT INTO b2b_Manu_Reg(user_name, 
	// 								 user_cellphone_number, 
	// 								 user_email, 
	// 								 company_name, 
	// 								 dhl_customer_number,
	// 								 dhl_staff_name,
	// 								 manu_tour_reason_text,
	// 								 check_privacy,
	// 								 check_event_note
	// 								 )
	// 								 VALUES ( 
	// 								 	$user_name, 
	// 								 	$user_cellphone_number, 
	// 								 	$user_email, 
	// 								 	$company_name, 
	// 								 	$dhl_customer_number, 
	// 								 	$dhl_staff_name, 
	// 								 	$manu_tour_reason_text, 
	// 								 	$check_privacy, 
	// 								 	$check_event_note
	// 									)";
	mysql_query($sql, $mydb);
	mysql_close($mydb);	
	// echo "<script>location.replace('thank.php');</script>"; 
	echo '<script>alert("맨유트립 참여신청이 완료되었습니다."); location.href="./index.html";</script>';
    exit();
?>
	</body>
</html>
