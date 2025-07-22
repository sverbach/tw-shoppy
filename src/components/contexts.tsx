import { ProductCollectionSortKeys } from '@/utils/graphql';
import type { Sort } from '@/utils/schemas';
import { createContext, useContext, useState, type ReactNode } from 'react';
import { z } from 'zod';

type FiltersContextType = {
  appliedFilterValues: string[];
  setAppliedFilterValues: React.Dispatch<React.SetStateAction<string[]>>;
};

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export function FiltersProvider({ children }: { children: ReactNode }) {
  const [appliedFilterValues, setAppliedFilterValues] = useState<string[]>([]);

  return <FiltersContext.Provider value={{ appliedFilterValues, setAppliedFilterValues }}>{children}</FiltersContext.Provider>;
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

export type UserAgent = 'mac' | 'windows' | 'other';

type UserAgentContextType = {
  userAgent: UserAgent;
  setUserAgent: (userAgent: UserAgent) => void;
};

const UserAgentContext = createContext<UserAgentContextType | undefined>(undefined);
export function UserAgentProvider({ agent, children }: { agent: UserAgent; children: ReactNode }) {
  const [userAgent, setUserAgent] = useState<UserAgent>(agent);

  return <UserAgentContext.Provider value={{ userAgent, setUserAgent }}>{children}</UserAgentContext.Provider>;
}

export function useUserAgent() {
  const context = useContext(UserAgentContext);
  if (!context) {
    throw new Error('useUserAgent must be used within a UserAgentProvider');
  }
  return context;
}

export type Command = 'dance' | 'none';
type CommandContextType = {
  command: Command;
  setCommand: (command: Command) => void;
};

const CommandContext = createContext<CommandContextType | undefined>(undefined);
export function CommandProvider({ children }: { children: ReactNode }) {
  const [command, setCommand] = useState<Command>('none');

  return <CommandContext.Provider value={{ command, setCommand }}>{children}</CommandContext.Provider>;
}

export function useCommand() {
  const context = useContext(CommandContext);
  if (!context) {
    throw new Error('useCommand must be used within a CommandContext');
  }
  return context;
}

type UserPreferencesContextType = {
  showKeySwitchPricePerQuantity: number;
  setShowKeySwitchPricePerQuantity: (quantity: number) => void;
};

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);
export function UserPreferencesProvider({ children }: { children: ReactNode }) {
  const [showKeySwitchPricePerQuantity, setShowKeySwitchPricePerQuantity] = useState<number>(1);

  return (
    <UserPreferencesContext.Provider value={{ showKeySwitchPricePerQuantity, setShowKeySwitchPricePerQuantity }}>
      {children}
    </UserPreferencesContext.Provider>
  );
}

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error('useUserPreferences must be used within a UserPreferencesContext');
  }
  return context;
}
