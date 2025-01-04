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
  class="relative h-[100px] w-[100px] rounded-lg border-4 border-solid border-border-default outline-border-default drop-shadow-sm transition-all focus-within:outline focus-within:drop-shadow-sm hover:drop-shadow-md focus:drop-shadow-md"
  tabindex="0"
  role="button"
>
  <div
    class="absolute h-full w-full rounded-lg bg-secondary-muted/40 transition-colors hover:bg-secondary-muted/20 focus:bg-secondary-muted/20"
  ></div>
  {#if product}
    <ShopifyImage
      classList="overflow-hidden h-full object-cover"
      loading="eager"
      image={product.images.nodes[0]}
      sizes={`100px`}
    />
  {/if}
</a>
