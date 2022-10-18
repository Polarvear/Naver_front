<?php

class Db{
    private $DbHost = 'localhost';
    private $DbName = 'dhlkorea';
    private $DbUser = 'dhlkorea';
    private $DbPass = 'dhl2014kr';

    public function insert($name,$company,$department,$position,$customer_number,$question,$info_open_closed){
        $result = false;

        try{
            $dbh = new PDO("mysql:host=$this->DbHost;dbname=$this->DbName",$this->DbUser,$this->DbPass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

            $stmt = $dbh->prepare("INSERT INTO participant_info (name, company, department, position, customer_number,question,info_open_closed) VALUES (:name, :company, :department, :position, :customer_number, :question, :info_open_closed)");
            $stmt->bindParam(':name',$name);
            $stmt->bindParam(':company',$company);
            $stmt->bindParam(':department',$department);
            $stmt->bindParam(':position',$position);
            $stmt->bindParam(':customer_number',$customer_number);
            $stmt->bindParam(':question',$question);
            $stmt->bindParam(':info_open_closed',$info_open_closed);

            $stmt->execute();

            $result = true;

        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
        return $result;
    }

}

?>
