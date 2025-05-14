import { KeySwitchItem } from './KeySwitchItem';
import { useFilters, useSearch, useSort } from './contexts';
import { getProducts, predictiveSearch } from '@/utils/shopify';
import { useQuery } from '@tanstack/react-query';

export interface Props {
  buyerIP: string;
}

export function KeySwitchItemList({ buyerIP }: Props) {
  const { filters } = useFilters();
  const { sort } = useSort();

  async function loadProducts() {
    return await getProducts({ limit: 250, buyerIP, filters, sort });
  }

  const { isLoading, data } = useQuery({
    queryKey: ['switches', filters, sort.key, sort.ascending],
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
