<?php get_header(); ?>

	<div class="isotope js-isotope" >

                	<?php
						if ( get_query_var('paged') ) {
							$paged = get_query_var('paged');
						} else if ( get_query_var('page') ) {
							$paged = get_query_var('page');
						} else {
							$paged = 1;
						}
						query_posts( array( 'post_type' => 'post', 'paged' => $paged ) );
					?>
					<?php if (have_posts()) : ?>

                    <?php while (have_posts()) : the_post(); ?>
           				<?php $post_size = get_post_meta($post->ID, 'tmnf_size-shape', true); ?>
						<?php $post_tag_info = get_the_tags(); ?>

                        <?php if(has_post_format('aside'))  {
                            echo get_template_part( '/includes/post-types/aside' );
							}elseif(has_post_format('quote')){
								echo get_template_part( '/includes/post-types/quote' );
								} else { ?>

                       			<div class="all item <?php echo $post_size ?>">
									<p class="number" style="display:none;">
										<?=$post_tag_info[0]->name?>
									</p>
									<?php if($post_size == 'Big'){
                                        get_template_part('/includes/post-types/home-big');
                                        }elseif($post_size == 'Vertical'){
                                        get_template_part('/includes/post-types/home-vertical');
                                        }elseif($post_size == 'Horizontal'){
                                        get_template_part('/includes/post-types/home-horizontal');
                                        } else {
                                        get_template_part('/includes/post-types/home-square');
                                    }?>

                        		</div>

                        <?php }?>

					<?php endwhile; ?><!-- end post -->

		</div><!-- end isotope -->

    <div class="clearfix"></div>

    <!-- <div class="nav-previous"><?php next_posts_link( __( 'Load More Posts', 'themnific') ); ?></div> -->
	<div class="nav-previous">
		<img src="http://www.dhlkorea.com/newsletter/2016/7/wp-content/uploads/2016/03/footer_title.png" class="footer-bar-img"  alt="DHL 소셜 모아보기" />
	</div>

    <?php else : ?>

        <h1>Sorry, no posts matched your criteria.</h1>

        <?php get_search_form(); ?><br/>

    <?php endif; ?>

<?php get_footer(); ?>
