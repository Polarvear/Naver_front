<!DOCTYPE html>
<html>
    <head>
        <title>참여자 정보 입력</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
        <script type="text/javascript" src="dhl_kjd/lib/jquery.validate.min.js"></script>
        <script type="text/javascript" src="dhl_kjd/lib/additional-methods.min.js"></script>
        <script type="text/javascript" src="dhl_kjd/lib/localization/messages_ko.min.js"></script>
	<link rel="Stylesheet" type="text/css" href="dhl_kjd/css/validation.css">
    </head>

    <body>
        <div class="container">
            <div class="text-center">
                <div class='header' aling="center"><img src="dhl_kjd/image/talktime_top.png" ></div>
            </div>
            <div class="row">
                <div class="col-md-3"></div>
                    <div class="col-md-6">
                        <h1><i class="fa fa-user-plus"></i> 정보 입력<small>information</small></h1><br>
                        <form action="dhl_kjd/process/Insert_ok.php" method="POST" name="insert" id="insert">
                            <div class="box box-default">
                            <div class="box-body with-border">
                                <div class="form-group has-feedback">
                                    <label>이름</label>
                                    <input class="form-control" id="name" name="name" placeholder="Name" type="text" required="required" >
                                    <div class="text-danger text-left"></div>
                                </div>
                                <div class="form-group has-feedback">
                                    <label>회사</label>
                                    <input class="form-control" id="company" name="company" placeholder="Company" type="text"  required="required">
                                    <div class="text-danger text-left"></div>
                                </div>
                                <div class="form-group has-feedback">
                                    <label>부서</label>
                                    <input class="form-control" id="department" name="department" placeholder="Department" type="text" required="required">
                                    <div class="text-danger text-left"></div>
                                </div>
                                <div class="form-group has-feedback">
                                    <label>직책</label>
                                    <input class="form-control" id="position" name="position" placeholder="Position" type="text" required="required">
                                    <div class="text-danger text-left"></div>
                                </div>
                                <div class="form-group has-feedback">
                                    <label>DHL 고객번호</label>
                                    <input class="form-control" id="customer_number" name="customer_number" placeholder="DHL Account Number" type="text" required="required">
                                    <div class="text-danger text-left"></div>
                                </div>
                                <div class="form-group has-feedback">
                                    <h2><i class="fa fa-user-plus"></i>질 문 <small>김제동과 나누고싶은 고민을 적어주세요.</small></h2>
                                    <textarea class="form-control"   id="question" name="question" placeholder="Question" rows="5" onkeyup="updateChar(600)" ></textarea>
                                    <div class="text-danger text-left"></div>
                                    <div><span id="textlimit">0</span> /최대 600byte(한글 300자, 영문 600자)</font></div>
                                </div><br>
                                <div class="form-group has-feedback" >
                                    <label>힐링타임 고민 채택 시 이름과 회사명이 공개됩니다. <br> 이에 동의하지 않으시면 동의하지 않음 버튼에 체크해주시기 바랍니다.</label>
                                </div>
                                <div>
                                    <input type="checkbox"  name="iCheck" class="minimal">동의하지 않음
                                    <div class="text-danger text-left"></div>
                                </div><br>
                                <div align="center">
                                    <input type="submit" class="btn btn-default" value="입력" >
                                </div>
                            </div>
                            </div>
                        </form>
                    <div class="col-md-3"></div>
                </div>
            </div>
            <br><br><br><br><br>
            <div class="text-center">
                <div class='footer'><img src="dhl_kjd/image/talktime_bottom.png"></div>
            </div>
        </div>
	<script src="dhl_kjd/script/formValidation.js"></script>
    </body>
</html>
