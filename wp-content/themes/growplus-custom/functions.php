<?php
/**
 * Theme functions and definitions.
 *
 * @package GrowPlus_Custom
 */

if ( ! function_exists( 'growplus_custom_setup' ) ) {
	/**
	 * Set up theme defaults and register support for WordPress features.
	 */
	function growplus_custom_setup(): void {
		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 80,
				'width'       => 260,
				'flex-height' => true,
				'flex-width'  => true,
			)
		);
		add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );

		register_nav_menus(
			array(
				'primary' => __( 'Primary Menu', 'growplus-custom' ),
				'footer'  => __( 'Footer Menu', 'growplus-custom' ),
			)
		);
	}
}
add_action( 'after_setup_theme', 'growplus_custom_setup' );

/**
 * Enqueue scripts and styles.
 */
function growplus_custom_scripts(): void {
	wp_enqueue_style( 'growplus-style', get_template_directory_uri() . '/assets/css/style.css', array(), '1.0.0' );
	wp_enqueue_script( 'growplus-layout', get_template_directory_uri() . '/assets/js/layout.js', array(), '1.0.0', false );
	wp_enqueue_script( 'growplus-main', get_template_directory_uri() . '/assets/js/main.js', array( 'growplus-layout' ), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'growplus_custom_scripts' );
