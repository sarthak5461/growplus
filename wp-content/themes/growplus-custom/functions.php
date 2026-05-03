<?php
function growplus_custom_setup(): void {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script']);
}
add_action('after_setup_theme', 'growplus_custom_setup');

function growplus_custom_scripts(): void {
    wp_enqueue_style('growplus-style', get_template_directory_uri() . '/assets/css/style.css', [], '1.0.0');
    wp_enqueue_script('growplus-layout', get_template_directory_uri() . '/assets/js/layout.js', [], '1.0.0', false);
    wp_enqueue_script('growplus-main', get_template_directory_uri() . '/assets/js/main.js', ['growplus-layout'], '1.0.0', true);

    wp_localize_script('growplus-layout', 'growplusData', [
        'homeUrl' => home_url('/'),
        'year' => date('Y'),
    ]);
}
add_action('wp_enqueue_scripts', 'growplus_custom_scripts');
