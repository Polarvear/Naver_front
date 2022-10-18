<html>
	<head>
		<meta charset="utf-8" />
	</head>
	<body>

<?php 
	$email_subject 			= $_POST['cEmailTitle'];
	$receive_email_address 	= $_POST['cRecvEmailaddr'];
	$wrote_user_name 		= $_POST['cName'];
	$wrote_user_tel			= $_POST['cTel'];
	$email_body 			= $_POST['cEmailBody'];

	$email_host_addr 		= 'smtp.naver.com';
	$host_user_name 		= 'dhl_story';
	$host_email 			= 'dhl_story@naver.com';
	$host_email_passwd 		= 'dhl2013kr';

	require 'PHPMailer/PHPMailerAutoload.php';

	$mail = new PHPMailer;

	//$mail->SMTPDebug = 3;                               // Enable verbose debug output
	$mail->isSMTP();                                      // Set mailer to use SMTP
	$mail->Host = $email_host_addr; 					  // Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	$mail->Username = $host_email;           		   	  // SMTP username
	$mail->Password = $host_email_passwd;                 // SMTP password
	$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
	$mail->Port = 587;                                    // TCP port to connect to

	$mail->CharSet = 'UTF-8';

	$mail->From = $host_email;
	$mail->FromName = $wrote_user_name;
	$mail->addAddress($host_email);    					 	// Add a recipient
	$mail->isHTML(true);                                	// Set email format to HTML

	$mail->Subject = '[DHL 맨유트립] ' . $email_subject;
	$mail->Body    = "	<html>
							<body>
								작성자 : {$wrote_user_name} <br>
								작성자 이메일 주소: {$receive_email_address} <br>
								작성자 연락처: {$wrote_user_tel}<br>
								<hr>
								{$email_body}
							</body>
					  	</html>";
	if(!$mail->send()) {
	    echo '<script>alert("이메일 전송에 실패하였습니다. 다시 시도해주세요."); location.href="./index.html";</script>';
	} else {
	    echo '<script>alert("이메일을 전송하였습니다."); location.href="./index.html";</script>';
	}
?>

	</body>
</html>
