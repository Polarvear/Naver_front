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
     * @param  [string] $email 뉴스레터 신청이메일 주소
     * @param  [string] $password 비밀번호
     * @param  [string] $comment 댓글내용
     * @return [boolean] insert가 성공하면 ture, 실패하면 false를 반환
     */
     public function insert($name,$company,$phone,$customerNum,$email,$privacy_agreement){
       $result = false;

       try {
         $dbh = new PDO("mysql:host=$this->DbHost;dbname=$this->DbName",$this->DbUser,$this->DbPass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
         $stmt = $dbh->prepare("INSERT INTO  subscribe (name,company,phone,customerNum,email,privacy_agreement) VALUES (:name,:company,:phone,:customerNum,:email,:privacy_agreement)");

         $stmt->bindParam(':name',$name);
         $stmt->bindParam(':company',$company);
         $stmt->bindParam(':phone',$phone);
         $stmt->bindParam(':customerNum',$customerNum);
         $stmt->bindParam(':email',$email);
         $stmt->bindParam(':privacy_agreement',$privacy_agreement);

         $stmt->execute();

         $result = true;

       } catch (Exception $e) {
         echo 'Caught exception: ',  $e->getMessage(), "\n";
       }
       return $result;
     }

  }

?>
