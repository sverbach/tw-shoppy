<script lang="ts">
  import { z } from 'zod';
  import { ProductResult } from '../utils/schemas';
  import ShopifyImage from './ShopifyImage.svelte';

  interface Props {
    product: z.infer<typeof ProductResult>;
  }

  const { product }: Props = $props();
</script>

<a
  href={`/switches/${product?.handle}`}
  class="relative h-[100px] w-[100px] rounded-lg border-4 border-solid border-primary-default outline-primary-default drop-shadow-xs transition-all focus-within:outline focus-within:drop-shadow-sm hover:drop-shadow-sm focus:drop-shadow-sm"
  tabindex="0"
  role="button"
>
  <div class="absolute z-0 h-full w-full rounded-[5px] bg-secondary-default"></div>
  {#if product}
    <ShopifyImage
      classList="absolute z-10 overflow-hidden h-full object-cover"
      loading="eager"
      image={product.images.nodes[0]}
      sizes={`100px`}
    />
  {/if}
</a>
