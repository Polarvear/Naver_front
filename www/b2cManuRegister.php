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
		if (CheckSpaces(document.hongkiat.userName.value)){ 
			alert("이름을 입력하셔야만 등록이 됩니다."); 
			document.hongkiat.userName.focus(); 
		}
		else if (CheckSpaces(document.hongkiat.userTel.value)){ 
			alert("휴대폰 번호를 입력하셔야만 등록이 됩니다."); 
			document.hongkiat.userTel.focus(); 
		}
		else if (!emailcheck(document.hongkiat.userEmail.value)){ 
			alert("이메일(e-mail)을 입력하셔야만 등록이 됩니다."); 
			document.hongkiat.userEmail.focus(); 
		}
		else if (CheckSpaces(document.hongkiat.companyName.value)){ 
			alert("회사명을 입력하셔야만 등록이 됩니다."); 
			document.hongkiat.companyName.focus(); 
		}
		else if (CheckSpaces(document.hongkiat.dhlCustomerNumber.value)){ 
			alert("DHL 고객번호를 입력하셔야만 등록이 됩니다."); 
			document.hongkiat.dhlCustomerNumber.focus(); 
		}
		else if (CheckSpaces(document.hongkiat.dhlStaffName.value)){ 
			alert("DHL 영업담당자 이름을 입력하셔야만 등록이 됩니다."); 
			document.hongkiat.dhlStaffName.focus(); 
		}
		else if (CheckSpaces(document.hongkiat.manuTourReasonText.value)){ 
			alert("DHL 맨유 트립를 가고싶은 이유를 입력하셔야만 등록이 됩니다."); 
			document.hongkiat.manuTourReasonText.focus(); 
		}
		else if(!document.hongkiat.checkPrivacy.checked){ 
			alert("개인정보취급방침에 동의하셔야만 등록이 됩니다."); 
			document.hongkiat.checkPrivacy.focus(); 
		}
		else if(!document.hongkiat.checkEventNote.checked){ 
			alert("이벤트 유의사항에 동의하셔야만 등록이 됩니다."); 
			document.hongkiat.checkEventNote.focus(); 
		}
		else { 
		   document.hongkiat.submit(); 
		   return true;
		} 
	} 


	function calBytes(str) {
		var tcount = 0;
		var tmpStr = new String(str);
		var temp = tmpStr.length;
		var onechar;
		for ( k=0; k<temp; k++ ) {
		onechar = tmpStr.charAt(k);
		if (escape(onechar).length > 4) {
		tcount += 2;
		} else {
		tcount += 1;
		}
		}
		return tcount;
	} 

	//글자수 제한 체크
	function len_chk(textarea){ 
	  	if(textarea.value.length > 500){ 
	       alert("500자 이내로 입력하셔야 합니다."); 
	       textarea.value = textarea.value.substring(0,500); 
	       textarea.focus(); 
	  	}

	  	document.getElementById("manuTourTextLen").textContent = textarea.value.length; 
	} 

	</script>
	<style>
		#hongkiat-form .txtinput { 
			 _height/**/: 35px;
		}
	</style>
</head>
<body>
	<section id="container">
		<div id="light">  		
			<ul style="margin-top:0px;margin-bottom:0px;text-align:left;padding-left:10px;">
				<li style="display:inline;">
					<a href="http://dhlkorea.com/"><img src="images/back.png" style="border:0px;"></a>
				</li>
				<li style="display:inline; padding-left:650px;padding-top:0px;padding-bottom:0px;">
					<a href="http://blog.naver.com/dhl_korea" target="_blank"><img src="images/dhl_landing_blog.png" style="border:0px;"></a>
				</li>
			</ul>
		</div>
		<div style="width:100%">
			<img width=100% src="images/landing_MU_final.png">
		</div>
		<h1>참여신청</h1>
		<form name="hongkiat" id="hongkiat-form" method="post" accept-charset="UTF-8" action="b2cManuRegisterCheck.php"  onSubmit="CheckValues();return false">

		<div id="wrapping" class="clearfix">
			<section id="aligned">
				<label><strong>1. 이름</strong></label><br>
				<input type="text" name="userName" id="userName" placeholder="이름" autocomplete="off" tabindex="1" class="txtinput">
				
				<label><strong>2. 생년월일</strong></label><br>
				<select name="userBirthYear" style="margin-bottom:10px;">
