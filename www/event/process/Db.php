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
     public function insert($name,$company,$phone,$customerNum,$salesManager,$password,$privacy_agreement,$comment){
       $result = false;

       try {
         $dbh = new PDO("mysql:host=$this->DbHost;dbname=$this->DbName",$this->DbUser,$this->DbPass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
         $stmt = $dbh->prepare("INSERT INTO event_participants (name,company,phone,customerNum,salesManager,password,privacy_agreement,comment) VALUES (:name,:company,:phone,:customerNum,:salesManager,:password,:privacy_agreement,:comment)");

         $stmt->bindParam(':name',$name);
         $stmt->bindParam(':company',$company);
         $stmt->bindParam(':phone',$phone);
         $stmt->bindParam(':customerNum',$customerNum);
         $stmt->bindParam(':salesManager',$salesManager);
         $stmt->bindParam(':password',$password);
         $stmt->bindParam(':privacy_agreement',$privacy_agreement);
         $stmt->bindParam(':comment',$comment);

         $stmt->execute();

         $result = true;

       } catch (Exception $e) {
         echo 'Caught exception: ',  $e->getMessage(), "\n";
       }
       return $result;
     }


    /**
     * 댓글 수정 시 입력받은 내용을 DB에 수정
     * @param  [string] $name 성함
     * @param  [string] $company 회사
     * @param  [string] $phone 연락처
     * @param  [string] $customerNum DHL고객번호
     * @param  [string] $salesManager DHL영업사원
     * @param  [string] $password 비밀번호
     * @param  [string] $comment 댓글내용
     * @return [boolean] 입력값이 update에 성공하면 true, 실패 false 반환
     */
    public function update($name,$company,$phone,$customerNum,$salesManager,$comment,$id) {
      $result = false;

		  try {
        $dbh = new PDO("mysql:host=$this->DbHost;dbname=$this->DbName",$this->DbUser,$this->DbPass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
			  $stmt = $dbh->prepare("UPDATE event_participants SET name = :name, company = :company, phone = :phone, customerNum = :customerNum, salesManager = :salesManager, comment = :comment WHERE id = :id");

			  $stmt->bindParam(':name',$name);
        $stmt->bindParam(':company',$company);
        $stmt->bindParam(':phone',$phone);
      	$stmt->bindParam(':customerNum',$customerNum);
      	$stmt->bindParam(':salesManager',$salesManager);
      	$stmt->bindParam(':comment',$comment);
			  $stmt->bindParam(':id',$id);

        $stmt->execute();

        $result = true;

      } catch (Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
      }
      return $result;
	  }


    /**
     * 수정 요청이 들어오는 id값에 대한 패스워드값을 가져오기
     * @param  [int] $id 댓글id
     * @return [string] 해당 id값의 패스워드를 반환
     */
    public function select_pw($id){
      $result = "";

      try {
        $dbh = new PDO("mysql:host=$this->DbHost;dbname=$this->DbName",$this->DbUser,$this->DbPass, array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));
        $stmt = $dbh->prepare("SELECT * FROM event_participants WHERE id=:id");
        $stmt->bindParam(':id',$id);
        $stmt->execute();
        $result = $stmt->fetchColumn(7);
      } catch (Exception $e) {
        echo 'Caught exception :', $e->getMessage(), "\n";
      }
      return $result;
    }

  }

?>
