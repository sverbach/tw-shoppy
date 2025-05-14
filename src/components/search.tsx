import { Button } from './button';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './command';
import { CommandLoading } from 'cmdk';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { predictiveSearch } from '@/utils/shopify';
import { useSearch } from './contexts';

interface Props {
  buyerIP: string;
}

export function Search({ buyerIP }: Props) {
  const [searchOpen, setSearchOpen] = useState(false);
  const { search, setSearch } = useSearch();

  const { isLoading, data } = useQuery({
    queryKey: ['global-search', search],
    queryFn: () => predictiveSearch({ buyerIP, query: search }),
    staleTime: 30000,
  });

  return (
    <>
      <Button variant="ghost" onClick={() => setSearchOpen(!searchOpen)}>
        Open search
      </Button>
      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Search for a product..." onValueChange={(value) => setSearch(value)} />
        <CommandList>
          <CommandGroup heading="Products">
            {isLoading ? (
              <CommandLoading></CommandLoading>
            ) : !data || data.products.length === 0 ? (
              <CommandEmpty>No results found.</CommandEmpty>
            ) : (
              data.products
                .filter((product) => !!product)
                .map((product) => <CommandItem key={product.id}>{product.title}</CommandItem>)
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
