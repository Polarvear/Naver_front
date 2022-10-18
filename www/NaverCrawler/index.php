<?php
    header('charset=utf-8');
    require('Snoopy.class.php');
    // $snoopy = new Snoopy;
    // $snoopy->fetch("http://blog.naver.com/dhl_korea/220645608351");
    //
    // // $result = $snoopy->results;
    // preg_match('/\<span class="guide">(.*?)<\/span>/is',  $snoopy->results, $result);
    //
    // echo $result[1];
    $snoopy=new snoopy;
    $o="";
    $snoopy->fetch("http://music.naver.com/promotion/specialContent.nhn?articleId=6755/");
    $txt=$snoopy->results;
    // $rex="/\<em class=\"curPrice.+\"\>(.*)\<\/em\>/";
    $rex="/\<div class=\"sp_section.+\"\>(.*)\<\/div\>/";
    preg_match_all($rex,$txt,$o);
    print_r($o[0][2]);

?>
