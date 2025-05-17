import { KeySwitchItem } from './KeySwitchItem';
import { useAppliedFilters, useSort } from './contexts';
import { getProducts } from '@/utils/shopify/products';
import { useQuery } from '@tanstack/react-query';

export interface Props {
  buyerIP: string;
}

export function KeySwitchItemList({ buyerIP }: Props) {
  const { appliedFilterValues } = useAppliedFilters();
  const { sort } = useSort();

  const { isLoading, data } = useQuery({
    queryKey: ['switches', appliedFilterValues, sort.key, sort.ascending],
    queryFn: () => getProducts({ limit: 250, buyerIP, filters: appliedFilterValues, sort }),
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
