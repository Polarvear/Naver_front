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
  <link rel="stylesheet" type="text/css" media="all" href="style.css">
  <link rel="stylesheet" type="text/css" media="all" href="responsive.css">

 
<style>

#light{
	text-align: center;
	}	
	
#info{
	font-size: 14px; 
	font-weight: bold; 
	line-height: 1; 
	text-align: center;
}
	
li{ 
list-style:none;
	padding-top:10px;
	padding-bottom:10px;}	

.button, .button:visited {
	background: #222 url(overlay.png) repeat-x; 
	display: inline-block; 
	padding: 5px 10px 6px; 
	color: #fff; 
	text-decoration: none;
	-moz-border-radius: 6px; 
	-webkit-border-radius: 6px;
	-moz-box-shadow: 0 1px 3px rgba(0,0,0,0.6);
	-webkit-box-shadow: 0 1px 3px rgba(0,0,0,0.6);
	text-shadow: 0 -1px 1px rgba(0,0,0,0.25);
	border-bottom: 1px solid rgba(0,0,0,0.25);
	position: relative;
	cursor: pointer
}
 
	.button:hover							{ background-color: #111; color: #fff; }
	.button:active							{ top: 1px; }
	.small.button, .small.button:visited 			{ font-size: 11px}
	.button, .button:visited,
	.medium.button, .medium.button:visited 		{ font-size: 13px; 
												  font-weight: bold; 
												  line-height: 1; 
												  text-shadow: 0 -1px 1px rgba(0,0,0,0.25); 
												  }
												  
	.large.button, .large.button:visited 			{ font-size: 14px; 
													  padding: 8px 14px 9px; }
													  
	.super.button, .super.button:visited 			{ font-size: 34px; 
													  padding: 8px 14px 9px; 
													  }
	
	.pink.button, .magenta.button:visited		{ background-color: #e22092; }
	.pink.button:hover							{ background-color: #c81e82; }
	.green.button, .green.button:visited		{ background-color: #91bd09; }
	.green.button:hover						    { background-color: #749a02; }
	.red.button, .red.button:visited			{ background-color: #e62727; }
	.red.button:hover							{ background-color: #cf2525; }
	.orange.button, .orange.button:visited		{ background-color: #ff5c00; }
	.orange.button:hover						{ background-color: #d45500; }
	.blue.button, .blue.button:visited		    { background-color: #2981e4; }
	.blue.button:hover							{ background-color: #2575cf; }
	.yellow.button, .yellow.button:visited		{ background-color: #ffb515; }
	.yellow.button:hover						{ background-color: #fc9200; }
		</style> 
		<SCRIPT LANGUAGE="JavaScript"> 
			function Frameset(page) { 
			framecode = "<frameset rows='1*'>" 
			+ "<frame name=main src='" + page + "'>" 
			+ "</frameset>"; 

			document.write(framecode); 
			document.close(); 
			} 

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
				if (CheckSpaces(document.hongkiat.cEmailTitle.value)){ 
					alert("제목을 입력하셔야만 등록이 됩니다."); 
					document.hongkiat.cEmailTitle.focus(); 
				}
				else if (!emailcheck(document.hongkiat.cRecvEmailaddr.value)){ 
					alert("답신받을 유효한 이메일 주소를 입력하셔야만 등록이 됩니다."); 
					document.hongkiat.cRecvEmailaddr.focus(); 
				}	
				else if (CheckSpaces(document.hongkiat.cName.value)){ 
					alert("작성자 이름을 입력하셔야만 등록이 됩니다."); 
					document.hongkiat.cName.focus(); 
				}			
				else if (CheckSpaces(document.hongkiat.cTel.value)){ 
					alert("연락처를 입력하셔야만 등록이 됩니다."); 
					document.hongkiat.cTel.focus(); 
				}
				else if (CheckSpaces(document.hongkiat.cEmailBody.value)){ 
					alert("문의 내용을 입력하셔야만 등록이 됩니다."); 
					document.hongkiat.cEmailBody.focus(); 
				}			


				else {
					document.hongkiat.submit(); 
					return true;
				}

				//return false;
			} 

		</script> 
</head>

<body>
	<script language="JavaScript">
	<!--
	function hidestatus()
	{
	window.status=''
	return true
	}
	if (document.layers)
	document.captureEvents(Event.mouseover | Event.mouseout)
	document.onmouseover=hidestatus
	document.onmouseout=hidestatus
	// -->
	</script>
	<section id="container">
		<!-- <span class="chyron"><em><a href="http://blog.naver.com/dhl_korea">&laquo; DHL 공식 블로그</a></em></span> -->
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
		<span><h1>문의하기</h1></span>
		<form name="hongkiat" id="hongkiat-form" method="post" action="b2cSendEmail.php" onSubmit="CheckValues();return false">
			<div id="wrapping" class="clearfix">
				<section id="aligned">
					<input type="text" name="cEmailTitle" id="cEmailTitle" placeholder="제목" autocomplete="off" tabindex="1" class="txtinput">
					<input type="text" name="cRecvEmailaddr" id="cRecvEmailaddr" placeholder="답신받을 이메일 주소" autocomplete="off" tabindex="1" class="txtinput">
					<input type="text" name="cName"	id="cName" placeholder="작성자 이름" tabindex="3" class="txtinput">
					<input type="text" name="cTel" id="cTel" placeholder="연락처" tabindex="3" class="txtinput">
					<textarea name="cEmailBody" id="cEmailBody" tabindex="5" placeholder="문의 내용" class="txtblock"></textarea>
				</section>
			</div>
			<div id="light"> 
				<div id="info">
					<ul>
						<li><button type="submit" class="super button red">보내기</button></li>
					</ul>
					<span style="color:red;">응답가능시간:</span> 평일 오전 8시 30분 부터 오후 5:30 까지 입니다. 응답가능 시간 이후엔 익일날 처리됩니다.
				</div>
			</div>
		</form>
	</section>
</body>
</html>