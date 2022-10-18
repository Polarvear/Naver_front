<div class="item quote">

	<div class="item_full">

    	<!-- <i class="fa fa-quote-right"></i> -->
		<!-- <img alt="" src="<?php echo get_template_directory_uri(); ?>/images/placeholder2.png"/> -->

		<blockquote>
			<!-- <?php the_content(); ?> -->
		</blockquote>

		<!-- 글형식은 인용으로 했을 때 특성 이미지가 보일수 있도록 소스 수정 -->
		<blockquote>
			<?php if ( has_post_thumbnail()){ ?>
			<?php the_post_thumbnail('Normal',array('class' => ""));?>
			<?php } else {?>
				<img alt="" src="<?php echo get_template_directory_uri(); ?>/images/placeholder2.png"/>
			<?php } ?>
		</blockquote>

        <!-- <p class="quuote_author"> &bull; <?php the_title(); ?> &bull; </p> -->

	</div>

</div>
