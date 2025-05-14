import { z } from 'zod';
import { ProductFilters, ProductResult } from '@/utils/schemas';
import { FiltersProvider, SearchProvider, SortProvider } from './contexts';
import { Filters } from './filters';
import { KeySwitchItemList } from './KeySwitchItemList';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export interface Props {
  availableFilters: z.infer<typeof ProductFilters>;
  buyerIP: string;
}

const queryClient = new QueryClient();

function KeySwitchSection({ availableFilters, buyerIP }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <SortProvider>
          <FiltersProvider>
            <Filters availableFilters={availableFilters} buyerIP={buyerIP} />
            <KeySwitchItemList buyerIP={buyerIP} />
          </FiltersProvider>
        </SortProvider>
      </SearchProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export { KeySwitchSection };
