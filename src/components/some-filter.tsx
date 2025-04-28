import { useState } from 'react';
import { MultiSelect } from '@/components/multi-select';

const frameworksList = [
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'ember', label: 'Ember' },
];

export function SomeFilter() {
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(['react', 'angular']);

  return (
    <MultiSelect
      options={frameworksList}
      onValueChange={setSelectedFrameworks}
      defaultValue={selectedFrameworks}
      placeholder="Select frameworks"
      variant="inverted"
      animation={0}
      maxCount={2}
      className="w-64"
    />
  );
}
