import { Button } from './button';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './command';
import { CommandLoading } from 'cmdk';
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { predictiveSearch } from '@/utils/shopify/search';
import { useSearch } from './contexts';
import { z } from 'zod';
import { shortcutPressedHandler, type Shortcut } from '@/utils/shortcuts';
import { ShortcutBadge } from './ShortcutBadge';
import { SideNavItemIcon } from './SideNavItemIcon';

interface Props {
  buyerIP: string;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

const searchShortcut: z.infer<typeof Shortcut> = {
  metaKey: true,
  key: 'k',
};

export function SearchButton({ buyerIP }: Props) {
  const [searchOpen, setSearchOpen] = useState(false);
  const { search, setSearch } = useSearch();
  const queryClient = useQueryClient();

  const debouncedSearch = useDebounce(search, 250);

  const { isLoading, data } = useQuery({
    queryKey: ['global-search', debouncedSearch],
    queryFn: () => (debouncedSearch.trim() ? predictiveSearch({ buyerIP, query: debouncedSearch }) : { products: [] }),
    staleTime: 30000,
  });

  const clearSearch = () => {
    setSearch('');
    queryClient.setQueryData(['global-search', search], { products: [] });
  };

  const handleOpenChange = (open: boolean) => {
    setSearchOpen(open);
    if (!open) {
      clearSearch();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      shortcutPressedHandler(e, searchShortcut, () => setSearchOpen(true));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchOpen]);

  return (
    <>
      <div className="text-primary flex gap-4 xl:justify-between">
        <div className="hover:text-secondary flex cursor-pointer gap-4" onClick={() => setSearchOpen(!searchOpen)}>
          <SideNavItemIcon icon="SEARCH" />
          <button type="button" className="hidden cursor-pointer xl:block">
            search
          </button>
        </div>
        <div className="hidden md:block">
          <ShortcutBadge shortcut={searchShortcut} />
        </div>
      </div>
      <CommandDialog open={searchOpen} onOpenChange={handleOpenChange} shouldFilter={false}>
        <CommandInput placeholder="Search for a product..." onValueChange={(value) => setSearch(value)} />
        <CommandList>
          {isLoading ? (
            <CommandLoading>I am loading</CommandLoading>
          ) : !data || (data.products.length === 0 && search.trim()) ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : search.trim() && data.products.length > 0 ? (
            <CommandGroup heading="Products">
              {data.products
                .filter((product) => !!product)
                .map((product) => (
                  <CommandItem key={product.id}>{product.title}</CommandItem>
                ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      </CommandDialog>
    </>
  );
}
