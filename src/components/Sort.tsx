import { SortKey } from '@/utils/schemas';
import { useSort } from './contexts';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './select';
import type { z } from 'zod';

interface Props {}

export function Sort({}: Props) {
  const { sort, setSort } = useSort();

  const sortOptions: { label: string; value: string }[] = [
    { label: 'Most relevant', value: SortKey.Enum.RELEVANCE },
    { label: 'Most recent', value: SortKey.Enum.CREATED },
    { label: 'Lowest price', value: SortKey.Enum.PRICE },
    { label: 'Name', value: SortKey.Enum.TITLE },
  ];
  return (
    <div className="text-primary flex items-baseline text-sm font-semibold">
      <span>Sort by:</span>
      <Select onValueChange={(value) => setSort({ key: value as z.infer<typeof SortKey>, ascending: true })} value={sort.key}>
        <SelectTrigger>
          <SelectValue />
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
