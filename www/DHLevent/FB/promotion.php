<!DOCTYPE html>
<html>
	<head>
		<title>DHL 이벤트</title> 
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="title" content="DHL Newsletter Event" >
		<meta name="description" content="DHL 최대 50% 할인 이벤트" />
		<meta property="og:type" content="website">
		<meta property="og:title" content="DHL 최대 50% 할인 이벤트">
		<meta property="og:description" content="DHL 최대 50% 할인 이벤트!">
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
				background-image: url('../assets/images/FB/dhl-nav.png');
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
					background-image: url('../assets/images/FB/dhl-nav-m.png');
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
				background-image: url('../assets/images/FB/slide-arrow-white.png');
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
				background-image: url('../assets/images/FB/slide-arrow-red.png');
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
		}
		@media (max-width: 767px) {
			section.promotion-condition .container .body .description {
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
		section.promotion-privacy .container .body .body-content {
			font-size: 1.6rem;
			padding: 0 5% 15px;
		}
		@media (max-width: 767px) {
			section.promotion-privacy .container .body .body-content {
				padding: 0;
				font-size: 1.25rem;
			}
		}
		section.promotion-privacy .container .body .panel-group a[aria-expanded="true"] .panel-heading {
			border-bottom: 0;
			background-color: #fafafa;
		}
		section.promotion-privacy .container .body .panel-group a[aria-expanded="true"] .panel-heading .pull-right:after {
			content: "-" !important;
			font-size: 4rem;
			top: -20px;
			color: #d40511;
		}
		section.promotion-privacy .container .body .panel-group .panel-heading {
			position: relative;
			padding: 10px 35px 10px 50px;
			border-bottom: 1px solid #f1f1f1;
		}
		section.promotion-privacy .container .body .panel-group .panel-heading:first-child {
			border-top: 1px solid #f1f1f1;
		}
		@media (max-width: 767px) {
			section.promotion-privacy .container .body .panel-group .panel-heading {
				padding: 3% 5%;
			}
		}
		section.promotion-privacy .container .body .panel-group .panel-heading .pull-right {
			position: absolute;
			right: 3%;
			top: 15%;
		}
		section.promotion-privacy .container .body .panel-group .panel-heading .pull-right:after {
			content: '+';
			position: relative;
			font-size: 2.5rem;
			top: -5px;
			color: #d40511;
		}
		section.promotion-privacy .container .body .panel-group .panel-body {
			background-color: #fafafa;
			padding: 10px 35px 10px 50px;
		}
		@media (max-width: 767px) {
			section.promotion-privacy .container .body .panel-group .panel-body {
				padding: 3% 5%;
			}
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

		  ga('create', 'UA-99241614-2', 'auto');
		  ga('send', 'pageview');

		</script>
		<!-- Facebook Pixel Code -->
		<script>
		!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
		n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
		n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
		t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
		document,'script','https://connect.facebook.net/en_US/fbevents.js');
		fbq('init', '1035885463132719'); // Insert your pixel ID here.
		fbq('track', '<DHL_FB_PROMO>');
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
			<img src="../assets/images/FB/nav-desktop-1.jpg" alt="" class="img-responsive hidden-xs">
			<img src="../assets/images/FB/nav-mobile-1.jpg" alt="" class="img-responsive visible-xs">
			<div class="caption container">
				<div class="serises-name">페이스북 프로모션</div>
				<div class="title hidden-xs">신규 고객님을 위한 특별 혜택</div>
				<div class="title visible-xs">신규 고객님을 위한 <br/> 특별 혜택</div>
				<div class="subtitle">정기적인 물품 배송, 수입 진행이 있으신가요? <br/> 지금 DHL 고객번호를 개설하시면 최대 50% 할인 제공과 더불어 <br/>푸짐한 선물을 증정합니다</div>
			</div>
		</header>
		<section id="promotion-new-consumer" class="promotion-new-consumer">
			<div class="container">
				<div class="title">신규 고객님을 위한 특별 혜택</div>
				<div class="body row">
					<div class="col-sm-12">
						<img src="../assets/images/FB/promotion-desktop-1.png" class="img-responsive hidden-xs" alt="">
						<img src="../assets/images/FB/promotion-mobile-1.png" class="img-responsive visible-xs" alt="">
					</div>
					<div class="col-sm-12">
						<img src="../assets/images/FB/promotion-desktop-2-2.png" class="img-responsive hidden-xs" alt="">
						<img src="../assets/images/FB/promotion-mobile-2-2.png" class="img-responsive visible-xs" alt="">
					</div>
					<div class="col-sm-12">
						<img src="../assets/images/FB/promotion-desktop-3-1.jpg" class="img-responsive hidden-xs" alt="">
						<img src="../assets/images/FB/promotion-mobile-3-1.jpg" class="img-responsive visible-xs" alt="">
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
								<span class="condtion-content">2019년 5월 1일~6월 30일 까지</span>
							</li>
							<li>
								<span class="condtion-title">참여 대상:</span>
								<span class="condtion-content">본 페이지에서 고객번호 발급을 신청한 고객 대상</span>
							</li>
							<li>
								<span class="condtion-title">선정 기준:</span>
								<span class="condtion-content">
									<2. 가입신청 이벤트>는 이벤트 기간 내 본 페이지에서 고객번호 발급을 신청한 고객 중 4명을 추첨하며, <br/> 
									당첨자는 이벤트 종료 후 개별 연락합니다. (2019년 7월 중) <br/> 
									<3. 첫 발송 이벤트>는 고객번호 발급 후 익월까지 월 단위 10만원 이상 청구가 완료된 고객 전원에게 경품을 지급합니다. (월별합산 불가)
								</span>
							</li>
							<li>
								<span class="condtion-title">경품 안내:</span>
								<span class="condtion-content">
									<2. 가입신청 이벤트>의 경품은 1등 뉴 아이패드 32GB, 2등 애플 에어팟2세대 입니다. 제세공과금은 당첨자가 부담합니다.<br/>
									<3. 첫발송 이벤트>의 경품은 스타벅스 텀블러(랜덤 발송)와 DHL 에코백입니다. 경품은 이벤트 기간 중 1회만 증정합니다.
								</span>
							</li>
						</ul>
					</div>
					<div class="col-xs-12 description">
						<span>※</span><span>본 이벤트는 2019년 6월 30일까지 신청 가능하며, 해당기간 동안 고객번호 발급 신청을 완료한 고객에게는 2019년 12월 31일까지 할인혜택이 적용됩니다.</span>
					</div>
				</div>
			</div>
		</section>
		<section class="promotion-form">
			<div class="container">
				<div id="form-promotion" class="promotion-form-body">
					<script type="text/javascript">(function(n){var r="_ion_ionizer",t=n.getElementsByTagName("script"),i;t=t[t.length-1];t.id=r+ +new Date+Math.floor(Math.random()*10);t.setAttribute("data-ion-embed",'{"url":"//shipping.dhl.co.kr/FBA/Korean?_ion_target=embed-1.0","target":"'+t.id+'","appendQuery":false}');n.getElementById(r)||(i=n.createElement("script"),i.id=r,i.src=(n.location.protocol==="https:"?"//8f2a3f802cdf2859af9e-51128641de34f0801c2bd5e1e5f0dc25.ssl.cf1.rackcdn.com":"//1f1835935797600af226-51128641de34f0801c2bd5e1e5f0dc25.r5.cf1.rackcdn.com")+"/ionizer-1.0.min.js",t.parentNode.insertBefore(i,t.nextSibling))})(document);</script>
				</div>
			</div>
		</section>
		<section class="promotion-privacy">
			<div class="container">
				<div class="title">DHL코리아 개인정보 처리/취급방침</div>
				<div class="body">
					<div class="body-content">
						<p>
							주식회사 디에이치엘 코리아(www.dhl.co.kr, 이하 ”회사” 또는 ”디에이치엘 
							코리아”)는 『개인정보 보호법』(이하 “개인정보보호법”),『정보통신망 
							이용촉진 및 정보보호 등에 관한 법률』(이하 “정보통신망법”) 및 
							『신용정보의 이용 및 보호에 관한 법률』 등 정보통신서비스제공자가 
							준수하여야 할 관련 법령상의 개인정보보호 규정을 준수합니다. <br/><br/>
							디에이치엘 코리아는 이를 위하여 개인정보보호법 제30조 및 정보통신망법 
							제27조의2에 따라 정보주체의 개인정보 보호 및 권익을 보호하고 개인정보와 
							관련한 정보주체의 고충을 원활하게 처리할 수 있도록 다음과 같은 개인정보 
							처리/취급방침(이하 “본 방침”)을 두고 있습니다. <br/><br/>
							디에이치엘 코리아는 본 방침이 개정되는 경우 개정 사항을 회사 홈페이지를 
							통하여 공지할 것입니다.
						</p>
					</div>
					<div>
						<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
							<div class="panel-default">
								<a role="button" 
									data-toggle="collapse" data-parent="#accordion" 
									href="#collapseOne" aria-expanded="false" 
									aria-controls="collapseOne"
									class="btn-fx-track"
									data-fx-category="개인정보 처리 목적 클릭">
									<div class="panel-heading" role="tab" id="heading-one">
										1. 개인정보 처리 목적
										<div class="pull-right"></div>
									</div>
								</a>
							</div>
							<div id="collapseOne" class="panel-collapse collapse" 
									role="tabpanel" aria-labelledby="heading-one">
								<div class="panel-body">
									<p><b>제1조 (개인정보의 처리 목적)</b></p>
									<p>
										회사는 개인정보를 다음의 목적을 위해 처리합니다. <br>
										처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 사용되지 
										않으며 이용 목적이 변경될 때에는 개인정보보호법 제18조 및 정보통신망법 
										제24조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
									</p>
									<p>
										<b>1. 서비스 제공</b><br>
										: 본인 확인,콘텐츠 제공, 발송물 예약, 물품배송, 계약서/청구서 발송, 
										맞춤 서비스 제공, 요금결제/정산, 물품배송에 관한 문의 및 요청에 대한 응답, 
										소식 및 자료의 제공 등의 목적으로 개인정보를 처리합니다.
									</p>
									<p>
										<b>2. 고충처리</b><br>
										: 민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락/통지, 
										처리결과 통보 등의 목적으로 개인정보를 처리합니다.
									</p>
									<p>
										<b>3. 이벤트 참여확인 및 경품제공 </b><br>
										: 전화, SMS, 이메일, DM 발송을 통한 당사 상품서비스에 대한 제반 마케팅활동, 
										판촉행사 및 이벤트 등의 목적으로 개인정보를 처리합니다.
									</p>
								</div>
							</div>
							<div class="panel-default">
								<a class="collapsed btn-fx-track" role="button"
									data-toggle="collapse" data-parent="#accordion" 
									href="#collapseTwo" aria-expanded="false" 
									aria-controls="collapseTwo"
									data-fx-category="처리하는 개인정보의 항목 클릭">
									<div class="panel-heading" role="tab" id="heading-two">
										2. 처리하는 개인정보의 항목
										<div class="pull-right"></div>
									</div>
								</a>
							</div>
							<div id="collapseTwo" class="panel-collapse collapse" 
									role="tabpanel" aria-labelledby="heading-two">
								<div class="panel-body">
									<p>
										회사는 다음과 같이 각종 서비스 제공을 위해 필요한 최소한의 
										개인정보를 수집하고 있습니다.
									</p>
									<p>
										<b>1. 개인정보 파일명 : 운송 서비스 문의 관련 일반정보</b>
										<ul>
											<li>개인정보 항목(필수) : 이름, 이메일</li>
											<li>개인정보 항목(선택) : 전화번호, 회사명, 부서명</li>
											<li>수집방법 : 홈페이지 및 유선/이메일을 통하여 제공 받음</li>
										</ul>
									</p>
									<p>
										<b>2. 개인정보 파일명 : 운송 서비스 제공 관련 일반정보</b><br>
										<ul>
											<li>
												개인정보 항목(필수) : 발송인·수취인의 이름, 국가, 
												회사명, 이메일, 주소, 전화번호
											</li>
											<li>개인정보 항목(선택) : 직함, 부서명</li>
											<li>
												수집방법 : DHL 발송 프로그램 / 유선/ 이메일/ 
												문서 등을 통하여 제공 받음
											</li>
										</ul>
									</p>
									<p>
										<b>3. 개인정보 파일명 : 긴급여권 배송 서비스 관련 일반정보</b><br>
										<ul>
											<li>개인정보 항목(필수) : 신청자, 민원인, 생년월일, 전화번호, 이메일, 국가</li>
											<li>개인정보 항목(선택) : 카드결제 선택시 신용카드번호</li>
											<li>수집방법 : 홈페이지를 통하여 제공 받음</li>
										</ul>
									</p>
									<p>
										<b>4. 개인정보 파일명 : 협력사 관련 일반정보</b><br>
										<ul>
											<li>개인정보 항목(필수) : 이름, 상호, 사업자번호, 계좌번호, 주소</li>
											<li>개인정보 항목(선택) : 담당자 이름, 전화번호, 이메일, 팩스</li>
											<li>수집방법 : 이메일 /문서를 통하여 제공 받음</li>
										</ul>
									</p>
									<p>
										<b>5. 개인정보 파일명 : 채용지원자 관련 일반정보</b><br>
										<ul>
											<li>
												개인정보 항목(필수) : 이름, 주소, 전화번호, 휴대전화번호, 
												이메일, 학력, 병역정보, 장애여부, 기타 지원자가 자기소개서에 
												기재한 정보
											</li>
											<li>
												개인정보 항목(선택) : 가족사항, 자격증 소지여부, 경력사항, 
												어학증명서
											</li>
											<li>
													수집방법 : 홈페이지 및 이메일을 통하여 제공 받음
											</li>
										</ul>
									</p>
									<p>
										<b>6. 개인정보 파일명 : 직원 관련 일반정보</b><br>
										<ul>
											<li>
												개인정보 항목(필수) : 이름, 주민등록번호, 주소, 전화번호, 
												휴대전화번호, 이메일, 학력, 병역정보, 건강이력체크사항, 
												운전면허소지여부, 영어능력, 본적, 종교, 연봉정보, 
												인사고과정보 등
											</li>
											<li>
												수집방법 : 문서를 통하여 제공받거나 근무 과정에서 자동적으로 
												수집됨
											</li>
										</ul>
									</p>
									<p>
										<b>7. 개인정보 파일명 : 캠페인 및 이벤트 랜딩 페이지 관련 일반정보</b><br>
										<ul>
											<li>개인정보 항목(필수) : 이름, 이메일 주소, 회사 주소, 핸드폰 번호</li>
											<li>수집방법 : 캠페인 전용 페이지를 통하여 제공 받음</li>
										</ul>
									</p>
									<p>
										<b>8. 개인정보 파일명 : 수취인이 DHL을 방문하여 화물 수령시 신분 확인을 위한 일반정보</b><br>
										<ul>
											<li>개인정보 항목(필수) : 실 수취인 신분증 (주민등록증,여권,운전면허증)</li>
											<li>수집방법 : 신분증 직접 수령, 신분증복사</li>
										</ul>
									</p>
									<p>
										<b>9. 개인정보 파일명 : 기타자동생성정보</b><br>
										<ul>
											<li>개인정보 항목 : 접속 IP 정보, 쿠키, 서비스 이용 기록, 접속 로그</li>
											<li>수집방법 : 생성정보 수집 툴을 통한 수집</li>
										</ul>
									</p>
									<p>
										<b>10. 개인정보 파일명 : 수입통관</b><br>
										<ul>
											<li>
												개인정보 항목(필수) : 내국인- 수취인의 이름, 통관고유부호(주민번호), 
												주소, 전화번호 / 외국인- 수취인의 이름, 국적, 여권번호, 주소, 전화번호
											</li>
											<li>
												개인정보 항목(선택) : Email, 전화번호
											</li>
											<li>
												수집방법 : Email
											</li>
										</ul>
									</p>
								</div>
							</div>
							<div class="panel-default">
								<a class="collapsed btn-fx-track" role="button"
									data-toggle="collapse" data-parent="#accordion" 
									href="#collapseThree" aria-expanded="false" 
									aria-controls="collapseThree"
									data-fx-category="개인정보 처리 및 보유기간 클릭">
									<div class="panel-heading" role="tab" id="heading-three">
										3. 개인정보의 처리 및 보유기간
										<div class="pull-right"></div>
									</div>
								</a>
							</div>
							<div id="collapseThree" class="panel-collapse collapse" 
										role="tabpanel" aria-labelledby="heading-three">
								<div class="panel-body">
									<p>
										회사는 서비스 제공과 관련된 개인정보를 법령에 따른 개인정보 
										보유기간, 정보주체로부터 개인정보 수집시에 동의받은 개인정보 
										보유기간 동안 또는 수집/이용에 대한 동의일로부터 개인정보의 
										처리목적 달성시까지 보유/이용합니다.<br>
										단, 보유기간이 경과한 후에는 분쟁 해결, 
										민원처리 및 법령상 의무이행의 목적을 위하여만 보유/이용합니다. 
									</p>
									<p>
										각각의 개인정보는 원칙적으로 서비스 공급완료 및 요금 결제, 
										정산 완료시까지 처리 및 보유됩니다. 다만, 다음의 사유에 해당하는 
										경우 회사는 각각의 개인정보를 해당 사유가 종료될 때까지 처리, 
										보유합니다.
									</p>
									<p>
										1. 관계 법령 위반에 따른 수사/조사 등이 진행중인 경우에는 
										해당 수사/조사 종료시까지
									</p>
									<p>
										2. 「전자상거래 등에서의 소비자 보호에 관한 법률」시행령 제6조에 
										따른 표시,광고, 계약내용 및 이행 등 거래에 관한 기록<br>
										표시/광고에 관한 기록 : 6개월<br>
										계약 또는 청약철회, 대금결제, 재화 등의 공급기록 : 5년<br>
										소비자 불만 또는 분쟁처리에 관한 기록 : 3년 
										(단, 클레임 자료는 5년간 보관)
									</p>
									<p>
										3. 「통신비밀보호법」시행령 제41조에 따른 통신사실확인자료 보관<br>
										가입자 전기통신일시, 개시/종료시간, 상대방 가입자번호, 사용도수, 
										발신기지국 위치추적자료 : 1년<br>
										컴퓨터통신, 인터넷 로그기록자료, 접속지 추적자료 : 3개월
									</p>
									<p>
										4. 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」시행령 제29조에 
										따른 본인확인정보는 게시판에 정보 게시가 종료된 후 6개월간 보관
									</p>
									<p>
										5. 「국세기본법」제85조의3 제2항,「법인세법」제116조 제1항, 
										「부가가치세법」 제31조 등에 따른 거래에 관한 증명서류 등은 
										신고기한이 지난 날부터 5년
									</p>
									<p>
										6. 지불조건 변경 요청서 및 수취인 운임 확약서는 기획재정부 인계 후 1년 6개월
									</p>
								</div>
							</div>
							<div class="panel-default">
								<a class="collapsed btn-fx-track" role="button"
										data-toggle="collapse" data-parent="#accordion" 
										href="#collapseFour" aria-expanded="false" 
										aria-controls="collapseFour"
										data-fx-category="개인정보의 제 3자 제공 클릭">
									<div class="panel-heading" role="tab" id="heading-four">
										4. 개인정보의 제 3자 제공
										<div class="pull-right"></div>
									</div>
								</a>
							</div>
							<div id="collapseFour" class="panel-collapse collapse" 
										role="tabpanel" aria-labelledby="heading-four">
								<div class="panel-body">
									<p>
										회사는 원칙적으로 정보주체의 개인정보를 본 방침 제1조에서 명시한 
										범위 내에서 처리하며, 정보주체의 사전 동의, 법률의 특별한 규정 등 
										개인정보보호법 제17조 및 제18조 또는 정보통신망법 제24조 및 제24조의 
										2에 해당하는 경우를 제외하고는 본래의 범위를 초과하여 처리하거나 
										제3자에게 제공하지 않습니다.
									</p>
								</div>
							</div>
							<div class="panel-default">
								<a class="collapsed btn-fx-track" role="button"
										data-toggle="collapse" data-parent="#accordion" 
										href="#collapseFive" aria-expanded="false" 
										aria-controls="collapseFive"
										data-fx-category="개인정보처리위탁 클릭">
									<div class="panel-heading" role="tab" id="heading-five">
											5. 개인정보처리위탁
											<div class="pull-right"></div>
									</div>
								</a>
							</div>
							<div id="collapseFive" class="panel-collapse collapse" 
										role="tabpanel" aria-labelledby="heading-five">
								<div class="panel-body">
									<p>
										회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 
										처리업무를 위탁하고 있습니다.
									</p>
									<p>
										1. 업체리스트
										<table class="table table-bordered table-responsive small">
											<thead>
												<tr>
													<th>업체명</th>
													<th>위탁 업무 내용</th>
													<th>기간</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>Deutsche Post DHL 그룹 해외 전산센터</td>
													<td>정보의 관리 및 보관 등</td>
													<td rowspan="3">개인정보가 제공된 날부터 동의 철회일 또는 제공된 목적 달성 시 까지</td>
												</tr>
												<tr>
													<td>운서관세사</td>
													<td>통관업무</td>
												</tr>
												<tr>
													<td>DHL Asia Pacific Finance Shared Services Center</td>
													<td>협력사의 등록, 관리 및 보존</td>
												</tr>
											</tbody>
										</table>
									</p>
									<p>
										2. 회사는 위탁계약 체결시 개인정보보호법 제26조 또는 정보통신망법 
										25조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적,
										관리적 보호조치, 수탁자에 대한 관리,감독, 손해배상 등 책임에 
										관한 사항 및 재위탁에 대한 사항을 계약서 등 문서에 명시하고, 
										수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
									</p>
									<p>
										3. 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체 없이 본 
										방침을 통하여 공개하도록 하겠습니다.
									</p>
								</div>
							</div>
						</div>
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
							<img src="../assets/images/FB/dhl-korea-blog.png" class="dhl-img" alt="">
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
							<img src="../assets/images/FB/dhl-korea-post.png" class="dhl-img" alt="">
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
							<img src="../assets/images/FB/dhl-korea-facebook.png" class="dhl-img" alt="">
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
							<img src="../assets/images/FB/dhl-korea-newsletter.png" class="dhl-img" alt="">
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
							<img src="../assets/images/FB/dhl-korea-home.png" class="dhl-img" alt="">
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
	</body>
</html>