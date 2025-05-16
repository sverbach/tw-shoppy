import { FiltersProvider, SearchProvider } from './Contexts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchButton } from './Search';
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
