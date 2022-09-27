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
?>


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <title>DHL 맨유트립 이벤트</title>
	<!--[if lt IE 9]>
	<script src="http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js"></script>
	<![endif]-->
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
  <script src="jquery.textPlaceholder.js"></script>	
  
  <link rel="stylesheet" type="text/css" media="all" href="style.css">
  <link rel="stylesheet" type="text/css" media="all" href="responsive.css">
  	<!-- 빈칸이 있는지 확인 --> 
	<scRIPT LANGUAGE="Javascript"> 
	
	$(function(){
		$("#coName").textPlaceholder();
		$("#coUrl").textPlaceholder();
		$("#cName").textPlaceholder();
		$("#cPosition").textPlaceholder();
		$("#coType").textPlaceholder();
		$("#cContact").textPlaceholder();

	});
	
	function CheckSpaces(strValue) { 
		var flag=true; 
		if (strValue!="") { 
			for (var i=0; i < strValue.length; i++) { 
				if (strValue.charAt(i) != " ") { 
					flag=false; 
					break; 
				} 
			} 
		} 
		return flag; 
	} 

	function emailcheck(strValue)	{
		var regExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;

		//입력을 안했으면
		if(strValue.lenght == 0)
			return false;

		//이메일 형식에 맞지않으면
		if (!strValue.match(regExp))
			return false;

		return true;
	}

	function CheckValues() { 
		// if()
		
		if(confirm('신청하시겠습니까?'))
			return true;
		else
			return false;
		//return confirm('신청하시겠습니까?');
	} 

	// function resizeTextArea(obj) {
	//   obj.style.height = "1px";
	//   obj.style.height = (20+obj.scrollHeight)+"px";
	// }
	
	//$("textarea").autogrow();

	</script>
	<style>
		#hongkiat-form .txtinput { 
			 _height/**/: 35px;
		}
		.input-check {
			border: none;
			box-shadow: none;
		}
	</style>
