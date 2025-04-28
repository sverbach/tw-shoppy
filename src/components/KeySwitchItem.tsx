import { z } from 'zod';
import { ProductResult } from '../utils/schemas';
import ShopifyImage from './ShopifyImage.tsx';

interface Props {
  product: z.infer<typeof ProductResult>;
}

export function KeySwitchItem({ product }: Props) {
  const variant = product!.variants.nodes[0];
  const price = new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency: variant.price.currencyCode,
  }).format(Number(variant.price.amount));

  return (
    <a
      href={`/switches/${product!.handle}`}
      className="flex h-[150px] w-[100px] flex-col rounded-md p-2 font-bold backdrop-blur-sm transition-colors hover:bg-black/80 hover:font-semibold hover:text-white"
      tabIndex={0}
      role="button"
    >
      <ShopifyImage
        classList="z-10 overflow-hidden object-cover flex-none"
        loading="eager"
        image={product!.images.nodes[0]}
        sizes={`100px`}
      />
      <div className="ms-1 flex flex-1 flex-col gap-1">
        <span className="max-h-[30px] overflow-hidden text-xs">{product!.title}</span>
        <div className="flex gap-1">
          <div
            className={
              'h-2 w-2 self-center rounded-full' + (variant.availableForSale ? 'bg-green-700' : 'bg-red-700')
            }
          ></div>
          <span className="text-xs">{price}</span>
        </div>
      </div>
    </a>
  );
}
