import { getQueryClient } from '@/lib/utils';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CommandProvider, FiltersProvider, SearchProvider, SortProvider } from './contexts';
import { FiltersSection } from './FiltersSection';
import { KeySwitchItemList } from './KeySwitchItemList';

export interface Props {
  buyerIP: string;
}

const queryClient = getQueryClient();

function KeySwitchSection({ buyerIP }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <SortProvider>
          <FiltersProvider>
            <CommandProvider>
              <FiltersSection buyerIP={buyerIP} />
              <KeySwitchItemList buyerIP={buyerIP} />
            </CommandProvider>
          </FiltersProvider>
        </SortProvider>
      </SearchProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export { KeySwitchSection };
