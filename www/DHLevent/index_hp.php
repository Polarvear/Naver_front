<!DOCTYPE html>
<html>
	<head>
		<title>DHL 이벤트</title> 
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="title" content="DHL Newsletter Event" >
		<meta name="description" content="DHL 30% 할인 이벤트" />		
		<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />
		<style>
		
			.wrap1{					
				background-image: url(./assets/images/home_01.jpg);
				height: 907px;
				background-repeat: no-repeat;
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
				background-image: url(./assets/images/dhl_02.jpg);
				background-position: center center;
				background-size: 100%;
				background-repeat: no-repeat;
			}
						
			#st4 {
				height: 0;
				padding: 0; /* remove any pre-existing padding, just in case */
				padding-bottom: 19.5%; /* for a 4:3 aspect ratio */
				background-image: url(./assets/images/dhl_03.jpg);
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
				background-image: url(./assets/images/mlanding_hp_01.jpg);
				background-position: center center;
				background-size: 100%;
				background-repeat: no-repeat;
			}			
			.sns, #st2{
				display:none;
			}
			#st2m{
				display:block;
			}
			#st3{
				padding-bottom: 188%; /* for a 4:3 aspect ratio */
				background-image: url(./assets/images/mlanding_hp_03.jpg);
			}
			#st4 {
				height: 0;
				padding: 0; /* remove any pre-existing padding, just in case */
				padding-bottom: 47.8%; /* for a 4:3 aspect ratio */
				background-image: url(./assets/images/mlanding_hp_04.jpg);
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
				background-image: url(./assets/images/mlanding_hp_05.jpg);
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
	</head>
	<body>	
		<div class="container">
			<div class="wrap1" ><!----------wrap1 start------------>
				<section id="st1" class="pull-right"><!----------step1 start------------>	
					<div class="sns">
						<a id="sns" href="http://www.facebook.com/DHLExpressKorea/"><img src="./assets/images/fb_btn.png"/></a>
						<a id="sns" href="http://blog.naver.com/dhl_korea"><img src="./assets/images/bg_btn.png"/></a>
						<a id="sns" href="http://m.post.naver.com/dhl_korea?isHome=1"><img src="./assets/images/np_btn.png"/></a>
						<a id="sns" href="https://www.youtube.com/user/dhlexpresskorea"><img src="./assets/images/yt_btn.png"/></a>
						<a id="sns" href="http://www.dhl.co.kr/ko.html"><img src="./assets/images/hp_btn.png"/></a>
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
						 <div style="width:428px;"><script type="text/javascript">(function(n){var r="_ion_ionizer",t=n.getElementsByTagName("script"),i;t=t[t.length-1];t.id=r+ +new Date+Math.floor(Math.random()*10);t.setAttribute("data-ion-embed",'{"url":"//shipping.dhl.co.kr/DHLbanner?_ion_target=embed-1.0","target":"'+t.id+'","appendQuery":false}');n.getElementById(r)||(i=n.createElement("script"),i.id=r,i.src=(n.location.protocol==="https:"?"//8f2a3f802cdf2859af9e-51128641de34f0801c2bd5e1e5f0dc25.ssl.cf1.rackcdn.com":"//1f1835935797600af226-51128641de34f0801c2bd5e1e5f0dc25.r5.cf1.rackcdn.com")+"/ionizer-1.0.min.js",t.parentNode.insertBefore(i,t.nextSibling))})(document);</script></div>
					</div>
				</section>
			</div>
				<section id="st2m">
					<script type="text/javascript">(function(n){var r="_ion_ionizer",t=n.getElementsByTagName("script"),i;t=t[t.length-1];t.id=r+ +new Date+Math.floor(Math.random()*10);t.setAttribute("data-ion-embed",'{"url":"//shipping.dhl.co.kr/DHLbanner?_ion_target=embed-1.0","target":"'+t.id+'","appendQuery":false}');n.getElementById(r)||(i=n.createElement("script"),i.id=r,i.src=(n.location.protocol==="https:"?"//8f2a3f802cdf2859af9e-51128641de34f0801c2bd5e1e5f0dc25.ssl.cf1.rackcdn.com":"//1f1835935797600af226-51128641de34f0801c2bd5e1e5f0dc25.r5.cf1.rackcdn.com")+"/ionizer-1.0.min.js",t.parentNode.insertBefore(i,t.nextSibling))})(document);</script>
				</section>
				<section id="st3"></section>

				<section><!----------step4 start------------>
					<div id="st4">
						<form  method="GET" class="form-horizontal" action="process/result.php">
							<input type="hidden" name="key" value="newsLetter">
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
					<form  method="GET" class="form-horizontal" action="process/result.php">
						<input type="hidden" name="key" value="newsLetter">
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
						<a id="sns" href="http://www.facebook.com/DHLExpressKorea/"><img src="./assets/images/fb_btn.png"/></a>
						<a id="sns" href="http://blog.naver.com/dhl_korea"><img src="./assets/images/bg_btn.png"/></a	>
						<a id="sns" href="http://m.post.naver.com/dhl_korea?isHome=1"><img src="./assets/images/np_btn.png"/></a>
						<a id="sns" href="https://www.youtube.com/user/dhlexpresskorea"><img src="./assets/images/yt_btn.png"/></a>
						<a id="sns" href="http://www.dhl.co.kr/ko.html"><img src="./assets/images/hp_btn.png"/></a>
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
	</body>
</html>