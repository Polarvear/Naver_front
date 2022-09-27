<!DOCTYPE html>
<html>
	<head>
		<title>DHL 이벤트</title> 
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="title" content="DHL Newsletter Event" >
		<meta name="description" content="DHL 20% 할인 이벤트" />
		<meta property="og:type" content="website">
		<meta property="og:title" content="DHL 20% 할인 이벤트">
		<meta property="og:description" content="DHL 20% 할인 이벤트!">
		<meta property="og:image" content="http://dhlkorea.com/DHLevent/assets/images/mainThumb.png">
		<meta property="og:image:type" content="image/jpeg">
		<meta property="og:image:width" content="400">	
		<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
		<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />
		<style>
			@import url('../assets/fonts/notosans/kr/notosanskr.css');
			body {
				font-family: 'Noto Sans KR', sans-serif;
			}
			a:hover {
				color: black;
				background: transparent;
				text-decoration: none;
			}
			a:visited {
				color: black;
				background: transparent;
				text-decoration: none;
			}
			a:active {
				color: black;
				background: transparent;
				text-decoration: none;
			}
			a:link {
				color: black;
				background: transparent;
				text-decoration: none;
			}
			a:focus {
				color: black;
				background: transparent;
				text-decoration: none;
			}
			/* nav */
			header {
				position: relative;
			}
			header .container {
				position: absolute;
				background-image: url('../assets/images/BG/dhl-nav.png');
				background-size: 100% 80%;
				background-repeat: no-repeat;
				z-index: 1;
				left: 50%;
				transform: translateX(-50%);
				top: 10px;
				height: 104px;
			}
			@media (max-width: 767px) {
				header .container {
					background-image: url('../assets/images/BG/dhl-nav-m.png');
					background-size: 100% 100% !important;
					height: 60px;
					width: 100%;
					top: 0;
					position: relative;
					padding: 0;
				}
			}
			header .container .img-logo {
				top: 10px;
				left: 5px;
				position: relative;
			}
			@media (max-width: 767px) {
				header .container .img-logo {
					width: 25%;
					top: 18px;
					left: 2%;
					padding-left: 15px;
				}
			}
			header .container .navbar-nav {
				margin-right: 15px;
			}
			@media (max-width: 767px) {
				header .container .navbar-nav {
					padding-left: 53%;
					margin-top: 10px;
					width: 73%;
					font-size: 1.2rem;
					float: right;
					margin-right: 0;
				}
			}
			@media (max-width: 480px) {
				header .container .navbar-nav {
					padding-left: 39%;
				}
			}
			@media (max-width: 350px) {
				header .container .navbar-nav {
					padding-left: 8%;
				}
			}
			header .container .navbar-nav li > a {
				color: black;
				font-weight: bold;
			}
			@media (max-width: 767px) {
				header .container .navbar-nav li > a {
					display: none;
				}
			}
			header .container .navbar-nav li > a:hover {
				color: #d40511 !important;
				background-color: transparent;
			}
			header .container .navbar-nav li > a:focus {
				color: black;
				background-color: transparent;
			}
			header .container .navbar-nav li > a.active {
				color: #d40511;
			}
			header .container .navbar-nav li > a.active:after {
				content: "";
				width: 70%;
				height: 1px;
				display: block;
				position: absolute;
				margin-top: 5px;
				border-bottom: 3px solid #d40511;
			}
			header .container .navbar-nav li > a.snscuration {
				font-weight: 400;
			}
			@media (max-width: 767px) {
				header .container .navbar-nav li > a.snscuration {
					display: block;
				}
			}
			header .container .navbar-nav li > a.snscuration:hover {
				color: black !important;
				background-color: transparent;
			}
			@media (max-width: 1000px) {
				header .container {
					background-size: 100% 80%;
					background-repeat: no-repeat;
				}
			}
			header .hamburger {
				position: absolute;
				z-index: 1;
				top: 0;
				right: 0;
				width: 54px;
				height: 100%;
				border-image: linear-gradient(to top, #fed93d 10%, #ffeca8 90%);
				border-image-slice: 1;
				border-left: 1px solid;
			}
			header .hamburger button:first-child {
				-webkit-appearance: none;
				padding: 30% 26%;
				display: inline-block;
				height: 100%;
				background: transparent;
				border: 0px;
				box-shadow: none;
				-webkit-box-shadow: none;
			}
			header .hamburger button:first-child span {
				font-size: 2.5rem;
				color: #d40511;
			}
			header .hamburger button[aria-expanded="true"] {
				background-image: linear-gradient(-180deg, rgba(255, 205, 0, 0) 0, #fff 100%);
			}
			header .hamburger .dropdown-menu {
				border: 0px;
				border-radius: 0px;
				top: 95%;
				padding: 0;
			}
			header .hamburger .dropdown-menu > ul {
				flex-direction: column;
				width: 32rem;
				display: flex;
				padding: 0;
				margin: 0;
				list-style: none;
			}
			header .hamburger .dropdown-menu > ul > li > a {
				display: flex;
				justify-content: space-between;
				padding: 0;
				border-bottom: 1px solid #e8e8e8;
			}
			header .hamburger .dropdown-menu > ul > li > a .text {
				padding: 1rem 1.5rem;
			}
			header .hamburger .dropdown-menu > ul > li > a .icon {
				padding-right: 5%;
			}
			header .hamburger .snscuration-top-list ul > li > a {
				color: #d40511;
				text-align: center;
			}
			header .hamburger .snscuration-top-list hr {
				margin: 0 auto;
				width: 85%;
				border: 1px solid #f2f2f2;
			}
			header .hamburger .snscuration-prev[aria-expanded="false"] .icon:after {
				content: "+";
				font-size: 2.8rem;
				color: #d40511;
			}
			header .hamburger .snscuration-prev[aria-expanded="true"] .icon:after {
				content: "\2212";
				font-size: 2.5rem;
				color: #d40511;
			}
			@media (max-width: 767px) {
				header .carousel .carousel-indicators {
					bottom: -1%;
				}
			}
			@media (max-width: 767px) and (orientation: landscape) {
				header .carousel .carousel-indicators {
					bottom: 2%;
				}
			}
			@media (max-width: 767px) {
				header .carousel .carousel-indicators.snscuration {
					bottom: 44%;
				}
			}
			header .carousel .carousel-indicators li {
				height: 8px;
				width: 8px;
				margin: 0 5px;
				background-color: white;
			}
			@media (max-width: 767px) {
				header .carousel .carousel-indicators li {
					width: 12px;
					height: 12px;
				}
			}
			header .carousel .carousel-indicators .active {
				width: 8px;
				height: 8px;
				margin: 0 5px;
				border: 1px solid #fc0;
				background-color: #fc0;
			}
			@media (max-width: 767px) {
				header .carousel .carousel-indicators .active {
					width: 12px;
					height: 12px;
				}
			}
			@media (max-width: 767px) {
				header {
					border-bottom: 1px solid #bababa;
				}
			}
			header .caption.container {
				position: absolute;
				z-index: 1;
				text-align: left;
				left: 50%;
				transform: translateX(-50%);
				color: white;
				height: auto;
				top: 37%;
				background-image: none;
				padding-left: 1.5%;
			}
			@media (max-width: 767px) {
				header .caption.container {
					top: auto;
					bottom: 0;
					text-align: left;
					padding: 5% 5% 8% 5%;
				}
			}
			@media (max-width: 767px) {
				header .caption.container.snscuration {
					top: 37%;
					position: inherit;
					color: #d40511 !important;
					left: 0;
					transform: none;
					text-align: left;
					padding: 5% 5% 8% 5%;
				}
			}
			header .caption.container .serises-name {
				font-weight: 200;
			}
			@media (max-width: 767px) {
				header .caption.container .serises-name {
					font-size: 5vw;
					font-weight: 300;
				}
			}
			header .caption.container .title {
				font-size: 4.8rem;
				line-height: 48px;
				font-weight: 600;
				word-spacing: 5px;
				letter-spacing: -2px;
			}
			@media (max-width: 767px) {
				header .caption.container .title {
					font-size: 6vw !important;
					line-height: 7vw !important;
					font-weight: bold;
					padding-left: 3px;
				}
			}
			@media (max-width: 1280px) {
				header .caption.container .title {
					font-size: 3vw;
					line-height: 3vw;
				}
			}
			header .caption.container .subtitle {
				font-size: 1.6rem;
				padding-top: 35px;
				color: #f3c40c;
			}
			@media (max-width: 767px) {
				header .caption.container .subtitle {
					display: none;
				}
			}
			@media (max-width: 1280px) {
				header .caption.container .subtitle {
					padding-top: 2%;
				}
			}
			header .caption.container .url button {
				margin-top: 33px;
				font-size: 1.5rem;
				color: white;
				background-color: #d40511;
				margin-left: 8px;
				padding: 8px 50px 8px 25px;
				transition-duration: 200ms;
				background-image: url('../assets/images/BG/slide-arrow-white.png');
				background-repeat: no-repeat;
				background-position-x: 90%;
				background-position-y: 50%;
			}
			@media (max-width: 767px) {
				header .caption.container .url button {
					width: 100%;
					background-image: none;
					margin: 5% 0 0 0 !important;
					padding: 3% !important;
					border-radius: 0px;
					font-size: 3.3vw !important;
				}
			}
			header .caption.container .url button:hover {
				border: 2px solid #d40511;
				color: #d40511;
				background-color: white;
				background-image: url('../assets/images/BG/slide-arrow-red.png');
			}
			@media (max-width: 767px) {
				header .caption.container .url button:hover {
					border: none;
					color: white;
					background-color: #d40511;
					background-image: none;
				}
			}
			@media (max-width: 1280px) {
				header .caption.container .url button {
					margin-top: 2%;
					padding: 0.8% 5% 0.8% 2%;
					font-size: 1.2vw;
					background-size: 0.8vw;
				}
			}
			header .carousel .carousel-control {
				width: 5%;
				top: 43%;
				bottom: 57%;
			}
			@media (max-width: 767px) {
				header .carousel .carousel-control {
					width: 9%;
					top: 31%;
					bottom: 85%;
				}
				header .carousel .carousel-control img {
					width: 67%;
					margin: 0 auto;
				}
			}
			@media (max-width: 767px) {
				header .carousel .carousel-control.snscuration {
					top: 21%;
				}
			}
 /* contents */
		section.promotion-new-consumer {
		background-color: #e6e6e6;
		}
		@media (max-width: 767px) {
			section.promotion-new-consumer {
				padding-top: 3%;
			}
		}
		@media (max-width: 767px) {
			section.promotion-new-consumer .container {
				padding: 0 15px;
			}
		}
		section.promotion-new-consumer .container .title {
			padding: 25px 0;
			text-align: center;
			font-weight: 800;
			font-size: 3rem;
		}
		@media (max-width: 767px) {
			section.promotion-new-consumer .container .title {
				font-size: 2rem;
				padding: 3% 0;
			}
		}
		section.promotion-new-consumer .container .body .col-sm-12 {
			margin: 10px auto;
		}
		@media (max-width: 767px) {
			section.promotion-new-consumer .container .body .col-sm-12 {
				margin: 6% auto;
			}
		}
		section.promotion-condition {
			padding-bottom: 25px;
			background-color: #e6e6e6;
		}
		@media (max-width: 767px) {
			section.promotion-condition .container {
				padding: 0 15px;
			}
		}
		section.promotion-condition .container .body {
			margin: 0 40px;
		}
		@media (max-width: 767px) {
			section.promotion-condition .container .body {
				margin: 0;
			}
		}
		section.promotion-condition .container .body .col-sm-12 {
			white-space: nowrap;
		}
		@media (max-width: 767px) {
			section.promotion-condition .container .body .col-sm-12 {
				white-space: normal;
				padding-right: 0;
			}
		}
		section.promotion-condition .container .body .col-sm-12 ul {
			display: inline;
			list-style: square;
			color: #d40511;
			margin: 15px auto;
			-webkit-padding-start: 0;
		}
		section.promotion-condition .container .body .col-sm-12 ul li {
			padding-bottom: 15px;
		}
		@media (max-width: 767px) {
			section.promotion-condition .container .body .col-sm-12 ul li {
				padding-bottom: 0;
			}
		}
		section.promotion-condition .container .body .col-sm-12 ul span {
			display: inline-table;
			padding: 5px 0;
		}
		section.promotion-condition .container .body .col-sm-12 ul span.condtion-title {
			color: #d40511;
			vertical-align: initial;
			font-weight: bolder;
			font-size: 1.8rem;
			min-width: 80px;
		}
		@media (max-width: 767px) {
			section.promotion-condition .container .body .col-sm-12 ul span.condtion-title {
				font-size: 3vw;
				min-width: 56px;
				display: inline;
			}
		}
		section.promotion-condition .container .body .col-sm-12 ul span.condtion-content {
			color: black;
			line-height: 23px;
			font-size: 1.8rem;
			font-weight: 300;
			vertical-align: top;
			padding-left: 7px;
		}
		@media (max-width: 767px) {
			section.promotion-condition .container .body .col-sm-12 ul span.condtion-content {
				display: inline-block;
				font-size: 3vw;
				line-height: 5vw;
				width: 80%;
				padding-top: 0.4%;
			}
		}
		section.promotion-condition .container .body .description {
			font-size: 1.7rem;
			line-height: 29px;
			color: #d40511;
			font-weight: 500;
			right: 20px;
			display: flex;
			white-space: nowrap;
		}
		@media (max-width: 767px) {
			section.promotion-condition .container .body .description {
				white-space: normal;
				font-size: 1.4rem;
				line-height: 21px;
				padding-bottom: 15px;
				padding-right: 0px;
				padding-top: 15px;
			}
		}
		section.promotion-form .container {
			padding: 0px 5%;
		}
		@media (max-width: 1300px) {
			section.promotion-form .container {
				padding: 0 9%;
			}
		}
		@media (max-width: 1250px) {
			section.promotion-form .container {
				padding: 0 11%;
			}
		}
		section.promotion-privacy {
			padding: 25px 0;
		}
		section.promotion-privacy .container {
			border-top: 3px solid #ffd739;
		}
		@media (max-width: 1480px) {
			section.promotion-privacy .container {
				width: 80%;
				margin-left: auto;
				margin-right: auto;
			}
		}
		@media (max-width: 1280px) {
			section.promotion-privacy .container {
				width: 70%;
			}
		}
		@media (max-width: 767px) {
			section.promotion-privacy .container {
				width: 90%;
				padding: 0;
			}
		}
		section.promotion-privacy .container .title {
			padding: 40px 5% 10px;
			font-weight: 800;
			font-size: 2.2rem;
		}
		@media (max-width: 767px) {
			section.promotion-privacy .container .title {
				padding: 5% 0 3%;
				font-size: 1.7rem;
			}
		}
		section.promotion-privacy .container .body:first-child {
			padding: 30px 0 0;
		}
		section.promotion-privacy .container .body .body-content {
			font-size: 1.6rem;
			padding: 0 5% 15px;
			word-break: keep-all;
		}
		@media (max-width: 767px) {
			section.promotion-privacy .container .body .body-content {
				padding: 0;
				font-size: 1.25rem;
			}
		}
		section.promotion-privacy .container .body .body-conten table tr th, td {
			word-break: keep-all;
		}
		section.promotion-privacy .container .body .body-content .privacy-link {
			color: #337ab7;
			text-decoration: underline;
		}
		/* footer */
		footer.footer-dhl-express {
			margin-top: 5px;
			text-align: center;
			background-color: #eee;
		}
		@media (max-width: 768px) {
			footer.footer-dhl-express {
				margin-top: 0px;
				padding: 0;
			}
		}
		footer.footer-dhl-express .container {
			padding: 25px 0 50px;
			width: 75%;
		}
		@media (max-width: 768px) {
			footer.footer-dhl-express .container {
				padding: 25px 0 0 0;
				min-width: auto;
				max-width: auto;
				width: 100%;
			}
		}
		footer.footer-dhl-express .container .footer-title {
			letter-spacing: -1px;
			text-align: center;
			font-size: 3rem;
			font-weight: 800;
		}
		@media (max-width: 768px) {
			footer.footer-dhl-express .container .footer-title {
				color: #d40511;
			}
		}
		footer.footer-dhl-express .container .row {
			margin-top: 25px;
		}
		footer.footer-dhl-express .container .row .col-sm-2 {
			text-align: center;
			transition-duration: 200ms;
			padding: 0;
		}
		footer.footer-dhl-express .container .row .col-sm-2:hover .dhl-img {
			width: 87px;
			margin-bottom: 5px;
		}
		footer.footer-dhl-express .container .row .col-sm-2:hover .circle {
			border-color: #d40511;
		}
		footer.footer-dhl-express .container .row .col-sm-2 .dhl-img {
			width: 82px;
			margin-bottom: 10px;
			transition-duration: 200ms;
		}
		footer.footer-dhl-express .container .row .col-sm-2 .circle {
			position: absolute;
			top: 0;
			left: 50%;
			transform: translateX(-50%);
			width: 82px;
			height: 82px;
			border: 2px solid #cfcfcf;
			border-radius: 50%;
			transition-duration: 200ms;
		}
		footer.footer-dhl-express .container .row .col-sm-2 .sns-txt {
			color: #d40511;
		}
		@media (max-width: 768px) {
			footer.footer-dhl-express .container .row {
				margin: 6% 2% 0 2%;
			}
			footer.footer-dhl-express .container .row .col-xs-6 {
				margin-bottom: 10%;
				text-align: center;
				padding: 0;
			}
			footer.footer-dhl-express .container .row .col-xs-6 .dhl-img {
				width: 22vw;
				margin-bottom: 6%;
			}
			footer.footer-dhl-express .container .row .col-xs-6 .circle {
				position: absolute;
				top: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 22vw;
				height: 22vw;
				border: 2px solid #cfcfcf;
				border-radius: 50%;
			}
			footer.footer-dhl-express .container .row .col-xs-6 .btn-dhl {
				width: 13%;
				padding-left: 5%;
			}
			footer.footer-dhl-express .container .row .col-xs-6 .sns-txt {
				font-size: 5vw;
				color: #d40511;
				font-weight: 500;
			}
		}
		footer.footer-dhl-express .copyright {
			border-top: 1px solid #e0e0e0;
			background-color: #eee;
			padding: 15px;
			color: #9f9c9c;
		}
		@media (max-width: 768px) {
			footer.footer-dhl-express .copyright {
				padding: 3% 0;
				font-size: 3vw;
			}
		}
		</style>
		<script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

		  ga('create', 'UA-99241614-3', 'auto');
		  ga('send', 'pageview');

		</script>
		<!-- Facebook Pixel Code -->
		<script>
		!function(f,b,e,v,n,t,s){if(f.fbq
		
		)return;n=f.fbq=function(){n.callMethod?
		n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
		n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
		t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
		document,'script','https://connect.facebook.net/en_US/fbevents.js');
		fbq('init', '1035885463132719'); // Insert your pixel ID here.
		fbq('track', '<DHL_HP_PROMO>');
		</script>
		<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1035885463132719&ev=PageView&noscript=1"
		/></noscript>
		<!-- DO NOT MODIFY -->
		<!-- End Facebook Pixel Code -->
	</head>
	<body>	   
	<header id="header">
			<div class="container" style="z-index:16;">
				<img src="../assets/images/dhl-logo.svg" class="img-logo">
			</div>
			<img src="../assets/images/HP/nav-desktop-1.jpg" alt="" class="img-responsive hidden-xs">
			<img src="../assets/images/HP/nav-mobile-1.jpg" alt="" class="img-responsive visible-xs">
			<div class="caption container">
				<div class="serises-name">홈페이지 프로모션</div>
				<div class="title hidden-xs">신규 고객님을 위한 특별 혜택</div>
				<div class="title visible-xs">신규 고객님을 위한 <br/> 특별 혜택</div>
				<div class="subtitle">정기적인 물품 배송, 수입 진행이 있으신가요? <br/> 지금 DHL 고객번호를 개설하시면 20% 할인 제공과 더불어 <br/>푸짐한 선물을 증정합니다</div>
			</div>
		</header>
		<section id="promotion-new-consumer" class="promotion-new-consumer">
			<div class="container">
				<div class="title">신규 고객님을 위한 특별 혜택</div>
				<div class="body row">
					<div class="col-sm-12">
						<img src="../assets/images/HP/promotion-desktop-1-1.png" class="img-responsive hidden-xs" alt="">
						<img src="../assets/images/HP/promotion-mobile-1-1.png" class="img-responsive visible-xs" alt="">
					</div>
					<div class="col-sm-12">
						<img src="../assets/images/HP/promotion-desktop-2-4.png" class="img-responsive hidden-xs" alt="">
						<img src="../assets/images/HP/promotion-mobile-2-4.png" class="img-responsive visible-xs" alt="">
					</div>
					<div class="col-sm-12">
						<img src="../assets/images/HP/promotion-desktop-3-1.jpg" class="img-responsive hidden-xs" alt="">
						<img src="../assets/images/HP/promotion-mobile-3-1.jpg" class="img-responsive visible-xs" alt="">
					</div>
				</div>
			</div>
		</section>
		<section class="promotion-condition">
			<div class="container">
				<div class="body row">
					<div class="col-sm-12">
						<ul style="margin-left:0px;">
							<li>
								<span class="condtion-title">이벤트 기간:</span>
								<span class="condtion-content">2020년 1월 1일~2월 29일까지</span>
							</li>
							<li>
								<span class="condtion-title">참여 대상:</span>
								<span class="condtion-content">본 페이지에서 고객번호 발급을 신청한 고객 대상</span>
							</li>
							<li>
								<span class="condtion-title">선정 기준:</span>
								<span class="condtion-content">
									<2. 가입신청 이벤트>는 이벤트 기간 내 본 페이지에서 고객번호 발급을 신청한 고객 중 20명을 추첨하며, <br/> 
									당첨자는 이벤트 종료 후 개별 연락합니다. (2020년 1월 중) <br/> 
									<3. 첫 발송 이벤트>는 고객번호 발급 후 익월까지 월 단위 10만원 이상 청구가 완료된 고객 전원에게 경품을 지급합니다. (월별합산 불가)
								</span>
							</li>
							<li>
								<span class="condtion-title">경품 안내:</span>
								<span class="condtion-content">
								<2. 가입신청 이벤트>의 경품은 양키캔들 보티브 6종 + 보티브 홀더 3개 세트입니다.<br/>
									<3. 첫발송 이벤트>의 경품은 스타벅스 텀블러(랜덤 발송)와 DHL에코백입니다. 경품은 이벤트 기간 중 1회만 증정하며, 택배로 발송해드립니다.
								</span>
							</li>
						</ul>
					</div>
					<div class="col-xs-12 description">
						<span>※</span><span>본 이벤트는 2019년 12월 31일까지 신청 가능하며, 해당 기간 동안 고객번호 발급 신청을 완료한 고객에게는 2020년 6월 30일까지 할인혜택이 적용됩니다.</span>
					</div>
				</div>
			</div>
		</section>
		<section class="promotion-form">
			<div class="container">
				<div id="form-promotion" class="promotion-form-body">
					<script type="text/javascript">(function(n){var r="_ion_ionizer",t=n.getElementsByTagName("script"),i;t=t[t.length-1];t.id=r+ +new Date+Math.floor(Math.random()*10);t.setAttribute("data-ion-embed",'{"url":"//shipping.dhl.co.kr/DHLbanner?_ion_target=embed-1.0","target":"'+t.id+'","appendQuery":false}');n.getElementById(r)||(i=n.createElement("script"),i.id=r,i.src=(n.location.protocol==="https:"?"//8f2a3f802cdf2859af9e-51128641de34f0801c2bd5e1e5f0dc25.ssl.cf1.rackcdn.com":"//1f1835935797600af226-51128641de34f0801c2bd5e1e5f0dc25.r5.cf1.rackcdn.com")+"/ionizer-1.0.min.js",t.parentNode.insertBefore(i,t.nextSibling))})(document);</script>
				</div>
			</div>
		</section>
		<section class="promotion-privacy">
			<div class="container">
				<div class="body">
					<div class="body-content">
						<p>
						아래 ㈜디에이치엘코리아(이하 “회사” 또는 “디에이치엘코리아”, 
						웹페이지: www.dhl.co.kr)의 “개인정보 수집 및 이용”, 
						“개인정보 처리업무의 위탁” 관련 내용을 확인하신 후, 
						위 체크박스에 체크표시를 해주시고 “고객번호 발급신청” 버튼을 
						클릭해주시기 바랍니다.
						</p>
					</div>
				</div>
				<div class="title">개인정보 수집 및 이용에 대한 동의</div>
				<div class="body">
					<div class="body-content">
						<p>
							회사는 다음과 같이 서비스 제공에 필요한 최소한의 개인정보를 
							수집하게 됩니다. 
							<table class="table table-bordered table-responsive small">
								<thead>
									<tr>
										<th>구분</th>
										<th>항목</th>
										<th>목적</th>
										<th>보유기간</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>필수적</td>
										<td>성명 (이름, 성), 이메일, 전화번호, 회사명, 주소</td>
										<td>고객 관리</td>
										<td>이용 목적 달성시</td>
									</tr>
								</tbody>
							</table>
							※ 귀하는 위와 같은 개인정보 수집·이용을 거부할 수 있습니다. 다만, 
							필수적 정보의 수집·이용에 동의하지 않을 경우 고객번호 개설을 위한 
							상담을 받을 수 없습니다.
						</p>
					</div>
				</div>
				<div class="title">개인정보 처리업무의 위탁</div>
				<div class="body">
					<div class="body-content">
						<p>
						회사는 개인정보 관련 업무의 효과적인 관리를 위하여 다음과 같이 개인정보 
						일부 또는 전부를 제공할 수 있습니다.
						<table class="table table-bordered table-responsive small">
							<thead>
								<tr>
									<th>아웃소싱 업체</th>
									<th>위탁하는 업무</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>㈜허밍아이엠씨, 퍼플아이앤씨</td>
									<td>이벤트, 운송 상품</td>
								</tr>
							</tbody>
						</table>
						※ 귀하는 위와 같은 개인정보 처리업무의 위탁을 거부할 수 있습니다. 다만, 
						개인정보 처리업무의 위탁을 동의하지 않을 경우 고객번호 개설을 위한 
						상담을 받을 수 없습니다.
						<br/>
						<br/>
						<b>DHL 개인정보 보호 방침에 대한 자세한 정보는 
						<a href="https://www.logistics.dhl/kr-ko/home/footer/local-privacy-notice.html"
							target="_blank" class="privacy-link">
							회사 홈페이지
						</a>에서 확인하실 수 있습니다.</b>
						</p>
					</div>
				</div>
			</div>
		</section>
		<footer class="footer-dhl-express">
			<div class="container">
				<div class="footer-title">Quick Link</div>
				<div class="row">
					<div class="col-sm-1 hidden-xs">
					</div>
					<div class="col-sm-2 col-xs-6">
						<a class="btn-fx-track" 
								data-fx-category="블로그 클릭" 
								href="https://blog.naver.com/dhl_korea" 
								target="_blank">
							<img src="../assets/images/BG/dhl-korea-blog.png" class="dhl-img" alt="">
							<div class="circle"></div>
							<div class="sns-txt">
								Blog
							</div>
						</a>
					</div>
					<div class="col-sm-2 col-xs-6">
						<a class="btn-fx-track" 
								data-fx-category="포스트 클릭" 
								href="https://m.post.naver.com/dhl_korea" 
								target="_blank">
							<img src="../assets/images/BG/dhl-korea-post.png" class="dhl-img" alt="">
							<div class="circle"></div>
							<div class="sns-txt">
								Post
							</div>
						</a>
					</div>
					<div class="col-sm-2 col-xs-6">
						<a class="btn-fx-track" 
								data-fx-category="페이스북 클릭" 
								href="https://www.facebook.com/DHLExpressKorea/" 
								target="_blank">
							<img src="../assets/images/BG/dhl-korea-facebook.png" class="dhl-img" alt="">
							<div class="circle"></div>
							<div class="sns-txt">
								Facebook
							</div>
						</a>
					</div>
					<div class="col-sm-2 col-xs-6">
						<a class="btn-fx-track" 
								data-fx-category="뉴스레터 클릭" 
								href="http://dhlkorea.com/subscribe/" 
								target="_blank">
							<img src="../assets/images/BG/dhl-korea-newsletter.png" class="dhl-img" alt="">
							<div class="circle"></div>
							<div class="sns-txt">
								뉴스레터
							</div>
						</a>
					</div>         
					<div class="col-sm-2 col-xs-6">
						<a class="btn-fx-track" 
								data-fx-category="홈페이지 클릭" 
								href="http://www.dhl.co.kr/ko/express.html" target="_blank">
							<img src="../assets/images/BG/dhl-korea-home.png" class="dhl-img" alt="">
							<div class="circle"></div>
							<div class="sns-txt">
								Homepage
							</div>
						</a>
					</div>
					<div class="col-sm-1 hidden-xs">
					</div>
				</div>
			</div>
			<div class="copyright hidden-xs">
				Deutsche Post DHL Group - Mail &amp; Logistics. © 2018 DHL International GmbH. All rights reserved.
			</div>
			<div class="copyright visible-xs">
				Deutsche Post DHL Group - Mail &amp; Logistics. <br/>© 2018 DHL International GmbH. All rights reserved.
			</div>
		</footer>
		
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