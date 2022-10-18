<!DOCTYPE html>
<!--[if IE 6]>
<html id="ie6" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 7]>
<html id="ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html id="ie8" <?php language_attributes(); ?>>
<![endif]-->
<!-- [if !(IE 6) | !(IE 7) | !(IE 8)  ]>
<html <?php language_attributes(); ?>>
<![endif] -->
<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title><?php global $page, $paged; wp_title( '|', true, 'right' ); bloginfo( 'name' ); $site_description = get_bloginfo( 'description', 'display' ); echo " | $site_description"; if ( $paged >= 2 || $page >= 2 ) echo ' | ' . sprintf( __( 'Page %s','themnific'), max( $paged, $page ) ); ?></title>
<!-- Set the viewport width to device width for mobile -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
<?php themnific_head(); ?>

<?php wp_head(); ?>
<!-- google analytics -->
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-85193575-1', 'auto');
  ga('send', 'pageview');

</script>
<!-- naver analytics -->
<script type="text/javascript" src="http://wcs.naver.net/wcslog.js">
</script>

<script type="text/javascript">

  if(!wcs_add) 
    var wcs_add = {};

    wcs_add["wa"] = "1359c3f7b0bba70";

    wcs_do();

</script>

<style>
	.dropbtn {
	    background-color: #F5F5F5;
	    color: #000000;
	    /*padding: 16px;*/
	    font-size: 14px;
	    border: none;
	    cursor: pointer;
		width: 160px;
		height: 32px;
	}
	.dropbtn:hover, .dropbtn:focus {
	    background-color: #F5F5F5;
	}
	@media screen and (max-width: 767px) {
		.dropdown {
		    margin-top: 0px !important;
			margin-bottom: 10px !important;
		}
	}
	.dropdown {
	    float: right;
	    position: relative;
	    display: inline-block;

	}
	.dropdown-content {
	    display: none;
	    position: absolute;
	    background-color: #f9f9f9;
	    min-width: 160px;
	    overflow: auto;
	    /*box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);*/
	    right: 0;
	}
	@media screen and (max-width: 767px) {
		.dropdown-content {
			display: none;
		    position: relative;
		    background-color: #f9f9f9;
		    min-width: 160px;
		    overflow: auto;
		    /*box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);*/
		    /*right: 0;*/
			/*margin-right: 34px;*/
		}
	}
	.dropdown-content a {
	    color: black;
	    padding: 12px 16px;
	    text-decoration: none;
	    display: block;
	}
	.dropdown a:hover {background-color: #f1f1f1}
	.show {display:block;z-index: 10000;}
</style>
</head>


<body <?php if (get_option('themnific_upper') == 'false' ){ body_class( );} else body_class('upper' ) ?>>

<?php
	$type_slider = get_option('themnific_carousel_position');
	if($type_slider == 'pos1'){
		echo '<div class="container container_alt"><div class="head_fix">';
	  	get_template_part('/includes/sliders/carousel' );
	  	echo '</div></div>';
	} else {};
?>



<a id="navtrigger-sec" href="#"><?php _e('MENU','themnific');?></a>

<div id="topnav" class="container container_alt">

        <div class="clearfix"></div>

		<?php get_template_part('/includes/uni-navigation'); ?>

		<!-- <?php get_template_part('/includes/uni-searchformhead'); ?> -->
		<div class="dropdown" style="margin: 15px 0 14px 2px;border: 1px solid #e3e3e3;">
			<button onclick="myFunction()" class="dropbtn" style="background-color:#FFFFFF; width: 200px; height: 26px;font-size:12px;">과월호 보기<span><i class="fa fa-sort-desc" aria-hidden="true" style="margin-right: 30px;float: right;color:#FFCC00;"></i></span></button>
			<div id="myDropdown" class="dropdown-content" style="width: 200px;text-align:center;font-size:12px;background-color:#FFFFFF">
			    <a href="http://www.dhlkorea.com/newsletter/2016/4">2016년 4월호</a>
			    <a href="http://www.dhlkorea.com/newsletter/2016/7">2016년 7월호</a>
				<a href="http://www.dhlkorea.com/newsletter/2016/10">2016년 10월호</a>
				<a href="http://www.dhlkorea.com/newsletter/2017/01">2017년 1월호</a>
				<a href="https://newsletter.dhlkorea.com/category/201704/">2017년 4월호</a>
				<a href="https://newsletter.dhlkorea.com/category/201707/">2017년 7월호</a>
				<a href="https://newsletter.dhlkorea.com/category/201710/">2017년 10월호</a>
				<a href="https://newsletter.dhlkorea.com/category/201801/">2018년 1월호</a>
				<a href="https://newsletter.dhlkorea.com/category/201804/">2018년 4월호</a>
				<a href="https://newsletter.dhlkorea.com/category/201807/">2018년 7월호</a>
				<a href="https://newsletter.dhlkorea.com/category/201810/">2018년 10월호</a>
				<a href="https://newsletter.dhlkorea.com/category/201901/">2019년 1월호</a>
				<a href="https://newsletter.dhlkorea.com/category/201904/">2019년 4월호</a>
				<a href="https://newsletter.dhlkorea.com/category/201907/">2019년 7월호</a>
				<a href="https://newsletter.dhlkorea.com/category/201910/">2019년 10월호</a>
			</div>
		</div>

</div>

<div class="clearfix"></div>

<div id="header">

	<div class="container container_alt">

        <h1 style="margin-top:20px;margin-bottom:20px;">

            <?php if(get_option('themnific_logo')) { ?>

                <a class="logo" href="<?php echo home_url(); ?>/">

                    <img src="<?php echo esc_url(get_option('themnific_logo'));?>" alt="<?php bloginfo('name'); ?>"/>

                </a>

            <?php }

                else { ?> <a href="<?php echo home_url(); ?>/"><?php bloginfo('name');?></a>

            <?php } ?>

        </h1>

		<!-- <div class="dropdown" style="margin-top: 50px;margin-right: 5px;">
			<button onclick="myFunction()" class="dropbtn">과월호보기<span><i class="fa fa-sort-desc" aria-hidden="true" style="margin-right: 20px;float: right;"></i></span></button>
			<div id="myDropdown" class="dropdown-content">
			    <a href="http://192.168.56.101:18000/2016/3">2016년 3월호</a>
			    <a href="http://192.168.56.101:18000/2016/6">2016년 6월호</a>
			</div>
		</div> -->

    	<?php get_template_part('/includes/mag-headad');  ?>

	</div>

    <!-- <a id="navtrigger" href="#"><?php _e('MENU','themnific');?></a> -->

    <nav id="navigation" style="display:none;">

    	<?php get_template_part('/includes/mag-navigation'); ?>

    </nav>

</div>

<div class="clearfix"></div>

<?php
	$type_slider = get_option('themnific_carousel_position');
	if($type_slider == 'pos2'){
		echo '<div class="container container_alt" style="display:none;" ><div class="blog_fix">';
		get_template_part('/includes/sliders/carousel' );
		echo '</div></div>';
	} else {};
?>
