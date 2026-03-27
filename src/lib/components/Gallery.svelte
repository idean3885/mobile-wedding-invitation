<script lang="ts">
  import { base } from '$app/paths';
  import { gallery } from '$lib/data/wedding';
  import type { GalleryPhoto } from '$lib/data/wedding';

  const photos: GalleryPhoto[] = [...gallery].sort((a, b) => a.order - b.order);

  let dialogEl: HTMLDialogElement;
  let activeIndex: number | null = null;

  function openPhoto(index: number) {
    activeIndex = index;
    dialogEl.showModal();
  }

  function closeDialog() {
    dialogEl.close();
    activeIndex = null;
  }

  function prev() {
    if (activeIndex === null) return;
    activeIndex = (activeIndex - 1 + photos.length) % photos.length;
  }

  function next() {
    if (activeIndex === null) return;
    activeIndex = (activeIndex + 1) % photos.length;
  }

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === dialogEl) {
      closeDialog();
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') prev();
    else if (event.key === 'ArrowRight') next();
  }
</script>

<section class="gallery">
  <h2 class="section-title">GALLERY</h2>

  <ul class="gallery__grid">
    {#each photos as photo, index}
      <li class="gallery__item">
        <button
          class="gallery__thumb-btn"
          on:click={() => openPhoto(index)}
          aria-label="{photo.alt} 크게 보기"
        >
          <img
            src={base + photo.thumb}
            alt={photo.alt}
            loading="lazy"
            width="300"
            class="gallery__img"
          />
        </button>
      </li>
    {/each}
  </ul>
</section>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialogEl}
  class="gallery__dialog"
  aria-label="갤러리 확대 보기"
  on:click={handleBackdropClick}
  on:keydown={handleKeydown}
>
  {#if activeIndex !== null}
    <div class="gallery__dialog-inner">
      <button
        class="gallery__close-btn"
        on:click={closeDialog}
        aria-label="닫기"
      >✕</button>

      <img
        src={base + photos[activeIndex].src}
        alt={photos[activeIndex].alt}
        loading="lazy"
        class="gallery__dialog-img"
      />

      <div class="gallery__nav">
        <button
          class="gallery__nav-btn"
          on:click={prev}
          aria-label="이전 사진"
        >‹</button>
        <span class="gallery__counter">{activeIndex + 1} / {photos.length}</span>
        <button
          class="gallery__nav-btn"
          on:click={next}
          aria-label="다음 사진"
        >›</button>
      </div>
    </div>
  {/if}
</dialog>

<style lang="scss">
  @use '../styles/variables' as *;

  .gallery {
    &__grid {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 3px;
    }

    &__item {
      aspect-ratio: 1;
      overflow: hidden;
    }

    &__thumb-btn {
      display: block;
      width: 100%;
      height: 100%;
      padding: 0;
      border: none;
      background: $color-divider;
      cursor: pointer;
      min-width: 0;
      min-height: 0;
    }

    &__img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform $transition-base;
    }

    &__thumb-btn:active &__img {
      transform: scale(1.05);
    }

    &__dialog {
      padding: 0;
      border: none;
      background: transparent;
      max-width: 100vw;
      max-height: 100vh;
      width: 100vw;
      height: 100vh;

      &::backdrop {
        background: rgba(0, 0, 0, 0.92);
      }
    }

    &__dialog-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100vw;
      height: 100vh;
      position: relative;
    }

    &__close-btn {
      position: absolute;
      top: $spacing-md;
      right: $spacing-md;
      width: $min-touch-target;
      height: $min-touch-target;
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      color: #fff;
      font-size: $font-size-xl;
      cursor: pointer;
      z-index: 1;
    }

    &__dialog-img {
      max-width: 100%;
      max-height: calc(100vh - 120px);
      object-fit: contain;
    }

    &__nav {
      display: flex;
      align-items: center;
      gap: $spacing-lg;
      margin-top: $spacing-md;
    }

    &__nav-btn {
      width: $min-touch-target;
      height: $min-touch-target;
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      color: #fff;
      font-size: $font-size-xxl;
      cursor: pointer;
    }

    &__counter {
      color: rgba(255, 255, 255, 0.7);
      font-family: $font-family-base;
      font-size: $font-size-xs;
      min-width: 48px;
      text-align: center;
      letter-spacing: 0.1em;
    }
  }
</style>
