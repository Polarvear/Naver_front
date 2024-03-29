<?php
$summary = get_post_meta($post->ID, 'tmnf_rating_summary', true);
$rating_1 = get_post_meta($post->ID, 'tmnf_rating_1', true);
$rating_2 = get_post_meta($post->ID, 'tmnf_rating_2', true);
$rating_3 = get_post_meta($post->ID, 'tmnf_rating_3', true);
$rating_4 = get_post_meta($post->ID, 'tmnf_rating_4', true);
$rating_5 = get_post_meta($post->ID, 'tmnf_rating_5', true);
$rating_6 = get_post_meta($post->ID, 'tmnf_rating_6', true);

$rating_1_label = get_post_meta($post->ID, 'tmnf_rating_1_label', true);
$rating_2_label = get_post_meta($post->ID, 'tmnf_rating_2_label', true);
$rating_3_label = get_post_meta($post->ID, 'tmnf_rating_3_label', true);
$rating_4_label = get_post_meta($post->ID, 'tmnf_rating_4_label', true);
$rating_5_label = get_post_meta($post->ID, 'tmnf_rating_5_label', true);
$rating_6_label = get_post_meta($post->ID, 'tmnf_rating_6_label', true);
?>

<div class="ratingblock body3" itemprop="reviews" itemscope itemtype="http://schema.org/AggregateRating">

<div itemprop="reviewRating" itemscope itemtype="http://schema.org/Rating">
  <meta itemprop="worstRating" content = "1">
  <meta itemprop="ratingValue" content = "<?php echo tmnf_rating() ?>">
  <meta itemprop="bestRating" content = "100">
</div>

<h2><?php _e('Total Score ','themnific');?> <span class="score"><?php echo tmnf_rating_plus() ?></span></h2>

<?php 
if ($summary) echo '<p class="first full">' . $summary; echo '</p>';
if ($rating_1) echo '<p class="first">'.$rating_1_label.': '. $rating_1.'&#37;<br/><span class="partialrating"><span class="overrating" style="width:'.$rating_1.'%"></span></span></p>';
if ($rating_2) echo '<p>'.$rating_2_label.': '. $rating_2.'&#37;<br/><span class="partialrating"><span class="overrating" style="width:'.$rating_2.'%"></span></span></p>';
if ($rating_3) echo '<p class="first">'.$rating_3_label.': '. $rating_3.'&#37;<br/><span class="partialrating"><span class="overrating" style="width:'.$rating_3.'%"></span></span></p>';
if ($rating_4) echo '<p>'.$rating_4_label.': '. $rating_4.'&#37;<br/><span class="partialrating"><span class="overrating" style="width:'.$rating_4.'%"></span></span></p>';
if ($rating_5) echo '<p class="first">'.$rating_5_label.': '. $rating_5.'&#37;<br/><span class="partialrating"><span class="overrating" style="width:'.$rating_5.'%"></span></span></p>';
if ($rating_6) echo '<p>'.$rating_6_label.': '. $rating_6.'&#37;<br/><span class="partialrating"><span class="overrating" style="width:'.$rating_6.'%"></span></span></p>';
?>
</div>