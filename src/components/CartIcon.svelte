<script lang="ts">
  import { onMount } from 'svelte';
  import { initCart, $cart, $isCartDrawerOpen } from '../stores/cart';

  onMount(() => {
    initCart();
  });

  function openCart() {
    $isCartDrawerOpen.set(true);
  }
</script>

<div>
  <button class="relative" onclick={() => openCart()}>
    <span class="sr-only">Open your $cart</span>
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="68" height="68" fill="black" stroke="black" stroke-width="4" stroke-linejoin="round" />
      <rect x="2" y="2" width="68" height="68" fill="white" stroke="black" stroke-width="4" stroke-linejoin="round" />
      <path d="M46 54L54 34H18L26 54H46Z" fill="black" stroke="black" stroke-width="8" />
      <path d="M50 38H22" stroke="white" stroke-width="4" />
      <path d="M46 46H26" stroke="white" stroke-width="4" />
      <path d="M44 18L52 34" stroke="black" stroke-width="8" />
      <path d="M28 18L20 34" stroke="black" stroke-width="8" />
    </svg>
    {#if $cart && $cart.totalQuantity > 0}
      <div class="absolute -top-1 -right-2 rounded-full bg-emerald-900 text-[12px] text-white sm:top-0 sm:-right-1">
        <span class="flex h-5 w-5 items-center justify-center text-center">
          {$cart.totalQuantity}
        </span>
      </div>
    {/if}
  </button>
</div>
