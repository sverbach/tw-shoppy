import { SortKey } from '@/utils/schemas';
import { useSort } from './contexts';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './select';
import type { z } from 'zod';

interface Props {}

export function Sort({}: Props) {
  const { setSort } = useSort();

  const sortOptions: { label: string; value: string }[] = [
    { label: 'Most relevant', value: SortKey.Enum.RELEVANCE },
    { label: 'Most recent', value: SortKey.Enum.CREATED },
    { label: 'Price', value: SortKey.Enum.PRICE },
    { label: 'Name', value: SortKey.Enum.TITLE },
  ];
  return (
    <div className="self-end">
      <Select onValueChange={(value) => setSort({ key: value as z.infer<typeof SortKey>, ascending: true })}>
        <SelectTrigger>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="border-secondary/20 shadow-lg">
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
