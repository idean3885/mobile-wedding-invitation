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

  let mapContainer: HTMLElement;

  let mapError = '';

  onMount(() => {
    const kakaoKey = import.meta.env.VITE_KAKAO_MAP_KEY;
    if (!kakaoKey) {
      mapError = '카카오맵 키가 설정되지 않았습니다.';
      return;
    }

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`;
    script.onerror = (e) => {
      console.error('[KakaoMap] SDK script load failed:', e);
      mapError = '카카오맵 SDK를 불러올 수 없습니다.';
    };
    script.onload = () => {
      console.log('[KakaoMap] SDK script loaded, kakao object:', window.kakao);
      if (!window.kakao?.maps?.load) {
        console.error('[KakaoMap] kakao.maps.load not available');
        mapError = '카카오맵 SDK가 올바르게 로드되지 않았습니다.';
        return;
      }
      window.kakao.maps.load(() => {
        console.log('[KakaoMap] maps.load callback fired');
        try {
          const position = new window.kakao.maps.LatLng(venue.lat, venue.lng);
          const map = new window.kakao.maps.Map(mapContainer, {
            center: position,
            level: 3
          });
          new window.kakao.maps.Marker({ position, map });
          map.setZoomable(false);
          console.log('[KakaoMap] Map initialized successfully');
        } catch (e) {
          console.error('[KakaoMap] Map init error:', e);
          mapError = '카카오맵 초기화에 실패했습니다.';
        }
      });
    };
    document.head.appendChild(script);
  });
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
    <div bind:this={mapContainer} class="map-embed" aria-label="{venue.name} 위치 지도">
      {#if mapError}
        <p class="map-error">{mapError}</p>
      {/if}
    </div>
    <a
      class="map-link"
      href="https://map.kakao.com/?urlX=503207.0&urlY=1107015.0&name=%EB%8D%94%ED%99%94%EC%9D%B4%ED%8A%B8%EB%B2%A0%EC%9D%BC"
      target="_blank"
      rel="noopener noreferrer"
    >
      카카오맵에서 보기
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

  .map-embed {
    display: block;
    width: 100%;
    height: 250px;
    margin-bottom: $spacing-sm;
  }

  .map-error {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: $font-size-sm;
    color: $color-text-light;
    text-align: center;
    margin: 0;
  }

  .map-link {
    display: block;
    text-align: center;
    font-size: $font-size-sm;
    color: $color-primary;
    text-decoration: underline;
    margin-top: $spacing-sm;
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
