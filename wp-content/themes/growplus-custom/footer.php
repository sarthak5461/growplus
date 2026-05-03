<?php
/**
 * The template for displaying the footer.
 *
 * @package GrowPlus_Custom
 */
?>
<footer class="site-footer" role="contentinfo">
	<div class="container" style="padding:2rem 5%;display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;">
		<p style="margin:0;">&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?>. <?php esc_html_e( 'All rights reserved.', 'growplus-custom' ); ?></p>
		<?php
		wp_nav_menu(
			array(
				'theme_location' => 'footer',
				'menu_id'        => 'footer-menu',
				'container'      => false,
				'fallback_cb'    => false,
			)
		);
		?>
	</div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
