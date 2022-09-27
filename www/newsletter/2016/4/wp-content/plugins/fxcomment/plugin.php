<?php
/**
 * Plugin Name: FLEXION Wordpress Comment Form
 * Plugin URI:  http://flexion.co.kr
 * Description: 워드프레스에서 댓글 입력을 위해 사용하기 위한 플러그인
 * Author:      inlee (inlee@flexion.co.kr)
 * Author URI:  http://flexion.co.kr
 * Version:     1.0
 * License: 		MIT
 * @see https://codex.wordpress.org/Plugin_API/Action_Reference/comment_form
 * @see https://www.smashingmagazine.com/2012/05/adding-custom-fields-in-wordpress-comment-form/
 * @see http://www.thewordcracker.com/intermediate/how-to-change-comment-form-in-wordpress/
 */
 	wp_enqueue_style( 'fxcomment', site_url() . '/wp-content/plugins/fxcomment/style.css' );


	add_action('wp_enqueue_scripts','passwordCheckScript');
	function passwordCheckScript() {
		//wp_enqueue_script('fxcomment_ajax_plugin', site_url() . '/wp-content/plugins/fxcomment/pw-modify.js', array('jquery'));
		wp_enqueue_script('fxcomment_ajax_plugin', plugin_dir_url(__FILE__) . 'pw-modify.js', array('jquery'));
		wp_localize_script('fxcomment_ajax_plugin', 'ajax', array('ajaxurl' => admin_url('admin-ajax.php')));
	    // wp_localize_script('fxcomment', 'ajax', array('ajaxurl'=> site_url() . '/wp-admin/admin-ajax.php'));
	}

	// wp_enqueue_script( 'fxcomment', site_url() . '/wp-content/plugins/fxcomment/pw-modify.js' );

	// wp_localize_script('fxcomment', 'ajax', site_url() . '/wp-content/plugins/fxcomment/db.php');
	//wp_localize_script('fxcomment', 'ajax', array( 'ajaxurl' => admin_url( 'admin-ajax.php')));


	add_action('wp_ajax_passwordCheck', 'ajax_passwordCheck');
	add_action('wp_ajax_nopriv_passwordCheck', 'ajax_passwordCheck');

	function ajax_passwordCheck(){

		//echo json_encode(array('asdf'=>'qewr'));

		$comment_id = $_GET['comment_ID'];
        $password = $_GET['password'];

		// echo json_encode($password);

        $content = get_comments();

		foreach($content as $con){
			$meta_value = get_comment_meta($con->comment_ID,'password', true);
			if($con->comment_ID == $comment_id  &&  wp_check_password($password, $meta_value, $con->comment_ID)) {
				echo json_encode(array('result'=>true));
			}
		}
        wp_die();
		// die();
	}


	/*
		POST: 댓글 수정 form submit이 된 경우
	*/
	if($_SERVER['REQUEST_METHOD'] == 'POST') {

	  	$comment_author_url	= 'http://'.$_POST['comment_author_url'];
		$comment			= $_POST['comment'];
		$comment_id			= $_POST['comment_ID'];

		$update = $wpdb->update('wp_comments', array('comment_author_url'=>$comment_author_url, 'comment_content'=>$comment), array('comment_ID'=>$comment_id));

		// echo '<script>alert("정상적으로 수정되었습니다")</script>';
		//header('Location: ' . site_url($_SERVER['REQUEST_URI']));
		header('Location: http://www.dhlkorea.com/newsletter/2016/4/event');

	}


	/*
		Comment List를 출력
	 */
	if(!function_exists('fx_comment_list')) {
	function fx_comment_list() {

		if($_SERVER['REQUEST_METHOD'] == 'POST') {
			$pw			= $_POST['password'];
			$comment_id = $_POST['comment_ID'];
		}

		$content = get_comments();

		foreach($content as $con){
			$meta_value = get_comment_meta($con->comment_ID,'password', true);

?>

			<ol class="com_list_ol">
				<li class="com_list_li" style="border-bottom: 1px solid #e3e3e3;margin: 0 0 25px 0;padding: 0 0 0 80px;position: relative;">
					<div>
						<div style="position: absolute;top: 8px;left: 0;">
							<img src="http://1.gravatar.com/avatar/?s=54&d=mm&r=g" style="height:54px">
						</div>

						<!-- <?php
							if($con->comment_ID == $comment_id  &&  wp_check_password($pw, $meta_value, $con->comment_ID)) {
								echo "맞음";
							} else {
								echo "틀림";
							}
						?> -->

						<div>
							<div class="com_author">
								<?php echo strip_tags($con->comment_author); ?> <span onclick="passwordCK(<?php echo strip_tags($con->comment_ID)?>);" style="cursor:pointer">(편집)</span>
							</div>
							<div class="form-parent">
								<div id="pw-modify-<?php echo strip_tags($con->comment_ID);?>" class="pw-modify" style="display: none;">
									<!-- <form action="<?php echo $_SERVER['REQUEST_URI']; ?>" method="post" id="password-form" name="password-form"> -->
									<form  method="post" id="password-form" name="password-form" class="test">
										<div> 비밀번호 입력 </div>
										<div>
											<input class="password-class" type="password" id="password" name="password" style="width: 200px !important;padding-right:10px;padding-left:10px;">
											<input class="commentID-class" type="hidden" id="comment_ID" name="comment_ID" value="<?php echo strip_tags($con->comment_ID)?>">
											<!-- <input  type='hidden' name='action' value='checkPassword' /> -->
											<!-- <input type="button" id="pwCK" value="확인"> -->
											<input name="submit" type="submit" id="submit" class="submit" value="확인">
										</div>
									</form>
								</div>
								<div style="color:#888"><?php echo strip_tags($con->comment_date); ?></div>
								<div style="color:#888;"><?php echo strip_tags(substr($con->comment_author_url,7)); ?></div>
								<div style="margin-top: 20px;margin-bottom:20px;"> 비밀글입니다.</div>
								<div style="margin-top: 10px;margin-bottom: 20px;display: none;"><?php echo strip_tags($con->comment_content); ?></div>
                                <div class="modify-form-area" style="display:none;">
    								<form class="modify-form" action="." method="POST" name="modify-form">
    									<div>
    										<textarea id="comment" name="comment" cols="45" rows="8" aria-required="true" style="padding-right: 10px;padding-left: 10px;"><?php echo $con->comment_content?></textarea>
    									</div>
    									<div>
    										<input type="hidden"  name="comment_ID" value="<?php echo strip_tags($con->comment_ID) ?>">
    										<input type="hidden"  name="comment_author" value="<?php echo strip_tags($con->comment_author) ?>">
    									<div style="margin-bottom: 5px;">
    										부서명
    									</div>
    										<input type="text" name="comment_author_url" value="<?php echo strip_tags(substr($con->comment_author_url,7))?>" style="padding-right: 10px;padding-left: 10px;" required="required">
    										<input name="submit" type="submit" id="submit" class="submit" value="수정">
    									</div>
    								</form>
    							</div>
							</div>
						</div>
					</div>
				</li>
			</ol>

<?php
		}
	}
}


	/*
		comment 입력 폼 출력 함수
	 */
	if(!function_exists('fx_comment_form_field_comment')) {
		function fx_comment_form_field_comment($comment_field) {
		  $comment_field = '<p class="comment-form-comment"><textarea id="comment" name="comment" cols="45" rows="8" aria-required="true" placeholder="여기에 의견을 입력해주세요."></textarea></p>';
		  return $comment_field;
		}
	}

	if(!function_exists('delete_url_field_fields')) {
		function delete_url_field_fields($fields){
		  $fields['url'] = '';
		  return $fields;
		}
	}


	/*
		comment_author, password, department 입력 input form 출력 함수
	 */
	if(!function_exists('fx_comment_custom_fields')) {
		function fx_comment_custom_fields($fields) {
		  $commenter = wp_get_current_commenter();
		  $req = get_option( 'require_name_email' );
		  $aria_req = ( $req ? " aria-required='true'" : '' );


		  $fields[ 'author' ] = '<p class="comment-form-author">'.
			'<label for="fx-comment-author">' . ( $req ? '<span class="required">*</span>' : '' ) .  __( 'Name' ) . '</label>'.
		    '<input id="fx-comment-author" name="author" type="text" value="'. esc_attr( $commenter['comment_author'] ) .
		    '" size="30" tabindex="1" required="required" /></p>';

		  $fields[ 'url' ] = '<p class="comment-form-url">'.
	   	    '<label for="fx-comment-url">' . ( $req ? '<span class="required">*</span>' : '' ) . 부서명 . '</label>'.
	   	    '<input id="fx-comment-url" name="url" type="text" value="'. esc_attr( substr($commenter['comment_author_url'],7) ) .
	   	    '" size="30"  tabindex="2" required="required" /></p>';

		  $fields[ 'password' ] = '<p class="comment-form-password">'.
			'<label for="fx-comment-password">' . ( $req ? '<span class="required">*</span>' : '' ) . __( 'Password' ) . '</label>'.
			 '<input id="fx-comment-password" name="password" type="password" value="" size="30"  tabindex="3" required="required" /></p>';

		  return $fields;
		}
	}

	/*
		password를 hash코드로 변환하여 wp_commentmeta 테이블에 저장하는 함수
	 */

	add_action( 'comment_post', 'save_comment_meta_data' );
	function save_comment_meta_data( $comment_id) {
	  if ( ( isset( $_POST['password'] ) ) && ( $_POST['password'] != '') ) {
		  $password = wp_filter_nohtml_kses($_POST['password']);
		  $password = wp_hash_password($password);
		  add_comment_meta( $comment_id, 'password', $password );
		}
	}

	add_filter( 'preprocess_comment', 'verify_comment_meta_data' );
	function verify_comment_meta_data( $commentdata ) {
		if ( ! isset( $_POST['password'] ) )
			wp_die( __( 'Error: You did not add a rating. Hit the Back button on your Web browser and resubmit your comment with a rating.' ) );
		return $commentdata;
	}





	// function count_hook() {
	//     $params = $_POST['params']; //request parameter
	//
	//     for ($param = 0; $param < $params; $param++) {
	//         $result .= ' 눌러봐';
	//     }
	//     echo $result; //결과 출력
	//     die();
	// }
	// add_action('wp_ajax_count_hook', 'count_hook'); //logged in.
	// add_action('wp_ajax_nopriv_count_hook', 'count_hook'); //not logged in.




	add_filter('comment_form_default_fields', 'delete_url_field_fields');
	add_filter('comment_form_default_fields', 'fx_comment_custom_fields');
	add_filter('comment_form_field_comment',  'fx_comment_form_field_comment' );
	add_filter('wp_list_comments_args', 'fx_comment_list');
	add_action('comment_form', 'fx_comment_form');

?>
