<?php

  class Db{
    private $DbHost = 'localhost';
    private $DbName = 'dhlkorea';
    private $DbUser = 'dhlkorea';
    private $DbPass = 'dhl2014kr';

    /**
     * 입력받은 고객정보를 받아 DB에 저장
     * @param  [string] $name 성함
     * @param  [string] $company 회사
     * @param  [string] $phone 연락처
     * @param  [string] $customerNum DHL고객번호
     * @param  [string] $salesManager DHL영업사원
     * @param  [string] $password 비밀번호
     * @param  [string] $comment 댓글내용
     * @return [boolean] insert가 성공하면 ture, 실패하면 false를 반환
     */
     public function insert( $name, $email,$phone,$company,$addr1,$addr2,$marketNM ){
       $result = false;

       try {
         $dbh = new PDO("mysql:host=$this->DbHost;dbname=$this->DbName",$this->DbUser,$this->DbPass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
         $stmt = $dbh->prepare("INSERT INTO dhlevent (idx,name,email,phone,company,addr,marketNM,date) VALUES (null,:name,:email,:phone,:company,:addr,:marketNM,CURRENT_TIMESTAMP)");
		 
		 $addr = $addr1." ".$addr2;
		 
         $stmt->bindParam(':name',$name);
         $stmt->bindParam(':email',$email);
         $stmt->bindParam(':phone',$phone);
         $stmt->bindParam(':company',$company);
         $stmt->bindParam(':addr',$addr);
         $stmt->bindParam(':marketNM',$marketNM);

         $stmt->execute();

         $result = true;

       } catch (Exception $e) {
         echo 'Caught exception: ',  $e->getMessage(), "\n";
       }
       return $result;
     }
	 
     public function newsLetter( $customNum,$customEmail,$link ){
       $result = false;

       try {
         $dbh = new PDO("mysql:host=$this->DbHost;dbname=$this->DbName",$this->DbUser,$this->DbPass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
         $stmt = $dbh->prepare("INSERT INTO newsletter_participants (idx,customNum,customEmail,link, date) VALUES (null,:customNum,:customEmail,:link,CURRENT_TIMESTAMP)");
		 
         $stmt->bindParam(':customNum',$customNum);
         $stmt->bindParam(':customEmail',$customEmail);
         $stmt->bindParam(':link',$link);

         $stmt->execute();

         $result = true;

       } catch (Exception $e) {
         echo 'Caught exception: ',  $e->getMessage(), "\n";
       }
       return $result;
     }
  }

?>
