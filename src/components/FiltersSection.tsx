import { getProductFilters } from '@/utils/shopify';
import { useAppliedFilters } from './contexts';
import { Filters } from './filters';
import { useQuery } from '@tanstack/react-query';

interface Props {
  buyerIP: string;
}

export function FiltersSection({ buyerIP }: Props) {
  const { appliedFilterValues } = useAppliedFilters();

  const { data } = useQuery({
    queryKey: ['product-filters', appliedFilterValues],
    queryFn: () => getProductFilters({ buyerIP, filters: appliedFilterValues }),
  });

  return <>{data ? <Filters availableFilters={data} /> : <div>Loading...</div>}</>;
}
