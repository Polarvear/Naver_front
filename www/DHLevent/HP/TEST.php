<!DOCTYPE html>
<html>
	<head>
		<title>DHL 이벤트</title> 
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="title" content="DHL Newsletter Event" >
		<meta name="description" content="DHL 30% 할인 이벤트" />
		<meta property="og:type" content="website">
		<meta property="og:title" content="DHL 30% 할인 이벤트">
		<meta property="og:description" content="DHL 30% 할인 이벤트!">
		<meta property="og:image" content="http://dhlkorea.com/DHLevent/assets/images/mainThumb.png">
		<meta property="og:image:type" content="image/jpeg">
		<meta property="og:image:width" content="400">	
		<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
		<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />
		<style>
		
			.wrap1{					
				background-image: url(../assets/images/home_01.jpg);
				height: 960px;
				background-repeat: no-repeat;
			}
		
			.wrap_customer{					
			}
			.logo_top{
				text-align: center;
			}
			.top_desc{
				color: #d40511;
				padding-top: 2em;
				font-size: 1em;
				font-weight: bold;
			}
			hr {
				 background-color: #000; height: 1px;
			}	
			.top_dhl{
				padding-top: 15px;
				padding-left: 1.5em;
				padding-right: 1.5em;
			}
			.top_dhl h4{
				font-weight: bold;
			}
			
			#Desc1 p{
				padding-left: 1.5em;
				padding-right: 1.5em;				
			}
			.w3-gray{
				background-color: #efefef!important;
			}
			ol{
				padding-top:10px;
			}
			.w3-container{
				border:1px;
				border-style: solid;
				border-color: #efefef!important;
			}			
			.sns{
				margin-right:110px;
				margin-top:40px;
			}
			
			#sns{
				padding-right:16px;				
			}	

			.subTitle{
				background-color:#cf0202;
				color:white;
				padding: 1rem 1.5rem;
				font-size: 2.5em;
				font-weight: bold;
			}
			.subTitle2{
				padding-top: 1rem;
				font-size: 2.0em;
				font-weight: bold;
			}			
			.subContents{
				font-size: 1.3em;
			}		
			.subContents2{
				color:#cf0202;				
				font-size: 1.1em;
			}		
			#saleTitle{
				font-size: 1.4em;
				font-weight: bold;
			}
			#st2 {
				position:absolute;
				margin-left:150px;
				top:17%;
				width:835px;
			}
			#st2m{
				display:none;
			}
			
			#st3{
				height: 0;
				padding: 0; /* remove any pre-existing padding, just in case */
				padding-bottom: 46.2%; /* for a 4:3 aspect ratio */
				background-image: url(../assets/images/dhl_02.jpg);
				background-position: center center;
				background-size: 100%;
				background-repeat: no-repeat;
			}
						
			#st4 {
				height: 0;
				padding: 0; /* remove any pre-existing padding, just in case */
				padding-bottom: 19.5%; /* for a 4:3 aspect ratio */
				background-image: url(../assets/images/dhl_03.jpg);
				background-position: center center;
				background-size: 100%;
				background-repeat: no-repeat;
				display:block;
			}
			
			#st4 .form-horizontal{
				text-align:  right;
			}

			#st4 .user_form_wrap .input_wrap .customNum > input{
				border: none;
				background-color:transparent;
				width: 19%;
				height:1em;				
				margin-top: 9%;
				margin-right: 13%;
			}

			#st4 .user_form_wrap .input_wrap .customEmail > input{
				border: none;
				background-color:transparent;
				width: 19%;
				height:1em;
				margin-top: 1%;
				margin-right: 13%;		
			}

			#st4 .submit-btn{
				background-color: transparent;
				background-repeat:no-repeat;
				border: none;
				cursor:pointer;
				overflow: hidden;
				outline:none;
				margin-top: 1.5%;
				margin-right: 24%;				
				width: 8%;
				height:3em;
			}
			
			#st4m{
				display:none;
			}
			.btn-danger{
				width:300px;
				height: 50px;				
				font-size: 2em;
				margin-top:30px;
			}
			
			#st5 .sns{
				display:none;
			}
			
			.list-inline{
				margin-top:1em;
			}

		@media (min-width: 768px) {
			.container {
				width: 1500px;
			}
			#st4 .user_form_wrap .input_wrap .customNum > input{
				height:2em;
				margin-top: 9%;
				margin-right: 13%;
			}

			#st4 .user_form_wrap .input_wrap .customEmail > input{
				height:2em;
				margin-top: 1.2%;
				margin-right: 13%;		
			}			
		}		
		
		@media (max-width: 768px) {
			.container{
				width:100%;
				padding-right: 0px;
				padding-left: 0px;
			}
			.wrap1{					
				height: 0;
				padding: 0; /* remove any pre-existing padding, just in case */
				padding-bottom: 84.4%; /* for a 4:3 aspect ratio */
				background-image: url(../assets/images/mlanding_hp_01.jpg);
				background-position: center center;
				background-size: 100%;
				background-repeat: no-repeat;
			}	

			.logo_top{
				height: 0;
				padding: 0; /* remove any pre-existing padding, just in case */
				padding-bottom: 18.64%; /* for a 4:3 aspect ratio */
				background-image: url(../assets/images/al_mtop.jpg);  
				background-position: center center;
				background-size: 100%;
				background-repeat: no-repeat;
			}			
			.logo_top>img{
				display:none;
			}
			
			.sns, #st2{
				display:none;
			}
			#st2m{
				display:block;
			}
			#st3{
				padding-bottom: 188%; /* for a 4:3 aspect ratio */
				background-image: url(../assets/images/mlanding_hp_03.jpg);
			}
			#st4 {
				height: 0;
				padding: 0; /* remove any pre-existing padding, just in case */
				padding-bottom: 47.8%; /* for a 4:3 aspect ratio */
				background-image: url(../assets/images/mlanding_hp_04.jpg);
				background-position: center center;
				background-size: 100%;
				background-repeat: no-repeat;
				display:block;
			}
			
			#st4 .form-horizontal{
				display:none;
			}			
			
			#st4m{
				height: 0;
				padding: 0; /* remove any pre-existing padding, just in case */
				padding-bottom: 56.32%; /* for a 4:3 aspect ratio */
				background-image: url(../assets/images/mlanding_hp_05.jpg);
				background-position: center center;
				background-size: 100%;
				background-repeat: no-repeat;
				display:block;
			}
			
			#st4m .user_form_wrap .input_wrap .customNum > input{
				border: none;
				background-color:transparent;
				width:55%;
				height:1.5em;
				margin-top: 25%;	
			}
			
			#st4m .user_form_wrap .input_wrap .customEmail > input{
				border: none;
				background-color:transparent;
				width:55%;				
				height:1.5em;
				margin-top: 4.7%;
			}
			
			#st4m .submit-btn{
				background-color: transparent;
				background-repeat:no-repeat;
				border: none;
				cursor:pointer;
				overflow: hidden;
				outline:none;
				margin-top: 7%;			
				width: 22%;
				height:3em;
			}			
			
			#st5 .sns{
				display:block;
				margin-right:0px;
				margin-top:20px;
			}

			
		}
		</style>

		<!-- Facebook Pixel Code -->
		<script>
		!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
		n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
		n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
		t.src=v;s=b.getElementsByTagName(e)[0];s[removed].insertBefore(t,s)}(window,
		document,'script','https://connect.facebook.net/en_US/fbevents.js');
		fbq('init', '1035885463132719'); // Insert your pixel ID here.
		fbq('track', '<DHL_PIXEL>');
		</script>
		<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1035885463132719&ev=PageView&noscript=1"
		/></noscript>
		<!-- DO NOT MODIFY -->
		<!-- End Facebook Pixel Code -->
		<script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

		  ga('create', 'UA-99241614-3', 'auto');
		  ga('send', 'pageview');

		</script>
	</head>
	<body>	
		<div class="container">
			<div class="wrap1" ><!----------wrap1 start------------>
				<section id="st1" class="pull-right"><!----------step1 start------------>	
					<div class="sns">
						<a id="sns" href="http://www.facebook.com/DHLExpressKorea/"><img src="../assets/images/fb_btn.png"/></a>
						<a id="sns" href="http://blog.naver.com/dhl_korea"><img src="../assets/images/bg_btn.png"/></a>
						<a id="sns" href="http://m.post.naver.com/dhl_korea?isHome=1"><img src="../assets/images/np_btn.png"/></a>
						<a id="sns" href="https://www.youtube.com/user/dhlexpresskorea"><img src="../assets/images/yt_btn.png"/></a>
						<a id="sns" href="http://www.dhl.co.kr/ko.html"><img src="../assets/images/hp_btn.png"/></a>
					</div>			
				</section><!----------step1 end------------>
				<section id="st2">
					<div class="subTitle">
						DHL 홈페이지 배너 방문 고객님을 위한 특별한 혜택
					</div>
					<div class="subTitle2">
						지금 고객번호 개설하시면 30% 할인 혜택을 드립니다.
					</div>					
					<div class="subContents">
						정기적인 물품 발송, 수입 진행이 있으신가요?<br/>
						지금 DHL 고객번호를 개설하고 30% 할인된 가격으로 최고의 국제특송 서비스를 만나보세요!<br/>
						DHL의 안전한 글로벌 네트워크를 통해 고객님이 어떤 물품을 어느 곳으로 보내시든<br/>
						최고의 국제특송 서비스를 제공합니다.					
					</div>
					<div class="subContents2">
						<span id="saleTitle">할인혜택 제공기간: 2017년 8월 31일까지</span><br/>
						*반드시 하단의 입력 양식을 통해 DHL 신규 고객번호 개설시 30% 할인이 제공됩니다.<br/>				
					</div>
					<div class="user_form_wrap">
						 <div style="width:428px;margin-top:20px;"><script type="text/javascript">(function(n){var r="_ion_ionizer",t=n.getElementsByTagName("script"),i;t=t[t.length-1];t.id=r+ +new Date+Math.floor(Math.random()*10);t.setAttribute("data-ion-embed",'{"url":"//shipping.dhl.co.kr/DHLbanner?_ion_target=embed-1.0","target":"'+t.id+'","appendQuery":false}');n.getElementById(r)||(i=n.createElement("script"),i.id=r,i.src=(n.location.protocol==="https:"?"//8f2a3f802cdf2859af9e-51128641de34f0801c2bd5e1e5f0dc25.ssl.cf1.rackcdn.com":"//1f1835935797600af226-51128641de34f0801c2bd5e1e5f0dc25.r5.cf1.rackcdn.com")+"/ionizer-1.0.min.js",t.parentNode.insertBefore(i,t.nextSibling))})(document);</script></div>
					</div>
				</section>
			</div>
				<section id="st2m">
					<script type="text/javascript">(function(n){var r="_ion_ionizer",t=n.getElementsByTagName("script"),i;t=t[t.length-1];t.id=r+ +new Date+Math.floor(Math.random()*10);t.setAttribute("data-ion-embed",'{"url":"//shipping.dhl.co.kr/DHLbanner?_ion_target=embed-1.0","target":"'+t.id+'","appendQuery":false}');n.getElementById(r)||(i=n.createElement("script"),i.id=r,i.src=(n.location.protocol==="https:"?"//8f2a3f802cdf2859af9e-51128641de34f0801c2bd5e1e5f0dc25.ssl.cf1.rackcdn.com":"//1f1835935797600af226-51128641de34f0801c2bd5e1e5f0dc25.r5.cf1.rackcdn.com")+"/ionizer-1.0.min.js",t.parentNode.insertBefore(i,t.nextSibling))})(document);</script>
				</section>

			<div class="customer">
				<div class="wrap_customer" ><!----------wrap1 start------------>
				
					<div class="logo_top">	
						<img src="../assets/images/al_top.jpg" width="100%">
					</div>
					<div class="top_dhl">
						<p>주식회사 디에이치엘 코리아(www.dhl.co.kr, 이하 ”회사” 또는 ”디에이치엘 코리아”)는 『개인정보 보호법』(이하 “개인정보보호법”),『정보통신망 이용촉진 및 정보보호 등에 관한 법률』(이하 “정보통신망법”) 및 『신용정보의 이용 및 보호에 관한 법률』 등 정보통신서비스제공자가 준수하여야 할 관련 법령상의 개인정보보호 규정을 준수합니다. <br/>
							디에이치엘 코리아는 이를 위하여 개인정보보호법 제30조 및 정보통신망법 제27조의2에 따라 정보주체의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 정보주체의 고충을 원활하게 처리할 수 있도록 다음과 같은 개인정보 처리/취급방침(이하 “본 방침”)을 두고 있습니다. <br/>
							디에이치엘 코리아는 본 방침이 개정되는 경우 개정 사항을 회사 홈페이지를 통하여 공지할 것입니다.</p>
					</div>

					<button type="button" onclick="javascript:myFunction('Desc1');" class="w3-button w3-block w3-gray w3-left-align">1.개인정보의 처리 목적</button>
					<div id="Desc1" class="w3-hide w3-container">
						<div><strong>제1조 (개인정보의 처리 목적)</strong></div>
						<div>회사는 개인정보를 다음의 목적을 위해 처리합니다. <br/>
							처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 사용되지 않으며 이용 목적이 변경될 때에는 개인정보보호법 제18조 및 정보통신망법 제24조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
						</div>
						
						<p><strong>1. 서비스 제공</strong><br/>
							: 본인 확인,콘텐츠 제공, 발송물 예약, 물품배송, 계약서/청구서 발송, 맞춤 서비스 제공, 요금결제/정산,<br/> 
							  물품배송에 관한 문의 및 요청에 대한 응답, 소식 및 자료의 제공 등의 목적으로 개인정보를 처리합니다.
						</P>
						<p><strong>2. 고충처리 </strong><br/>
							: 민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락/통지, 처리결과 통보 등의 목적으로 개인정보를 처리합니다.
						</p>
						<p><strong>3. 이벤트 참여확인 및 경품제공 </strong><br/>
							: 전화, SMS, 이메일, DM 발송을 통한 당사 상품서비스에 대한 제반 마케팅활동, <br/>
							  판촉행사 및 이벤트 등의 목적으로 개인정보를 처리합니다.
						</p>
					</div>

					<button type="button" onclick="myFunction('Desc2')" class="w3-button w3-block w3-gray w3-left-align">2.처리하는 개인정보의 항목</button>
					<div id="Desc2" class="w3-hide w3-container">
						<div>회사는 다음과 같이 각종 서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.<br/>
							<strong>1. 개인정보 파일명 : 운송 서비스 문의 관련 일반정보</strong>
							<ul>						
									<li> 개인정보 항목(필수) : 이름, 이메일</li>
									<li> 개인정보 항목(선택) : 전화번호, 회사명, 부서명</li>
									<li> 수집방법 : 홈페이지 및 유선/이메일을 통하여 제공 받음</li>
							</ul>
							<strong>2. 개인정보 파일명 : 운송 서비스 제공 관련 일반정보</strong>
							<ul>						
									<li> 개인정보 항목(필수) : 발송인·수취인의 이름, 국가, 회사명, 이메일, 주소, 전화번호</li>
									<li> 개인정보 항목(선택) : 직함, 부서명</li>
									<li> 수집방법 : DHL 발송 프로그램 / 유선/ 이메일/ 문서 등을 통하여 제공 받음</li>	
							</ul>
							<strong>3. 개인정보 파일명 : 긴급여권 배송 서비스 관련 일반정보</strong>
							<ul>						
									<li> 개인정보 항목(필수) : 신청자, 민원인, 생년월일, 전화번호, 이메일, 국가</li>
									<li> 개인정보 항목(선택) : 카드결제 선택시 신용카드번호</li>
									<li> 수집방법 : 홈페이지를 통하여 제공 받음</li>
							</ul>
							<strong>4. 개인정보 파일명 : 협력사 관련 일반정보</strong>
							<ul>						
									<li> 개인정보 항목(필수) : 이름, 상호, 사업자번호, 계좌번호, 주소</li>
									<li> 개인정보 항목(선택) : 담당자 이름, 전화번호, 이메일, 팩스</li>
									<li> 수집방법 : 이메일 /문서를 통하여 제공 받음</li>		
							</ul>
							<strong>5. 개인정보 파일명 : 채용지원자 관련 일반정보</strong>
							<ul>						
									<li> 개인정보 항목(필수) : 이름, 주소, 전화번호, 휴대전화번호, 이메일, 학력, 병역정보, 장애여부, 기타 지원자가 자기소개서에 기재한 정보</li>
									<li> 개인정보 항목(선택) : 가족사항, 자격증 소지여부, 경력사항, 어학증명서</li>
									<li> 수집방법 : 홈페이지 및 이메일을 통하여 제공 받음</li>	
							</ul>
							<strong>6. 개인정보 파일명 : 직원 관련 일반정보</strong>
							<ul>						
									<li> 개인정보 항목(필수) : 이름, 주민등록번호, 주소, 전화번호, 휴대전화번호, 이메일, 학력, 병역정보, 건강이력체크사항, 운전면허소지여부, 영어능력, 본적, 종교, 연봉정보, 인사고과정보 등</li>
									<li> 수집방법 : 문서를 통하여 제공받거나 근무 과정에서 자동적으로 수집됨</li>	
							</ul>
							<strong>7. 개인정보 파일명 : 캠페인 및 이벤트 랜딩 페이지 관련 일반정보</strong>
							<ul>						
									<li> 개인정보 항목(필수) : 이름, 이메일 주소, 회사 주소, 핸드폰 번호</li>
									<li> 수집방법 : 캠페인 전용 페이지를 통하여 제공 받음</li>				
							</ul>
							<strong>8. 개인정보 파일명 : 수취인이 DHL을 방문하여 화물 수령시 신분 확인을 위한 일반정보</strong>
							<ul>						
									<li> 개인정보 항목(필수) : 실 수취인 신분증 (주민등록증,여권,운전면허증)</li>
									<li> 수집방법 : 신분증 직접 수령, 신분증복사</li>				
							</ul>
							<strong>9. 개인정보 파일명 : 기타자동생성정보</strong>
							<ul>						
									<li> 개인정보 항목 : 접속 IP 정보, 쿠키, 서비스 이용 기록, 접속 로그</li>
									<li> 수집방법 : 생성정보 수집 툴을 통한 수집</li>	
							</ul>
							<strong>10. 개인정보 파일명 : 수입통관</strong>
							<ul>						
									<li> 개인정보 항목(필수) : 내국인- 수취인의 이름, 통관고유부호(주민번호), 주소, 전화번호 / 외국인- 수취인의 이름, 국적, 여권번호, 주소, 전화번호</li>
									<li> 개인정보 항목(선택) : Email, 전화번호</li>
									<li> 수집방법 : Email</li>			
							</ul>
						</div>				
					</div>	
					<button type="button" onclick="myFunction('Desc3')" class="w3-button w3-block w3-gray w3-left-align">3.개인정보의 처리 및 보유기간</button>
					<div id="Desc3" class="w3-hide w3-container">
						<div>회사는 서비스 제공과 관련된 개인정보를 법령에 따른 개인정보 보유기간, 정보주체로부터 개인정보 수집시에 동의받은 개인정보 보유기간 동안 또는 수집/이용에 대한 동의일로부터 개인정보의 처리목적 달성시까지 보유/이용합니다.<br/>
						단, 보유기간이 경과한 후에는 분쟁 해결, 민원처리 및 법령상 의무이행의 목적을 위하여만 보유/이용합니다. <br/>
						각각의 개인정보는 원칙적으로 서비스 공급완료 및 요금 결제,정산 완료시까지 처리 및 보유됩니다. 다만, 다음의 사유에 해당하는 경우 회사는 각각의 개인정보를 해당 사유가 종료될 때까지 처리,보유합니다.
						</div>
						<ul>
							<li>1 관계 법령 위반에 따른 수사/조사 등이 진행중인 경우에는 해당 수사/조사 종료시까지</li>
							<li>2「전자상거래 등에서의 소비자 보호에 관한 법률」시행령 제6조에 따른 표시,광고, 계약내용 및 이행 등 거래에 관한 기록</li>
							<li> 표시/광고에 관한 기록 : 6개월</li>
							<li> 계약 또는 청약철회, 대금결제, 재화 등의 공급기록 : 5년</li>
							<li> 소비자 불만 또는 분쟁처리에 관한 기록 : 3년 (단, 클레임 자료는 5년간 보관)</li>
							<li>3 「통신비밀보호법」시행령 제41조에 따른 통신사실확인자료 보관</li>
							<li> 가입자 전기통신일시, 개시/종료시간, 상대방 가입자번호, 사용도수, 발신기지국 위치추적자료 : 1년</li>
							<li> 컴퓨터통신, 인터넷 로그기록자료, 접속지 추적자료 : 3개월</li>
							<li>4「정보통신망 이용촉진 및 정보보호 등에 관한 법률」시행령 제29조에 따른 본인확인정보는 게시판에 정보 게시가 종료된 후 6개월간 보관</li>
							<li>5「국세기본법」제85조의3 제2항,「법인세법」제116조 제1항, 「부가가치세법」 제31조 등에 따른 거래에 관한 증명서류 등은 신고기한이 지난 날부터 5년</li>
							<li>6 지불조건 변경 요청서 및 수취인 운임 확약서는 기획재정부 인계 후 1년 6개월</li>
						</ul>
					</div>	

					<button type="button" onclick="myFunction('Desc4')" class="w3-button w3-block w3-gray w3-left-align">4.개인정보의 제3자 제공</button>
					<div id="Desc4" class="w3-hide w3-container">
						<div>회사는 원칙적으로 정보주체의 개인정보를 본 방침 제1조에서 명시한 범위 내에서 처리하며, 정보주체의 사전 동의, 법률의 특별한 규정 등 개인정보보호법 제17조 및 제18조 또는 정보통신망법 제24조 및 제24조의2에 해당하는 경우를 제외하고는 본래의 범위를 초과하여 처리하거나 제3자에게 제공하지 않습니다.</div>
					</div>	
					<button type="button" onclick="myFunction('Desc5')" class="w3-button w3-block w3-gray w3-left-align">5.개인정보처리 위탁</button>
					<div id="Desc5" class="w3-hide w3-container">
						<div>회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</div>
						<ol>
						  <li>업체리스트	
							<table border=1 cellspacing="0" cellpadding="5" bordercolordark="#ffffff" bordercolorlight="#d3d3d3">
							  <tr bgcolor="ffcc00">
								<td>업체명</td>
								<td>위탁 업무 내용</td>
								<td>기간</td>
							  </tr>
							  <tr>
								<td>Deutsche Post DHL 그룹 해외 전산센터</td>
								<td>정보의 관리 및 보관 등</td>
								<td rowspan=3>개인정보가 제공된 날부터 동의 철회일 또는 제공된 목적 달성 시 까지</td>
							  </tr>
							  <tr>
								<td>운서관세사</td>
								<td>통관업무</td>			
							  </tr>
							  <tr>
								<td>DHL Asia Pacific Finance Shared Services Center</td>
								<td>협력사의 등록, 관리 및 보존</td>			
							  </tr>
							</table>
						  </li>
						  <li>회사는 위탁계약 체결시 개인정보보호법 제26조 또는 정보통신망법 25조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적,관리적 보호조치, 수탁자에 대한 관리,감독, 손해배상 등 책임에 관한 사항 및 재위탁에 대한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다. 
						  </li>
						  <li>위탁업무의 내용이나 수탁자가 변경될 경우에는 지체 없이 본 방침을 통하여 공개하도록 하겠습니다. 
						  </li>					  
						</ol>
					</div>
					<hr/>					
			</div><!----------wrap1 end------------>
		</div><!-- /container --> 	
				<section id="st3"></section>		
				<section><!----------step4 start------------>
					<div id="st4">
					<form  method="GET" class="form-horizontal" action="../process/result.php">
						<input type="hidden" name="key" value="newsLetter">
						<input type="hidden" name="link" value="HP">
							<div class="user_form_wrap">
								<div class="input_wrap" style="display:block">
									<div class="customNum">
										<input type="text" name="customNum" placeholder="고객번호(9자리 숫자)" >
									</div>
									<div class="customEmail">
										<input type="text" name="customEmail" placeholder="이메일" >
									</div>
								</div>
							</div>
							<button class="submit-btn"></button>
						</form>
					</div>					
				</section><!----------step4 end------------>
				<div id="st4m" class="text-center">
					<form  method="GET" class="form-horizontal" action="../process/result.php">
						<input type="hidden" name="key" value="newsLetter">
						<input type="hidden" name="link" value="HP">
						<div class="user_form_wrap">
							<div class="input_wrap" style="display:block">
								<div class="customNum">
									<input type="text" name="customNum" placeholder="고객번호(9자리 숫자)" >
								</div>
								<div class="customEmail">
									<input type="text" name="customEmail" placeholder="이메일" >
								</div>
							</div>
						</div>
						<button class="submit-btn"></button>
					</form>
				</div>	



				
			<section id="st5" class="text-center">
					<div class="sns">
						<a id="sns" href="http://www.facebook.com/DHLExpressKorea/"><img src="../assets/images/fb_btn.png"/></a>
						<a id="sns" href="http://blog.naver.com/dhl_korea"><img src="../assets/images/bg_btn.png"/></a	>
						<a id="sns" href="http://m.post.naver.com/dhl_korea?isHome=1"><img src="../assets/images/np_btn.png"/></a>
						<a id="sns" href="https://www.youtube.com/user/dhlexpresskorea"><img src="../assets/images/yt_btn.png"/></a>
						<a id="sns" href="http://www.dhl.co.kr/ko.html"><img src="../assets/images/hp_btn.png"/></a>
					</div>	
					<div>
						<ul class="list-inline">
							<li><a href="http://www.dhl.co.kr/ko.html" target="_blank">DHL홈페이지</a></li>
							<li>|</li>
							<li><a href="http://www.dhl.co.kr/ko/legal.html#privacy" target="_blank">개인정보취급방침</a></li>
							<li>|</li>
							<li><a href="http://www.dhl.co.kr/ko/legal.html#t_c" target="_blank">이용약관</a></li>
						</ul>
					</div>
			</section>		
			<hr/>
			<div class="text-center">
			Deutsche Post DHL Group - Mail & Logistics. © 2017 DHL International GmbH. All rights reserved.
			</div>
		
			<!----------wrap1 end------------>
		</div>
		
		<!-- /container --> 
		<script src="http://code.jquery.com/jquery.js"></script>
		<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script> 
		<script>
		<!--

		function myFunction(id) {
			var x = document.getElementById(id);
			if (x.className.indexOf("w3-show") == -1) {
				x.className += " w3-show";
			} else { 
				x.className = x.className.replace(" w3-show", "");
			}
		}
		//-->
		</script>	
	</body>
</html>