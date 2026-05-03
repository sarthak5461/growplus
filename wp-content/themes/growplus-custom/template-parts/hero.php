<?php
/**
 * Hero section for front page.
 *
 * @package GrowPlus_Custom
 */
?>
<section class="home-hero section" id="hero" style="padding:120px 5% 80px;">
	<div class="hero-content" style="max-width:860px;">
		<p class="eyebrow"><?php bloginfo( 'name' ); ?></p>
		<h1 class="section-title" style="font-size:clamp(2.6rem,8vw,5.8rem);">
			<?php the_title(); ?>
		</h1>
		<div class="red-line"></div>
		<div class="body-text" style="max-width:700px;">
			<?php the_content(); ?>
		</div>
	</div>
</section>
