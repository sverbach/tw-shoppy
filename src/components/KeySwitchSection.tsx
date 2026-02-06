import { getQueryClient } from '@/lib/utils';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CommandProvider, FiltersProvider, SearchProvider, SortProvider, UserPreferencesProvider } from './contexts';
import { FiltersSection } from './FiltersSection';
import { KeySwitchItemList } from './KeySwitchItemList';
import { CommandPaletteTrigger } from './CommandPaletteTrigger';
import { Sort } from './Sort';
import { SelectKeySwitchPricePerQuantity } from './SelectKeySwitchPricePerQuantity';

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
              <UserPreferencesProvider>
                <div className="flex items-end justify-between">
                  <FiltersSection buyerIP={buyerIP} />
                  <Sort />
                </div>
                <div className="w-full border"></div>
                <KeySwitchItemList buyerIP={buyerIP} />
                <CommandPaletteTrigger />
              </UserPreferencesProvider>
            </CommandProvider>
          </FiltersProvider>
        </SortProvider>
      </SearchProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export { KeySwitchSection };
