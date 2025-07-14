import { getQueryClient } from '@/lib/utils';
import { QueryClientProvider } from '@tanstack/react-query';
import { CartButton } from './CartButton';
import { FiltersProvider, SearchProvider, UserAgentProvider, type UserAgent } from './contexts';
import { SearchButton } from './SearchButton';

export interface Props {
  buyerIP: string;
}

const queryClient = getQueryClient();

function SearchSection({ buyerIP }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <FiltersProvider>
          <div className="flex flex-col gap-5">
            {/* change this to signup/login <OrderButton buyerIP={buyerIP} /> */}
            <SearchButton buyerIP={buyerIP} />
            <CartButton buyerIP={buyerIP} />
          </div>
        </FiltersProvider>
      </SearchProvider>
    </QueryClientProvider>
  );
}

export { SearchSection };
