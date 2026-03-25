<script lang="ts">
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
      // execCommand fallback for older browsers / WebView
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
</script>

<section class="venue">
  <h2 class="section-title">오시는 길</h2>

  <div class="venue-info">
    <p class="venue-name">{venue.name}</p>

    <div class="address-row">
      <span class="address">{venue.address}</span>
      <button class="copy-btn" type="button" on:click={copyAddress} aria-label="주소 복사">
        복사
      </button>
    </div>
  </div>

  <div class="map-container">
    <iframe
      src="https://map.naver.com/p/entry/place/12023277?c=15.00,0,0,0,dh"
      width="100%"
      height="250"
      style="border: none;"
      loading="lazy"
      title="{venue.name} 위치 지도"
    ></iframe>
    <a class="map-link" href={venue.mapLink} target="_blank" rel="noopener noreferrer">
      네이버 지도에서 보기
    </a>
  </div>

  <ul class="directions">
    {#each venue.directions as dir}
      <li class="direction-item">
        <span class="direction-type">{typeLabel[dir.type] ?? dir.type}</span>
        <span class="direction-desc">{dir.description}</span>
      </li>
    {/each}
  </ul>

  {#if venue.parking}
    <div class="direction-item parking">
      <span class="direction-type">주차</span>
      <span class="direction-desc">{venue.parking}</span>
    </div>
  {/if}

  {#if toastVisible}
    <div class="toast" role="status" aria-live="polite">복사됨</div>
  {/if}
</section>

<style lang="scss">
  @use '../styles/variables' as *;

  .venue {
    position: relative;
    padding: $spacing-xl $spacing-md;
    max-width: $max-width-mobile;
    margin: 0 auto;
  }

  .section-title {
    font-size: $font-size-xl;
    color: $color-primary;
    text-align: center;
    margin-bottom: $spacing-lg;
  }

  .venue-info {
    margin-bottom: $spacing-md;
    text-align: center;
  }

  .venue-name {
    font-size: $font-size-lg;
    color: $color-text;
    margin-bottom: $spacing-sm;
  }

  .address-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-sm;
    flex-wrap: wrap;
  }

  .address {
    font-size: $font-size-sm;
    color: $color-text-light;
  }

  .copy-btn {
    font-size: $font-size-sm;
    color: $color-primary;
    background: none;
    border: 1px solid $color-primary;
    border-radius: 4px;
    padding: $spacing-xs $spacing-sm;
    min-height: $min-touch-target;
    cursor: pointer;
    white-space: nowrap;
  }

  .map-container {
    margin-bottom: $spacing-lg;
  }

  iframe {
    display: block;
    width: 100%;
    height: 250px;
    margin-bottom: $spacing-sm;
  }

  .map-link {
    display: block;
    text-align: center;
    font-size: $font-size-sm;
    color: $color-primary;
    text-decoration: underline;
    margin-top: $spacing-xs;
  }

  .directions {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
  }

  .direction-item {
    display: flex;
    gap: $spacing-sm;
    font-size: $font-size-sm;
    color: $color-text;
  }

  .direction-type {
    flex-shrink: 0;
    font-weight: bold;
    color: $color-primary;
    min-width: 48px;
  }

  .direction-desc {
    color: $color-text-light;
  }

  .parking {
    margin-top: $spacing-sm;
  }

  .toast {
    position: fixed;
    bottom: $spacing-xl;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.75);
    color: #fff;
    font-size: $font-size-sm;
    padding: $spacing-sm $spacing-md;
    border-radius: 20px;
    pointer-events: none;
    z-index: 100;
  }
</style>
