import { FiltersProvider, SearchProvider, SortProvider } from './Contexts';
import { KeySwitchItemList } from './KeySwitchItemList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FiltersSection } from './FiltersSection';

export interface Props {
  buyerIP: string;
}

const queryClient = new QueryClient();

function KeySwitchSection({ buyerIP }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <SortProvider>
          <FiltersProvider>
            <FiltersSection buyerIP={buyerIP} />
            <KeySwitchItemList buyerIP={buyerIP} />
          </FiltersProvider>
        </SortProvider>
      </SearchProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export { KeySwitchSection };
