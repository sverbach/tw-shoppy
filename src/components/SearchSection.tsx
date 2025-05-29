import { FiltersProvider, SearchProvider, UserAgentProvider, type UserAgent } from './contexts';
import { QueryClientProvider } from '@tanstack/react-query';
import { SearchButton } from './search';
import { CartButton } from './CartButton';
import { getQueryClient } from '@/lib/utils';

export interface Props {
  buyerIP: string;
}

const queryClient = getQueryClient();
const userAgent = getUserAgent();

function getUserAgent(): UserAgent {
  const platform = window.navigator.platform.toLowerCase() ?? '';
  const userAgent = window.navigator.userAgent.toLowerCase() ?? '';

  if (platform.includes('mac') || userAgent.includes('macintosh')) {
    return 'mac';
  }

  if (platform.includes('win') || userAgent.includes('windows')) {
    return 'windows';
  }

  return 'other';
}

function SearchSection({ buyerIP }: Props) {
  return (
    <UserAgentProvider agent={userAgent}>
      <QueryClientProvider client={queryClient}>
        <SearchProvider>
          <FiltersProvider>
            {/* change this to signup/login <OrderButton buyerIP={buyerIP} /> */}
            <SearchButton buyerIP={buyerIP} />
            <CartButton buyerIP={buyerIP} />
          </FiltersProvider>
        </SearchProvider>
      </QueryClientProvider>
    </UserAgentProvider>
  );
}

export { SearchSection };
