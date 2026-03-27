<script lang="ts">
  import { onMount } from 'svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Gallery from '$lib/components/Gallery.svelte';
  import Venue from '$lib/components/Venue.svelte';
  import Account from '$lib/components/Account.svelte';

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-up').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  });
</script>

<svelte:head>
  <title>동영 ♥ 지혜 결혼합니다</title>
</svelte:head>

<main>
  <Hero />

  <div class="section-wrap section-wrap--alt">
    <div class="section-divider"></div>
    <div class="fade-up">
      <Gallery />
    </div>
  </div>

  <div class="section-wrap">
    <div class="section-divider"></div>
    <div class="fade-up">
      <Venue />
    </div>
  </div>

  <div class="section-wrap section-wrap--alt">
    <div class="section-divider"></div>
    <div class="fade-up">
      <Account />
    </div>
  </div>
</main>

<style lang="scss">
  @use '$lib/styles/variables' as *;

  main {
    background: $color-background;
  }

  .section-wrap {
    padding: $spacing-section;
    background: $color-background;

    &--alt {
      background: $color-background-alt;
    }
  }
</style>
