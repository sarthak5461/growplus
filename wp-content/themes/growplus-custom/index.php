<?php get_header(); ?>
<main class="section">
  <?php if (have_posts()) : ?>
    <?php while (have_posts()) : the_post(); ?>
      <article <?php post_class(); ?>>
        <h1><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>
        <?php the_excerpt(); ?>
      </article>
    <?php endwhile; ?>
  <?php else : ?>
    <p><?php esc_html_e('No content found.', 'growplus-custom'); ?></p>
  <?php endif; ?>
</main>
<?php get_footer(); ?>
