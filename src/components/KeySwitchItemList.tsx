import { z } from 'zod';
import { ProductResult } from '../utils/schemas';
import { KeySwitchItem } from './KeySwitchItem';
import { useFilter } from './ProductsFilterContext';
import { getProducts } from '@/utils/shopify';
import { useQuery } from '@tanstack/react-query';

const ProductsResult = z.array(ProductResult);
export interface Props {
  initialProducts: z.infer<typeof ProductsResult>;
  buyerIP: string;
}

export function KeySwitchItemList({ initialProducts, buyerIP }: Props) {
  const { filter } = useFilter();

  async function loadProducts() {
    if (filter.length === 0) {
      return initialProducts;
    }

    return await getProducts({ limit: 250, buyerIP, filters: filter });
  }

  const { isLoading, data } = useQuery({
    queryKey: ['switches', filter],
    queryFn: () => loadProducts(),
    staleTime: 30000,
  });

  return (
    <section className="flex flex-wrap gap-3 overflow-auto pt-4 pb-4">
      {isLoading || !data ? (
        <div>loading...</div>
      ) : (
        data
          .filter((product) => !!product)
          .map((product) => <KeySwitchItem key={product.id} product={product} />)
      )}
    </section>
  );
}
