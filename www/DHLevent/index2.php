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
				background-image: url(./assets/images/landing_1_01.jpg);
				height: 1345px;
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
				padding: 3rem 1.5rem;
				text-align: center;
				font-size: 2.5em;
				font-weight: bold;
			}
			.subContents{
				font-size: 1.6em;
			}		
			
			#st2 {position:absolute; width:80%; margin-left:10%; text-align:center; top:30%; right:0; left:0; z-index:3;}
			
			.btn-danger{
				width:300px;
				height: 50px;				
				font-size: 2em;
				margin-top:30px;
			}
			
			#st3 .sns{
				display:none;
			}
			
			.list-inline{
				margin-top:1em;
			}
			
		@media (min-width: 1200px) {
			.container {
				width: 1500px;
			}
		}
		@media (max-width: 768px) {
			.container{
				width:100%;
				padding-right: 0px;
				padding-left: 0px;
			}
			.wrap1{					
				background: url(./assets/images/mlanding_1_01.jpg) no-repeat;
				background-size: 100%;
				height: 580px;
			}
			.sns{
				display:none;
			}
			.subTitle{
				font-size: 1.5em;
				padding: 1rem 1.5rem;
			}
			
			
			.subContents{
				font-size: 1.0em;
			}
			
			#st2 {
				top: 10%;
			}			
			
			#st3 .sns{
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
						DHL을 만나면 고객님의 글로벌 비즈니스가 쉬워집니다!
					</div>
					<div class="subContents">
						DHL이 전세계 가장 많은 국가와 도시로 <br/>
						국제특송 서비스를 제공하는 기업이라는 사실,<br class="visible-xs-block"> 알고 계시나요?<br/>
						DHL의 안전한 글로벌 네트워크를 통해 고객님이 어떤 물품을 어느 곳으로 보내시든 <br/>
						최고의 국제특송 서비스를 제공합니다.
					</div>
					<div class="row">
						<a class="btn btn-danger" href="https://webshipping3.dhl.com/wsi/WSIServlet?moduleKey=Login&countryCode=KR&languageCode=ko&createShip=y">기업 고객</a>
						<a class="btn btn-danger" href="index_hp.php">개인 고객</a>
					</div>
				</section>

				
			</div>
			<section id="st3" class="text-center">
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