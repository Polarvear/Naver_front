<?php get_header(); ?>
    
	<?php if (have_posts()) : ?>
    
	<div class="container">

		<?php $post = $posts[0]; ?>
        
			<?php if (is_category()) { ?>
            
            <h2 class="itemtitle"><?php single_cat_title(); ?> <?php _e('Category','themnific');?></h2>
            
            <?php } elseif( is_tag() ) { ?>
            
            <h2 class="itemtitle"><?php _e('Posts Tagged','themnific');?> &#8216;<?php single_tag_title(); ?>&#8217;</h2>
            
            <?php } elseif (is_day()) { ?>
            
            <h2 class="itemtitle"><?php the_time('F jS, Y'); ?></h2>
            
            <?php } elseif (is_month()) { ?>
            
            <h2 class="itemtitle"><?php the_time('F, Y'); ?></h2>
            
            <?php } elseif (is_year()) { ?>
            
            <h2 class="itemtitle"><?php the_time('Y'); ?></h2>
            
            <?php } elseif (is_author()) { ?>
            
            <h2 class="itemtitle"><?php _e('Author Archive','themnific');?></h2>
            
            <?php } elseif (isset($_GET['paged']) && !empty($_GET['paged'])) { ?>
            
            <h2 class="singletitle"><?php _e('Blog Archives','themnific');?></h2>
            
            <?php } ?>
	
    </div>
    
      		<div class="isotope js-isotope" >
          
    			<?php while (have_posts()) : the_post(); ?>
                                              		
            		  	<?php $post_size = get_post_meta($post->ID, 'tmnf_size-shape', true); ?>
                        
                        <?php if(has_post_format('aside'))  {
                            echo get_template_part( '/includes/post-types/aside' );
							}elseif(has_post_format('quote')){
								echo get_template_part( '/includes/post-types/quote' );
								} else { ?>
                        
                       			<div class="all item <?php echo $post_size ?>">
                        
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
                    
   				<?php endwhile; ?>   <!-- end post -->
                    
	</div><!-- end isotope -->
            
    <div class="clearfix"></div>

    <div class="nav-previous"><?php next_posts_link( __( 'Load More Posts', 'themnific') ); ?></div>

					<?php else : ?>
			

                        <h1>Sorry, no posts matched your criteria.</h1>
                        
                        <?php get_search_form(); ?><br/>
                        
					<?php endif; ?>
   

<?php get_footer(); ?>