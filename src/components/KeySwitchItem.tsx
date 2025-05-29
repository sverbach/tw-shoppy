import { z } from 'zod';
import { ProductResult } from '../utils/schemas';
import ShopifyImage from './ShopifyImage.tsx';
import { cn } from '@/lib/utils.ts';
import { Button } from './button.tsx';
import { ShoppingCart } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { $cart, $isCartUpdating, addCartItem } from '@/stores/cart.ts';

interface Props {
  product: z.infer<typeof ProductResult>;
}

export function KeySwitchItem({ product }: Props) {
  const variant = product!.variants.nodes[0];
  const price = new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency: variant.price.currencyCode,
  }).format(Number(variant.price.amount));
  const cart = useStore($cart);
  const isCartUpdating = useStore($isCartUpdating);

  async function handleClickAddToCart(variantId: string) {
    await addCartItem({ id: variantId, quantity: 10 });
  }

  return (
    <button
      type="button"
      className="flex h-[150px] w-[100px] flex-col rounded-md p-2 font-bold backdrop-blur-sm"
      tabIndex={0}
      role="button"
    >
      <a href={`/switches/${product!.handle}`}>
        <ShopifyImage
          classList="z-10 overflow-hidden object-cover flex-none hover:translate-y-2 transition-transform"
          loading="eager"
          image={product!.images.nodes[0]}
          sizes={`100px`}
        />
      </a>
      <div className="ms-1 flex flex-1 flex-col gap-1">
        <a href={`/switches/${product!.handle}`} className="max-h-[30px] overflow-hidden text-start text-xs">
          {product!.title}
        </a>
        <div className="flex gap-1">
          <div className={cn('h-2 w-2 self-center rounded-full', variant.availableForSale ? 'bg-green-700' : 'bg-red-700')}></div>
          <span className="text-xs">{price}</span>
        </div>
      </div>
      <Button
        variant="ghost"
        className="absolute top-0 left-0"
        disabled={!cart?.id || isCartUpdating}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleClickAddToCart(variant.id);
        }}
      >
        <ShoppingCart />
      </Button>
    </button>
  );
}
