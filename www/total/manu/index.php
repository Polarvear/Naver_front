<?php 
	$page_num = $_GET['p'];
	if(is_null($page_num))
		$page_num = 1;

	$username = "dhlkorea";
	$password = "dhl2014kr";
	$hostname = "localhost";

	$mydb = mysql_connect($hostname, $username, $password) or die("MySQL에 연결할 수 없습니다.");
	if(!mysql_select_db('dhlkorea', $mydb))	
		die("데이터베이스를 선택할 수 없습니다.");

	mysql_query ("set names utf8");	


	// total rows
	$sql_total_count = "SELECT count(*) AS num_of_participants FROM b2b_Manu_Reg ORDER BY reg_date";
	$result_total_count = mysql_query($sql_total_count, $mydb);

	$ret = mysql_fetch_array($result_total_count);
	$total_rows = $ret['num_of_participants'];
	$num_of_rows_per_page 	= 20;
	$num_of_total_pages = ceil($total_rows / $num_of_rows_per_page);

	$start_offset = $num_of_rows_per_page * ($page_num - 1);

	// 데이터 
	$sql = "SELECT * FROM b2b_Manu_Reg ORDER BY reg_date LIMIT {$start_offset}, {$num_of_rows_per_page}";
	$result = mysql_query($sql, $mydb);


	// 일별 참여 횟수 count
	$sql_count = "SELECT date_format(reg_date,'%Y-%m-%d') AS date, count(*) AS num_of_participants FROM b2b_Manu_Reg GROUP BY date_format(reg_date, '%Y-%m-%d')";
	$result_count = mysql_query($sql_count, $mydb);

	mysql_close($mydb);	
?>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
		<title>DHL Manchester Utd.</title>
	</head>
	<body>
		<div class="container">
			<div class="text-center">
				<strong><h2>DHL Manchester Utd. Trip Event</h2></strong>
			</div>
			<div style="padding-top:20px;padding-bottom:20px;">
				<div class="row">
					<div class="col-md-8">
						<i class="fa fa-clock-o"></i> <?=date('Y.m.d, H:i')?> 현재<br><br>총 <strong><?=$total_rows?></strong> 명의 참여자가 <a href="http://dhlkorea.com" target="_blank">이벤트 페이지</a>를 통해 참여하였습니다.
					</div>
					<div class="col-md-4">
						<div class="text-center"><strong><u>※ 참여자 현황</u></strong></div>
						<table class="table table-striped">
							<thead>
								<tr>
									<th>날짜</th>
									<th class="text-right">참여자 수</th>
								</tr>
							</thead>
							<tbody>
<?php while($row = mysql_fetch_array($result_count)):?>
								<tr>
									<td><small><?=$row['date']?></small></td>
									<td class="text-right"><small><?=$row['num_of_participants']?> 명</small></td>
								</tr>
<?php endwhile?>			
								<tr>
									<td><small><strong>Total</strong></small></td>
									<td class="text-right"><small><strong><?=$total_rows?></strong> 명</small></td>
								</tr>
							</tbody>
							
						</table>
					</div>
				</div>
			</div>
			<div style="padding-top:10px;padding-bottom:10px;margin-bottom:20px;border-bottom:1px solid #e7e7e7;">
				<div class="row">
					<div class="col-md-4">
<?php if($page_num > 1): ?>	
						<div class="btn-group" role="group">
							<a href="http://dhlkorea.com/total/manu/index.php?p=1" class="btn btn-default btn-sm"><<</a>
							<a href="http://dhlkorea.com/total/manu/index.php?p=<?=$page_num - 1?>" class="btn btn-default btn-sm">< Prev</a>
						</div>
<?php endif ?>
					</div>
					<div class="col-md-4 text-center">
						<?=$page_num?> of <?=$num_of_total_pages?>
					</div>
					<div class="col-md-4 text-right"  style="border-radius:0px;">
<?php if($page_num < $num_of_total_pages): ?>					
						<div class="btn-group" role="group">
							<a href="http://dhlkorea.com/total/manu/index.php?p=<?=$page_num + 1?>" class="btn btn-default btn-sm">Next ></a>
							<a href="http://dhlkorea.com/total/manu/index.php?p=<?=$num_of_total_pages?>" class="btn btn-default btn-sm">>></a>
						</div>
<?php endif ?>
					</div>
				</div>
			</div>
			<table class="table table-striped">
			    <thead>
			        <tr>
			          	<th >등록일</th>
			          	<th style="width:320px;">이름</th>
						<th style="width:120px;">DHL 고객번호<br><small>(9자리)</small></th>
						<th style="width:120px;">영업담당자<br>이름</th>
			          	<th>맨유트립을 가고싶은 이유</th>
			        </tr>
			      </thead>
			      <tbody>
<?php while($row = mysql_fetch_array($result)): ?>
			        <tr>
			          	<td>
			          		<small><?=$row['reg_date']?></small>
			          	</td>
			          	<td>
				          	<strong><?=$row['user_name']?></strong> <span class="label label-success"><?=$row['company_name']?></span><br>
				          	<small>
				          		생년월일: <?=$row['DOB']?>
				          	</small><br>
				          	<small><i class="fa fa-mobile"></i> <?=$row['user_cellphone_number']?></small><br>
							<small><i class="fa fa-envelope-o"></i> <?=$row['user_email']?></small>
			          	</td>
			          	<td>
			          		<small><?=$row['dhl_customer_number']?></small>
			          	</td>
			          	<td><small><?=$row['dhl_staff_name']?></small></td>
			          	<td><small><?=$row['manu_tour_reason_text']?></small></td>
			        </tr>
<?php endwhile ?>
			    </tbody>
		    </table>
		    <div style="padding-top:10px;margin-bottom:10px; border-top:1px solid #e7e7e7;">
				<div class="row">
					<div class="col-md-4">
<?php if($page_num > 1): ?>	
						<div class="btn-group" role="group">
							<a href="http://dhlkorea.com/total/manu/index.php?p=1" class="btn btn-default btn-sm"><<</a>
							<a href="http://dhlkorea.com/total/manu/index.php?p=<?=$page_num - 1?>" class="btn btn-default btn-sm">< Prev</a>
						</div>
<?php endif ?>
					</div>
					<div class="col-md-4 text-center">
						<?=$page_num?> of <?=$num_of_total_pages?>
					</div>
					<div class="col-md-4 text-right"  style="border-radius:0px;">
<?php if($page_num < $num_of_total_pages): ?>					
						<div class="btn-group" role="group">
							<a href="http://dhlkorea.com/total/manu/index.php?p=<?=$page_num + 1?>" class="btn btn-default btn-sm">Next ></a>
							<a href="http://dhlkorea.com/total/manu/index.php?p=<?=$num_of_total_pages?>" class="btn btn-default btn-sm">>></a>
						</div>
<?php endif ?>
					</div>
				</div>
			</div>
		    <br>
		    <br>
		    <br>
		    <br>
		    <br>
		</div>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
	</body>
</html>