<?php for($i = 1878; $i <= 1995; $i++):?>
					<option value="<?=$i?>"><?=$i?></option>
<?php endfor ?>
				</select> 년

				<select name="userBirthMonth" style="margin-bottom:10px;">
<?php for($i = 1; $i <= 12; $i++):?>
					<option value="<?=$i?>"><?=$i?></option>
<?php endfor ?>
				</select> 월

				<select name="userBirthDay" style="margin-bottom:10px;">
<?php for($i = 1; $i <= 31; $i++):?>
					<option value="<?=$i?>"><?=$i?></option>
<?php endfor ?>
				</select> 일				
		
				<br><label><strong>3. 휴대폰 번호</strong></label><br>		
				<input type="text" name="userTel" id="userTel" placeholder="휴대폰 번호" autocomplete="off" tabindex="2" class="txtinput">

				<label><strong>4. E-mail</strong></label><br>		
				<input type="text" name="userEmail"	id="userEmail" placeholder="e-mail" tabindex="3" class="txtinput">

				<label><strong>5. 회사명</strong></label><br>		
				<input type="text" name="companyName" id="companyName" placeholder="회사명" tabindex="4" class="txtinput">

				<label><strong>6. DHL 고객번호(9자리)</strong></label><br>		
				<input type="text" name="dhlCustomerNumber" id="dhlCustomerNumber" placeholder="DHL 고객번호(9자리)" autocomplete="off" tabindex="5" class="txtinput">				

				<label><strong>7. DHL 영업담당자 이름</strong></label><br>		
				<input type="text" name="dhlStaffName" id="dhlStaffName" placeholder="DHL 영업담당자 이름" tabindex="6" class="txtinput">

				<label><strong>8. DHL 맨유트립을 가고싶은 이유!(500자 이내)</strong></label><br>		
				<textarea name="manuTourReasonText" id="manuTourReasonText" tabindex="7" class="txtblock" placeholder="DHL 맨유트립을 가고싶은 이유!(500자 이내)" onkeydown="len_chk(this)"></textarea>
				<span id="manuTourTextLen">1</span> / 500
				<br><br>
				<B> DHL 개인정보취급방침 </B>
				<textarea class="custom" readonly>
주식회사 디에이치엘코리아  (이하 '회사'는) 고객님의 개인정보를 중요시하며, "정보통신망 이용촉진 및 정보보호"에 관한 법률을 준수하고 있습니다.
회사는 개인정보취급방침을 통하여 고객님께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.

회사는 개인정보취급방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.

ο 본 방침은 : 2014 년 8 월 21 일 부터 시행됩니다.

■ 수집하는 개인정보 항목

회사는 회원가입, 상담, 서비스 신청 등등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
수집항목 : 이름 , 고객ID 또는 Account(고객번호), 휴대전화번호 , 이메일 , 소속회사
개인정보 수집방법 : 홈페이지(회원가입)

■ 개인정보의 수집 및 이용목적

회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.

서비스 제공에 관한 정보 수집
콘텐츠 제공 , 물품배송 또는 청구지 등 발송 , 서비스 제공
회원 관리
회원제 서비스 이용에 따른 본인확인 , 개인 식별 , 불량회원의 부정 이용 방지와 비인가 사용 방지 , 가입 의사 확인 , 불만처리 등 민원처리 , 고지사항 전달
마케팅 및 광고에 활용
이벤트 등 광고성 정보 전달 , 접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계

■ 개인정보의 보유 및 이용기간

