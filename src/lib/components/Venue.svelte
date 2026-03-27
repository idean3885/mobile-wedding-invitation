<script lang="ts">
  import { onMount } from 'svelte';
  import { venue } from '$lib/data/wedding';

  const typeLabel: Record<string, string> = {
    subway: '지하철',
    bus: '버스',
    car: '자가용'
  };

  let toastVisible = false;
  let toastTimer: ReturnType<typeof setTimeout>;

  async function copyAddress() {
    const text = venue.address;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement('textarea');
      el.value = text;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    showToast();
  }

  function showToast() {
    clearTimeout(toastTimer);
    toastVisible = true;
    toastTimer = setTimeout(() => {
      toastVisible = false;
    }, 2000);
  }

  let mapWrap: HTMLElement;

  onMount(() => {
    new window.daum.roughmap.Lander({
      timestamp: '1774429940765',
      key: 'jxgmez3xbxi',
      mapWidth: '640',
      mapHeight: '360'
    }).render();

    requestAnimationFrame(() => {
      const inner = mapWrap.querySelector('.root_daum_roughmap') as HTMLElement;
      if (!inner) return;
      const containerWidth = mapWrap.clientWidth;
      const scale = containerWidth / 640;
      inner.style.transformOrigin = 'top left';
      inner.style.transform = `scale(${scale})`;
      mapWrap.style.height = `${Math.round(360 * scale)}px`;
      mapWrap.style.overflow = 'hidden';
    });
  });
</script>

<section class="venue">
  <h2 class="section-title">LOCATION</h2>

  <div class="venue__info">
    <p class="venue__name">{venue.name}</p>
    <div class="venue__address-row">
      <span class="venue__address">{venue.address}</span>
      <button class="venue__copy-btn" type="button" on:click={copyAddress} aria-label="주소 복사">
        복사
      </button>
    </div>
  </div>

  <div class="venue__map-container">
    <div bind:this={mapWrap} class="venue__map-embed">
      <div id="daumRoughmapContainer1774429940765" class="root_daum_roughmap root_daum_roughmap_landing"></div>
    </div>
    <a
      class="venue__map-link"
      href="https://place.map.kakao.com/11024925"
      target="_blank"
      rel="noopener noreferrer"
    >
      카카오맵에서 보기
    </a>
  </div>

  <div class="venue__directions">
    {#each venue.directions as dir}
      <div class="venue__direction">
        <span class="venue__direction-type">{typeLabel[dir.type] ?? dir.type}</span>
        <span class="venue__direction-desc">{dir.description}</span>
      </div>
    {/each}
    {#if venue.parking}
      <div class="venue__direction">
        <span class="venue__direction-type">주차</span>
        <span class="venue__direction-desc">{venue.parking}</span>
      </div>
    {/if}
  </div>

  {#if toastVisible}
    <div class="venue__toast" role="status" aria-live="polite">주소가 복사되었습니다</div>
  {/if}
</section>

<style lang="scss">
  @use '../styles/variables' as *;

  .venue {
    position: relative;
    max-width: $max-width-mobile;
    margin: 0 auto;

    &__info {
      margin-bottom: $spacing-lg;
      text-align: center;
    }

    &__name {
      font-family: $font-family-serif;
      font-size: $font-size-lg;
      font-weight: 400;
      color: $color-text;
      margin-bottom: $spacing-sm;
      letter-spacing: 0.05em;
    }

    &__address-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: $spacing-sm;
      flex-wrap: wrap;
    }

    &__address {
      font-size: $font-size-sm;
      color: $color-text-light;
    }

    &__copy-btn {
      font-family: $font-family-base;
      font-size: $font-size-xs;
      color: $color-primary;
      background: none;
      border: 1px solid $color-divider;
      border-radius: $radius-sm;
      padding: $spacing-xs $spacing-sm;
      min-height: 32px;
      min-width: 48px;
      cursor: pointer;
      transition: background $transition-base;

      &:active {
        background: $color-background-alt;
      }
    }

    &__map-container {
      margin-bottom: $spacing-lg;
      border-radius: $radius-md;
      overflow: hidden;
      background: $color-white;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    }

    &__map-embed {
      display: block;
      width: 100%;
    }

    &__map-link {
      display: block;
      text-align: center;
      font-family: $font-family-base;
      font-size: $font-size-sm;
      color: $color-primary;
      padding: $spacing-md 0;
      border-top: 1px solid $color-divider;
      transition: background $transition-base;

      &:active {
        background: $color-background-alt;
      }
    }

    &__directions {
      display: flex;
      flex-direction: column;
      gap: $spacing-md;
      background: $color-white;
      border-radius: $radius-md;
      padding: $spacing-lg;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    }

    &__direction {
      display: flex;
      gap: $spacing-md;
      font-size: $font-size-sm;
      line-height: 1.6;
    }

    &__direction-type {
      flex-shrink: 0;
      font-family: $font-family-base;
      font-weight: 500;
      color: $color-primary;
      min-width: 44px;
      font-size: $font-size-xs;
      letter-spacing: 0.05em;
    }

    &__direction-desc {
      color: $color-text-light;
      font-size: $font-size-sm;
    }

    &__toast {
      position: fixed;
      bottom: $spacing-xl;
      left: 50%;
      transform: translateX(-50%);
      background: $color-text;
      color: $color-white;
      font-family: $font-family-base;
      font-size: $font-size-sm;
      padding: $spacing-sm $spacing-lg;
      border-radius: 24px;
      pointer-events: none;
      z-index: 100;
    }
  }
</style>
