<?php
/*
Template Name: 404
*/
?>
<?php get_header(); ?> 
    
    <div id="core" class="container"> 
    
    	<div id="content" class="eightcol">

            <h1 class="post entry-title" itemprop="headline"><?php _e('Nothing found here','themnific');?></h1>
            
           	<h4><?php _e('Perhaps You will find something interesting from these lists...','themnific');?></h4>
            
            <div class="hrlineB"></div>
            <div class="errorentry entry">
			<?php get_template_part('/includes/uni-404-content');?>
            </div>
        </div><!-- #homecontent -->

            <div id="sidebar"  class="fourcol">
                   <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("Sidebar") ) : ?>
                   <?php endif; ?>
            </div><!-- #sidebar -->
        
        </div>
        

</div>
<?php get_footer(); ?>
