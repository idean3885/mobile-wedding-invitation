<script lang="ts">
  import { wedding, venue } from '$lib/data/wedding';
  import Hero from '$lib/components/Hero.svelte';
  import Gallery from '$lib/components/Gallery.svelte';
  import Venue from '$lib/components/Venue.svelte';
  import Account from '$lib/components/Account.svelte';

  let showContent = false;

  function enterInvitation() {
    showContent = true;
  }
</script>

<svelte:head>
  <title>동영 ♥ 지혜 결혼합니다</title>
</svelte:head>

{#if !showContent}
  <button class="cover" type="button" on:click={enterInvitation} aria-label="청첩장 열기">
    <img
      src={wedding.heroImage}
      alt="{wedding.groomName}과 {wedding.brideName}의 웨딩 사진"
      class="cover__image"
      fetchpriority="high"
    />
    <div class="cover__overlay">
      <p class="cover__names">{wedding.groomName} ♥ {wedding.brideName}</p>
      <p class="cover__date">{wedding.date}</p>
      <p class="cover__venue">{venue.name}</p>
      <p class="cover__hint">터치하여 청첩장 열기</p>
    </div>
  </button>
{:else}
  <main>
    <Hero />
    <Gallery />
    <Venue />
    <Account />
  </main>
{/if}

<style lang="scss">
  @use '$lib/styles/variables' as *;

  .cover {
    position: relative;
    width: 100%;
    height: 100dvh;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    overflow: hidden;
    display: block;
  }

  .cover__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cover__overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: $spacing-xl $spacing-md;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
    color: #fff;
    text-align: center;
  }

  .cover__names {
    font-size: $font-size-xl;
    font-weight: 600;
    margin-bottom: $spacing-sm;
  }

  .cover__date {
    font-size: $font-size-base;
    margin-bottom: $spacing-xs;
  }

  .cover__venue {
    font-size: $font-size-sm;
    margin-bottom: $spacing-lg;
    opacity: 0.9;
  }

  .cover__hint {
    font-size: $font-size-sm;
    opacity: 0.7;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
</style>
