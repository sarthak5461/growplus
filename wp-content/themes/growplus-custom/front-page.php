<?php
/**
 * Front page template.
 *
 * @package GrowPlus_Custom
 */

get_header();
?>
<main id="primary" class="site-main">
	<?php
	get_template_part( 'template-parts/hero' );
	get_template_part( 'template-parts/services' );
	get_template_part( 'template-parts/about' );
	get_template_part( 'template-parts/contact' );
	?>
</main>
<?php
get_footer();
