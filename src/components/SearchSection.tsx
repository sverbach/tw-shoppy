import { FiltersProvider, SearchProvider } from './contexts';
import { QueryClientProvider } from '@tanstack/react-query';
import { SearchButton } from './search';
import { CartButton } from './CartButton';
import { getQueryClient } from '@/lib/utils';

export interface Props {
  buyerIP: string;
}

const queryClient = getQueryClient();

function SearchSection({ buyerIP }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <FiltersProvider>
          {/* change this to signup/login <OrderButton buyerIP={buyerIP} /> */}
          <SearchButton buyerIP={buyerIP} />
          <CartButton buyerIP={buyerIP} />
        </FiltersProvider>
      </SearchProvider>
    </QueryClientProvider>
  );
}

export { SearchSection };
