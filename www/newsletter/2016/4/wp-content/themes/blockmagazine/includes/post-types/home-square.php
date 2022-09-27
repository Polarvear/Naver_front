           <?php $post_size = get_post_meta($post->ID, 'tmnf_size-shape', true);?>

            <div class="item_full tranz">

				<?php if ( has_post_thumbnail()){ ?>

                    <a href="<?php tmnf_permalink(); ?>" title="<?php the_title();?>" >

                    	<!-- <?php the_post_thumbnail('Normal',array('class' => "grayscale grayscale-fade"));?> -->
                        <?php the_post_thumbnail('Normal',array('class' => ""));?>

                	</a>

                <?php } else {?>

                    <a href="<?php tmnf_permalink(); ?>" title="<?php the_title();?>" >

						<img alt="" src="<?php echo get_template_directory_uri(); ?>/images/placeholder.png"/>

                    </a>

                <?php } ?>
                <?php $post_tag_info = get_the_tags(); ?>
                <p class="number" style="display:none;">
                    <?=$post_tag_info[0]->name?>
                </p>
                <?php if($post_tag_info[0]->name == 4) :?>
                	<div class="item_inn tranz <?php if ( has_post_thumbnail()){ } else { echo 'permanent';}?>" style="display:none;">

                		<?php echo tmnf_ribbon() ?>

                        <!-- <h2><?php tmnf_meta_date();?> <a href="<?php tmnf_permalink(); ?>"><?php echo short_title('...', 14); ?></a></h2> -->
                        <h2><a href="<?php tmnf_permalink(); ?>"><?php echo short_title('...', 14); ?></a></h2>
                        <!-- <p class="teaser" style="font-size: 11px !important;line-height: 1.5em;padding-bottom: 10px;"><?php echo themnific_excerpt( get_the_excerpt(), '70'); ?>...</p> -->
                    </div>
                <?php else :?>
                    <div class="item_inn tranz <?php if ( has_post_thumbnail()){ } else { echo 'permanent';}?>">

                		<?php echo tmnf_ribbon() ?>

                        <!-- <h2><?php tmnf_meta_date();?> <a href="<?php tmnf_permalink(); ?>"><?php echo short_title('...', 14); ?></a></h2> -->
                        <h2><a href="<?php tmnf_permalink(); ?>"><?php echo short_title('...', 14); ?></a></h2>
                        <!-- <p class="teaser" style="font-size: 11px !important;line-height: 1.5em;padding-bottom: 10px;"><?php echo themnific_excerpt( get_the_excerpt(), '70'); ?>...</p> -->
                    </div>
                <?php endif?>

            </div>
