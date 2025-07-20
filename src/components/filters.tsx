import { z } from 'zod';
import { ProductFilters } from '@/utils/schemas';
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
  return (
    <div className="flex flex-wrap gap-4">
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
    </div>
  );
}
