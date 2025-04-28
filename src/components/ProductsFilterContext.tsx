import { createContext, useContext, useState, type ReactNode } from 'react';

type FilterContextType = {
  filter: string[];
  setFilter: (filter: string[]) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<string[]>([]);

  return <FilterContext.Provider value={{ filter, setFilter }}>{children}</FilterContext.Provider>;
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}
