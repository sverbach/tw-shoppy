import { z } from 'zod';
import { ProductResult } from '../utils/schemas';
import { KeySwitchItem } from './KeySwitchItem';
import { useFilter } from './ProductsFilterContext';
import { useEffect, useState } from 'react';
import { getProducts } from '@/utils/shopify';

const ProductsResult = z.array(ProductResult);
export interface Props {
  initialProducts: z.infer<typeof ProductsResult>;
  buyerIP: string;
}

export function KeySwitchItemList({ initialProducts, buyerIP }: Props) {
  const { filter } = useFilter();
  const [products, setProducts] = useState<z.infer<typeof ProductsResult>>(initialProducts);

  useEffect(() => {
    if (filter === '') {
      setProducts(initialProducts);
      return;
    }

    async function loadProducts() {
      const products = await getProducts({ limit: 250, buyerIP }); // todo add filter in here somehow
      setProducts(products);
    }

    loadProducts();
  }, [filter, initialProducts]);

  return (
    <section className="flex flex-wrap gap-3 overflow-auto pt-4 pb-4">
      {products.map((product) => (
        <KeySwitchItem product={product} />
      ))}
    </section>
  );
}
