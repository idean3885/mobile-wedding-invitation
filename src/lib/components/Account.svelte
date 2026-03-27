<script lang="ts">
  import { accounts } from '$lib/data/wedding';
  import type { AccountEntry } from '$lib/data/wedding';

  const RELATION_LABEL: Record<AccountEntry['relation'], string> = {
    self: '본인',
    father: '아버지',
    mother: '어머니'
  };

  const SIDE_LABEL: Record<AccountEntry['side'], string> = {
    groom: '신랑측',
    bride: '신부측'
  };

  const groomAccounts = accounts.filter((a) => a.side === 'groom');
  const brideAccounts = accounts.filter((a) => a.side === 'bride');

  let copiedNumber: string | null = null;

  async function copyToClipboard(number: string): Promise<void> {
    let success = false;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(number);
        success = true;
      } catch {
        // fall through to fallbacks
      }
    }

    if (!success) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = number;
        textarea.style.position = 'fixed';
        textarea.style.top = '0';
        textarea.style.left = '0';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch {
        // fall through to fallback 2
      }
    }

    if (!success) {
      const el = document.querySelector(`[data-account-number="${number}"]`) as HTMLElement | null;
      if (el) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
      return;
    }

    copiedNumber = number;
    setTimeout(() => {
      copiedNumber = null;
    }, 2000);
  }

  function renderGroup(group: AccountEntry[], side: AccountEntry['side']) {
    return { label: SIDE_LABEL[side], entries: group };
  }

  const groups = [
    renderGroup(groomAccounts, 'groom'),
    renderGroup(brideAccounts, 'bride')
  ];

  let openSides: Set<string> = new Set();

  function toggle(side: string) {
    if (openSides.has(side)) {
      openSides.delete(side);
    } else {
      openSides.add(side);
    }
    openSides = openSides;
  }
</script>

<section class="account">
  <h2 class="section-title">ACCOUNT</h2>
  <p class="account__subtitle">마음 전하실 곳</p>

  <div class="account__groups">
    {#each groups as group, i}
      {@const side = i === 0 ? 'groom' : 'bride'}
      <div class="account__group">
        <button
          class="account__toggle"
          type="button"
          on:click={() => toggle(side)}
          aria-expanded={openSides.has(side)}
        >
          <span class="account__side-label">{group.label}</span>
          <span class="account__arrow" class:account__arrow--open={openSides.has(side)}>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </span>
        </button>
        {#if openSides.has(side)}
          <ul class="account__list">
            {#each group.entries as entry}
              <li class="account__item">
                <div class="account__info">
                  <span class="account__relation">{RELATION_LABEL[entry.relation]}</span>
                  <span class="account__holder">{entry.holder}</span>
                </div>
                <div class="account__detail">
                  <span class="account__bank">{entry.bank}</span>
                  <button
                    class="account__number"
                    type="button"
                    data-account-number={entry.number}
                    on:click={() => copyToClipboard(entry.number)}
                  >
                    {entry.number}
                  </button>
                </div>
                <button
                  class="account__copy-btn"
                  type="button"
                  aria-label="{entry.holder} 계좌번호 복사"
                  on:click={() => copyToClipboard(entry.number)}
                >
                  {copiedNumber === entry.number ? '복사됨' : '복사'}
                </button>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    {/each}
  </div>
</section>

<style lang="scss">
  @use '../styles/variables' as *;

  .account {
    max-width: $max-width-mobile;
    margin: 0 auto;

    &__subtitle {
      font-family: $font-family-serif;
      font-size: $font-size-sm;
      font-weight: 300;
      color: $color-text-light;
      text-align: center;
      margin-top: -#{$spacing-md};
      margin-bottom: $spacing-xl;
      letter-spacing: 0.1em;
    }

    &__groups {
      display: flex;
      flex-direction: column;
      gap: $spacing-md;
    }

    &__group {
      background: $color-white;
      border-radius: $radius-md;
      overflow: hidden;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    }

    &__toggle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: $spacing-md $spacing-lg;
      background: none;
      border: none;
      cursor: pointer;
      min-height: $min-touch-target;
      transition: background $transition-base;

      &:active {
        background: $color-background-alt;
      }
    }

    &__side-label {
      font-family: $font-family-serif;
      font-size: $font-size-base;
      font-weight: 400;
      color: $color-text;
      letter-spacing: 0.1em;
    }

    &__arrow {
      color: $color-text-light;
      transition: transform 0.25s ease;
      display: flex;
      align-items: center;

      &--open {
        transform: rotate(180deg);
      }
    }

    &__list {
      list-style: none;
      padding: 0 $spacing-lg $spacing-lg;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    &__item {
      display: flex;
      align-items: center;
      gap: $spacing-sm;
      padding: $spacing-md 0;
      border-bottom: 1px solid $color-divider;
      flex-wrap: wrap;

      &:last-child {
        border-bottom: none;
      }
    }

    &__info {
      display: flex;
      align-items: center;
      gap: $spacing-sm;
      width: 100%;
    }

    &__relation {
      font-family: $font-family-base;
      font-size: $font-size-xs;
      color: $color-text-light;
      min-width: 40px;
    }

    &__holder {
      font-family: $font-family-serif;
      font-size: $font-size-sm;
      font-weight: 400;
      color: $color-text;
    }

    &__detail {
      display: flex;
      align-items: center;
      gap: $spacing-sm;
      width: 100%;
    }

    &__bank {
      font-family: $font-family-base;
      font-size: $font-size-xs;
      color: $color-text-light;
      min-width: 52px;
    }

    &__number {
      color: $color-text-light;
      background: none;
      border: none;
      padding: 0;
      font-family: $font-family-base;
      font-size: $font-size-sm;
      cursor: pointer;
      min-width: 0;
      min-height: 0;
      text-decoration: none;
      letter-spacing: 0.03em;

      &:active {
        color: $color-primary;
      }
    }

    &__copy-btn {
      min-height: 32px;
      min-width: 48px;
      padding: 0 $spacing-sm;
      background: none;
      border: 1px solid $color-divider;
      border-radius: $radius-sm;
      font-family: $font-family-base;
      font-size: $font-size-xs;
      color: $color-primary;
      cursor: pointer;
      margin-left: auto;
      transition: background $transition-base;

      &:active {
        background: $color-background-alt;
      }
    }
  }
</style>
