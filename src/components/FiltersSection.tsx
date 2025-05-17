import { getProductFilters } from '@/utils/shopify';
import { useAppliedFilters, useSort } from './contexts';
import { Filters } from './filters';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { encodeFilters, encodeSort } from '@/lib/encodings';

interface Props {
  buyerIP: string;
}

export function FiltersSection({ buyerIP }: Props) {
  const { appliedFilterValues } = useAppliedFilters();
  const { sort } = useSort();

  const { data, isPlaceholderData } = useQuery({
    queryKey: ['product-filters', appliedFilterValues],
    queryFn: () => getProductFilters({ buyerIP, filters: appliedFilterValues }),
    placeholderData: (prev) => prev,
  });

  useEffect(() => {
    setFilterQueryParams();
    setSortQueryParams();
  }, [appliedFilterValues, sort]);

  function setSortQueryParams() {
    const url = new URL(window.location.href);
    const encoded = encodeSort(sort);

    url.searchParams.set('sort', encoded);

    window.history.replaceState({}, '', url);
  }

  function setFilterQueryParams() {
    const url = new URL(window.location.href);
    const encoded = encodeFilters(appliedFilterValues);

    url.searchParams.delete('filters');

    if (appliedFilterValues.length > 0) {
      url.searchParams.set('filters', encoded);
    }

    window.history.replaceState({}, '', url);
  }

  return (
    <>
      {data ? <Filters availableFilters={data} disableOptions={isPlaceholderData} /> : <div>Loading...</div>}
    </>
  );
}
