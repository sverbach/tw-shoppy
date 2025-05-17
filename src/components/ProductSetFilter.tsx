import { z } from 'zod';
import { ProductFilters } from '@/utils/schemas';
import { MultiSelect } from './MultiSelect';
import { useAppliedFilters } from './contexts';

// All possible filter IDs from the filters.tsx file
export type ProductSetFilterId =
  | 'filter.p.m.switch.brand'
  | 'filter.p.m.switch.led_support'
  | 'filter.v.availability'
  | 'filter.v.price'
  | 'filter.p.m.switch.type'
  | 'filter.p.m.switch.pre_lubed'
  | 'filter.v.t.shopify.color-pattern'
  | 'filter.p.m.switch.pcb_mount'
  | 'filter.p.m.switch.pre_travel'
  | 'filter.p.m.switch.total_travel'
  | 'filter.p.m.switch.operating_force';

interface Props {
  filterId: ProductSetFilterId;
  availableFilters: z.infer<typeof ProductFilters>;
  className?: string;
  maxCount?: number;
  disableOptions: boolean;
}

export function ProductSetFilter({
  filterId,
  availableFilters,
  disableOptions,
  className = 'w-48',
  maxCount = 10,
}: Props) {
  const { appliedFilterValues, setAppliedFilterValues } = useAppliedFilters();

  const filter = availableFilters.find((filter) => filter.id === filterId);

  if (!filter) {
    throw new Error(`Filter with id ${filterId} not found!`);
  }

  const options = filter.values.map((v) => ({
    label: v.label,
    extra: v.count,
    value: v.input,
    disabled: v.count === 0 || disableOptions,
  }));

  const selectedValues = options
    .filter((option) => appliedFilterValues.includes(option.value))
    .map((option) => option.value);

  function updateAppliedFilterValues(previous: string[], selected: string[]) {
    const previousWithoutThisFilterValues = previous.filter((previousValue) =>
      options.every(({ value }) => value !== previousValue)
    );
    return [...previousWithoutThisFilterValues, ...selected];
  }

  return (
    <MultiSelect
      options={options}
      onValueChange={(selected) =>
        setAppliedFilterValues((prev) => updateAppliedFilterValues(prev, selected))
      }
      defaultValue={selectedValues}
      placeholder={filter.label}
      variant="inverted"
      animation={0}
      maxCount={maxCount}
      className={className}
    />
  );
}
