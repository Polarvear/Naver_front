<!DOCTYPE html>
<html>
	<head>
		<title>DHL 이벤트</title> 
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="title" content="DHL Newsletter Event" >
		<meta name="description" content="DHL 50% 할인 이벤트" />
		<meta property="og:type" content="website">
		<meta property="og:title" content="DHL 50% 할인 이벤트">
		<meta property="og:description" content="DHL 50% 할인 이벤트!">
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
				z-index: 1;
				height: 6rem;
				width: 100%;
				width: 100%;
				padding-left: 23%;
				padding-right: 23%;
				padding-top: 1rem;
				background: #ffcc00;
				background: -moz-linear-gradient(left, #ffcc00 0%, #ffcc00 65%, #ffeb99 100%);
				background: -webkit-linear-gradient(left, #ffcc00 0%, #ffcc00 65%, #ffeb99 100%);
				background: linear-gradient(to right, #ffcc00 0%, #ffcc00 65%, #ffeb99 100%);
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
				color: white;
				height: auto;
				top: 37%;
				background-image: none;
				padding-left: 30rem;
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
				text-shadow: 2px 2px 6px #000000b0;
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

		.description > ul {
          padding: 0 0 0 23px;
          font-weight:300;
        }
        .description > ul > li::marker {
          color: #d40511;
          font-size:1px;
        }
        .description > ul > li {
          color:#000;
        }
        .ul-notice > li::marker {
          font-size:1px;
        }
        ::marker {
          color: #d40511;
        }
        @media (max-width: 767px) {
          .li-span-mobile {
              text-align:left !important;
              width:21px !important;
          }
        }

		.floating-right {
			position: fixed;
			right: 20px;
			bottom: 20px;
			z-index: 100;
		}

		.floating-right .content-icon {
			text-align: center;
		}
		.floating-right .content-icon .icon-text {
			font-weight: 800;
			color: red;
			margin-top: 5px;
		}
		.message-box-wrap {
			position: fixed;
			display: none;
			bottom: 85px;
			right: 20px;
			z-index: 100;
		}
		.message-box-wrap:hover .msg-close-btn {
			display: inherit;
		}
		.message-box {
			width: 300px;
			height: 100px;
			background: #fff;
			border-radius: 15px;
			margin-bottom: 20px;
			box-shadow: 0 4px 11px 0 hsl(0deg 0% 7% / 20%);
		}
		.message-box:after {
			content: '';
			bottom: -5px;
			position: absolute;
			right: 20px;
			border: 15px solid transparent;
			border-top: 20px solid #fff;
		}
		.message-text {
			padding: 20px;
			word-break: keep-all;
		}
		.msg-close-btn {
			display: none;
			position: absolute;
			top: -10px;
			right: -10px;
			font-size: 0;
			padding: 10px;
			background-image: url(../assets/images/x.png);
			background-color: #3a3a3c;
			background-size: 40%;
			background-repeat: no-repeat;
			background-position: 50%;
			border-radius: 50%;
			border: 2px solid #fff;
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
			<img src="../assets/images/BG/nav-desktop-4.png" alt="" class="img-responsive hidden-xs">
			<img src="../assets/images/BG/nav-mobile-4.png" alt="" class="img-responsive visible-xs">
			<div class="caption container">
				<div class="serises-name">홈페이지 프로모션</div>
				<div class="title hidden-xs">신규 고객님을 위한 50% 특별 할인</div>
				<div class="title visible-xs">신규 고객님을 위한 <br/> 50% 특별 할인</div>
				<div class="subtitle">누구보다 빠르고 정확한 해외배송 서비스가 필요하신가요?<br>지금 DHL 고객번호 개설하고 신규 고객님을 위한 혜택 받아보세요!</div>
			</div>
		</header>
		<section id="promotion-new-consumer" class="promotion-new-consumer">
			<div class="container">
				<div class="title">신규 고객님을 위한 특별 혜택</div>
				<div class="body row">
				<div class="col-sm-12">
						<img src="../assets/images/BG/promotion-desktop-1-4.png" class="img-responsive hidden-xs" alt="">
						<img src="../assets/images/BG/promotion-mobile-1-4.png" class="img-responsive visible-xs" alt="">
					</div>
					<div class="col-sm-12">
						<img src="../assets/images/BG/promotion-desktop-2-10.png" class="img-responsive hidden-xs" alt="">
						<img src="../assets/images/BG/promotion-mobile-2-10.png" class="img-responsive visible-xs" alt="">
					</div>
					<div class="col-sm-12">
						<img src="../assets/images/BG/promotion-desktop-3-4.png" class="img-responsive hidden-xs" alt="">
						<img src="../assets/images/BG/promotion-mobile-3-4.png" class="img-responsive visible-xs" alt="">
					</div>
				</div>
			</div>
		</section>
		<!-- <div class="floating-right">
			<a class="btn-fx-track" 
			data-fx-category="우측 챗봇 KR 클릭" 
			href='https://dhle.dhl.com/clients/mct_chat/login.html?{"gIChannel":"Default","gPrefillValues":{"ICHANNEL_ID":"Default","ATTACHED_DATA":"CUSTOMER","AGENT_VISIBLE_DATA":null,"ENTER_ON_QUEUE_PAGE":false,"CHAT_LAUNCH_MODE":"CHAT_ONLY","REFERRER_URL":"MyDHL+ Banner KR","CustomerName":"","CustomerEmail":"","CustomerQuery":"","LaunchIdentifier":"KR TM LQ Chat KR","LaunchCode":"KR TM LQ Chat KR","CustomerLocale":"ko-KR"}}'
			target = "_blank">
				<div class="content-icon">
				<img src="../assets/images/float-right-4.png" alt="">
				<div class="icon-text">CHAT BOT</div>
				</div>
			</a>
		</div>
		<div class="message-box-wrap">
			<button type="button" class="msg-close-btn"></button>
			<div class="message-box">
				<div class="message-text">
					DHL 고객번호 개설이 필요하신가요? 채팅상담 서비스로 쉽고 빠르게 문의하세요.
				</div>
			</div>
		</div> -->
		<script src=https://vawidget.dhl.com/latest/embed.js id="dhl-va-widget"></script> 
		<script> 
					window.dhlVAWidget.init({ 
									id: "express-cs-ap-2/discover/kr/c0b27d5b-57e7-4238-9cd5-0c3d9f6bd17d", 
									languageCode: "ko", 
									countryCode: "KR" 
					}); 
		</script> 

		<script>
			if(document.cookie.match('closeChatMsg') == null) {
				document.querySelector('.message-box-wrap').style.display = "block";
			}

			document.querySelector('.msg-close-btn').addEventListener('click', function() {
				document.cookie = 'closeChatMsg'; 
				document.querySelector('.message-box-wrap').style.display = "none";
			});
				
		</script>

		<style>
				section.promotion-condition .container .body .col-sm-12 ul {
					display: block;
					list-style: square;
					color: #d40511;
					margin: 15px 4rem;
					-webkit-padding-start: 0;
				}
				section.promotion-condition .container .body .col-sm-12 ul li {
					color:black;
				}
		</style>


		<section class="promotion-condition">
			<div class="container">
				<div class="body row">
					<div class="col-sm-12">
						<ul style="margin-left:0px;">
							<li>
								<span class="condtion-title">이벤트 기간:</span>
								<span class="condtion-content">2022년 9월 1일~10월 31일까지</span>
							</li>
							<li>
								<span class="condtion-title">참여 대상:</span>
								<span class="condtion-content">본 페이지에서 고객번호 발급을 신청한 고객 대상</span>
							</li>
							<li style="padding-bottom:0px;">
								<span class="condtion-title">혜택 및 경품 안내:</span>
								<span class="condtion-content">
									이벤트 기간 내 본 페이지에서 고객번호를 개설한 모든 고객님께 최대 50% 할인율 제공<br>
									본 페이지에서 고객번호 개설 시 DHL 데스크 패드 증정,<br>
									고객번호 개설한 달의 익월까지 10만원 이상 이용 시 크로스비 그린 사이렌 텀블러 355ml 증정
								</span>
							</li>
							<div style="display:inline-table">
								<span class="li-span-mobile" style="display:inline-table;text-align:right;width:136.92px;"></span>
								<!-- <span style="display:inline-table;padding:0 0 0 7px;">*경품은 2개월 단위로 실적을 합산하여 발송<br>&nbsp;예>6월에 개설한 경우 6,7월 실적 확인 후 8월 중순 경품 발송</span> -->
							</div>
							
						</ul>
						
					</div>
					<div class="col-xs-12 description" style="display: block;">
						<span>※</span> 유의사항<br>
						<ul>
							<li>이벤트 기간 동안 고객번호 발급 신청을 완료한 고객에게는 상담을 통해 최대 50%의 할인율이 제공됩니다.</li>
          					<li>프로모션 등록 마감일 이내 본 이벤트 페이지에서 접수한 경우에만 이벤트 참여로 인정됩니다.</li>
          					<li>마케팅 정보 수신 미동의 시 경품 증정 대상에서 제외됩니다.</li>
          					<li>경품은 이벤트 기간 중 1회만 증정하며, 택배로 발송해 드립니다.</li>
          					<li>신규 가입 이벤트 경품은 DHL 데스크 패드 입니다.</li>
          					<li>첫 발송 이벤트 경품은 스타벅스 크로스비 그린 사이렌 텀블러 355ml 입니다.</li>
          					<li>스타벅스 텀블러는 재고 상황에 따라 동가의 경품으로 대체될 수 있습니다.</li>
          					<li>이벤트 기간 동안 고객번호 발급 신청을 완료한 고객에게는 2022년 12월 31까지 할인혜택이 적용됩니다.</li>
						</ul>
					</div>			
				</div>
			</div>
		</section>
		<section class="promotion-form">
			<div class="container" style="width: 100%;">
				<script src="https://ionfiles.scribblecdn.net/scripts/ionizer-1.3.min.js" data-ion-embed-hash="eyJ1cmwiOiIvL3NoaXBwaW5nLmRobC5jby5rci9ESExiYW5uZXI/X2lvbl90YXJnZXQ9ZW1iZWQtMS4wIiwiaWQiOiJfaW9uX2lvbml6ZXJfMTYyMjY4ODMwMjIzNiIsImFwcGVuZFF1ZXJ5IjpmYWxzZX0="></script>
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
				Deutsche Post DHL Group - Mail &amp; Logistics. ⓒ 2018 DHL International GmbH. All rights reserved.
			</div>
			<div class="copyright visible-xs">
				Deutsche Post DHL Group - Mail &amp; Logistics. <br/>ⓒ 2018 DHL International GmbH. All rights reserved.
			</div>
		</footer>
		
		<!-- /container --> 
		<script src="http://code.jquery.com/jquery.js"></script>
		<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script> 
		<script>

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