원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.

보존 항목 : 결제기록
보존 근거 : 계약 또는 청약철회 등에 관한 기록
보존 기간 : 3년
계약 또는 청약철회 등에 관한 기록 : 5년 (전자상거래등에서의 소비자보호에 관한 법률)
대금결제 및 재화 등의 공급에 관한 기록 : 5년 (전자상거래등에서의 소비자보호에 관한 법률)
소비자의 불만 또는 분쟁처리에 관한 기록 : 3년 (전자상거래등에서의 소비자보호에 관한 법률)

■ 개인정보의 파기절차 및 방법

회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체없이 파기합니다. 파기절차 및 방법은 다음과 같습니다.

파기절차
회원님이 회원가입 등을 위해 입력하신 정보는 목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조) 일정 기간 저장된 후 파기되어집니다.
별도 DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 보유되어지는 이외의 다른 목적으로 이용되지 않습니다.

파기방법
전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.

■ 개인정보 제공

회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.

이용자들이 사전에 동의한 경우
법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우

■ 수집한 개인정보의 위탁

회사는 서비스 이행을 위해 아래와 같이 외부 전문업체에 위탁하여 운영하고 있습니다.

위탁 대상자 : 주식회사 허밍아이엠씨
위탁업무 내용 : 웹사이트 및 시스템 관리

■ 이용자 및 법정대리인의 권리와 그 행사방법

이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 가입해지를 요청할 수도 있습니다.
이용자들의 개인정보 조회,수정을 위해서는 개인정보관리책임자에게 서면, 전화 또는 이메일로 연락하시면 지체없이 조치하겠습니다.
귀하가 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체없이 통지하여 정정이 이루어지도록 하겠습니다.
회사는 이용자의 요청에 의해 해지 또는 삭제된 개인정보는 "회사가 수집하는 개인정보의 보유 및 이용기간"에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.

■ 개인정보에 관한 민원서비스

회사는 고객의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 관련 부서 및 개인정보관리책임자를 지정하고 있습니다.

고객서비스담당 부서 : 인터넷팀
전화번호 : 070-7707-5712
이메일 : cbpark@humming.co.kr
개인정보관리책임자 성명 : 박창범