</head>
<body>
	<section id="container">
		<div id="light">  		
			<ul style="margin-top:0px;margin-bottom:0px;text-align:left;padding-left:10px;">
				<li style="display:inline;">
					<a href="javascript: window.history.go(-1)"><img src="images/back.png" style="border:0px;"></a>
				</li>
				<li style="display:inline; padding-left:650px;padding-top:0px;padding-bottom:0px;">
					<a href="http://blog.naver.com/dhl_korea" target="_blank"><img src="images/dhl_landing_blog.png" style="border:0px;"></a>
				</li>
			</ul>
		</div>
		<!-- <div style="width:100%">
			<img width=100% src="images/landing_MU_final.png">
		</div> -->
	<!-- 	<h1>참여신청 확인</h1>
		<hr>
		<br> -->
		<form name="hongkiat" id="hongkiat-form" method="post" accept-charset="UTF-8" action="b2cManuInsert.php" onSubmit="return confirm('신청하시겠습니까?');">

			<div style="margin-top:10px;">
				<h1 style="display:inline;">참여신청 확인</h1>
				<section id="buttons"  style="display:inline;">
					<input type="submit" name="submit" id="submitbtn" class="submitbtn" tabindex="7" value="신청하기" style="height:40px;">
					<button type="button" id="resetbtn" class="resetbtn" onclick="javascript:history.go(-1)"  style="height:40px;">수정하기</button>
					<br style="clear:both;">
				</section>
				<hr>
				<br>
			</div>

			<div style="padding-bottom:10px;">
				<strong>1. 이름</strong> </li>
				<input type="text" name="userName" id="userName" placeholder="이름" autocomplete="off" value="<?=$user_name?>" tabindex="1" class="txtinput input-check" style="border:none;box-shadow:none;padding:0px;padding-top:10px;" readonly>
			</div>

			<div style="padding-bottom:10px;">
				<strong>2. 생년월일</strong><br>
				<input type="text" name="userBirthYear" id="userBirthYear" placeholder="생일 년도" autocomplete="off" value="<?=$user_birth_year ?>" tabindex="2" class="txtinput input-check" style="border:none;box-shadow:none;padding:0px;padding-top:10px;display:inline;width:30px;" readonly> 년 
				<input type="text" name="userBirthMonth" id="userBirthMonth" placeholder="생일 월" autocomplete="off" value="<?=$user_birth_month ?>" tabindex="2" class="txtinput input-check" style="border:none;box-shadow:none;padding:0px;padding-top:10px;display:inline;width:15px;" readonly> 월 
				<input type="text" name="userBirthDay" id="userBirthDay" placeholder="생일 일" autocomplete="off" value="<?=$user_birth_day ?>" tabindex="2" class="txtinput input-check" style="border:none;box-shadow:none;padding:0px;padding-top:10px;display:inline;width:15px;" readonly> 일 
				

				
			</div>

			<div style="padding-bottom:10px;">
				<strong>2. 휴대폰 번호</strong>
				<input type="text" name="userTel" id="userTel" placeholder="휴대폰 번호" autocomplete="off" value="<?=$user_cellphone_number ?>" tabindex="2" class="txtinput input-check" style="border:none;box-shadow:none;padding:0px;padding-top:10px" readonly>	
			</div>

			<div style="padding-bottom:10px;">
				<strong>3. e-mail</strong>
				<input type="text" name="userEmail"	id="userEmail" placeholder="e-mail" tabindex="3" value="<?=$user_email ?>" class="txtinput input-check" style="border:none;box-shadow:none;padding:0px; padding-top:10px;" readonly>
			</div>

			<div style="padding-bottom:10px;">
				<strong>4. 회사명</strong>
				<input type="text" name="companyName" id="companyName" placeholder="회사명" tabindex="4" value="<?=$company_name?>" class="txtinput input-check" style="border:none;box-shadow:none;padding:0px; padding-top:10px;" readonly>
			</div>
			
			<div style="padding-bottom:10px;">
				<strong>5. DHL 고객번호(9자리)</strong>
				<input type="text" name="dhlCustomerNumber" id="dhlCustomerNumber" placeholder="DHL 고객번호(9자리)" value="<?=$dhl_customer_number?>" autocomplete="off" tabindex="5" class="txtinput input-check" style="border:none;box-shadow:none;padding:0px; padding-top:10px;" readonly>
			</div>
			
			<div style="padding-bottom:10px;">
				<strong>6. DHL 영업담당자 이름</strong>
				<input type="text" name="dhlStaffName" id="dhlStaffName" placeholder="DHL 영업담당자 이름" tabindex="6" value="<?=$dhl_staff_name ?>" class="txtinput input-check" style="border:none;box-shadow:none;padding:0px; padding-top:10px;" readonly>
			</div>

			<div style="padding-bottom:10px;">
				<strong>7. DHL 맨유트립을 가고싶은 이유</strong>
				<textarea name="manuTourReasonText" rows="100" id="manuTourReasonText" tabindex="7" placeholder="DHL 맨유트립을 가고싶은 이유!(500자 이내)" style="overflow:visible;padding:0;font-size:0.9em;border:none;box-shadow:none;color:#777;width:100%;" readonly><?=$manu_tour_reason_text?></textarea>
			</div>

			<div style="padding-bottom:10px;">
				<input type="checkbox" name="checkPrivacy" id="checkPrivacy" style="display:none;" checked>
				<input type="checkbox" name="checkEventNote" id="checkEventNote" style="display:none;"  checked>
			</div>
			<section id="buttons">
				<input type="submit" name="submit" id="submitbtn" class="submitbtn" tabindex="7" value="신청하기">
				<button type="button" id="resetbtn" class="resetbtn" onclick="javascript:history.go(-1)">수정하기</button>
				<br style="clear:both;">
			</section>
		</form>
	</section>

</body>
</html>