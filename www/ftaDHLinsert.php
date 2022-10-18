<?php
	$cNum = htmlspecialchars($_GET['cNum']);
	$cName = htmlspecialchars($_GET['cName']);
	$cContact = htmlspecialchars($_GET['cContact']);	

	$username = "dhlkorea";
	$password = "dhl2014kr";
	$hostname = "localhost";
	
	$mydb = mysql_connect($hostname, $username, $password) 
					or die("MySQL에 연결할 수 없습니다.");
	if(!mysql_select_db('dhlkorea', $mydb))
			die("데이터베이스를 선택할 수 없습니다.");

	mysql_query ("set names utf8");			
	
	$sql = "INSERT INTO  `dhlkorea`.`fta_DHL_Reg` (`idx` ,`cNum` ,`cName` ,`cContact`)
										VALUES(NULL, '$cNum', '$cName', '$cContact')";
	mysql_query($sql, $mydb);
	mysql_close($mydb);
	echo "<script>location.replace('thank.php');</script>"; 
    exit();	
?>