귀하께서는 회사의 서비스를 이용하시며 발생하는 모든 개인정보보호 관련 민원을 개인정보관리책임자 혹은 담당부서로 신고하실 수 있습니다.
회사는 이용자들의 신고사항에 대해 신속하게 충분한 답변을 드릴 것입니다.
기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.
개인분쟁조정위원회 (www.1336.or.kr/1336)
정보보호마크인증위원회 (www.eprivacy.or.kr/02-580-0533~4)
대검찰청 인터넷범죄수사센터 (http://icic.sppo.go.kr/02-3480-3600)
경찰청 사이버테러대응센터 (www.ctrc.go.kr/02-392-0330)
				</textarea>
				* 맨체스터 유나이티드 개인정보취급방침 : <a href="http://www.manutd.com/en/General-Footer-Section/Privacy-Policy.aspx" target="_blank">MU Privacy</a> /  <a href="http://www.manutd.com/en/General-Footer-Section/Privacy-Policy.aspx?filter=companies" target="_blank">MU Group companies</a> / <a href="http://www.manutd.com/en/General-Footer-Section/Privacy-Policy.aspx?filter=partners" target="_blank">MU Commercial Partners</a><br><br>
				<input type="checkbox" name="checkPrivacy" id="checkPrivacy"> <b>상기 입력하신 정보는 DHL과 맨체스터 유나이티드에 이벤트 진행의 용도로만 제공되며 수집하는 개인정보 항목, 수집/이용목적, 개인정보 보유기간에 동의합니다.</b>
				<br><br>
				<B> <span style="color:red;">이벤트 유의사항</span> </B>
				<textarea class="custom" readonly style="border:3px solid red;">
* 이벤트 유의사항

-	이벤트 당첨에 따른 제세공과금은 DHL에서 부담합니다.
-	당첨자에게는 8월 21일 오전 중에 개별 연락 드릴 예정이며, 21일 오후 4시까지 연락 불가 시 당첨이 취소됩니다.
-	여권 유효기간은 출발일 기준으로부터 반드시 6개월 이상 남아있어야 하며, 
	해당 여권사본을 주최측이 요청한 기간까지 제공해 주셔야 합니다. 
-	여권 사본 송부 후, 차후 명단 변경이 되지 않습니다. 최종 확인된 여권 사본을 보내 주시기 바랍니다.
-	응모시, 정보 오기재로 인한 경품 미수령 건에 대해서는 당사가 책임지지 않습니다.
-	당첨시, 타인 양도는 불가하며 여행 기간과 항공티켓 (항공사, 좌석, 시간)은 변경이 불가합니다.
-	타인 양도 및 여행 일정 변경 시 당첨이 무효 처리되며, 당사는 이에 따른 아무런 법적 책임이 없습니다.
-	당첨자 개인의 출국 불가 사유로 여행이 취소되는 경우, 당첨 무효 처리 됩니다.
-	맨유트립 일정 기간 내에 대한 여행자 보험은 DHL에서 제공합니다.
-	천재지변으로 인한 항공 결항 등 본 트립과 관련된 기타 규정은 이용 항공사와 DHL 트래블 에이전시의 약관에 따릅니다.
-	상기 일정은 DHL의 사정에 의해 변동될 수 있습니다.
-	DHL 고객 번호를 보유한 고객사 소속의 DHL 고객만 응모 가능합니다. DHL 고객이 아닐 경우 당첨이 취소됩니다.
-	당첨되신 분들께는 이벤트 응모시 입력한 개인정보를 기준으로 안내 됩니다. 
	휴대폰 번호로 당첨 발표될 예정이오니 정확한 정보를 기재해주시기 바랍니다.(당첨자 변경 불가)
-	이벤트 등록 정보와 실제 정보가 상이할 경우 이벤트 당첨이 취소될 수 있습니다.
-	당첨자의 항공권은 출국 당일 현장에서 전달 예정이며, 전달 장소는 당첨자 발표 후 별도 안내 예정입니다.
-	트립/이벤트 참여 후기를 포스팅할 경우, DHL 코리아는 이를 공유할 수 있는 권리가 있습니다.


*맨유트립 풀 패키지

-	맨유트립 풀 패키지는 항공권, 숙박, 전 일정 식사, 맨유 경기 Platinum Pass, 맨유 공식 유니폼, 기념품이 포함되어 있으며 당첨자 1인에게 1매 제공됩니다.
-	맨유 경기 Platinum Pass는 경기장 내 가장 최상위 등급의 좌석이며, 기념품과 함께 다과 및 음주류가 제공됩니다.
-	트립 관련 상세 일정은 당첨자 발표 후 별도 고지 예정입니다.

*맨유트립 세미 패키지
-	맨유트립 세미 패키지는 항공권과 맨유 경기 Grandstand Pass만 당첨자 1인에게 1매 제공되며, 숙박은 포함되지 않으므로 8월 28일까지 개별 예약하셔야 합니다.
-	비상시를 대비해 숙소 예약 정보는 8월 31일까지 이벤트 주최측과 공유해 주셔야 합니다.
-	트립 관련 상세 일정은 당첨자 발표 후 별도 고지 예정입니다.
				</textarea>
				<input type="checkbox" name="checkEventNote" id="checkEventNote"> <b>이벤트 유의사항을 숙지하고 응모합니다.</b>

		<section id="buttons">
			<input type="submit" name="submit" id="submitbtn" class="submitbtn" tabindex="7" value="신청하기">
			<input type="reset" name="reset" id="resetbtn" class="resetbtn" value="초기화">
			<br style="clear:both;">
		</section>
		</form>
	</section>

</body>
</html>