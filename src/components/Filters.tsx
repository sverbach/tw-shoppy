import { z } from 'zod';
import { ProductFilters, SortKey } from '@/utils/schemas';
import { MultiSelect } from './multi-select';
import { useFilters, useSort } from './contexts';

export interface Props {
  availableFilters: z.infer<typeof ProductFilters>;
}

export function Filters({ availableFilters }: Props) {
  const { setFilters } = useFilters();
  const { setSort } = useSort();

  const brandFilter = availableFilters.find((filter) => filter.id === 'filter.p.m.switch.brand');
  const ledFilter = availableFilters.find((filter) => filter.id === 'filter.p.m.switch.led_support');
  const availableFilter = availableFilters.find((filter) => filter.id === 'filter.v.availability');
  const priceFilter = availableFilters.find((filter) => filter.id === 'filter.v.price');
  const typeFilter = availableFilters.find((filter) => filter.id === 'filter.p.m.switch.type');
  const lubeFilter = availableFilters.find((filter) => filter.id === 'filter.p.m.switch.pre_lubed');
  const colorFilter = availableFilters.find((filter) => filter.id === 'filter.v.t.shopify.color-pattern');
  const pcbMountFilter = availableFilters.find((filter) => filter.id === 'filter.p.m.switch.pcb_mount');
  const preTravelFilter = availableFilters.find((filter) => filter.id === 'filter.p.m.switch.pre_travel');
  const totalTravelFilter = availableFilters.find((filter) => filter.id === 'filter.p.m.switch.total_travel');
  const operatingForceFilter = availableFilters.find(
    (filter) => filter.id === 'filter.p.m.switch.operating_force'
  );

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
  const sortOptions: { label: string; value: string }[] = [
    { label: 'Most relevant', value: SortKey.Enum.RELEVANCE },
    { label: 'Most recent', value: SortKey.Enum.CREATED },
    { label: 'Price', value: SortKey.Enum.PRICE },
    { label: 'Name', value: SortKey.Enum.TITLE },
  ];

  return (
    <div className="flex flex-wrap gap-7">
      <MultiSelect
        options={availableOptions}
        onValueChange={(selected) => setFilters(selected)}
        defaultValue={[availableOptions[0].value]}
        placeholder={availableFilter.label}
        variant="inverted"
        animation={0}
        maxCount={1}
        className="w-48"
      />

      <MultiSelect
        options={typeOptions}
        onValueChange={(selected) => setFilters(selected)}
        defaultValue={[]}
        placeholder={typeFilter.label}
        variant="inverted"
        animation={0}
        maxCount={3}
        className="w-48"
      />

      <MultiSelect
        options={lubeOptions}
        onValueChange={(selected) => setFilters(selected)}
        defaultValue={[]}
        placeholder={lubeFilter.label}
        variant="inverted"
        animation={0}
        maxCount={1}
        className="w-48"
      />

      <MultiSelect
        options={colorOptions}
        onValueChange={(selected) => setFilters(selected)}
        defaultValue={[]}
        placeholder={colorFilter.label}
        variant="inverted"
        animation={0}
        maxCount={10}
        className="w-48"
      />

      <MultiSelect
        options={pcbMountOptions}
        onValueChange={(selected) => setFilters(selected)}
        defaultValue={[]}
        placeholder={pcbMountFilter.label}
        variant="inverted"
        animation={0}
        maxCount={10}
        className="w-48"
      />

      <MultiSelect
        options={preTravelOptions}
        onValueChange={(selected) => setFilters(selected)}
        defaultValue={[]}
        placeholder={preTravelFilter.label}
        variant="inverted"
        animation={0}
        maxCount={10}
        className="w-48"
      />

      <MultiSelect
        options={totalTravelOptions}
        onValueChange={(selected) => setFilters(selected)}
        defaultValue={[]}
        placeholder={totalTravelFilter.label}
        variant="inverted"
        animation={0}
        maxCount={10}
        className="w-48"
      />

      <MultiSelect
        options={operatingForceOptions}
        onValueChange={(selected) => setFilters(selected)}
        defaultValue={[]}
        placeholder={operatingForceFilter.label}
        variant="inverted"
        animation={0}
        maxCount={10}
        className="w-64"
      />

      <MultiSelect
        options={brandOptions}
        onValueChange={(selected) => setFilters(selected)}
        defaultValue={[]}
        placeholder={brandFilter.label}
        variant="inverted"
        animation={0}
        maxCount={2}
        className="w-64"
      />

      <MultiSelect
        options={ledOptions}
        onValueChange={(selected) => setFilters(selected)}
        defaultValue={[]}
        placeholder={ledFilter.label}
        variant="inverted"
        animation={0}
        maxCount={2}
        className="w-64"
      />

      <MultiSelect
        options={sortOptions}
        onValueChange={(selected) =>
          setSort({ key: selected[0] as z.infer<typeof SortKey>, ascending: true })
        }
        defaultValue={[sortOptions[0].value]}
        placeholder="Sort"
        variant="inverted"
        animation={0}
        maxCount={1}
        className="w-64"
      />
    </div>
  );
}
