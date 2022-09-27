<?php
	$coName = 	htmlspecialchars($_GET['coName']);
	$coType = 	htmlspecialchars($_GET['coType']);
	$cName = 	htmlspecialchars($_GET['cName']);	
	$coBiz = 	htmlspecialchars($_GET['coBiz_info']);	
	htmlspecialchars($_GET['coUse[]']);	
	$coInPro = 	htmlspecialchars($_GET['coInPro']);	
	$coOutPro = 	htmlspecialchars($_GET['coOutPro']);	
	$coInNa = 	htmlspecialchars($_GET['coInNa']);	
	$coOutNa = 	htmlspecialchars($_GET['coOutNa']);	
	$coSize = 	htmlspecialchars($_GET['coSize']);	
	htmlspecialchars($_GET['coUseCo[]']);	
	$coMemo = 	htmlspecialchars($_GET['coMemo']);	
	
	$username = "dhlkorea";
	$password = "dhl2014kr";
	$hostname = "localhost";

	for($i = 0 ; $i < 4; $i++)
	{
		if($coUse[$i] != NULL)
		$co .= $coUse[$i].",";
	}
	
	echo ("<BR>");
	for($i = 0 ; $i < 5; $i++)
	{
		if($coUseCo[$i] != NULL)
		$coCo .= $coUseCo[$i].",";
	}
	
	$mydb = mysql_connect($hostname, $username, $password) 
					or die("MySQL에 연결할 수 없습니다.");
	if(!mysql_select_db('dhlkorea', $mydb))
			die("데이터베이스를 선택할 수 없습니다.");

	mysql_query ("set names utf8");			
	
	$sql = "INSERT INTO    `dhlkorea`.`fta_New_Reg` (`idx` ,`coName` ,`coType` ,`cName` ,`cContact` ,`coBiz` ,`coUse` ,`coInPro` ,`coOutPro` ,`coInNa` ,`coOutNa` ,`coSize` ,`coUseCo` ,`coMemo`)
										VALUES(NULL, '$coName', '$coType', '$cName', '$cContact', '$coBiz', '$co', '$coInPro', '$coOutPro', '$coInNa', '$coOutNa', '$coSize', '$coCo', '$coMemo')";
	mysql_query($sql, $mydb);
	mysql_close($mydb);	
	echo "<script>location.replace('thank.php');</script>"; 
    exit();	
?>