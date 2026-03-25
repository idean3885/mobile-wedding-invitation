<script lang="ts">
  import { wedding, venue } from '$lib/data/wedding';
</script>

<section class="hero">
  <div class="hero__image-wrap">
    <img
      src={wedding.heroImage}
      alt="{wedding.groomName}과 {wedding.brideName}의 웨딩 사진"
      class="hero__image"
      fetchpriority="high"
    />
  </div>

  <div class="hero__content">
    <p class="hero__greeting">{@html wedding.greeting.replace(/\n/g, '<br />')}</p>

    <div class="hero__names">
      <div class="hero__side">
        <span class="hero__parents">{wedding.groomParents.father} · {wedding.groomParents.mother}의 {wedding.groomRank}</span>
        <span class="hero__name">{wedding.groomName}</span>
      </div>
      <span class="hero__dot">·</span>
      <div class="hero__side">
        <span class="hero__parents">{wedding.brideParents.father} · {wedding.brideParents.mother}의 {wedding.brideRank}</span>
        <span class="hero__name">{wedding.brideName}</span>
      </div>
    </div>

    <div class="hero__info">
      <p class="hero__date">{wedding.date}</p>
      <p class="hero__venue">{venue.name}</p>
    </div>
  </div>
</section>

<style lang="scss">
  @use '../styles/variables' as *;

  .hero {
    text-align: center;

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
      padding: $spacing-xl $spacing-md;
    }

    &__greeting {
      font-size: $font-size-base;
      color: $color-text-light;
      line-height: 2;
      margin-bottom: $spacing-xl;
    }

    &__names {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: $spacing-md;
      margin-bottom: $spacing-xl;
    }

    &__side {
      display: flex;
      flex-direction: column;
      gap: $spacing-xs;
    }

    &__parents {
      font-size: $font-size-sm;
      color: $color-text-light;
    }

    &__name {
      font-size: $font-size-xl;
      font-weight: 600;
    }

    &__dot {
      font-size: $font-size-xl;
      color: $color-primary;
    }

    &__info {
      display: flex;
      flex-direction: column;
      gap: $spacing-xs;
    }

    &__date {
      font-size: $font-size-base;
      color: $color-text;
    }

    &__venue {
      font-size: $font-size-sm;
      color: $color-text-light;
    }
  }
</style>
