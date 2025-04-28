import { z } from 'zod';
import { SomeFilter } from '@/components/some-filter';
import { ProductFilters } from '@/utils/schemas';
import { MultiSelect } from './multi-select';
import { useFilter } from './ProductsFilterContext';

export interface Props {
  filters: z.infer<typeof ProductFilters>;
}

export function Filters({ filters }: Props) {
  const { filter, setFilter } = useFilter();
  const brandFilter = filters.find((filter) => filter.id === 'filter.p.m.switch.brand');
  const ledFilter = filters.find((filter) => filter.id === 'filter.p.m.switch.led_support');

  if (!brandFilter || !ledFilter) {
    throw new Error('aaaah!');
  }

  const ledOptions = ledFilter.values.map((v) => ({ label: v.label, value: v.input }));

  function setLedOption(selected: string[]) {
    setFilter(selected);
  }

  console.log(brandFilter);
  console.log(ledFilter);
  return (
    <div className="flex flex-wrap gap-7">
      <MultiSelect
        options={ledOptions}
        onValueChange={setLedOption}
        defaultValue={[]}
        placeholder={ledFilter.label}
        variant="inverted"
        animation={0}
        maxCount={2}
        className="w-64"
      />

      <SomeFilter />

      <SomeFilter />
    </div>
  );
}
