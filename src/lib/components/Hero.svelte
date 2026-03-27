<script lang="ts">
  import { base } from '$app/paths';
  import { wedding, venue } from '$lib/data/wedding';
</script>

<section class="hero">
  <div class="hero__image-wrap">
    <img
      src={base + wedding.heroImage}
      alt="{wedding.groomName}과 {wedding.brideName}의 웨딩 사진"
      class="hero__image"
      loading="eager"
      fetchpriority="high"
    />
  </div>

  <div class="hero__content">
    <div class="hero__names">
      <div class="hero__side">
        <span class="hero__parents">{wedding.groomParents.father} · {wedding.groomParents.mother}의 {wedding.groomRank}</span>
        <span class="hero__name">{wedding.groomName}</span>
      </div>
      <span class="hero__ampersand">&</span>
      <div class="hero__side">
        <span class="hero__parents">{wedding.brideParents.father} · {wedding.brideParents.mother}의 {wedding.brideRank}</span>
        <span class="hero__name">{wedding.brideName}</span>
      </div>
    </div>

    <div class="hero__divider"></div>

    <div class="hero__info">
      <p class="hero__date">{wedding.date}</p>
      <p class="hero__venue">{venue.name}</p>
    </div>

    <div class="hero__divider"></div>

    <p class="hero__greeting">{@html wedding.greeting.replace(/\n/g, '<br />')}</p>
  </div>
</section>

<style lang="scss">
  @use '../styles/variables' as *;

  .hero {
    text-align: center;
    background: $color-background;

    &__image-wrap {
      width: 100%;
      overflow: hidden;
    }

    &__image {
      width: 100%;
      height: auto;
      object-fit: cover;
      object-position: center;
      display: block;
    }

    &__content {
      padding: $spacing-xxl $spacing-lg;
    }

    &__names {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: $spacing-lg;
      margin-bottom: $spacing-xl;
    }

    &__side {
      display: flex;
      flex-direction: column;
      gap: $spacing-sm;
    }

    &__parents {
      font-family: $font-family-serif;
      font-size: $font-size-xs;
      font-weight: 300;
      color: $color-text-light;
      letter-spacing: 0.05em;
    }

    &__name {
      font-family: $font-family-serif;
      font-size: $font-size-xxl;
      font-weight: 400;
      letter-spacing: 0.15em;
      color: $color-text;
    }

    &__ampersand {
      font-family: 'Georgia', serif;
      font-size: $font-size-lg;
      font-style: italic;
      color: $color-primary;
      margin-top: 16px;
    }

    &__divider {
      width: 1px;
      height: 40px;
      background: $color-divider;
      margin: $spacing-xl auto;
    }

    &__info {
      display: flex;
      flex-direction: column;
      gap: $spacing-sm;
    }

    &__date {
      font-family: $font-family-serif;
      font-size: $font-size-base;
      font-weight: 400;
      color: $color-text;
      letter-spacing: 0.1em;
    }

    &__venue {
      font-family: $font-family-serif;
      font-size: $font-size-sm;
      font-weight: 300;
      color: $color-text-light;
      letter-spacing: 0.05em;
    }

    &__greeting {
      font-family: $font-family-serif;
      font-size: $font-size-sm;
      font-weight: 300;
      color: $color-text-light;
      line-height: 2.2;
      letter-spacing: 0.04em;
    }
  }
</style>
