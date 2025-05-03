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
  const availableFilter = filters.find((filter) => filter.id === 'filter.v.availability');
  const priceFilter = filters.find((filter) => filter.id === 'filter.v.price');
  const typeFilter = filters.find((filter) => filter.id === 'filter.p.m.switch.type');
  const lubeFilter = filters.find((filter) => filter.id === 'filter.p.m.switch.pre_lubed');
  const colorFilter = filters.find((filter) => filter.id === 'filter.v.t.shopify.color-pattern');
  const pcbMountFilter = filters.find((filter) => filter.id === 'filter.p.m.switch.pcb_mount');
  const preTravelFilter = filters.find((filter) => filter.id === 'filter.p.m.switch.pre_travel');
  const totalTravelFilter = filters.find((filter) => filter.id === 'filter.p.m.switch.total_travel');
  const operatingForceFilter = filters.find((filter) => filter.id === 'filter.p.m.switch.operating_force');

  if (
    !brandFilter ||
    !ledFilter ||
    !availableFilter ||
    !priceFilter ||
    !typeFilter ||
    !lubeFilter ||
    !colorFilter ||
    !pcbMountFilter ||
    !preTravelFilter ||
    !totalTravelFilter ||
    !operatingForceFilter
  ) {
    throw new Error('aaaah!');
  }

  const ledOptions = ledFilter.values.map((v) => ({ label: v.label, value: v.input }));
  const brandOptions = brandFilter.values.map((v) => ({ label: v.label, value: v.input }));
  const availableOptions = availableFilter.values.map((v) => ({ label: v.label, value: v.input }));
  const typeOptions = typeFilter.values.map((v) => ({ label: v.label, value: v.input }));
  const lubeOptions = lubeFilter.values.map((v) => ({ label: v.label, value: v.input }));
  const colorOptions = colorFilter.values.map((v) => ({ label: v.label, value: v.input }));
  const pcbMountOptions = pcbMountFilter.values.map((v) => ({ label: v.label, value: v.input }));
  const preTravelOptions = preTravelFilter.values.map((v) => ({ label: v.label, value: v.input }));
  const totalTravelOptions = totalTravelFilter.values.map((v) => ({ label: v.label, value: v.input }));
  const operatingForceOptions = operatingForceFilter.values.map((v) => ({ label: v.label, value: v.input }));

  return (
    <div className="flex flex-wrap gap-7">
      <MultiSelect
        options={availableOptions}
        onValueChange={(selected) => setFilter(selected)}
        defaultValue={[availableOptions[0].value]}
        placeholder={availableFilter.label}
        variant="inverted"
        animation={0}
        maxCount={1}
        className="w-48"
      />

      <MultiSelect
        options={typeOptions}
        onValueChange={(selected) => setFilter(selected)}
        defaultValue={[]}
        placeholder={typeFilter.label}
        variant="inverted"
        animation={0}
        maxCount={3}
        className="w-48"
      />

      <MultiSelect
        options={lubeOptions}
        onValueChange={(selected) => setFilter(selected)}
        defaultValue={[]}
        placeholder={lubeFilter.label}
        variant="inverted"
        animation={0}
        maxCount={1}
        className="w-48"
      />

      <MultiSelect
        options={colorOptions}
        onValueChange={(selected) => setFilter(selected)}
        defaultValue={[]}
        placeholder={colorFilter.label}
        variant="inverted"
        animation={0}
        maxCount={10}
        className="w-48"
      />

      <MultiSelect
        options={pcbMountOptions}
        onValueChange={(selected) => setFilter(selected)}
        defaultValue={[]}
        placeholder={pcbMountFilter.label}
        variant="inverted"
        animation={0}
        maxCount={10}
        className="w-48"
      />

      <MultiSelect
        options={preTravelOptions}
        onValueChange={(selected) => setFilter(selected)}
        defaultValue={[]}
        placeholder={preTravelFilter.label}
        variant="inverted"
        animation={0}
        maxCount={10}
        className="w-48"
      />

      <MultiSelect
        options={totalTravelOptions}
        onValueChange={(selected) => setFilter(selected)}
        defaultValue={[]}
        placeholder={totalTravelFilter.label}
        variant="inverted"
        animation={0}
        maxCount={10}
        className="w-48"
      />

      <MultiSelect
        options={operatingForceOptions}
        onValueChange={(selected) => setFilter(selected)}
        defaultValue={[]}
        placeholder={operatingForceFilter.label}
        variant="inverted"
        animation={0}
        maxCount={10}
        className="w-64"
      />

      <MultiSelect
        options={brandOptions}
        onValueChange={(selected) => setFilter(selected)}
        defaultValue={[]}
        placeholder={brandFilter.label}
        variant="inverted"
        animation={0}
        maxCount={2}
        className="w-64"
      />

      <MultiSelect
        options={ledOptions}
        onValueChange={(selected) => setFilter(selected)}
        defaultValue={[]}
        placeholder={ledFilter.label}
        variant="inverted"
        animation={0}
        maxCount={2}
        className="w-64"
      />
    </div>
  );
}
