<?php
	$coName = 	htmlspecialchars($_GET['coName']);
	$coUrl = 	htmlspecialchars($_GET['coUrl']);
	$cName = 	htmlspecialchars($_GET['cName']);	
	$cPosition = 	htmlspecialchars($_GET['cPosition']);	
	$coType = 	htmlspecialchars($_GET['coType']);
	$cContact = 	htmlspecialchars($_GET['cContact']);
	
	htmlspecialchars($_GET['coUse[]']);	
	$coBiz = 	htmlspecialchars($_GET['coBiz_info']);		
	$coInPro = 	htmlspecialchars($_GET['coInPro']);	
	$coOutPro = 	htmlspecialchars($_GET['coOutPro']);	
	$coInNa = 	htmlspecialchars($_GET['coInNa']);	
	$coOutNa = 	htmlspecialchars($_GET['coOutNa']);	
	$coInSize = 	htmlspecialchars($_GET['coInSize']);	
	$coOutSize = 	htmlspecialchars($_GET['coOutSize']);	
	htmlspecialchars($_GET['coUseCo[]']);	
	$coGate = 	htmlspecialchars($_GET['coBiz_gate']);	
	$coMemo = 	htmlspecialchars($_GET['coMemo']);	
	$coB2c = 	htmlspecialchars($_GET['coB2c']);	
	$coDhl = 	htmlspecialchars($_GET['coDhl']);	
	
	
	
	$username = "dhlkorea";
	$password = "dhl2014kr";
	$hostname = "localhost";

	for($i = 0 ; $i < 4; $i++)
	{
		if($coUse[$i] != NULL)
		$co .= $coUse[$i].",";
	}
	
	echo ("<BR>");
	for($i = 0 ; $i < 6; $i++)
	{
		if($coUseCo[$i] != NULL)
		$coCo .= $coUseCo[$i].",";
	}
	
	$mydb = mysql_connect($hostname, $username, $password) 
					or die("MySQL에 연결할 수 없습니다.");
	if(!mysql_select_db('dhlkorea', $mydb))
			die("데이터베이스를 선택할 수 없습니다.");

	mysql_query ("set names utf8");			
	
	$sql = "INSERT INTO  `dhlkorea`.`b2c_New_Reg` (
												`idx` ,
												`coName` ,
												`coUrl` ,
												`cName` ,
												`cPosition` ,
												`coType` ,
												`cContact` ,
												`coUse` ,
												`coBiz` ,
												`coInPro` ,
												`coOutPro` ,
												`coInNa` ,
												`coOutNa` ,
												`coInSize` ,
												`coOutSize` ,
												`coUseCo` ,
												`coGate` ,
												`coMemo` ,
												`coB2c` ,
												`coDhl`
												)
										VALUES(NULL, 
												'$coName', 
												'$coUrl', 
												'$cName', 
												'$cPosition',
												'$coType', 
												'$cContact', 
												'$co',
												'$coBiz',
												'$coInPro',
												'$coOutPro',
												'$coInNa', 
												'$coOutNa', 
												'$coInSize', 
												'$coOutSize', 
												'$coCo',
												'$coGate',
												'$coMemo',
												'$coB2c',
												'$coDhl')";
	mysql_query($sql, $mydb);
	mysql_close($mydb);	
	echo "<script>location.replace('thank.php');</script>"; 
    exit();	
?>