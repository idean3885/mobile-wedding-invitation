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

    // Primary: Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(number);
        success = true;
      } catch {
        // fall through to fallbacks
      }
    }

    // Fallback 1: execCommand with temporary textarea
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

    // Fallback 2: select the text so user can manually copy
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

    // Show "복사됨" feedback for ~2 seconds
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
</script>

<section class="account">
  <h2 class="account__title">마음 전하실 곳</h2>

  <div class="account__groups">
    {#each groups as group}
      <div class="account__group">
        <h3 class="account__side-label">{group.label}</h3>
        <ul class="account__list">
          {#each group.entries as entry}
            <li class="account__item">
              <span class="account__relation">{RELATION_LABEL[entry.relation]}</span>
              <span class="account__bank">{entry.bank}</span>
              <span class="account__holder">{entry.holder}</span>
              <span class="account__number" data-account-number={entry.number}>
                {entry.number}
              </span>
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
      </div>
    {/each}
  </div>
</section>

<style lang="scss">
  @use '../styles/variables' as *;

  .account {
    padding: $spacing-xl $spacing-md;
  }

  .account__title {
    font-size: $font-size-lg;
    color: $color-text;
    margin-bottom: $spacing-lg;
    text-align: center;
  }

  .account__groups {
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;
  }

  .account__side-label {
    font-size: $font-size-sm;
    color: $color-primary;
    margin-bottom: $spacing-sm;
  }

  .account__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
  }

  .account__item {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    font-size: $font-size-sm;
    color: $color-text;
    flex-wrap: wrap;
  }

  .account__relation {
    color: $color-text-light;
    min-width: 40px;
  }

  .account__number {
    color: $color-text-light;
  }

  .account__copy-btn {
    min-height: $min-touch-target;
    padding: 0 $spacing-sm;
    background: none;
    border: 1px solid $color-divider;
    border-radius: 4px;
    font-size: $font-size-sm;
    color: $color-text;
    cursor: pointer;
    margin-left: auto;

    &:active {
      background-color: $color-divider;
    }
  }
</style>
