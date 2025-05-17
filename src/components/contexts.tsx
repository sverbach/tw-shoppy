import { ProductCollectionSortKeys } from '@/utils/graphql';
import type { Sort } from '@/utils/schemas';
import { createContext, useContext, useState, type ReactNode } from 'react';
import type { z } from 'zod';

type FiltersContextType = {
  appliedFilterValues: string[];
  setAppliedFilterValues: React.Dispatch<React.SetStateAction<string[]>>;
};

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export function FiltersProvider({ children }: { children: ReactNode }) {
  const [appliedFilterValues, setAppliedFilterValues] = useState<string[]>([]);

  return (
    <FiltersContext.Provider value={{ appliedFilterValues, setAppliedFilterValues }}>
      {children}
    </FiltersContext.Provider>
  );
}

export function useAppliedFilters() {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}

type SortContextType = {
  sort: z.infer<typeof Sort>;
  setSort: (sort: z.infer<typeof Sort>) => void;
};

const SortContext = createContext<SortContextType | undefined>(undefined);

export function SortProvider({ children }: { children: ReactNode }) {
  const [sort, setSort] = useState<z.infer<typeof Sort>>({
    key: ProductCollectionSortKeys.Relevance,
    ascending: true,
  });

  return <SortContext.Provider value={{ sort, setSort }}>{children}</SortContext.Provider>;
}

export function useSort() {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error('useFilter must be used within a SortProvider');
  }
  return context;
}

type SearchContextType = {
  search: string;
  setSearch: (search: string) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState<string>('');

  return <SearchContext.Provider value={{ search, setSearch }}>{children}</SearchContext.Provider>;
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useFilter must be used within a SearchProvider');
  }
  return context;
}
