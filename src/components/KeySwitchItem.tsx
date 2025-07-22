import { z } from 'zod';
import { ProductResult } from '../utils/schemas';
import ShopifyImage from './ShopifyImage.tsx';
import { cn } from '@/lib/utils.ts';
import { Button } from './button.tsx';
import { ShoppingCart } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { $cart, $isCartUpdating, addCartItem } from '@/stores/cart.ts';
import { useEffect, useState } from 'react';
import { useCommand } from './contexts.tsx';

interface Props {
  product: z.infer<typeof ProductResult>;
  index: number;
}

export function KeySwitchItem({ product, index }: Props) {
  const cart = useStore($cart);
  const isCartUpdating = useStore($isCartUpdating);
  const { command } = useCommand();
  const [showAddToCartButton, setShowAddToCartButton] = useState(false);
  const [priceFormatted, setPriceFormatted] = useState('');
  const [danceAnimation, setDanceAnimation] = useState('');
  const variant = product!.variants.nodes[0];

  useEffect(() => {
    setPriceFormatted(
      new Intl.NumberFormat('de-CH', {
        style: 'currency',
        currency: variant.price.currencyCode,
      }).format(Number(variant.price.amount))
    );
  }, [product]);

  async function handleClickAddToCart(variantId: string) {
    await addCartItem({ id: variantId, quantity: 10 });
  }

  return (
    <div
      className="text-accent flex h-[150px] w-[100px] flex-col rounded-md p-2 font-bold backdrop-blur-sm"
      role="button"
      tabIndex={-1}
      onMouseEnter={() => setShowAddToCartButton(true)}
      onMouseLeave={() => setShowAddToCartButton(false)}
    >
      <a href={`/switches/${product!.handle}`} tabIndex={-1}>
        <ShopifyImage
          classList={cn(
            'z-10 overflow-hidden object-cover flex-none hover:translate-y-[-3px] transition-transform',
            command !== 'dance'
              ? ''
              : index % 3 === 0
                ? 'motion-safe:animate-dance-three'
                : index % 2 === 0
                  ? 'motion-safe:animate-dance-two'
                  : 'motion-safe:animate-dance-one'
          )}
          loading="eager"
          image={product!.images.nodes[0]}
          sizes={`100px`}
        />
      </a>
      <div className="ms-1 flex flex-1 flex-col gap-1 font-mono">
        <a href={`/switches/${product!.handle}`} className="max-h-[30px] overflow-hidden text-start text-xs">
          {product!.title}
        </a>
        <div className="flex gap-1">
          <div className={cn('h-2 w-2 self-center rounded-full', variant.availableForSale ? 'bg-green-700' : 'bg-red-700')}></div>
          <span className="text-xs">{priceFormatted}</span>
        </div>
      </div>
      <Button
        variant="ghost"
        className={cn('text-primary absolute top-0 right-0', showAddToCartButton ? 'block' : 'hidden')}
        disabled={!cart || isCartUpdating}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleClickAddToCart(variant.id);
        }}
      >
        {isCartUpdating ? <span>:)</span> : <ShoppingCart />}
      </Button>
    </div>
  );
}
