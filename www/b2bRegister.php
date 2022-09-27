<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <title>DHL 맨유투어 이벤트</title>
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

	function CheckValues() { 
		if (CheckSpaces(document.hongkiat.coName.value)){ 
			alert("회사명을 입력하셔야만 등록이 됩니다."); 
			document.hongkiat.coName.focus(); else if(CheckSpaces(document.hongkiat.cName.value)){ 
			alert("고객 성함을 입력하셔야만 등록이 됩니다."); 
			document.hongkiat.cName.focus(); 
		}
		}else if(CheckSpaces(document.hongkiat.coType.value)){ 
			alert("회사 업종을 입력하셔야만 등록이 됩니다."); 
			document.hongkiat.coType.focus(); 
		}else if(CheckSpaces(document.hongkiat.cContact.value)){ 
			alert("고객 연락처를 입력하셔야만 등록이 됩니다."); 
			document.hongkiat.cContact.focus(); 
		}else if(!document.hongkiat.custom.checked){ 
			alert("개인정보취급방침에 동의하셔야만 등록이 됩니다."); 
			document.hongkiat.custom.focus(); 
		}else { 
		   document.hongkiat.submit(); 
		   return true;
		} 
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
		<span class="chyron"><em><a href="http://blog.naver.com/dhl_korea">&laquo; DHL 공식 블로그</a></em></span>
		
		<div style="width:100%">
			<img width=100% src="images/landing_MU.png">
		</div>
		
		<form name="hongkiat" id="hongkiat-form" method="get"  accept-charset="UTF-8" action="b2cNewinsert.php"  onSubmit="CheckValues();return false">

		<div id="wrapping" class="clearfix">
			<section id="aligned">
			
				<input type="text" name="coName" 	id="coName" 	placeholder="회사명" autocomplete="off" tabindex="1" class="txtinput">
				<input type="text" name="coUrl" 	id="coUrl" 		placeholder="B2C관련 운영중인 홈페이지 주소(URL)" autocomplete="off" tabindex="1" class="txtinput">
				<input type="text" name="cName"	 	id="cName" 		placeholder="고객명" 			tabindex="3" class="txtinput">
				<input type="text" name="cPosition"	id="cPosition" 	placeholder="직책" 			tabindex="3" class="txtinput">
				<input type="text" name="coType"	id="coType" 	placeholder="업종" 	autocomplete="off" tabindex="2" class="txtinput">				
				<input type="text" name="cContact" 	id="cContact" 	placeholder="연락처" 	tabindex="4" class="txtinput">

				<section id="aside" class="clearfix">
							<h2>국제물류 이용 형태<font size="3" color="gray">(복수응답)</font></h2>				
								<input type="checkbox" name="coUse[]" value="국제" id="ads_com1">국제특송
								<input type="checkbox" name="coUse[]" value="포워더" id="ads_com2">포워더
								<input type="checkbox" name="coUse[]" value="해운" id="ads_com3">해운
								<input type="checkbox" name="coUse[]" value="기타" id="ads_com4">기타
							<h2>주요글로벌 비즈니스</h2>
								<input type="radio" name="coBiz_info" value="0">수입
								<input type="radio" name="coBiz_info" value="1">수출
								<input type="radio" name="coBiz_info" value="2">수출입 모두
								<h2></h2>
								<h3>주요 수출입 품목<font size="3" color="gray">(복수응답시 ,로구분)</font></h3>				
									<div class="inputSmall">수입<input type="text" name="coInPro" 	id="coInPro" class="txtinput_small">
									/수출<input type="text" name="coOutPro" 	id="coOutPro" class="txtinput_small"></div>									
								<h3>주요 수출입 국가<font size="3" color="gray">(복수응답시 ,로구분)</font></h3>		
									<div class="inputSmall">수입<input type="text" name="coInNa" 	id="coInNa" class="txtinput_small">
									/수출<input type="text" name="coOutNa" 	id="coOutNa" class="txtinput_small"></div>
								<h3>수출입 물량</h3>		
									<div class="inputSmall">수입<input type="text" name="coInSize" 	id="coInSize" 	placeholder="월 몇건" class="txtinput_num">
									/수출<input type="text" name="coOutSize" 	id="coOutSize"	placeholder="월 몇건" class="txtinput_num"></div>									
							<h2>이용 경험 국제 특송 업체</h2>
								<input type="checkbox" name="coUseCo[]" value="DHL" id="ads_com1">DHL
								<input type="checkbox" name="coUseCo[]" value="FDX" id="ads_com2">FedEx
								<input type="checkbox" name="coUseCo[]" value="UPS" id="ads_com3">UPS
								<input type="checkbox" name="coUseCo[]" value="TNT" id="ads_com4">TNT
								<input type="checkbox" name="coUseCo[]" value="EMS" id="ads_com5">EMS
								<input type="checkbox" name="coUseCo[]" value="Etc" id="ads_com6">기타
							<h2>당일 DHL 인천 게이트웨이 투어 참석여부</h2>
								<div style="font-size: 0.8em;"><b>참고:</b> DHL 인천 게이트웨이 투어(인천 소재)는 오후 4시부터 7시까지 진행됩니다.<br> 여의도<->인천간 왕복 셔틀이 제공됩니다.
국내 최대 특송 설비를 직접 견학할 수 있는 소중한 기회입니다.</div>
								<input type="radio" name="coBiz_gate" value="0">참석
								<input type="radio" name="coBiz_gate" value="1">불참		
								
					<h2>세미나 참석 희망 이유</h2>
					<textarea name="coMemo" id="message" tabindex="5" class="txtblock"></textarea>
					<h2>향후 B2C 확대 방향</h2>
					<textarea name="coB2c" id="b2cmessage" tabindex="5" class="txtblock"></textarea>
					<h2>B2C 비즈니스 관련 DHL측 제안 사항</h2>
					<textarea name="coDhl" id="dhlmessage" tabindex="5" class="txtblock"></textarea>
					
					<B> 개인정보취급방침 </B>
						<textarea class="custom">
주식회사 디에이치엘코리아  (이하 '회사'는) 고객님의 개인정보를 중요시하며, "정보통신망 이용촉진 및 정보보호"에 관한 법률을 준수하고 있습니다.
회사는 개인정보취급방침을 통하여 고객님께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.

회사는 개인정보취급방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.

ο 본 방침은 : 2014 년 8 월 21 일 부터 시행됩니다.

■ 수집하는 개인정보 항목

회사는 회원가입, 상담, 서비스 신청 등등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
수집항목 : 이름 , 고객ID , 휴대전화번호 , 이메일 , 소속회사
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
경찰청 사이버테러대응센터 (www.ctrc.go.kr/02-392-0330)</textarea>
						<input type="checkbox"  id="custom" value="1"> <b>수집하는 개인정보 항목, 수집/이용목적, 개인정보 보유기간에 동의합니다.</b>
				
				</section>	
			</section>
		</div>


		<section id="buttons">
			<input type="submit" name="submit" id="submitbtn" class="submitbtn" tabindex="7" value="신청하기">
			<input type="reset" name="reset" id="resetbtn" class="resetbtn" value="초기화">
			<br style="clear:both;">
		</section>
		</form>
	</section>

</body>
</html>