import { z } from 'zod';
import { ProductFilters, SortKey } from '@/utils/schemas';
import { useSort } from './contexts';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './select';
import { ProductSetFilter } from './ProductSetFilter';
import type { ProductSetFilterId } from './ProductSetFilter';

export interface Props {
  availableFilters: z.infer<typeof ProductFilters>;
  disableOptions: boolean;
}

interface FilterConfig {
  id: ProductSetFilterId;
  maxCount?: number;
  className?: string;
}

const FILTER_CONFIGS: FilterConfig[] = [
  { id: 'filter.v.availability', maxCount: 1 },
  { id: 'filter.p.m.switch.type', maxCount: 3 },
  { id: 'filter.p.m.switch.pre_lubed', maxCount: 1 },
  { id: 'filter.v.t.shopify.color-pattern' },
  { id: 'filter.p.m.switch.pcb_mount' },
  { id: 'filter.p.m.switch.total_travel' },
  {
    id: 'filter.p.m.switch.operating_force',
    className: 'w-64',
  },
  {
    id: 'filter.p.m.switch.brand',
    maxCount: 2,
    className: 'w-64',
  },
  {
    id: 'filter.p.m.switch.led_support',
    maxCount: 2,
    className: 'w-64',
  },
];

export function Filters({ availableFilters, disableOptions }: Props) {
  const { setSort } = useSort();

  const sortOptions: { label: string; value: string }[] = [
    { label: 'Most relevant', value: SortKey.Enum.RELEVANCE },
    { label: 'Most recent', value: SortKey.Enum.CREATED },
    { label: 'Price', value: SortKey.Enum.PRICE },
    { label: 'Name', value: SortKey.Enum.TITLE },
  ];

  return (
    <div className="flex flex-wrap gap-7">
      {FILTER_CONFIGS.map((config) => (
        <ProductSetFilter
          key={config.id}
          filterId={config.id}
          availableFilters={availableFilters}
          maxCount={config.maxCount}
          className={config.className}
          disableOptions={disableOptions}
        />
      ))}

      <Select onValueChange={(value) => setSort({ key: value as z.infer<typeof SortKey>, ascending: true })}>
        <SelectTrigger>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {sortOptions.map((sortOption) => (
              <SelectItem value={sortOption.value} key={sortOption.value}>
                {sortOption.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
