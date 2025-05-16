import { FiltersProvider, SearchProvider } from './contexts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SearchButton } from './search';
import { OrderButton } from './OrderButton';
import { CartButton } from './CartButton';

export interface Props {
  buyerIP: string;
}

const queryClient = new QueryClient();

function SearchSection({ buyerIP }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <FiltersProvider>
          <SearchButton buyerIP={buyerIP} />
          <OrderButton buyerIP={buyerIP} />
          <CartButton buyerIP={buyerIP} />
        </FiltersProvider>
      </SearchProvider>
    </QueryClientProvider>
  );
}

export { SearchSection };
