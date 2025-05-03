import { z } from 'zod';
import { ProductFilters, ProductResult } from '@/utils/schemas';
import { FilterProvider } from './ProductsFilterContext';
import { Filters } from './Filters';
import { KeySwitchItemList } from './KeySwitchItemList';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const ProductsResult = z.array(ProductResult);
export interface Props {
  products: z.infer<typeof ProductsResult>;
  filters: z.infer<typeof ProductFilters>;
  buyerIP: string;
}

const queryClient = new QueryClient();

function KeySwitchSection({ products, filters, buyerIP }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <FilterProvider>
        <Filters filters={filters} />
        <KeySwitchItemList initialProducts={products} buyerIP={buyerIP} />
      </FilterProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export { KeySwitchSection };
