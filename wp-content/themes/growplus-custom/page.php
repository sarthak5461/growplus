<?php get_header(); ?>
<?php
$slug = get_post_field('post_name', get_post());
$template = locate_template('template-parts/' . $slug . '.php');
if ($template) {
    include $template;
} else {
    while (have_posts()) : the_post();
        echo '<main class="section">';
        the_content();
        echo '</main>';
    endwhile;
}
?>
<?php get_footer(); ?>
